// REPORTE 1
$(document).ready(function(){
                
    var dataTable = $('#customer_data').DataTable({
        'processing' : true,
        'serverSide' : true,
        'serverMethod' : 'get',
        'ajax' : {
            'url' : '/get_data'
        },
        'aaSorting' : [],
        'columns' : [
            { data : 'nombre' },
            { data : 'apellido' },
            { data : 'telefono' },
            { data : 'ciudad' },
            { data : 'calle' },
            { data : 'numero_casa' },
        ]
    });

});

/*$(document).ready(function(){
    var tablaCliente = $('#tabla_clientes').DataTable({
        'processing' : true,
        'serverSide' : true,
        'serverMethod' : 'get',
        'ajax' : {
            'url' : '/cliente'
        },
        'aaSorting' : [],
        'columns' : [
            { data : 'nombre' },
            { data : 'apellido' },
            { data : 'telefono' },
            { data : 'ciudad' },
            { data : 'calle' },
            { data : 'numero_casa' },
        ]
    });
});*/
