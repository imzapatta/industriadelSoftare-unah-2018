function cargarfavoritos(codigousuario)
{
    console.log("cargando el codigo de usuario" + codigousuario);
    $.ajax({
        url:"/cargarfavoritos",
        data:"codigo_usuario="+codigousuario,
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            $("#cargararchivosfavoritos").html("");
            $("#cargararchivosfavoritos").append(    
               
            );
            console.log("llegando a cargar favritos");
            for(var i=0; i<respuesta.length;i++){                       
                $("#cargararchivosfavoritos").append(
                    `<div class='row'>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12" onclick="archivo(${respuesta[i].Codigo_Archivo});" >
                            <img src='img/nuevo_archivo.png' height='200'  >
                            <p class="archivos-texto">${respuesta[i].Nombre}.${respuesta[i].Extension_Archivo}</p>
                    </div>`

                );               
        }
    }
});
}





$(document).ready(function(){
    $.ajax({
        url:"/obtenercodigo_c",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuariofavoritos").val(respuesta.codigo_usuario)
            console.log("archivos favoritos");
            cargarfavoritos($("#codigousuariofavoritos").val());
        }
    });
});