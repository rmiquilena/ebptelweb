window.addEventListener('load', function () {

   // BUSQUEDA DE PRODUCTOS DE USUARIOS

    fetch('search/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': getCookie('csrftoken'),
        }
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                if (data.length > 0){
                    
                }
            })
        }
    })
})



//----------------VALIDACION DE CAMPOS Y COMBOS--------------

/*var pattern = /\d/,
    cedu = document.getElementById("incedula");

    cedu.addEventListener("keypress", function(e){
    if (this.value.length === 0 && (!(/(E|V)/).test(String.fromCharCode(e.keyCode))))
        e.preventDefault();
    if (this.value.length > 0 && (!pattern.test(String.fromCharCode(e.keyCode)) || this.value.length == 10))
        e.preventDefault();
    if (this.value.length === 1)
        this.value += "-";
}, false);


const btn = document.getElementById('btologin');
if (btn) {

    btn.addEventListener('click', () => {
        var vacio  = "Debe llenar el campo vacio";
        var enviar = true;

        if(!validar_campo('username', 'Campo Usuario Vacio', vacio))enviar=false; 

        if (enviar === true) {

            fetch('/accounts/login/', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*', 
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: data
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if(data.code == 401){
                            notification('Login', data.mensajes, 'error')
                        }else{
                            window.location = data.url
                        }
                    })
                }
            })

        }
    })
}

async function addregister(){

    var vacio  = "Debe llenar el campo vacio";
    var enviar = true;

    if(!validar_campo('incedula',  'Cédula', vacio))enviar=false;
    if(!validar_campo('innombre',  'Nombre', vacio))enviar=false;
    if(!validar_campo('incodem',   'Código Empleado', vacio))enviar=false;
    if(!validar_campo('intelf',   'Teléfono Empleado', vacio))enviar=false;
    if(!validar_campo('inemails',  'Correo Electrónico', vacio))enviar=false;
    if(!validar_campo('ingerencia','Gerencias', vacio))enviar=false;

    if (enviar === true) {

        let data = JSON.stringify({
        
            cedula: document.getElementById("incedula").value,
            nombre: document.getElementById("innombre").value,
            codemp: document.getElementById("incodem").value,
            telemp: document.getElementById("intelf").value,
            correo: document.getElementById("inemails").value,
            gerenc: document.getElementById("ingerencia").value,
        })

        await fetch('register/', {
            method:'POST',
            credentials: "same-origin",
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'X-Requested-With':'XMLHttpRequest',
            },
            body: data
        })
        .then((response) => {

            if (response.ok) { 
                return response.json();
            }
        })
        .then(rs => {
            console.log(rs)
            //notificationConfirm('¿Desea guardar los cambios?', rs.mensajes, 'success')
        })
        .catch(error => {
            console.log('Algo salió mal==>', error) 
        })

    }
}*/