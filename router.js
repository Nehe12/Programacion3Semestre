const express=require("express");
const router=express.Router();
const sql=require("mssql");
const conexion=require("./database/db");

router.get("/",(req,res)=>{
    res.render("login");
    
});
router.post("/inicio",(req,res)=>{
    const user=req.body.usuario;
    const password=req.body.password;
    const query="SELECT * FROM users WHERE users_name='"+user+"' AND users_password='"+password+"'";
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        let results=result.recordset;
        console.log(results);
        if(results.length > 0){
            res.redirect("/index");
        }else{
            res.redirect("/");
        }
    });
});

//Home Index
router.get("/index",(req,res)=>{
    //Para Graficas 1
    const query=
    `SELECT nombre as NOMBRE,SUM(total) AS TOTAL FROM cliente
    left join venta ON venta.cliente =cliente.id_cliente
    GROUP BY nombre;`
    const request=new sql.Request();
    //Para Graficas 2
    const query1=`SELECT  producto.nom_producto  AS Nombre,producto.cantidad_product AS Cantidad_Producto
    FROM producto;`
    const request1=new sql.Request();
    //Para Tablas 1
    const query2= 
    `SELECT nombre as NOMBRE,SUM(total) AS TOTAL FROM cliente
    left join venta ON venta.cliente =cliente.id_cliente
    GROUP BY nombre;`
    const request2=new sql.Request()
    //Para Tablas 2
    const query3=`SELECT  producto.nom_producto  AS Nombre,producto.cantidad_product AS Cantidad_Producto
    FROM producto;`
    const request3=new sql.Request();
   
   
    
    request.query(query,(err,result1)=>{
    if(err)res.status(500).send(err);
    
        request1.query(query1,(err,result2)=>{
        if(err) res.status(500).send(err);
   
            request2.query(query2,(err,result3)=>{
            if(err) res.status(500).send(err);
                
                request3.query(query3,(err,result4)=>{
                    if(err) res.status(500).send(err);
                        
                        res.render("index",{graf1:result1.recordset,graf2:result2.recordset,
                            tab1:result3.recordset,tab2:result4.recordset});
   
                    });
   
                });        
   
            });
        });
   });

//C-------L-------I-------E-------N-------T-------E-------S
router.get("/clientes",(req,res)=>{
    const query="SELECT * FROM cliente;";
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.render("clientes",{results:result.recordset});
    });
    
});
//Agregar Clientes
router.get("/save",(req,res)=>{
    res.render("clientes");
    // res.redirect("clientes")
});
//Editar Cliente
router.get("/edit-cliente/:id",(req,res)=>{
    const id=req.params.id;
    const query='SELECT * FROM cliente WHERE id_cliente='+id+'';
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err)res.status(500).send(err);
        res.render("edit-cliente",{clients:result.recordset[0]});
    });
});
//Eliminar Clientes
router.get("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const query="DELETE FROM cliente WHERE id_cliente="+id+"";
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err)res.status(500).send(err);
        res.redirect("/clientes");
    });

});

/*<<<<<-<-----<--<<<<<<---------------------------------->>>>>>>>->>>>>>>>>>>>>*/ 

//Productos
router.get("/productos",(req,res)=>{
    const query="SELECT * FROM producto;";
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.render("productos",{results:result.recordset});
    });
});
//Agregar Productos
router.get("/create-producto",(req,res)=>{
    res.render("create-producto");
});
//Editar Productos
router.get("/edit-producto/:id",(req,res)=>{
    let id=req.params.id;
    const query='SELECT * FROM producto WHERE id_producto='+id+'';
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err) res.status(500).send(err);
        res.render("edit-producto",{products:result.recordset[0]});
    });
});
//Eliminar Productos
router.get("/deleteproducto/:id",(req,res)=>{
    const id=req.params.id;
    const query='DELETE FROM producto WHERE id_producto='+id+'';
    console.log(query);
    const request=new sql.Request();
    request.query(query,(err,result)=>{
        if(err)res.status(500).send(err);
        res.redirect("/productos");
    });

});


/*<<<<<-<-----<--<<<<<<---------------------------------->>>>>>>>->>>>>>>>>>>>>*/ 

//Ventas
router.get("/ventas",(req,res)=>{
    
    res.render("ventas");
});


/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<GRAFICA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/ 
router.get("/graficas",(req,res)=>{
    res.render("graficas")
    
});

/*<<<<<-<-----<--<<<<<<---------------------------------->>>>>>>>->>>>>>>>>>>>>*/ 

//Reportes
router.get("/reportes1",(req,res)=>{
    res.render("reportes");
});


router.get('/get_data', function(request, response, next){

    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'id_cliente';

        var column_sort_order = 'desc';
    }
    else
    {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    //search data

    var search_value = request.query.search['value'];

    var search_query = `
     nombre LIKE '%${search_value}%' 
      OR apellido LIKE '%${search_value}%' 
      OR ciudad LIKE '%${search_value}%' 
      OR calle LIKE '%${search_value}%'
      `;

    //Total number of records without filtering
    const request1= new sql.Request();
    request1.query("SELECT COUNT(*) AS Total FROM dbo.cliente", function(error, data){

        var total_records = data.recordset[0].Total;
        //console.log(total_records);
        //Total number of records with filtering
       // console.log(`SELECT COUNT(*) AS Total FROM sales.customers WHERE  ${search_query}`);
        request1.query(`SELECT COUNT(*) AS Total FROM dbo.cliente WHERE  ${search_query}`, function(error, data){
            //  console.log(`SELECT COUNT(*) AS Total FROM sales.customers WHERE  ${search_query}`);

            var total_records_with_filter = data.recordset[0].Total;

            var query = `
            SELECT * FROM dbo.cliente 
            WHERE ${search_query} 
            ORDER BY ${column_name} ${column_sort_order}
            OFFSET  ${start} ROWS FETCH NEXT ${length} ROWS ONLY
            `;
           

            var data_arr = [];

            request1.query(query, function(error, data){
                    if (error) {
                        console.log(error);
                    }else
                        data.recordset.forEach(function(row){
                            data_arr.push({
                                'nombre' : row.nombre,
                                'apellido' : row.apellido,
                                'telefono' : row.telefono,
                                'ciudad' : row.ciudad,
                                'calle': row.calle,
                                'numero_casa': row.numero_casa
        
                            });
                    
               
                });

                var output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                };

                response.json(output);

            });

        });

    });

});

//CRUD CLIENTES
const crudCliente=require("./controllers/crud-cliente");
router.post("/save",crudCliente.save);
router.post("/update",crudCliente.update);
router.post("/delete",crudCliente.delete);

//CRUD PRODUCTOS
const crudProducto=require("./controllers/crudProducto");
router.post("/saveproduc",crudProducto.saveproduc);
router.post("/updateproduc",crudProducto.updateproduc);

const {request}=require("express");
const res=require("express/lib/response");
const { redirect } = require("express/lib/response");
module.exports=router;
