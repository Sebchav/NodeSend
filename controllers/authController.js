const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.autenticarUsuario = async(req, res, next) => {
    //Revisar si hay errores


    //Buscar el usuario
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if(!usuario){
        res.status(401).json({msg: "El Usuario No Existe"});
        return next();
    }
    
    //Verificar el password y autenticar el usuario

    if(bcrypt.compareSync(password, usuario.password)){
        //Crear JWT
    }else{
        res.status(401).json({msg: "Password incorrecto"});
        return next();
    }

}

exports.usuarioAutenticado = (req, res)=>{

}