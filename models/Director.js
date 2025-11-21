// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Definisikan Skema untuk Director
// const DirectorSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Nama sutradara wajib diisi'], // Menambahkan validasi
//         trim: true // Menghapus spasi di awal/akhir
//     },
//     birthYear: {
//         type: Number,
//         min: [1800, 'Tahun lahir tidak valid'] // Menambahkan validasi
//     }
//     // Anda bisa menambahkan properti lain di sini jika perlu
// }, { timestamps: true }); // timestamps akan otomatis menambah createdAt dan updatedAt

// // Buat dan ekspor model berdasarkan skema
// // Mongoose akan secara otomatis membuat koleksi 'directors' (plural dan lowercase)
// module.exports = mongoose.model('Director', DirectorSchema);
