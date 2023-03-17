const { conexion } = require('./server/conexion')
const express = require('express')
const cors = require('cors')

//Inicializar app
console.log("App de node funciona")

// Conectac a la base de datos
conexion()

//Crear servidor de Node
const app = express()
const puerto = 3900;

// Configurar cors
app.use(cors())

//Convertir body a objeto js
app.use(express.json()) // recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})) //form-urlencoded

//RUTAS
const rutas_articulos = require('./routes/articulo')

app.use('/api', rutas_articulos)

//Crear rutas
app.get('/probando', (req, res) => {
    console.log("Se ha ejecutado el endpoint correctamente")

    return res.status(200).json([
        {
            curso: 'Master en React',
            author: "David boxler",
            url: "davoweb@gmail"
        },
        {
            curso: 'Master en React',
            author: "David boxler",
            url: "davoweb@gmail"
        },
    ])
})
app.get('/', (req, res) => {
    console.log("Se ha ejecutado el endpoint correctamente")

    return res.status(200).send(`
    <h1>Empezando a crear una api con node</h1>`)
})

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo es el puerto: " + puerto)
})