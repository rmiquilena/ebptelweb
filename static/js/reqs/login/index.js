/*const btn = document.getElementById('btologin')
if (btn) {
    // Not called
    btn.addEventListener('click', () => {
        
        var vacio  = "Debe llenar el campo vacio";
        var enviar = true;

        if(!validar_campo('username', 'Código Empleado', vacio))enviar=false;
        if(!validar_campo('password', 'Password Empleado', vacio))enviar=false;
        
        if (enviar === true) {

            const formElement = document.getElementById("formlogin")
            const data = new URLSearchParams()
            for (const pair of new FormData(formElement)) {
                data.append(pair[0], pair[1])
            }

            fetch('/acceso/', {
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
}*/



