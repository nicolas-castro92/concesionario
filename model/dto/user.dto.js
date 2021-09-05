const mongoose = require("mongoose");

const db = require("../db-connection/mongodb");
/* using schemas */

const schema = require("../schemas/user.schema");
db();
schema.statics = {
    create: function (data,cb){
        let doc = new this(data); // hago referencia al schema con el this
        doc.save(cb); // se guarda y llama al cb
    },
    getAll: function (query,cb){
        this.find(query,cb);
    },
    getByCode: function (query,cb){
        this.find(query,cb);
    },
    update: function (query,data,cb){
        this.findOneAndUpdate(query,{$set: data},{new:true},cb);
    },
    delete: function (query,cb){
        this.findByIdAndDelete(query);
    }
};

const dto = mongoose.model("coll_user",schema);
module.exports = dto;