import axios from 'axios'

const server = 'http://localhost:8080'

async function testHelloWorld() {
  const result = await axios.get(server + '/')
  return result.data
}

const hello = await testHelloWorld()
console.log('Prueba de conexión, resultado: ' + hello)