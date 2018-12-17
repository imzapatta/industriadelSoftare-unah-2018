
  $("#guarda").click(function(){
    var editor = ace.edit("texto");	
    console.log("valores para enviar: " + editor.getValue());
	$.ajax({
		url:"/guardarcambios",
		method:"POST",
		data:"Contenido_Archivo=" + editor.getValue(),
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
                window.location.href="escritorio.html"
            }
            else
            {
             alert("fallo");
            }
            console.log(respuesta)
			
		}
	});
});

function seleccionarTema(tema){
    editor.setTheme("ace/theme/"+tema);
}
var editor = ace.edit("texto");

$(document).ready(function(){

    $.ajax({
        url:"/fuente",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            console.log(respuesta[0].Contenido_Archivo);
            
            var modo= "ace/mode/" + respuesta[0].Lenguaje_Archivo;
            console.log(modo);
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode(modo);
            editor.setValue(respuesta[0].Contenido_Archivo);
        }
    })
})




