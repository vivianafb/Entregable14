"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var productos = [
    {
        id: 1,
        nombre: 'Escuadra',
        precio: 200,
        foto: 'https://media.istockphoto.com/photos/wooden-ruler-picture-id186824125?s=612x612'
    },
    {
        id: 2,
        nombre: 'Transportador',
        precio: 50,
        foto: 'https://images.pexels.com/photos/5905610/pexels-photo-5905610.jpeg?cs=srgb&dl=pexels-katerina-holmes-5905610.jpg&fm=jpg'
    },
];
var Productos = /** @class */ (function () {
    function Productos() {
    }
    Productos.prototype.listar = function (data) {
        return data;
    };
    Productos.prototype.listarIndividual = function (productos, id) {
        return productos.find(function (aProduct) { return aProduct.id == id; });
    };
    Productos.prototype.almacenar = function (nombre, precio, foto) {
        var nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            precio: precio,
            foto: foto
        };
        productos.push(nuevoProducto);
        return nuevoProducto;
    };
    Productos.prototype.actualizar = function (id, nombre, precio) {
        var newArray = productos.map(function (pro) {
            if (pro.id === id) {
                return { id: id, nombre: nombre, precio: precio };
            }
        });
        return newArray;
    };
    Productos.prototype.borrar = function (id) {
        var productoEliminado = productos.splice(id - 1, 1);
        return productoEliminado;
    };
    return Productos;
}());
router.get('/vista', function (req, res) {
    var array = new Productos();
    var lista = array.listar(productos);
    if (!lista) {
        res.status = 404;
        return res.json({
            error: 'No hay productos cargados'
        });
    }
    res.render('main', { lista: lista });
});
router.get('/inicio', function (req, res) {
    res.render('main');
});
router.get('/listar', function (req, res) {
    var array = new Productos();
    var lista = array.listar(productos);
    if (!lista) {
        res.status = 404;
        return res.json({
            error: 'No hay productos cargados',
        });
    }
    res.json({
        data: lista,
    });
});
router.get('/:id', function (req, res) {
    var array = new Productos();
    var id = req.params.id;
    var producto = array.listarIndividual(productos, id);
    // if (!producto) {
    //   res.status = 404;
    //   return res.json({
    //     error: 'Producto no encontrado'
    //   });
    // }
    res.json({
        data: producto,
    });
});
router.post('/guardar', function (req, res) {
    var array = new Productos();
    var nombre = req.body.nombre;
    var precio = req.body.precio;
    var foto = req.body.foto;
    var producto = array.almacenar(nombre, precio, foto);
    res.status = 201;
    res.redirect('/api/productos/vista');
    // res.json({
    //   data: producto,
    // });
});
router.put('/actualizar/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var array = new Productos();
    var nombre = req.query.nombre;
    var precio = req.query.precio;
    if (id < 1 || id > productos.length) {
        return res.status(400).json({
            error: 'El parámetro está fuera de rango',
        });
    }
    var producto = array.actualizar(id, nombre, precio);
    res.json({
        producto: producto,
    });
});
router.delete('/borrar/:id', function (req, res) {
    var id = req.params.id;
    var array = new Productos();
    var producto = array.borrar(id);
    if (id < 1 || id > productos.length + 1) {
        return res.status(400).json({
            error: 'El parámetro está fuera de rango',
        });
    }
    res.json({
        producto: producto,
    });
});
exports.default = router;
