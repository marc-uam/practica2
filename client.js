import axios from 'axios'

const server = 'http://localhost:8080'

async function testHelloWorld() {
  const result = await axios.get(server + '/')
  return result.data
}

async function getMovies() {
  const result = await axios.get(server + '/movie')
  return result.data
}

async function addMovie() {
  const result = await axios.put(server + '/movie/m3', {
    title: 'Titanic',
    genre: 'drama',
    year: 1997,
    in_cinema: false
  })
  return result.data
}

async function deleteMovie() {
  const result = await axios.delete(server + '/movie/m2')
  return result.data
}

async function addReview() {
  const result = await axios.put(server + '/review/m1', {
    rating: 5,
    comment: 'Excelente película'
  })
  return result.data
}

async function getReviews() {
  const result = await axios.get(server + '/review/m1')
  return result.data
}

async function deleteReviews() {
  const result = await axios.delete(server + '/review/m1')
  return result.data
}

async function getRating() {
  const result = await axios.get(server + '/rating/m1')
  return result.data
}

async function getStats() {
  const result = await axios.get(server + '/stats')
  return result.data
}

async function searchText() {
  const result = await axios.get(server + '/search?text=excelente')
  return result.data
}


async function getMoviesByGenre() {
  const result = await axios.get(server + '/movie?genre=sci-fi')
  return result.data
}

async function getMoviesByYear() {
  const result = await axios.get(server + '/movie?year=1997')
  return result.data
}

async function getMoviesInCinema() {
  const result = await axios.get(server + '/movie?in_cinema=true')
  return result.data
}
/*
console.log('Prueba conexión ')
console.log(await testHelloWorld())

console.log('--- Películas iniciales ---')
console.log(await getMovies())

console.log('--- Añadir película ---')
console.log(await addMovie())

console.log('--- Películas después del PUT ---')
console.log(await getMovies())

console.log('--- Eliminar película m2 ---')
console.log(await deleteMovie())

console.log('--- Películas después del DELETE ---')
console.log(await getMovies())

console.log('--- Añadir review a m1 ---')
console.log(await addReview())

console.log('--- Reviews de m1 ---')
console.log(await getReviews())

console.log('--- Rating de m1 ---')
console.log(await getRating())

console.log('--- Eliminar reviews de m1 ---')
console.log(await deleteReviews())

console.log('--- Reviews de m1 después del DELETE ---')
console.log(await getReviews())
console.log('--- Stats globales ---')
console.log(await getStats())
console.log('--- Buscar "excelente" ---')
console.log(await searchText())
console.log('--- Películas sci-fi ---')
console.log(await getMoviesByGenre())

console.log('--- Películas del año 1997 ---')
console.log(await getMoviesByYear())

console.log('--- Películas en cartelera ---')
console.log(await getMoviesInCinema())  */

console.log('--- Prueba conexión ---')
console.log(await testHelloWorld())

console.log('--- Películas iniciales ---')
console.log(await getMovies())

console.log('--- Añadir película ---')
console.log(await addMovie())

console.log('--- Películas después del PUT ---')
console.log(await getMovies())

console.log('--- Añadir review a m1 ---')
console.log(await addReview())

console.log('--- Reviews de m1 ---')
console.log(await getReviews())

console.log('--- Rating de m1 ---')
console.log(await getRating())

console.log('--- Stats globales ---')
console.log(await getStats())

console.log('--- Buscar "excelente" ---')
console.log(await searchText())

console.log('--- Películas sci-fi ---')
console.log(await getMoviesByGenre())

console.log('--- Películas del año 1997 ---')
console.log(await getMoviesByYear())

console.log('--- Películas en cartelera ---')
console.log(await getMoviesInCinema())

console.log('--- Eliminar reviews de m1 ---')
console.log(await deleteReviews())

console.log('--- Reviews de m1 después del DELETE ---')
console.log(await getReviews())

console.log('--- Eliminar película m2 ---')
console.log(await deleteMovie())

console.log('--- Películas después del DELETE ---')
console.log(await getMovies())
