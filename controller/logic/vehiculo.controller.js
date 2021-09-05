const studentDto = require("../../model/dto/student.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/* helper */
const helper = require("../helpers/general.helper");
const notiHelper = require("../helpers/notification.helper");

/* aqui creo un nuevo estudiante */
exports.createStudent = (req, res, next) => {
    /* console.log(req.body); */
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName,
        email:req.body.email,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.create(std,(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        /* aqui todo fue satisfactorio
            que responda de buena manera, pero hay que
            guardar en el usuario */

        let r = config.get("roles").student;
        let user = {
            name: std.name,
            lastName: std.lastName,
            userName: std.code,//username es el codigo de los estudiantes
            password: helper.encryptPassword(req.body.password),
            rol: r
        };
        userDto.create(user, (err,newUser) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            notiHelper.sendSMS(std.phone);
            res.status(201).json({
                info: data
            });
        });
    });

};

/* aqui actualizo un nuevo estudiante */
exports.updateStudent = (req, res, next) => {

    let std = {
        code: req.body.code,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.update({_id: req.body.id},(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
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

    studentDto.getAll({},(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
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

    studentDto.getByCode({code: req.params.code },(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
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

exports.deleteStudent= () => {

    studentDto.delete({_id: req.body.id },(err,data) => { // envio el data y un cb, pero ese cb puede generar un error u otra info, el data que devuelve ya correctamente guardado el registro
        if ( err ){
            return res.status(400).json({
                error: err
            });
        }
        res.status(204).json(); //aqui todo actualiza
    });

}