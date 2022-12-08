const sql=require("mssql");
const config={
    user: 'ventas',
    password: 'ventasdb',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'RegistroVenta',
    options:{
        trustServerCertificate:true,
    }
}

sql.connect(config,err=>{
    if (err) {
        console.log(err)
    } else {
        console.log("Conected");
    }
});