const express=require("express");
const {json}=require("express/lib/response");
const app=express();
//Donde cargar archivos staticos
app.use(express.static('public'));
//habilitar ejs
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));
app.use("/",require("./router"));

app.listen(4000,()=>{
    console.log("Servidor Corriendo en http://localhost:4000");
});