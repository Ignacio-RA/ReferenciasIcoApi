const inicio=(req,res)=>{
    res.json({
        msg: "Bienvenido a la API de referencias de ICO",
        descripcion: "Esta API permite gestionar usuarios, autores y referencias bibliográficas para el curso de Bases de Datos II"
    })
}

export {inicio}