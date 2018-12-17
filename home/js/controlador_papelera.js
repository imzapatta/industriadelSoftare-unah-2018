function cargarpapelera(codigousuario)
{
    console.log("cargando el codigo de usuario" + codigousuario);
    $.ajax({
        url:"/cargarpapeleria",
        data:"codigo_usuario="+codigousuario,
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            $("#cargarpapeleraa").html("");
            $("#cargarpapeleraa").append(             
            );
            console.log("llegando a cargar favritos");
            for(var i=0; i<respuesta.length;i++){                       
                $("#cargarpapeleraa").append(
                    `
                    <div class="col-xs-3 col-lg-2 col-md-2 col-sm-3 icono-archivo" onclick="archivo(${respuesta[i].Codigo_Archivo});" >
                        <img class="imagen-archivo" src='img/nuevo_archivo.png' height='100'  >
                        <p class="archivos-texto">${respuesta[i].Nombre}.${respuesta[i].Extension_Archivo}</p>
                    </div>`

                );               
        }
    }
});
}





$(document).ready(function(){
    $.ajax({
        url:"/obtenercodigo_papelera",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuariopapelera").val(respuesta.codigo_usuario)
            console.log("archivos borrados");
            cargarpapelera($("#codigousuariopapelera").val());
        }
    });
});