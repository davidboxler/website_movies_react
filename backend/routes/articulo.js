const express = require('express')
const multer = require('multer')
const ArticuloControlador = require("../controladores/Articulos_Controlador")

const router = express.Router()

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos')
    },
    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const subidas = multer({storage: almacenamiento})

//Rutas de pruebas
router.get("/ruta-de-prueba", ArticuloControlador.prueba)
router.get("/curso", ArticuloControlador.curso)

router.post('/crear', ArticuloControlador.crear)
router.get('/articulos', ArticuloControlador.conseguirArticulos)
router.get('/articulos/:id', ArticuloControlador.buscar_id)
router.delete('/articulos/:id', ArticuloControlador.borrar)
router.put('/articulos/:id', ArticuloControlador.editar)
router.post('/subir-imagen/:id', subidas.single("file0"), ArticuloControlador.subir)
router.get('/imagen/:fichero', ArticuloControlador.imagen)
router.get('/buscar/:busqueda', ArticuloControlador.buscar)

module.exports = router