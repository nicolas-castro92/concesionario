const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const vehiculoSchema = new mongoose.Schema({
    /* 
    matricula, marca, modelo, color, precio
    */

    matricula: { /* code */
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
    color: {
        type: "String",
        required: true
    },
    phone: {
        type: "String",
        required: true
    }
});

vehiculoSchema.plugin(validator);
module.exports = vehiculoSchema;
