function modalPlanes(){
	$("#AgregarPlan").modal("show");
	mostrarPlanes();
	console.log("Planes");	
}

function modaleliminar(){
    $("#modaleiminar").modal("show");
	console.log("modaleiminar");	
}

function mostrarPlanes(){   
    $.ajax({
        url:"/planes",
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            for(var i=0; i<respuesta.length; i++){
                $("#listaplanes").append('<option value="'+ respuesta[i].Codigo_plan+'">'+ respuesta[i].Tipo_plan+'</option>');
            }                        
            $("#agregar").click(function(){
                 insertarplanes();
             })
                 }
             });    
         }

 function insertarplanes(){    
     var parametro="codigo_plan="+$("#listaplanes").val() + "usuario="+$("#codigousuario1").val(); 
         $.ajax({
          url:"/insertar",
          method:"POST",
          data:"codigo_plan="+$("#listaplanes").val() + "&" + "usuario="+$("#codigousuario1").val(),
          dataType:"json",
          success:function(respuesta){
              if (respuesta.affectedRows==1){
                  alert("Plan cargado de forma correcta");
                  window.location.href="configurar_perfil.html";
              }
              else
              {
                alert("falla carga de plan");
              console.log(respuesta);   
              }
             
          }
      });
}

$("#eliminacuenta").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    var parametros = "codigo_usuario="+$("#codigousuario1").val();
    console.log("codigo usuario es:" + $("#codigousuario1").val());
    
	$.ajax({
		url:"/eliminar",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				window.location.href="/logout";
			}
			console.log(respuesta);
		}
	});
});

$(document).ready(function(){
    $.ajax({
        url:"/obtenercodigo",
        dataType:"json",
        success:function(respuesta){
            $("#codigousuario1").val(respuesta.codigo_usuario)
            console.log($("#codigousuario1").val());
        }
    });
});