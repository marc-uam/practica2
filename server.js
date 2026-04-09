import express from 'express'
import bodyParser from 'body-parser'
import { readFile, writeFile } from 'fs/promises'
const PORT = 8080
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let movies = []
let reviews = []

async function loadData() {
  try {
    const moviesText = await readFile('movies.json', 'utf8')
    movies = JSON.parse(moviesText)
  } catch (error) {
    movies = []
  }

  try {
    const reviewsText = await readFile('reviews.json', 'utf8')
    reviews = JSON.parse(reviewsText)
  } catch (error) {
    reviews = []
  }
}

async function saveData() {
  await writeFile('movies.json', JSON.stringify(movies, null, 2), 'utf8')
  await writeFile('reviews.json', JSON.stringify(reviews, null, 2), 'utf8')
}

app.get('/', (req, res) => {
  res.send('Hello World I am running locally')
})

app.get('/movie', (req, res) => {
  let result = [...movies]

  const { genre, year, in_cinema } = req.query

  if (genre !== undefined) {
    result = result.filter(m => m.genre === genre)
  }

  if (year !== undefined) {
    result = result.filter(m => m.year === parseInt(year))
  }

  if (in_cinema !== undefined) {
    result = result.filter(m => m.in_cinema === (in_cinema === 'true'))
  }

  res.json(result)
})

app.put('/movie/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body

  const index = movies.findIndex(m => m.id === id)

  if (index !== -1) {
    movies[index] = { id, ...data }
    await saveData()
    res.send({
      message: 'Película actualizada',
      movie: movies[index]
    })
  } else {
    const newMovie = { id, ...data }
    movies.push(newMovie)
    await saveData()
    res.send({
      message: 'Película creada',
      movie: newMovie
    })
  }
})

app.delete('/movie/:id', async (req, res) => {
  const id = req.params.id

  const index = movies.findIndex(m => m.id === id)

  if (index === -1) {
    return res.status(404).send({ error: 'Película no encontrada' })
  }

  movies.splice(index, 1)
  reviews = reviews.filter(r => r.movieId !== id)

  await saveData()

  res.send({ message: 'Película y sus reviews eliminadas' })
})

app.get('/review/:movieId', (req, res) => {
  const movieId = req.params.movieId

  const movieExists = movies.some(m => m.id === movieId)

  if (!movieExists) {
    return res.status(404).send({ error: 'Película no encontrada' })
  }

  const movieReviews = reviews.filter(r => r.movieId === movieId)
  res.json(movieReviews)
})

app.put('/review/:movieId', async (req, res) => {
  const movieId = req.params.movieId
  const { rating, comment } = req.body

  const movieExists = movies.some(m => m.id === movieId)

  if (!movieExists) {
    return res.status(404).send({ error: 'Película no encontrada' })
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).send({
      error: 'Rating debe ser un entero entre 1 y 5'
    })
  }

  const newReview = {
    movieId,
    rating,
    comment
  }

  reviews.push(newReview)

  await saveData()

  res.send({
    message: 'Review añadida',
    review: newReview
  })
})

app.delete('/review/:movieId', async (req, res) => {
  const movieId = req.params.movieId

  const movieExists = movies.some(m => m.id === movieId)

  if (!movieExists) {
    return res.status(404).send({ error: 'Película no encontrada' })
  }

  reviews = reviews.filter(r => r.movieId !== movieId)

  await saveData()

  res.send({ message: 'Reviews eliminadas' })
})

app.get('/rating/:movieId', (req, res) => {
  const movieId = req.params.movieId

  const movieExists = movies.some(m => m.id === movieId)

  if (!movieExists) {
    return res.status(404).send({ error: 'Película no encontrada' })
  }

  const movieReviews = reviews.filter(r => r.movieId === movieId)
  const total = movieReviews.reduce((acc, r) => acc + r.rating, 0)
  const average = movieReviews.length === 0 ? 0 : total / movieReviews.length

  res.json({
    movie: movieId,
    reviews: movieReviews.length,
    average: Number(average.toFixed(1))
  })
})

app.get('/stats', (req, res) => {
  const totalMovies = movies.length
  const totalReviews = reviews.length
  const sumRatings = reviews.reduce((acc, r) => acc + r.rating, 0)
  const average = totalReviews === 0 ? 0 : sumRatings / totalReviews

  res.json({
    movies: totalMovies,
    reviews: totalReviews,
    average_rating: Number(average.toFixed(1))
  })
})

app.get('/search', (req, res) => {
  const text = req.query.text?.toLowerCase()

  if (!text) {
    return res.status(400).send({ error: 'Debe indicar texto a buscar' })
  }

  const result = movies
    .map(movie => {
      const matches = reviews.filter(r =>
        r.movieId === movie.id &&
        r.comment.toLowerCase().includes(text)
      ).length

      return {
        id: movie.id,
        title: movie.title,
        matches
      }
    })
    .filter(m => m.matches > 0)

  res.json(result)
})

await loadData()

app.listen(PORT, () => {
  console.log('listening at localhost:' + PORT)
})