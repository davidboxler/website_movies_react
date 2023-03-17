const fs = require('fs')
const path = require('path')
const { validarArticulo } = require('../helper/validar')
const Articulo = require('../models/Articulos')

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Prueba controlador, funciona"
    })
}

const curso = (req, res) => {
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
}

const crear = (req, res) => {

    //Recoger parametros por post a guardar 
    let parametros = req.body

    //Validar datos
    try {
        validarArticulo(parametros)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: "faltan datos por enviar"
        })
    }

    //Crear el objeto a guardar
    const articulo = new Articulo(parametros)
    //Asignar valores a objeto basado en el modelo
    //articulo.titulo = parametros.titulo

    //Guardar el articulo en la base de datos
    articulo.save((error, articuloGuardado) => {

        if (error || !articuloGuardado) {
            return res.status(200).json({
                mensaje: "Accion de guardar",
                parametros
            })
        }

        //Devolver resultado
        return res.status(200).json({
            status: 'success',
            articulo: articuloGuardado,
            mensaje: "Articulo guardado con exito!!"
        })
    })
}

const conseguirArticulos = (req, res) => {

    let consulta = Articulo.find({})

    consulta.limit(3)

    consulta.sort({ fecha: -1 }).exec((error, articulos) => {
        if (error || !articulos) {
            return res.status(404).json({
                status: 'Error',
                mensaje: "Articulo no encontrado!!"
            })
        }

        return res.status(200).json({
            status: 'success',
            articulos
        })
    })
}

const buscar_id = (req, res) => {
    //Tomar id de la url
    let id = req.params.id

    //Buscar el articulo
    Articulo.findById(id, (error, articulo) => {

        //Si no existe devolver error
        if (error || !articulo) {
            return res.status(404).json({
                status: 'Error',
                mensaje: "Articulo no encontrado!!"
            })
        }
        //Devolver articulo por id
        return res.status(200).json({
            status: 'success',
            articulo
        })
    })
}

const borrar = (req, res) => {

    let articuloId = req.params.id

    Articulo.findOneAndDelete({ _id: articuloId }, (error, articuloBorrado) => {

        if (error || !articuloBorrado) {
            return res.status(500).json({
                status: 'Error',
                mensaje: "Error al borrar el articulo"
            })
        }

        return res.status(200).json({
            status: 'success',
            articulo: articuloBorrado,
            mensaje: "El articulo ha sido borrado"
        })
    })

}

const editar = (req, res) => {
    //Tomar el id de la url
    let articuloId = req.params.id

    //Recoger datos del body
    let parametros = req.body

    //Validar datos
    try {
        validarArticulo(parametros)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: "faltan datos por enviar"
        })
    }

    //Buscar y actualizar articulos
    Articulo.findOneAndUpdate({ _id: articuloId }, req.body, { new: true }, (error, articuloActualizado) => {

        if (error || !articuloActualizado) {
            return res.status(500).json({
                status: 'Error',
                mensaje: "Error al actualizar"
            })
        }
        //Devolver respuesta
        return res.status(200).json({
            status: 'success',
            articulo: articuloActualizado,
        })
    })
}

const subir = (req, res) => {
    //Configurar multer

    //Tomar el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "Petición invalida"
        })
    }
    //Nombre del archivo
    let archivo = req.file.originalname

    //Expansion del archivo
    let archivo_split = archivo.split("\.")
    let extension = archivo_split[1]

    //Comprobar extension correcta
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        // Borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida"
            })
        })
    } else {
        //Tomar el id de la url
        let articuloId = req.params.id

        //Buscar y actualizar articulos
        Articulo.findOneAndUpdate({ _id: articuloId }, {imagen: req.file.filename}, { new: true }, (error, articuloActualizado) => {

            if (error || !articuloActualizado) {
                return res.status(500).json({
                    status: 'Error',
                    mensaje: "Error al actualizar"
                })
            }
            //Devolver respuesta
            return res.status(200).json({
                status: 'success',
                articulo: articuloActualizado,
                fichero: req.file
            })
        })
    }
}

const imagen = (req, res) => {
    let fichero = req.params.fichero
    let ruta_fisica = './imagenes/articulos/'+fichero

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica)) 
        }else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                existe,
                fichero,
                ruta_fisica
            })
        }
    })

}

const buscar = (req, res) => {
    //Sacar el string de busquedas
    let busqueda = req.params.busqueda

    //Find OP
    Articulo.find({ "$or": [
        { "titulo": { "$regex": busqueda, "$options": "i" }},
        { "contenido": { "$regex": busqueda, "$options": "i" }},
    ]})
    .sort({fecha: -1})
    .exec((error, articuloEncontrado) => {
        if(error || !articuloEncontrado || articuloEncontrado.length <= 0){
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos",
            })
        }

        return res.status(200).json({
            status: "success",
            articulos: articuloEncontrado
        })
    })

}

module.exports = {
    prueba,
    curso,
    crear,
    conseguirArticulos,
    buscar_id,
    borrar,
    editar,
    subir,
    imagen,
    buscar
}