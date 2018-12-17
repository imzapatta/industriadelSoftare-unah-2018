 /////////////////////////////////////////
            //Servidor web en nodeJS para publicar archivos estaticos.
            var express = require("express");           ////carga modulo de express
            var bodyParser = require("body-parser");    ////carga modulo de body-parse
            var mysql = require("mysql");               ////carga modulo de mysql
            var session = require("express-session");   ////carga modulo de sessiones
            var cookieParser = require("cookie-parser");////carga modulo de cookies
            var app = express();                        ////variable para uso de servidor

            

//////////////////////////////variable para base de datos////////////////////////////
            var credenciales = {
                user:"admin_root",
                password:"rootstrong",
                port:"3306",
                host:"localhost",
                database:"admin_gedit"
            };

            //Exponer una carpeta como publica, unicamente para archivos estaticos: .html, imagenes, .css, .js
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:true}));
            app.use(express.static("public")); //Middlewares
            app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
            app.use(cookieParser());
            /////////////////////////////////////////exponer las carpetas publicas /////////////////////////////////////////////////////////
           //Verificar si existe una variable de sesion para poner publica la carpeta public admin
           // var public = express.static("public");
            var publicHome = express.static("home");

            app.use(
                function(peticion,respuesta,next){
                    if (peticion.session.correo){
                        //Significa que el usuario si esta logueado
                        //publicHome(peticion,respuesta,next); 
                        app.use(publicHome);
                        return next();
                        //console.log(data);       
                    }
                    else
                        //public(peticion,respuesta,next);
                        return next();
                }
            );

           /////////////////////////////////////////agregar un nuevo usuario /////////////////////////////////////////////////////////
            app.post("/registrar", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'INSERT INTO tbl_usuarios(nombre, apellido,correo_electronico,contraseña,	fecha_nacimiento) VALUES (?,?,?,?,?)';
                conexion.query(
                    sql,
                    [request.body.nombre, 
                    request.body.apellido,
                    request.body.correo,
                    request.body.contraseña,
                    request.body.nacimiento
                    ],
                    function(err, result){
 
                        if (err) throw err;
                        response.send(result);
                    }    
                );
            });

            /////////////////////////////////////////editar archivos/////////////////////////////////////////////////////////
            app.get("/fuente",function(Request,response){              
                var conexion =mysql.createConnection(credenciales);
                var sql ='SELECT * FROM tbl_archivos WHERE codigo_archivo=?';
                var usuarios=[];
                conexion.query(sql,
                    [Request.cookies.codigo])
                .on("result",function(resultado){
                    usuarios.push(resultado);
                })
                .on("end",function(){
                    response.send(usuarios);
                });
            });

            /////////////////////////////////////////cargar planes/////////////////////////////////////////////////////////
            app.get("/planes",function(Request,response){
                console.log("llegando a planes")
                var conexion =mysql.createConnection(credenciales);
                var sql ='SELECT * from tbl_planes';
                var plan=[];
                conexion.query(sql)
                .on("result",function(resultado){
                    plan.push(resultado);
                })
                .on("end",function(){
                    response.send(plan);
                });
            });
            /////////////////////////////////////////cargar archivos/////////////////////////////////////////////////////////
            app.get("/mostrar_archivos_disponibles",function(Request,response){
                console.log("llegando a archivos")
                var conexion =mysql.createConnection(credenciales);
                var sql ='SELECT * from tbl_archivos WHERE (Codigo_usuario=? AND archivo_eliminado is null)';
                var archivo=[];
                conexion.query(sql,
                [Request.query.usuario]
            )
                .on("result",function(resultado){
                    archivo.push(resultado);
                })
                .on("end",function(){
                    response.send(archivo);
                });
            });

             /////////////////////////////////////////cargar archivos borrados/////////////////////////////////////////////////////////
             app.get("/mostrar_archivos_borrados",function(Request,response){
                console.log("llegando a archivos")
                var conexion =mysql.createConnection(credenciales);
                var sql ='SELECT * from tbl_archivos WHERE (Codigo_usuario=? AND archivo_eliminado is null)';
                var arc=[];
                conexion.query(sql,
                [Request.query.usuario]
            )
                .on("result",function(resultado){
                    arc.push(resultado);
                })
                .on("end",function(){
                    response.send(arc);
                });
            });

            /////////////////////////////////////////cargar archivos borrados/////////////////////////////////////////////////////////
            app.get("/mostrar_carpetas_borrados",function(Request,response){
                console.log("llegando a archivos")
                var conexion =mysql.createConnection(credenciales);
                var sql ='SELECT * from tbl_carpetas WHERE (Codigo_usuario=? AND carpeta_eliminada is null)';
                var arc=[];
                conexion.query(sql,
                [Request.query.usuario]
            )
                .on("result",function(resultado){
                    arc.push(resultado);
                })
                .on("end",function(){
                    response.send(arc);
                });
            });
            /////////////////////////////////////////insertar planes/////////////////////////////////////////////////////////
            app.post("/insertar", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'UPDATE tbl_usuarios SET Codigo_plan=? WHERE Codigo_usuario=?';
                console.log("codigo plan: " + request.body.codigo_plan);
                console.log("codigo usuario: " + request.body.usuario);
                conexion.query(
                    sql,
                    [
                    request.body.codigo_plan,
                    request.body.usuario
                    ],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });

            /////////////////////////////////////////delete archivo/////////////////////////////////////////////////////////
            app.post("/daletearchivo", function(request, response){
                console.log("codigo archivo para eliminar" + request.body.archivo);
                var conexion = mysql.createConnection(credenciales);
                var sql = 'UPDATE tbl_archivos SET archivo_eliminado=1 WHERE (Codigo_usuario=? AND Codigo_archivo=?)';
                conexion.query(
                    sql,
                    [
                    request.body.usuario,
                    request.body.archivo
                    ],
                    function(err, result){
                        if (err) throw err;
                         response.send(result);
                    }
                ); 
            });

           /////////////////////////////////////////delete carpeta/////////////////////////////////////////////////////////
           app.post("/deletecarpeta", function(request, response){
            console.log("codigo carpeta para eliminar" + request.body.carpeta);
            var conexion = mysql.createConnection(credenciales);
            var sql = 'UPDATE tbl_carpetas SET carpeta_eliminada=1 WHERE (Codigo_usuario=? AND Codigo_carpeta=?)';
            conexion.query(
                sql,
                [
                request.body.usuario,
                request.body.carpeta
                
                ],
                function(err, result){
                    if (err) throw err;
                    response.send(result);
                }
            ); 
        });
       
            /////////////////////////////////////////insertar planes/////////////////////////////////////////////////////////
            app.post("/crearfavoritos", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'UPDATE tbl_archivos SET archivo_favorito=1 WHERE (Codigo_usuario=? AND Codigo_Archivo=?)';
                console.log("bienvenido");
                console.log("codigo archivo: " + request.body.archivo);
                console.log("codigo usuario: " + request.body.usuario);
                conexion.query(
                    sql,
                    [     
                    request.body.usuario,          
                    request.body.archivo
                    
                    ],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });


             /////////////////////////////////////////insertar archivos/////////////////////////////////////////////////////////
             app.post("/insertararchivos", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'INSERT INTO `tbl_archivos`( Codigo_Archivo , Nombre, Extension_Archivo, Codigo_usuario, Fecha_creacion,Fecha_Ultima_edicion,Contenido_Archivo, Lenguaje_Archivo) VALUES (?,?,?,?,?,?,?,?)';
                conexion.query(
                    sql,
                    [
                    request.body.codigo_archivo,
                    request.body.nombre_archivo,
                    request.body.formato_archivo,
                    request.body.usuario,
                    "13/12/18",
                    "13/12/18",
                    " ",
                    request.body.lenguaje_archivo
                    ],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });

            /////////////////////////////////////////insertar carpetas/////////////////////////////////////////////////////////
            app.post("/insertarcarpetas", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'INSERT INTO tbl_carpetas ( Codigo_carpeta , Nombre, Codigo_usuario) VALUES (?,?,?)';
                conexion.query(
                    sql,
                    [
                    request.body.codigo_carpeta,
                    request.body.nombre_carpeta,
                    request.body.usuario
                    ],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });
             /////////////////////////////////////////contar archivos/////////////////////////////////////////////////////////
             app.post("/contarcampos", function(request, response){
                 console.log("llegando para contar");
                var conexion = mysql.createConnection(credenciales);
                var sql = 'select * from tbl_archivos';
                conexion.query(sql,
                    function(err, data, fields){
                        if (data.length>0){
                            
                            console.log(data)
                            response.send(data); 
                        }
                 }
                ); 
            });
            /////////////////////////////////////////contar carpetas/////////////////////////////////////////////////////////
            app.post("/contarcarpetas", function(request, response){
                console.log("llegando para contar");
            var conexion = mysql.createConnection(credenciales);
            var sql = 'select * from tbl_carpetas';
            conexion.query(sql,
                function(err, data, fields){
                    if (data.length>0){
                        
                        console.log(data)
                        response.send(data); 
                    }
                }
            ); 
            });
                /////////////////////////////////////////guardar cambios/////////////////////////////////////////////////////////
                app.post("/guardarcambios", function(request, response){
                    var conexion = mysql.createConnection(credenciales);
                    var sql = 'UPDATE tbl_archivos SET Contenido_Archivo=? WHERE Codigo_Archivo=?';
                    conexion.query(
                        sql,
                        [
                        request.body.Contenido_Archivo,
                        request.cookies.codigo
                        ],
                        function(err, result){
                            if (err) throw err;
                            response.send(result);
                            console.log("datos: " + request.body.Contenido_Archivo );
                            console.log("codigo archivo: " + request.cookies.codigo );
                        }
                    ); 
                });
            /////////////////////////////////////////cargar archivos/////////////////////////////////////////////////////////
            app.post("/cargarachivo", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'SELECT * FROM tbl_archivos WHERE (Codigo_usuario=? AND archivo_eliminado is null)';
                conexion.query(
                    sql,
                    [   request.body.codigo_usuario,
                        request.cookies.codigo
                    ],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });
           
            /////////////////////////////////////////cargar carpetas/////////////////////////////////////////////////////////
            app.post("/cargarcarpetas", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'SELECT * FROM tbl_carpetas WHERE (Codigo_usuario=? AND carpeta_eliminada is null)';
                conexion.query(
                    sql,
                    [request.body.codigo_usuario],
                    function(err, result){
                        if (err) throw err;
                        response.send(result);
                        console.log(result);
                    }
                ); 
            });
  
                 /////////////////////////////////////////cargar favoritos/////////////////////////////////////////////////////////
                 app.post("/cargarfavoritos", function(request, response){
                     var dato=1;
                    var conexion = mysql.createConnection(credenciales);
                    var sql = 'SELECT * FROM tbl_archivos WHERE (Codigo_usuario=? AND archivo_favorito=1 AND archivo_eliminado is null)';
                    conexion.query(
                        sql,
                        [request.body.codigo_usuario
                        ],
                        function(err, result){
                            if (err) throw err;
                            response.send(result);
                            console.log(result);
                        }
                    ); 
                });
                /////////////////////////////////////////cargar papelera/////////////////////////////////////////////////////////
                app.post("/cargarpapeleria", function(request, response){
                    var dato=1;
                   var conexion = mysql.createConnection(credenciales);
                   var sql = 'SELECT * FROM tbl_archivos WHERE (Codigo_usuario=?  AND archivo_eliminado=1)';
                   conexion.query(
                       sql,
                       [request.body.codigo_usuario
                       ],
                       function(err, result){
                           if (err) throw err;
                           response.send(result);
                           console.log(result);
                       }
                   ); 
               });
                      
                   
            /////////////////////////////////////////extraer archivos/////////////////////////////////////////////////////////
            app.post("/extraer-archivo", function(peticion, respuesta){
            respuesta.cookie("codigo", peticion.body.codigo_archivo);
            respuesta.send({mensaje:"Se guardo la cookie"});
            });

            /////////////////////////////////////////extraer archivos/////////////////////////////////////////////////////////
            app.post("/extraer-carpeta", function(peticion, respuesta){
                respuesta.cookie("codigo_carpeta", peticion.body.codigo_carpeta);
                respuesta.send({mensaje:"Se guardo la cookie"});
                });
    
            ///////////////////////////////////////// login  /////////////////////////////////////////////////////////
            app.post("/login", function(peticion, respuesta){
                var conexion = mysql.createConnection(credenciales); 
                conexion.query("SELECT codigo_usuario, correo_electronico, contraseña FROM tbl_usuarios WHERE correo_electronico=? and contraseña=?",
                    [   peticion.body.correo, 
                        peticion.body.contraseña
                    ],
                    function(err, data, fields){
                            if (data.length>0){
                                peticion.session.correo = data[0].correo_electronico;
                                peticion.session.contraseña = data[0].contraseña;
                                peticion.session.codigo_usuario=data[0].codigo_usuario;
                                data[0].estatus = 0;
                                respuesta.send(data[0]); 
                            }else{
                                respuesta.send({estatus:1, mensaje: "Login fallido"}); 
                            }	
                     }
                ); 
            });
///////////////////////////////////////// obtener codigo  /////////////////////////////////////////////////////////
            app.get("/obtenercodigo", function(peticion, respuesta){
                console.log("este es el codigo de usuario" + peticion.session.codigo_usuario);
                respuesta.send({codigo_usuario:peticion.session.codigo_usuario});
                    });
 ///////////////////////////////////////// obtener codigo  /////////////////////////////////////////////////////////
            app.get("/obtenercodigo_a", function(peticion, respuesta){
                console.log("este es el codigo de usuario" + peticion.session.codigo_usuario);
                respuesta.send({codigo_usuario:peticion.session.codigo_usuario});
                    });  
 ///////////////////////////////////////// obtener codigo  /////////////////////////////////////////////////////////
            app.get("/obtenercodigo_c", function(peticion, respuesta){
                console.log("este es el codigo de usuario" + peticion.session.codigo_usuario);
                respuesta.send({codigo_usuario:peticion.session.codigo_usuario});
                    });                                     
                            
 ///////////////////////////////////////// obtener codigo  /////////////////////////////////////////////////////////
            app.get("/obtenercodigo_papelera", function(peticion, respuesta){
                console.log("este es el codigo de usuario" + peticion.session.codigo_usuario);
                respuesta.send({codigo_usuario:peticion.session.codigo_usuario});
                    });                                     
                     
///////////////////////////////////////// eliminar cuenta  /////////////////////////////////////////////////////////
            
            app.post("/eliminar", function(request, response){
                var conexion = mysql.createConnection(credenciales);
                var sql = 'DELETE FROM tbl_usuarios WHERE codigo_usuario = ?';
                conexion.query(
                    sql,
                    [  
                        request.body.codigo_usuario                
                    ],              
                    function(err, result){
                        console.log("probando eiminar");
                        console.log(request.body.codigo_usuario);
                        if (err) throw err;
                        response.send(result);
                    }
                ); 
            });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            app.get("/logout",function(peticion, respuesta){
                peticion.session.destroy();
                respuesta.redirect("index.html");
                //respuesta.send("Sesion eliminada");
                //app.use(express.removeStatic("home"));
            });

            //Crear y levantar el servidor web.
            app.listen(3333);
            console.log("Servidor iniciado");
            ////////////////////////////////////////