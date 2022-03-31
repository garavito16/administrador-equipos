const {Player} = require('../models/player.model');

module.exports = {
    create : (request,response) => {
        const {nombre,posicion} = request.body;
        Player.create({nombre,posicion,game1:"undecided",game2:"undecided",game3:"undecided"})
            .then(player => response.json(player))
            .catch(err => response.status(400).json(err));
    },
    getAll : (request,response) => {
        Player.find()//.sort({nombre:1})
            .then(playeres=> response.json(playeres))
            .catch(err=> response.status(400).json(err));
    },
    getId : (request,response) => {
        Player.findById({_id:request.params.id})
            .then(player=>response.json(player))
            .catch(err=>response.status(400).json(err));
    },
    update : (request,response) => {
        Player.findOneAndUpdate({_id:request.params.id},request.body,{new:true,runValidators: true})
            .then(player=>response.json(player))
            .catch(err=>response.status(400).json(err));
    },
    delete : (request,response) => {
        Player.findOneAndDelete({_id:request.params.id})
            .then(res=>response.json(res))
            .catch(err=>response.json(err));
    }
}