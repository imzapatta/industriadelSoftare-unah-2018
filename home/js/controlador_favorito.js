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
                    `<div class="col-xs-3 col-lg-2 col-md-2 col-sm-3 icono-archivo" onclick="archivo(${respuesta[i].Codigo_Archivo});" >
                        <img class="imagen-archivo" src='img/nuevo_archivo.png' height='100'  >
                        <p class="archivos-texto">${respuesta[i].Nombre}.${respuesta[i].Extension_Archivo} </p>
                    </div>
                    `

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