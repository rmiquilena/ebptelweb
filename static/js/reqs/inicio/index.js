window.addEventListener('load', function () {

    // BUSQUEDA DE PRODUCTOS SEGUN RANGO ASIGNADO
    
    let rango = this.document.getElementById('IdRango').value;
    
    fetch('search/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({'RangoId': rango})
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                if (data.length > 0){
                    data.forEach(val => {
                        let name = val.nombre.substring(0, 15);
                        let name2 = val.nombre.substring(15, 35);
                        
                        var ul = document.getElementById("viewProducts")
                        const li = document.createElement("div")

                        if (val.existe <= val.stockm){
                            _btonExis = '<p class="font-weight-light"style="color:#FF0000";> No Disponible</p>';
                            _btonacti = '<button id="IdSolicita" type="button" class="btn btn-lg rounded-pill" style="background-color: #6C757D; color: #FFF" disabled>Solicitar</button><br><br></br>';
                        }else{
                            _btonExis =  '<p class="font-weight-light"style="color:#005c00";> Disponible: '+ val.existe + '</p>'; 
                            _btonacti = '<button id="IdSolicita" type="button" value="'+val.producto_id_id+'"class="btn btn-lg rounded-pill" style="background-color: #0D99FF; color: #FFF" onclick="ViewProdcts(this.value);">Solicitar</button><br><br></br>';
                        } 


                        if (val.images == "" || val.images == "N/A"){
                            
                            li.className = 'grid-bton';
                            li.innerHTML = '<img src="/static/images/noimage.png" alt="No Image" class="imagenos"/>';

                        }else{

                            li.className += 'col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center imagendiv'
                            li.innerHTML += '<img src="'+val.images+'" alt="'+val.images+'" class="img-fluid w-50"/>'
                            li.innerHTML += '<p class="h4"><br>'+name+'<br>'+name2+'</p>'
                            li.innerHTML += '<h2><b>$'+ val.pricec+'.00</b></h2>'
                            li.innerHTML += '<p class="font-weight-light">Luego del primer mes pagarás <mark><b> $12.91 </b></mark><br> mensuales por 12 meses.</p>'
                            li.innerHTML += _btonExis
                            li.innerHTML += _btonacti

                            
                        }
                        ul.appendChild(li)


                    })
                }
            })
        }
    })
})

function ViewProdcts(id){

    fetch('details/'+id+'/', {
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
                    data.forEach(val => {
                        
                        document.getElementById('listview').style.display = "none"
                        document.getElementById("detailsview").style.display = "block";


                        if (val.images === "N/A" || val.images === ""){
                            images = '<img src="/static/images/noimage.png" alt="No Image"/>'
                        }
                        else
                        {
                            
                            BlockProdcts(val.producto_id_id, "b")
                            tdown();
                            document.getElementById('imageProd').innerHTML = '<img src="' + val.images + '" alt="' + val.images + '"class="img-fluid w-75 "/>'
                            document.getElementById('titleProd').innerHTML = val.nombre;
                            document.getElementById('priceProd').innerHTML = '<strong>$'+val.pricec+'.00</strong></b>'
                            document.getElementById('descripProd').innerHTML = val.descripcion
                            
                        }

                    })
                }
            })
        }
    })
}

function atras(){

    window.history.go(-1);
    BlockProdcts(val.producto_id_id, "b")
}


function BlockProdcts(id, acc){

    fetch('blockdes/',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({'id': id, 'acc': acc})
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log("INFO==>", data)
            })      
        }
    })
    .catch(err => console.log(err))
    
}

function tdown(){

    var timeLimitInMinutes = 10;
var timeLimitInSeconds = timeLimitInMinutes * 60;
var timerElement = document.getElementById('countdown');

function startTimer() {
    timeLimitInSeconds--;
    var minutes = Math.floor(timeLimitInSeconds / 60);
    var seconds = timeLimitInSeconds % 60;

    if (timeLimitInSeconds < 0) {
        timerElement.textContent = '00:00';
        clearInterval(timerInterval);
        return;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    timerElement.textContent ="Tiempo de compra: "+ minutes + ':' + seconds;
}

var timerInterval = setInterval(startTimer, 1000);
    
    /*var timeleft = 180;
    var timeminu = timeleft/60;

    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Finished";
    } else {
        document.getElementById("countdown").innerHTML = timeminu+":"+timeleft + " seconds remaining";
    }
    timeleft -= 1;
    }, 1000);*/
}

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