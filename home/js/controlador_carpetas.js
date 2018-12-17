function modalcrear_carpetas(){
	$("#AggCarpeta").modal("show");
    contandocarpetas();
    crear_carpetas();	
}

function modaleliminar_carpetas(){
	$("#deletecarpeta").modal("show");
    carpetasdel();	
}

function deleete(){    
    console.log("boraaandoo   " + $("#delcarpeta").val()); 
         $.ajax({
          url:"/deletecarpeta",
          method:"POST",
          data:"carpeta="+$("#delcarpeta").val() + "&" + "usuario="+$("#codigousuariocarpeta").val(),
          dataType:"json",
          success:function(respuesta){
              if (respuesta.affectedRows==1){
                  window.location.href="carpetas.html";
              }
              else{
                alert("falla");

              }
              
          }
      });
}

function carpetasdel(){
    console.log("carpetas a eliminar")   

    $.ajax({
        url:"/mostrar_carpetas_borrados",
        data:"usuario="+$("#codigousuariocarpeta").val(),
        dataType:"json",
        success:function(respuesta){
            console.log("listo para eliminar");
            for(var i=0; i<respuesta.length; i++){
                console.log(respuesta[i].Nombre);
                $("#delcarpeta").append('<option value="'+ respuesta[i].Codigo_carpeta+'">'+ respuesta[i].Nombre+'</option>');
            }

            $("#eliminarcarpeta").click(function(){
                deleete();
            
             })
                 }
             });    
         }



function cargarcarpetas(codigousuario)
{
    console.log("cargando el codigo de usuario" + codigousuario);
    $.ajax({
        url:"/cargarcarpetas",
        data:"codigo_usuario="+codigousuario,
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            $("#cargar").html("");
            $("#cargar").append(    
               
            );
            for(var i=0; i<respuesta.length;i++){
                console.log(respuesta);                        
                $("#cargar").append(
                    `
                    <div class="col-xs-3 col-lg-2 col-md-2 col-sm-3 icono-archivo" onclick="archivo(${respuesta[i].Codigo_carpeta});" >
                    <img class="imagen-archivo" src='img/folder.png' height='100'  >
                            <p class="archivos-texto">${respuesta[i].Nombre}</p>
                    </div>`

                );               
        }
        contandocarpetas();
    }
});
}

function crear_carpetas(){ 
    
    $("#meterarcarpeta").click(function(){
        $.ajax({
         url:"/insertarcarpetas",
         method:"POST",
         data:"codigo_carpeta=" + $("#numerocarpetas").val() + "&" + "nombre_carpeta="+$("#cajacarpeta").val() + "&" + "usuario="+$("#codigousuariocarpeta").val(),
         dataType:"json",
         success:function(respuesta){
             if (respuesta.affectedRows==1){
                 window.location.href="carpetas.html";
             }
             else{
               alert("falla la creacion");  
             }
         }
     });

}) 
}

function archivo(codigocarpeta){
	$.ajax({
		url:"/extraer-carpeta",
		method:"POST",
		data:"codigo_archivo="+codigocarpeta,
		dataType:"json",
		success:function(respuesta){
			
		}
	})
}

function contandocarpetas(){
	$.ajax({
    url:"/contarcarpetas",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
    console.log(respuesta);
    $("#numerocarpetas").val(respuesta.length+1) 
    console.log("numero de carapetas" + $("#numerocarpetas").val());       
    }
});
}



$(document).ready(function(){
    $.ajax({
        url:"/obtenercodigo_a",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuariocarpeta").val(respuesta.codigo_usuario)
            console.log("codigo usuario dueño de carpetas= " + $("#codigousuariocarpeta").val());
            cargarcarpetas($("#codigousuariocarpeta").val());
        }
    });
});