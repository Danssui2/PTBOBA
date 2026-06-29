/**
 * cloudinary.js — Sisipkan transformasi Cloudinary (kompresi & resize) ke URL gambar.
 *
 * Cara kerja: Cloudinary membaca parameter transformasi langsung dari URL, jadi
 * tidak perlu generate banyak versi file saat upload — cukup 1 file asli disimpan,
 * lalu setiap tempat yang menampilkannya minta ukuran/kualitas berbeda lewat URL.
 *
 * Contoh hasil:
 *   https://res.cloudinary.com/demo/image/upload/me/bridge
 *   → https://res.cloudinary.com/demo/image/upload/q_auto,f_auto,c_scale,w_800/me/bridge
 *
 * URL yang BUKAN dari Cloudinary (mis. masih pakai link Pexels manual) akan
 * dikembalikan apa adanya — aman dipakai meski belum semua foto di-upload ke Cloudinary.
 */
export function cld(url, transform = 'q_auto,f_auto') {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return url
  if (!url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/${transform}/`)
}

// ── Preset ukuran yang dipakai di berbagai tempat tampil foto produk ──────────
export const cldThumb    = (url) => cld(url, 'q_auto,f_auto,c_scale,w_150')  // thumbnail galeri di modal
export const cldCard     = (url) => cld(url, 'q_auto,f_auto,c_scale,w_600')  // card grid produk
export const cldModal    = (url) => cld(url, 'q_auto,f_auto,c_scale,w_900')  // foto utama saat card diklik
export const cldFeatured = (url) => cld(url, 'q_auto,f_auto,c_scale,w_1200') // foto besar highlighted product