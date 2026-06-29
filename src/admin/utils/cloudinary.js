/**
 * cloudinary.js — Upload foto langsung dari browser ke Cloudinary (unsigned upload).
 *
 * ═══ SETUP (sekali saja) ═══════════════════════════════════════════════════════
 * 1. Buat akun di https://cloudinary.com (gratis, cukup untuk kebutuhan ini)
 *
 * 2. Ambil "Cloud Name":
 *    Dashboard Cloudinary → halaman utama → bagian "Product Environment Credentials"
 *    Contoh: cloud_name = "dxyzabc123"
 *
 * 3. Buat Upload Preset (WAJIB unsigned, supaya bisa upload dari browser tanpa API secret):
 *    Dashboard → Settings (ikon gear) → tab "Upload" → "Upload presets" → "Add upload preset"
 *    - Signing Mode  : pilih "Unsigned"   ⚠️ ini yang paling penting
 *    - Folder        : isi "ptboba" (opsional, biar foto rapi dalam 1 folder)
 *    - Save, lalu copy nama preset-nya
 *
 * 4. Buat file .env di root project frontend (sejajar dengan package.json), isi:
 *      VITE_CLOUDINARY_CLOUD_NAME=isi_cloud_name_anda
 *      VITE_CLOUDINARY_UPLOAD_PRESET=isi_nama_preset_anda
 *
 * 5. Restart dev server (npm run dev) — Vite hanya membaca .env saat server start.
 * ════════════════════════════════════════════════════════════════════════════════
 */

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const MAX_SIZE_MB = 10

export function isCloudinaryConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET)
}

/**
 * Upload satu file gambar ke Cloudinary.
 * @param {File} file - file gambar dari <input type="file">
 * @param {{ folder?: string, onProgress?: (percent:number)=>void }} opts
 * @returns {Promise<string>} secure_url hasil upload
 */
export function uploadToCloudinary(file, { folder = 'ptboba', onProgress } = {}) {
  if (!isCloudinaryConfigured()) {
    return Promise.reject(new Error(
      'Cloudinary belum dikonfigurasi. Isi VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET di file .env, lalu restart server dev.'
    ))
  }
  if (!file) return Promise.reject(new Error('Tidak ada file dipilih.'))
  if (!file.type.startsWith('image/')) return Promise.reject(new Error('File harus berupa gambar (JPG, PNG, WEBP, dll).'))
  if (file.size > MAX_SIZE_MB * 1024 * 1024) return Promise.reject(new Error(`Ukuran file maksimal ${MAX_SIZE_MB}MB.`))

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)
  if (folder) form.append('folder', folder)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      let res = null
      try { res = JSON.parse(xhr.responseText) } catch { /* respons bukan JSON */ }

      if (xhr.status >= 200 && xhr.status < 300 && res?.secure_url) {
        resolve(res.secure_url)
      } else {
        reject(new Error(res?.error?.message || 'Upload ke Cloudinary gagal. Cek Cloud Name & Upload Preset.'))
      }
    }

    xhr.onerror = () => reject(new Error('Tidak bisa terhubung ke Cloudinary. Cek koneksi internet.'))
    xhr.send(form)
  })
}