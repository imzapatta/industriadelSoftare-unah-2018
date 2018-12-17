function seleccionarFormato(codigoFormato){
    var extension = "";
    if('HTML' == codigoFormato){
        extension = "html"
    }else if('CSS' == codigoFormato){
        extension = "css"
    }else if('JavaScript' == codigoFormato){
        extension = "js"
    }else if('PHP'== codigoFormato){
        extension = "php"
    }else if('XML' == codigoFormato){
        extension = "xml"
    }else if('CSHARP' == codigoFormato){
        extension = "csharp"
    }else if('Java' == codigoFormato){
        extension = "java"
    }else if('Python' == codigoFormato){
        extension = "py"
    }else if('SQL' == codigoFormato){
        extension = "sql"
    }else if('Plain_text' == codigoFormato){
        extension = "txt"
    }
    console.log(extension)
      $("#formato_archivo").val(extension.toLowerCase())
      $("#lenguaje_archivo").val(codigoFormato.toLowerCase())
}