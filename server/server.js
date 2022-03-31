const express = require('express');
const cors = require('cors');

const app = express();
require('./config/config.mongoose');
const PlayerRouter = require('./routes/player.routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/player',PlayerRouter);

app.listen(8000,()=>{
    console.log("el servidor corre en el puerto 8000");
});