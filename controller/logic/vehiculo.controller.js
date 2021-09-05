const vehiculoDto = require("../../model/dto/vehiculo.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/* helper */
const helper = require("../helpers/general.helper");
const notiHelper = require("../helpers/notification.helper");

/* aqui creo un nuevo vehiculo */
exports.createVehiculo = (req, res, next) => {
    /* console.log(req.body); */
    let veh = {
        matricula: req.body.matricula,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio:req.body.precio,
        phone: req.body.phone,
        color: req.body.color
    };
    vehiculoDto.create(veh,(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        /* aqui todo fue satisfactorio
            que responda de buena manera, pero hay que
            guardar en el usuario */

        let r = config.get("roles").vehiculo;
        let user = {
            marca: veh.marca,
            modelo: veh.modelo,
            userVehiculo: veh.matricula,//username es el codigo de los estudiantes
            precio:veh.precio,
            password: helper.encryptPassword(req.body.password),
            rol: r
        };
        userDto.create(user, (err,newUser) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            notiHelper.sendSMS(veh.phone);
            res.status(201).json({
                info: data
            });
        });
    });

};

/* aqui actualizo un nuevo vehiculo */
exports.updateVehiculo = (req, res, next) => {

    let veh = {
        matricula: req.body.matricula,
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio:req.body.precio,
        phone: req.body.phone,
        color: req.body.color
    };
    vehiculoDto.update({_id: req.body.id},veh,(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        res.status(201).json({
            info: data
        }); //aqui todo actualiza
    });

};

exports.getAll = (req, res, next) => {

    vehiculoDto.getAll({},(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            info: data
        }); //aqui todo actualiza
    });

};

exports.getByCode = (req, res, next) => {

    vehiculoDto.getByCode({code: req.params.code },(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            info: data
        }); //aqui todo actualiza
    });

};
/* el metodo esta mal  */
exports.deleteVehiculo= () => {

    const {id} = req.params;

    vehiculoDto.delete({_id: req.body.id },(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        res.status(204).json(); //aqui todo actualiza
    });

};