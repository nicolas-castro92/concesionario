const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    /* 
    matricula, marca, modelo, color, precio
    */

    userVehiculo: { /* code */ /* matricula */
        type:"String",
        required: true,
        unique: true
    },
    marca: {
        type:"String",
        required: true
    },
    modelo: {
        type:"String",
        required:true
    },
    precio: {
        type:"Number",
        required: true
    },
    password: {
        type:"String",
        required:true
    },
    rol: {
        type: "Number",
        required: true
    }
});

userSchema.plugin(validator);
module.exports = userSchema;
