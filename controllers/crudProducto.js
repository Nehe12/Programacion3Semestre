const sql=require("mssql");
const conexion=require("../database/db");

exports.saveproduc=(req,res)=>{
    const nombre=req.body.nomProducto;
    const cantidad=req.body.canProducto;
    const stock=req.body.stock;
    const precio=req.body.precio;
    const lote=req.body.lote;
    console.log(nombre + " " + cantidad + " " + stock + " " + 
    precio + " " + lote);
    const query="INSERT INTO producto (nom_producto,cantidad_product,stock,precio,lote) VALUES ('"+nombre+"','"+cantidad+"','"+stock+"','"+precio+"','"+lote+"')";
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.redirect("productos");
    });

};

exports.updateproduc=(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nomProducto;
    const cantidad=req.body.canProducto;
    const stock=req.body.stock;
    const precio=req.body.precio;
    const lote=req.body.lote;
    console.log(nombre + " " + cantidad + " " + stock + " " + 
    precio + " " + lote);
    const query="UPDATE producto SET nom_producto='"+nombre+"', cantidad_product='"+cantidad+"', stock='"+stock+"',precio='"+precio+"',lote='"+lote+"' WHERE id_producto='"+id+"'";
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.redirect("productos");
    });
};