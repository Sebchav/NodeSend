const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "variables.env" });
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async(req, res, next) => {
    //Mostrar mensajes de Error express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Buscar el usuario
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if(!usuario){
        res.status(401).json({msg: "El Usuario No Existe"});
        return next();
    }
    
    //Verificar el password y autenticar el usuario

    if(bcrypt.compareSync(password, usuario.password)){
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre
        }, process.env.SECRETA, {
            expiresIn: "8h"
        });
        
        res.json({token});

    }else{
        res.status(401).json({msg: "Password incorrecto"});
        return next();
    }

}

exports.usuarioAutenticado = (req, res)=>{
    res.json({usuario: req.usuario });
}