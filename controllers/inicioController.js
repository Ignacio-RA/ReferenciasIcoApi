const inicio=(req,res)=>{
    res.json({
        msg: "Hola",
        status:"200",
        descripcion: "Bienvenido a la API de referencias de ICO"
    })
}

export {inicio}