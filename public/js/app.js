//Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBr0cv9Am1FKElh7vdgny68GZRALIT62jg",
    authDomain: "instagram-web-97ac0.firebaseapp.com",
    databaseURL: "https://instagram-web-97ac0.firebaseio.com",
    projectId: "instagram-web-97ac0",
    storageBucket: "instagram-web-97ac0.appspot.com",
    messagingSenderId: "446298869599",
    appId: "1:446298869599:web:279dc4343f4929baaab0ea"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  // Registro de usuario en la aplicación
    function createUsers() {
        let nombreUsuario = document.getElementById('nombreUsuario');
        let apellidosUsuario = document.getElementById('apellidosUsuario');
        let emailUsuario = document.getElementById('emailUsuario');
        let passwordUsuario = document.getElementById('passwordUsuario');
        if (nombreUsuario.value == "" || apellidosUsuario.value == "" || emailUsuario.value == "" || passwordUsuario.value == "") {
          let titulo = document.getElementById("mensajeTitulo");
          let mensaje = document.getElementById("mensaje");
          titulo.innerHTML = `Error`;
          mensaje.innerHTML = `No puede dejar campos vacios`;
          $("#boxMesanjes").modal('show');
        }
        else if (passwordUsuario.value.length < 6) {
          let titulo = document.getElementById("mensajeTitulo");
          let mensaje = document.getElementById("mensaje");
          titulo.innerHTML = `Error`;
          mensaje.innerHTML = `La contraseña debe contener de 6 caracteres en adelante`;
          $("#boxMesanjes").modal('show');
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailUsuario.value, passwordUsuario.value).then(auth => {
            var id = auth.user.uid;

            db.collection("users").add({
                userId: id,
                userName: nombreUsuario.value,
                userLastName: apellidosUsuario.value,
                userEmail: emailUsuario.value,
                biography: "",
                photoProfile: "https://firebasestorage.googleapis.com/v0/b/instagram-web-97ac0.appspot.com/o/profile%2Fusers.png?alt=media&token=b9f152bf-b00e-4bff-8e8d-a76ce5aab957"
            })
            .then(function(docRef) {
                // console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              let titulo = document.getElementById("mensajeTitulo");
              let mensaje = document.getElementById("mensaje");
              titulo.innerHTML = `Error`;
              mensaje.innerHTML = `Ya existe un usuario con este correo o el usuario no es valido`;
              $("#boxMesanjes").modal('show');
            });
              let titulo = document.getElementById("mensajeTitulo");
              let mensaje = document.getElementById("mensaje");
              titulo.innerHTML = `Exito`;
              mensaje.innerHTML = `Bienvenido usuario registrado`;
              $("#boxMesanjes").modal('show');
            abrirPublicaciones();
            userActivo();
            }).catch(function(error) {
              let titulo = document.getElementById("mensajeTitulo");
              let mensaje = document.getElementById("mensaje");
              titulo.innerHTML = `Error`;
              mensaje.innerHTML = `El formato del correo no es valido`;
              $("#boxMesanjes").modal('show');
            });
        }
    }

    function clear() {
      let usuarioLogin = document.getElementById("usuarioLogin");
      let passwordLogin = document.getElementById("passwordLogin");
      let nombreUsuario = document.getElementById('nombreUsuario');
      let apellidosUsuario = document.getElementById('apellidosUsuario');
      let emailUsuario = document.getElementById('emailUsuario');
      let passwordUsuario = document.getElementById('passwordUsuario');
      let archivo = document.getElementById("inputGroupFile");
      let descripcion = document.getElementById("descripcion-image");
      usuarioLogin.value = '';
      passwordLogin.value = '';
      nombreUsuario.value = '';
      apellidosUsuario.value = '';
      emailUsuario.value = '';
      passwordUsuario.value = '';
      archivo.value = '';
      descripcion.value = '';

    }
    
    function abrirRegistrarse() {
      $(".content-registrarse").removeClass("d-none");
      $(".content-login").removeClass("d-block");
      $(".content-app").removeClass("d-block");
      $(".content-registrarse").addClass("d-block");
      $(".content-login").addClass("d-none");
      $(".content-app").addClass("d-none");
      clear();
    }

    function abrirLogin() {
      $(".content-registrarse").removeClass("d-block");
      $(".content-login").removeClass("d-none");
      $(".content-app").removeClass("d-block");
      $("#sectionConfig").removeClass("d-block");
      $(".content-registrarse").addClass("d-none");
      $(".content-login").addClass("d-block");
      $(".content-app").addClass("d-none");
      $("#sectionConfig").addClass("d-none");
      clear();
    }

    function abrirPublicaciones() {
        $(".content-registrarse").removeClass("d-block");
        $(".content-login").removeClass("d-block");
        $(".content-app").removeClass("d-none");
        $(".content-registrarse").addClass("d-none");
        $(".content-login").addClass("d-none");
        $(".content-app").addClass("d-block");
        abrirInicio();
        clear();
    }

    function abrirPerfil() {
      $("#sectionPublicaciones").removeClass("d-flex");
      $("#sectionPerfil").removeClass("d-none");
      $("#sectionConfig").removeClass("d-block");
      $("#sectionPublicaciones").addClass("d-none");
      $("#sectionPerfil").addClass("d-block");
      $("#sectionConfig").addClass("d-none");

      $("#Editar").removeClass("invisible");
      $("#Editar").addClass("visible");
      verPublicacionUsuario();
    }

    function abrirPerfilUsuario() {
      $("#sectionPublicaciones").removeClass("d-flex");
      $("#sectionPerfil").removeClass("d-none");
      $("#sectionConfig").removeClass("d-block");
      $("#sectionPublicaciones").addClass("d-none");
      $("#sectionPerfil").addClass("d-block");
      $("#sectionConfig").addClass("d-none");
      viewProfile();
    }

    function abrirInicio() {
      
      $("#sectionPublicaciones").removeClass("d-none");
      $("#sectionPerfil").removeClass("d-block");
      $("#sectionPublicaciones").addClass("d-flex");
      $("#sectionPerfil").addClass("d-none");
      $("#sectionConfig").addClass("d-none");
      $("#sectionConfig").removeClass("d-block");
      
    }

    function abrirConfig() {
      $("#sectionPublicaciones").removeClass("d-flex");
      $("#sectionConfig").removeClass("d-none");
      $("#sectionPerfil").removeClass("d-block");
      $("#sectionConfig").addClass("d-block");
      $("#sectionPerfil").addClass("d-none");
      $("#sectionPublicaciones").addClass("d-none");
    }

    //Acceder a cuenta ya existente
  function accessAccount() {
    let usuarioLogin = document.getElementById("usuarioLogin");
    let passwordLogin = document.getElementById("passwordLogin");
    firebase.auth().signInWithEmailAndPassword(usuarioLogin.value, passwordLogin.value).then(() => {
      abrirPublicaciones();
      userActivo();
    }).catch(function(error) {
      let titulo = document.getElementById("mensajeTitulo");
      let mensaje = document.getElementById("mensaje");
      titulo.innerHTML = `Error`;
      mensaje.innerHTML = `Correo o contraseña son incorrectos`;
      $("#boxMesanjes").modal('show');
    });
  }

  //Cerrar cuenta activa
  function closeAccount() {
    firebase.auth().signOut().then(function() {
      // alert("Cuenta cerrada");
      let usuario = document.getElementById("userSesion");
      let photoProfile = document.getElementById("photoProfile");
      let userName = document.getElementById("userName");
      let biografia = document.getElementById("biografia");
      let nombreConfig = document.getElementById("nombreConfig");
      let apellidosConfig = document.getElementById("apellidosConfig");
      let biografiaConfig = document.getElementById("biografiaConfig");
      let userConfigPerfil = document.getElementById("userConfigPerfil");
      let userConfigPass = document.getElementById("userConfigPass");
      let perfilFoto = document.getElementById("perfilFoto");
      let emailUsuario = document.getElementById("emailUsuario");
      let fotosPerfil = document.getElementById("fotosPerfil");

      photoProfile.src = '';
      perfilFoto.src = '';
      usuario.innerHTML ='';
      userName.innerHTML ='';
      biografia.innerHTML ='';
      emailUsuario.innerHTML = '';
      nombreConfig.value = '';
      apellidosConfig.value = '';
      biografiaConfig.value = '';
      userConfigPerfil.innerHTML = '';
      userConfigPass.innerHTML = '';
      fotosPerfil.innerHTML = '';
      abrirLogin();
    }).catch(function(error) {
      // An error happened.
    });
  }

  //Saber si el usuario esta activo o no
  function userActivo() {
    let usuario = document.getElementById("userSesion");
    let photoProfile = document.getElementById("photoProfile");
    let userName = document.getElementById("userName");
    let biografia = document.getElementById("biografia");
    let nombreConfig = document.getElementById("nombreConfig");
    let apellidosConfig = document.getElementById("apellidosConfig");
    let biografiaConfig = document.getElementById("biografiaConfig");
    let userConfigPerfil = document.getElementById("userConfigPerfil");
    let userConfigPass = document.getElementById("userConfigPass");
    let perfilFoto = document.getElementById("perfilFoto");
    let emailUsuario = document.getElementById("correoElectronico");
    let imgProfileConfirg = document.getElementById("imgProfileConfirg");
    let imgProfileConfirg2 = document.getElementById("imgProfileConfirg2");

    var user = firebase.auth().currentUser;
      if (user) {
        // console.log(user.uid);
        db.collection("users").where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                photoProfile.src = `${doc.data().photoProfile}`;
                perfilFoto.src = `${doc.data().photoProfile}`;
                usuario.innerHTML =`${doc.data().userName} ${doc.data().userLastName}`;
                userName.innerHTML =`${doc.data().userName} ${doc.data().userLastName}`;
                emailUsuario.innerHTML = `${doc.data().userEmail}`;
                biografia.innerHTML =`${doc.data().biography}`;
                nombreConfig.value = `${doc.data().userName}`;
                apellidosConfig.value = `${doc.data().userLastName}`;
                biografiaConfig.value = `${doc.data().biography}`;
                userConfigPerfil.innerHTML = `${doc.data().userName} ${doc.data().userLastName}`;
                userConfigPass.innerHTML = `${doc.data().userName} ${doc.data().userLastName}`;
                imgProfileConfirg.src = `${doc.data().photoProfile}`;
                imgProfileConfirg2.src = `${doc.data().photoProfile}`;
            });
        });
      } else {
        //console.log("No hay usuario");
      }
  }

  //Subir imagen desde la aplicación
  function addPicture() {
      const ref = firebase.storage().ref();
      const file = document.getElementById("inputGroupFile").files[0];
      const name = file.name;
      let userName = document.getElementById("userSesion").value;
      let descripcion = document.getElementById("descripcion-image").value;

      if (file == null) {
          alert("Debe seleccionar una imagen");
      }
      else {
        const metadata = {
            contentType: file.type
        }
        const task = ref.child("photos/"+ name).put(file, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL()).then( url => {
            // console.log(url);

            var user = firebase.auth().currentUser;
            let id = user.uid;
            let email = user.email;

            if (user) {
                db.collection("publications").add({
                    userId: id,
                    userEmail: email,
                    urlPhoto: url,
                    description: descripcion,
                    date: new Date()
                })
                .then(function(docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                  //   db.collection("publications").doc(docRef.id).collection("comentarios").add({
                  //     userId: id,
                  //     comentario: "hello"
                  // });
                    
                })
                .catch(function(error) {
                    // console.error("Error adding document: ", error);
                });
            } else {
                //console.log("Error");
            }
        })
        clear();
        $("#exampleModal").modal('hide');
        let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Exito`;
        mensaje.innerHTML = `La publicación fue subida con exito`;
        $("#boxMesanjes").modal('show');
      }
  }

  //Leer publicaciones
  (() => {
    let contentPublicacion = document.getElementById("contentPublicaciones");
    let comentario;
    db.collection("publications").orderBy("date", "desc").onSnapshot(function(querySnapshot) {
        contentPublicacion.innerHTML = '';
        querySnapshot.forEach(function(doc) {
            contentPublicacion.innerHTML += `
            <div class="card-deck mb-5 bg-white border">
            <div class="card bg-white">
                <div class="card-body">
                    <h5 class="card-title" id="usuarioPublicacion">${doc.data().userEmail}</h5>
                </div>
              <div class="imagenPost">
              
              <img src="${doc.data().urlPhoto}" id="" class="card-img-top" alt="..." style="max-width: 100%; width: auto; height: auto;">
              
              </div>
              <div class="card-body">
                <h3 class="card-title"><i class="far fa-heart"></i></h3>
                <p class="card-text" id="">100 Me gusta</p>
                <p class="card-text" id=""><span style="font-weight: bold;">${doc.data().userEmail} </span>${doc.data().description}</p>
                <div class="" style="height:115px; overflow-y: scroll;" id="${doc.id}">
                </div>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" name="${doc.id}" placeholder="Agregar un comentario..." aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append comentar">
                  <button class="btn btn-outline-secondary" type="button" value="${doc.id}" onClick="addComentario()">Publicar</button>
                </div>
              </div>
            </div>
          </div>
            `;
        });
    });
    db.collection("publications").orderBy("date", "desc").onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let contentComentario = document.getElementById(doc.id);
        db.collection("publications").doc(doc.id).collection("comentarios").orderBy("date", "desc").onSnapshot(function(querySnapshot) {
          contentComentario.innerHTML = '';
          querySnapshot.forEach(function(doc) {
            contentComentario.innerHTML += `<p class="card-text" id=""><span style="font-weight: bold;">${doc.data().userEmail} </span>${doc.data().comentario}</p>`;
            // console.log(doc.data().comentario);
          });
      });
      });
    });
      
  })();


  //Cargar publicaciones del usuario
  function verPublicacionUsuario() {
    var user = firebase.auth().currentUser;
    let fotosPerfil = document.getElementById("fotosPerfil");
    
    db.collection("publications").where("userId", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
      fotosPerfil.innerHTML = '';
        querySnapshot.forEach(function(doc) {
          fotosPerfil.innerHTML += `
            <div class="col mb-4 mt-4">
              <div class="card">
                <img src="${doc.data().urlPhoto}" id="${doc.id}" class="imagenPublicacion rounded" alt="..." height="250px" onClick="viewPost()">
                <div class="d-flex justify-content-around pt-2">
                <button type="button" class="btn btn-outline-secondary" value="${doc.id}" data-toggle="modal" data-target="#editarDescripcionPost" onClick="publicacionEditar()" >Editar <i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-outline-danger" value="${doc.id}" data-toggle="modal" data-target="#eliminarPost" onClick="publicacionEliminar()">Eliminar <i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
            `;
        });
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });
    userActivo();
  }

  //Editar fotos de perfil
  function editProfilePicture() {
    let nombreConfig = document.getElementById("nombreConfig");
    let apellidosConfig = document.getElementById("apellidosConfig");
    let biografiaConfig = document.getElementById("biografiaConfig");

    const ref = firebase.storage().ref();
    const file = document.getElementById("inputFotoPerfil").files[0];
    
      if (nombreConfig.value == ''|| apellidosConfig.value == '') {
        let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Error`;
        mensaje.innerHTML = `El nombre y los apellidos no pueden estar vacios`;
        $("#boxMesanjes").modal('show');
      }
      else if (file == null) {
        var user = firebase.auth().currentUser;
        if (user) {
          db.collection("users").where("userId", "==", user.uid)
          .onSnapshot((querySnapshot) => {
              querySnapshot.forEach(function(doc) {
              
                db.collection("users").doc(doc.id).update({
                  userName: nombreConfig.value,
                  userLastName: apellidosConfig.value,
                  biography: biografiaConfig.value
              })
              .then(function() {
                let titulo = document.getElementById("mensajeTitulo");
                let mensaje = document.getElementById("mensaje");
                titulo.innerHTML = `Exito`;
                mensaje.innerHTML = `Perfil actualizado`;
                $("#boxMesanjes").modal('show');
                abrirPerfil();
              });
              });
          });
        } else {
          // console.log("No hay usuario");
        }
        
      }
      else {
        const name = file.name;

        const metadata = {
            contentType: file.type
        }
        const task = ref.child("profile/"+ name).put(file, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL()).then( url => {

            var user = firebase.auth().currentUser;
            if (user) {
              db.collection("users").where("userId", "==", user.uid)
              .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach(function(doc) {
                  
                    db.collection("users").doc(doc.id).update({
                      userName: nombreConfig.value,
                      userLastName: apellidosConfig.value,
                      biography: biografiaConfig.value,
                      photoProfile: url
                  })
                  .then(function() {
                      //console.log("Document successfully updated!");
                      let titulo = document.getElementById("mensajeTitulo");
                      let mensaje = document.getElementById("mensaje");
                      titulo.innerHTML = `Exito`;
                      mensaje.innerHTML = `Perfil actualizado`;
                      $("#boxMesanjes").modal('show');
                      abrirPerfil();
                  });
                  });
              });
            } else {
              // console.log("No hay usuario");
            }
        });
        
      }
  }

  //Cambiar contraseña
  function newPasswoord() {
    var user = firebase.auth().currentUser;
    let newPassword = document.getElementById("inputPassword2");
    let newPassword2 = document.getElementById("inputPassword3");

    if (newPassword.value == newPassword2.value) {
      user.updatePassword(newPassword.value).then(function() {
        let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Exito`;
        mensaje.innerHTML = `Contraseña actualizada`;
        $("#boxMesanjes").modal('show');
        newPassword.value = '';
        newPassword2.value = '';
        abrirInicio();
      }).catch(function(error) {
        let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Error`;
        mensaje.innerHTML = `La contraseña debe tener numeros y letras`;
        $("#boxMesanjes").modal('show');
      });
    }
    else{
      let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Error`;
        mensaje.innerHTML = `Las contraseñas no coinciden`;
        $("#boxMesanjes").modal('show');
      newPassword.value = '';
      newPassword2.value = '';
      newPassword.focus();
    }
  }

//Ver perfil de otro usuario
function viewProfile() {

  let userName = document.getElementById("userName");
  let biografia = document.getElementById("biografia");
  let perfilFoto = document.getElementById("perfilFoto");
  let emailUsuario = document.getElementById("correoElectronico");
  let perfilBuscar = document.getElementById("buscarUsuario");
  let fotosPerfil = document.getElementById("fotosPerfil");

  $("#Editar").removeClass("visible");
  $("#Editar").addClass("invisible");
  perfilFoto.src = ``;
  userName.innerHTML =``;
  biografia.innerHTML =``;
  emailUsuario.innerHTML = ``;
  fotosPerfil.innerHTML = ``;

      db.collection("users").where("userEmail", "==", perfilBuscar.value)
      .onSnapshot((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
              perfilFoto.src = `${doc.data().photoProfile}`;
              userName.innerHTML =`${doc.data().userName} ${doc.data().userLastName}`;
              biografia.innerHTML =`${doc.data().biography}`;
              emailUsuario.innerHTML = `${doc.data().userEmail}`;
          });
      });

    db.collection("publications").where("userEmail", "==", perfilBuscar.value)
    .get()
    .then(function(querySnapshot) {
      fotosPerfil.innerHTML = '';
        querySnapshot.forEach(function(doc) {
          fotosPerfil.innerHTML += `
            <div class="col mb-4 mt-4">
              <div class="card">
                <img src="${doc.data().urlPhoto}" id="${doc.id}" class="imagenPublicacion" alt="..." height="250px" onClick="viewPost()">
              </div>
            </div>
            `;
        });
    })
    .catch(function(error) {
        // alert("Usuario no existe");
    });
    perfilBuscar.value = '';
}

//Olvide mi contraseña
function olvidePassword() {
  let usuarioLogin = document.getElementById("usuarioLogin");
  if (usuarioLogin.value == '') {
    let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Error`;
        mensaje.innerHTML = `Debe poner su correo electronico`;
        $("#boxMesanjes").modal('show');
  }
  else {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(usuarioLogin.value).then(function() {
      let titulo = document.getElementById("mensajeTitulo");
        let mensaje = document.getElementById("mensaje");
        titulo.innerHTML = `Información`;
        mensaje.innerHTML = `Revise su correo electronico`;
        $("#boxMesanjes").modal('show');
    }).catch(function(error) {
      
    });
  }
}

//Comentar
function addComentario() {
  var user = firebase.auth().currentUser;
  let email = user.email;
  let publicacion = event.target.value;
  let comentario = document.querySelector("input[name="+publicacion);

  if (user) {
      db.collection("publications").doc(publicacion).collection("comentarios").add({
          idPublicacion: publicacion,
          userEmail: email,
          comentario: comentario.value,
          date: new Date()
      });
  }
  comentario.value= '';   
}

//ver Post Perfil
function viewPost() {
  let imagenSeleccionada = event.target.id;
  let picturePost = document.getElementById("picturePost");
  let usuarioPost = document.getElementById("usuarioPost");
  let descripcionPost = document.getElementById("descripcionPost");
  let btnComentarPost = document.getElementById("btnComentarPost");
   
  db.collection("publications").doc(imagenSeleccionada)
    .get()
    .then(function(doc) {
      btnComentarPost.value = imagenSeleccionada;
      usuarioPost.innerHTML = `${doc.data().userEmail}`;
      descripcionPost.innerHTML = `${doc.data().description}`;
      picturePost.src = `${doc.data().urlPhoto}`;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  $("#postPerfil").modal("show");
  verComentariosPerfil(imagenSeleccionada);
  usuarioPost.innerHTML = ``;
  descripcionPost.innerHTML = ``;
  picturePost.src = ``;

}

//Ver comentarios Post
function verComentariosPerfil(imagenSeleccionada) {

  
  let comentarioPost = document.getElementById("postComentarios");

  db.collection("publications").doc(imagenSeleccionada).collection("comentarios").orderBy("date", "desc")
  .get()
  .then(function(querySnapshot) {
    comentarioPost.innerHTML = ``;
    querySnapshot.forEach(function(doc) {
      comentarioPost.innerHTML += `<p class="card-text" id=""><span style="font-weight: bold;">${doc.data().userEmail} </span>${doc.data().comentario}</p>`;
    });
});
}

function addComentarioPost() {
  var user = firebase.auth().currentUser;
  let email = user.email;
  let publicacion = event.target.value;
  let comentario = document.getElementById("textComentarioPost");

  if (user) {
      db.collection("publications").doc(publicacion).collection("comentarios").add({
          idPublicacion: publicacion,
          userEmail: email,
          comentario: comentario.value,
          date: new Date()
      });
  }
  comentario.value= '';
  verComentariosPerfil(publicacion);
}

//Editar publicación
function publicacionEditar() {
  let publicacion = event.target.value;
  let confirmarActualizar = document.getElementById("actualizarPost");
  let descripcionActualizar = document.getElementById("descripcionActualizar");
  confirmarActualizar.value = publicacion;
    db.collection("publications").doc(publicacion)
    .get()
    .then(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            descripcionActualizar.value = `${doc.data().description}`;
      });
}

function editarPublicacion() {
  let publicacion = event.target.value;
  let descripcionActualizar = document.getElementById("descripcionActualizar");

  db.collection("publications").doc(publicacion).update({
    description: descripcionActualizar.value
  })
  .then(function() {
    let titulo = document.getElementById("mensajeTitulo");
    let mensaje = document.getElementById("mensaje");
    titulo.innerHTML = `Exito`;
    mensaje.innerHTML = `Publicación actualizada`;
    $("#boxMesanjes").modal('show');
    abrirPerfil();
  });
  
  $("#editarDescripcionPost").modal("hide");
  verPublicacionUsuario();
}

//Eliminar foto de perfil
function eliminarFoto() {
  var user = firebase.auth().currentUser;
  
  if (user) {
    db.collection("users").where("userId", "==", user.uid)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
                  
          db.collection("users").doc(doc.id).update({
          photoProfile: "https://firebasestorage.googleapis.com/v0/b/instagram-web-97ac0.appspot.com/o/profile%2Fusers.png?alt=media&token=b9f152bf-b00e-4bff-8e8d-a76ce5aab957"
        })
        .then(function() {
          let titulo = document.getElementById("mensajeTitulo");
          let mensaje = document.getElementById("mensaje");
          titulo.innerHTML = `Información`;
          mensaje.innerHTML = `Foto Eliminada`;
          $("#boxMesanjes").modal('show');
        });
        });
    });
  } else {
    // console.log("No hay usuario");
  }
}

//Eliminar publicación
function publicacionEliminar() {
  let publicacion = event.target.value;
  let confirmarEliminar = document.getElementById("confirmarEliminar");

  confirmarEliminar.value = publicacion;
}

function eliminarPublicacion() {
  let publicacion = event.target.value;

  db.collection("publications").doc(publicacion).delete().then(function() {
    // console.log("Document successfully deleted!");
    let titulo = document.getElementById("mensajeTitulo");
    let mensaje = document.getElementById("mensaje");
    titulo.innerHTML = `Exito`;
    mensaje.innerHTML = `Publicación eliminada`;
    $("#boxMesanjes").modal('show');
    abrirPerfil();
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  $("#eliminarPost").modal("hide");
  verPublicacionUsuario();

}

