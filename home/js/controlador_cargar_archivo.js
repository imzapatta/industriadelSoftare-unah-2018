function modalcrear_archivos(){
	$("#AggArchivo").modal("show");
    contandoarchivo();
    crear_archivo();	
}

function modaleliminar_archivos(){
	$("#deleteArchivo").modal("show");
    archivosdel();
    //crear_archivo();	
}

function modalfavrito_archivos(){
	$("#favArchivo").modal("show");
    mostrararchivos();	
}


function mostrararchivos(){
    console.log("listo para cargar")   
    $.ajax({
        url:"/mostrar_archivos_disponibles",
        data:"usuario="+$("#codigousuario").val(),
        dataType:"json",
        success:function(respuesta){
            console.log("listo para cargar") 
            console.log(respuesta);
            for(var i=0; i<respuesta.length; i++){
                $("#masarchivo").append('<option value="'+ respuesta[i].Codigo_Archivo+'">'+ respuesta[i].Nombre+'</option>');
            }
            $("#meterfavarchivo").click(function(){
                 insertararchivoss();
             })
                 }
             });    
         }
         function archivosdel(){
            console.log("archivos a eliminar")   

            $.ajax({
                url:"/mostrar_archivos_borrados",
                data:"usuario="+$("#codigousuario").val(),
                dataType:"json",
                success:function(respuesta){
                    console.log("listo para eliminar");
                    for(var i=0; i<respuesta.length; i++){
                        console.log(respuesta[i].Nombre);
                        $("#delarchivo").append('<option value="'+ respuesta[i].Codigo_Archivo+'">'+ respuesta[i].Nombre+'</option>');
                    }

                    $("#eliminararchivo").click(function(){
                        deletee();
                    
                     })
                         }
                     });    
                 }
        
                 function deletee(){    
                   console.log("boraaandoo"); 
                        $.ajax({
                         url:"/daletearchivo",
                         method:"POST",
                         data:"archivo="+$("#delarchivo").val() + "&" + "usuario="+$("#codigousuario").val(),
                         dataType:"json",
                         success:function(respuesta){
                             if (respuesta.affectedRows==1){
                                 window.location.href="escritorio.html";
                             }
                             else{
                               alert("falla");
 
                             }
                             
                         }
                     });
               }
        



         function insertararchivoss(){    
            console.log("codigo_archivo="+$("#masarchivo").val() + "usuario="+$("#codigousuario").val()); 
                $.ajax({
                 url:"/crearfavoritos",
                 method:"POST",
                 data:"archivo="+$("#masarchivo").val() + "&" + "usuario="+$("#codigousuario").val(),
                 dataType:"json",
                 success:function(respuesta){
                     if (respuesta.affectedRows==1){
                        window.location.href="escritorio.html";
                     }
                     else{
                       alert("falla");
                     console.log(respuesta);  
                     }
                     
                 }
             });
       }










     







function cargarachivo(codigousuario)
{
    console.log("cargando el codigo de usuario" + codigousuario);
    $.ajax({
        url:"/cargarachivo",
        data:"codigo_usuario="+codigousuario,
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            $("#cargararchivos").html("");
            $("#cargararchivos").append(    
               
            );
            console.log($("#codigousuario").val());
            for(var i=0; i<respuesta.length;i++){
                console.log(respuesta);                        
                $("#cargararchivos").append(
                    `
                    <div class="col-xs-3 col-lg-2 col-md-2 col-sm-3 icono-archivo" onclick="archivo(${respuesta[i].Codigo_Archivo});" >
                            <img class="imagen-archivo" src='img/nuevo_archivo.png' height='100'  >
                            <p class="archivos-texto">${respuesta[i].Nombre}.${respuesta[i].Extension_Archivo} </p>
                    </div>`

                );               
        } 
        contandoarchivo();
    }
});
}

function crear_archivo(){ 
    console.log("codigo_archivo:" + $("#numerocampos").val());
    console.log("nombre_archivo="+$("#caja").val());
    
    $("#meterarchivo").click(function(){
        $.ajax({
         url:"/insertararchivos",
         method:"POST",
         data:"codigo_archivo=" + $("#numerocampos").val() + "&" + "nombre_archivo="+$("#caja").val() + "&" + "usuario="+$("#codigousuario").val() + "&" + "formato_archivo="+$("#formato_archivo").val() + "&" + "lenguaje_archivo="+$("#lenguaje_archivo").val(),
         dataType:"json",
         success:function(respuesta){
             if (respuesta.affectedRows==1){
                 window.location.href="escritorio.html";
             }
             else{
               alert("falla la creacion");  
             }
         }
     });

}) 
}







function archivo(codigoArchivo){
	$.ajax({
		url:"/extraer-archivo",
		method:"POST",
		data:"codigo_archivo="+codigoArchivo,
		dataType:"json",
		success:function(respuesta){
			window.location.href = "nuevo_archivo.html";
			console.log(respuesta);
		}
	})
}

function contandoarchivo(){
	$.ajax({
    url:"/contarcampos",
    method:"POST",
    dataType:"json",
    success:function(respuesta){
    console.log(respuesta);
    if(respuesta == ''){
        $("#numerocampos").val(1);    
    }else{
        $("#numerocampos").val(respuesta.length)
    }
     
    console.log("numero de campos" + $("#numerocampos").val());       
    }
});
}



$(document).ready(function(){
    $.ajax({
        url:"/obtenercodigo",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuario").val(respuesta.codigo_usuario)
            console.log("escritorio= " + $("#codigousuario").val());
            cargarachivo($("#codigousuario").val());
            
        
        
        
        }

        
    });

 
});