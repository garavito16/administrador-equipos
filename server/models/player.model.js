

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
    {
        nombre : {
            type : String,
            required : [true,"El nombre del jugador es requerido"],
            minlength : [2,"El nombre del jugador debe tener mas de 2 caracteres"]
        },
        posicion : {
            type : String,
            required : [true,"La posicion preferida del jugador es requerida"],
            minlength : [3,"La posicion del jugador debe tener mas de 3 caracteres"]
        },
        game1 : {
            type : String
        },
        game2 : {
            type : String
        },
        game3 : {
            type : String
        }
    },
    {timestamps:true}
);

module.exports.Player = mongoose.model("Player",PlayerSchema);