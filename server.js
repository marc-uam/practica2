import express from 'express'
import bodyParser from 'body-parser'

const PORT = 8080
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let movies = []
let reviews = []

app.get('/', (req, res) => {
  res.send('Hello World I am running locally')
})

app.get('/movie', (req, res) => {
  res.send(movies)
})

app.listen(PORT, () => {
  console.log('listening at localhost:' + PORT)
})

let movies = [
  {
    id: 'm1',
    title: 'Inception',
    genre: 'sci-fi',
    year: 2010,
    in_cinema: false
  },
  {
    id: 'm2',
    title: 'Dune 2',
    genre: 'sci-fi',
    year: 2024,
    in_cinema: true
  }
]