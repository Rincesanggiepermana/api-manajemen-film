//direktors
// require('dotenv').config(); // Pastikan dotenv dipanggil paling atas
// const express = require('express'); // BARU: Impor express
// const cors = require('cors'); // BARU: Impor cors
// const connectDB = require('./config/database');
// const Movie = require('./models/Director');
// const Director = require('./models/Director'); // Pastikan file ini bernama Director.js

// connectDB(); // Panggil fungsi koneksi DB

// const app = express();
// const PORT = process.env.PORT || 3300;

// app.use(cors());
// app.use(express.json());


// // === ROUTES ===
// // == ROUTES UNTUK DIRECTOR (BARU) ==

// // POST /directors: Membuat Sutradara Baru
// app.post('/directors', async (req, res, next) => {
//  try {
//  const newDirector = new Director({
//  name: req.body.name,
//  birthYear: req.body.birthYear
//  });

//  const savedDirector = await newDirector.save();
//  res.status(201).json(savedDirector); // Status 201 Created

//  } catch (err) {
//  if (err.name === 'ValidationError') {
//  return res.status(400).json({ error: err.message });
//  }
//  next(err); // Teruskan error ke error handler
//  }
// });

// // GET /directors: Mengambil semua Sutradara (Menggunakan Mongoose find())
// app.get('/directors', async (req, res, next) => {
//  try {
//     const directors = await Director.find({});
//       res.json(directors);
//   } catch (err) {
//       next(err);
//     }
// });

// // GET /directors/:id: Mengambil Sutradara berdasarkan ID (Menggunakan Mongoose findById())
// app.get('/directors/:id', async (req, res, next) => {
//     try {
//     const director = await Director.findById(req.params.id);

//      if (!director) {
//         return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
//    }

//  res.json(director);
//  } catch (err) {
//       if (err.kind === 'ObjectId') { // Penanganan format ID tidak valid
//          return res.status(400).json({ error: 'Format ID tidak valid' });
//    }
//       next(err);
//     }
// });

// // PUT /directors/:id: Mengubah Sutradara berdasarkan ID (Menggunakan Mongoose findByIdAndUpdate())
// app.put('/directors/:id', async (req, res, next) => {
//  try {
//  const { name, birthYear } = req.body;

//      if (!name) { // Validasi minimal untuk properti wajib
//        return res.status(400).json({ error: 'name wajib diisi' });
//       }

//       const updatedDirector = await Director.findByIdAndUpdate(
//          req.params.id,
//        { name, birthYear }, 
//          { new: true, runValidators: true } // Opsi: mengembalikan dokumen baru & menjalankan validator
//       );

//      if (!updatedDirector) {
//       return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
//  }

//     res.json(updatedDirector);

//     } catch (err) {
//       if (err.name === 'ValidationError') {
//          return res.status(400).json({ error: err.message });
//         }
//         if (err.kind === 'ObjectId') {
//         return res.status(400).json({ error: 'Format ID tidak valid' });
//      }
//      next(err);
//     }
// });

// // DELETE /directors/:id: Menghapus Sutradara berdasarkan ID (Menggunakan Mongoose findByIdAndDelete())
// app.delete('/directors/:id', async (req, res, next) => {
//     try {
//       const deletedDirector = await Director.findByIdAndDelete(req.params.id);

//       if (!deletedDirector) {
//       return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
//      }

//        res.status(204).send(); // Status 204 No Content

//  } catch (err) {
//  if (err.kind === 'ObjectId') {
//  return res.status(400).json({ error: 'Format ID tidak valid' });
//  }
//        next(err);
//    }
// });

// // Middleware Error Handler (Tambahkan ini di bagian bawah)
// app.use((err, req, res, next) => {
//     console.error(err.stack); // Log error ke konsol
//     res.status(500).json({ error: 'Terjadi kesalahan pada server' });
// });


// app.listen(PORT, () => {
//   console.log(`Server aktif di http://localhost:${PORT}`);
// });


// //movies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Movie = require('./models/movie');

// Koneksi ke MongoDB
connectDB();

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());


// === ROUTES ===
app.get('/status', (req, res) => {
  res.json({ ok: true, service: 'film-api' });
});

// GET /movies - Menggunakan Mongoose find()
app.get('/movies', async (req, res, next) => { // Tambahkan next untuk error handler
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    next(err); // Teruskan error ke error handler
  }
});

// GET /movies/:id - Menggunakan Mongoose findById()
app.get('/movies/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Film tidak ditemukan' });
    }
    res.json(movie);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Format ID tidak valid' });
    }
    next(err);
  }
});

// POST /movies - Menggunakan Mongoose save()
app.post('/movies', async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// PUT /movies/:id - Menggunakan Mongoose findByIdAndUpdate()
app.put('/movies/:id', async (req, res, next) => {
  try {
    // Hanya ambil field yang diizinkan untuk diupdate dari body
    const { title, director, year } = req.body;
    if (!title || !director || !year) {
      return res.status(400).json({ error: 'title, director, year wajib diisi' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year }, // Hanya update field ini
      { new: true, runValidators: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Film tidak ditemukan' });
    }
    res.json(updatedMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Format ID tidak valid' });
    }
    next(err);
  }
});

// DELETE /movies/:id - Menggunakan Mongoose findByIdAndDelete()
app.delete('/movies/:id', async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Film tidak ditemukan' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Format ID tidak valid' });
    }
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
