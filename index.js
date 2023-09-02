const express = require("express");
const conectarDB = require("./config/db");


// Crear el servidor
const app = express();

//Conectar a la base de datos de NodeSend
conectarDB();

//Puerto de la app

const port = process.env.PORT || 4000;

//Habilitar leer los valores de body

app.use(express.json());

//Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));

//Arrancar app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`);
})