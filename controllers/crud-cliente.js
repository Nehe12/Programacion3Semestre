const sql=require("mssql");
const conexion=require("../database/db");

exports.save=(req,res)=>{
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const telefono=req.body.telefono;
    const ciudad=req.body.ciudad;
    const calle=req.body.calle;
    const NumeroCasa=req.body.NumeroCasa;
    console.log(nombre + " " + apellido + " " + telefono + " " + 
    ciudad + " " + calle + " " + NumeroCasa);
    const query="INSERT INTO cliente (nombre,apellido, telefono,ciudad,calle,numero_casa) VALUES ('"+nombre+"','"+apellido+"','"+telefono+"','"+ciudad+"','"+calle+"',"+NumeroCasa+")";
    console.log(query);
    const request= new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.redirect("clientes");
    });
};

exports.update=(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const telefono=req.body.telefono;
    const ciudad=req.body.ciudad;
    const calle=req.body.calle;
    const NumeroCasa=req.body.NumeroCasa;
    console.log(nombre + " " + apellido + " " + telefono + " " + 
    ciudad + " " + calle + " " + NumeroCasa);
    const query="UPDATE dbo.cliente SET nombre='"+nombre+"', apellido='"+apellido+"', telefono='"+telefono+"',ciudad='"+ciudad+"',calle='"+calle+"',numero_casa='"+NumeroCasa+"' WHERE id_cliente='"+id+"'";
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.redirect("clientes");
    });
};

exports.delete=(req,res)=>{
    
}