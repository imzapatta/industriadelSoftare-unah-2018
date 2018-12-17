$("#boton2").click(function(){
    console.log("banera");
   $.ajax({
    url:"/registrar",
    data:"nombre="+$("#txt-nombre").val()+"&apellido="+$("#txt-lastname").val()+"&correo="+$("#txt-email").val()+"&contraseña="+$("#txt-password").val()+"&nacimiento="+$("#txt-birthday").val(), 
    method:"POST",
    dataType:"json",
    success:function(respuesta){
        alert("registro correcto, Bienvenido");
        window.location.href="index.html";
        
    }
});
})

$("#boton1").click(function(){
	$.ajax({
        url:"/login",
        data:"correo="+$("#caja").val()+"&contraseña="+$("#caja1").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            //var valores = eval(respuesta);
            if (respuesta.estatus ==0 )
            {
              //alert("Credenciales correctas");
              window.location.href="escritorio.html"; 
              cargarachivo(respuesta.codigo_usuario);
                // cargarusuario();
              console.log(respuesta);
              //console.log(respuesta.codigo_usuario);

            }
                
            else{
                alert("Credenciales incorrectas");
               console.log(respuesta);

			}
               
        }
    });
});




