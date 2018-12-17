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
        url:"/obtenercodigo_papelera",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuariopapelera").val(respuesta.codigo_usuario)
            console.log("archivos borrados");
            cargarpapelera($("#codigousuariopapelera").val());
        }
    });
});