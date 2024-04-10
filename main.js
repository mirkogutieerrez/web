class Pacient {
    constructor(rut,name, lastName, address, city, phone, email, birthDay, maritalStatus, coment) {
        this.rut = rut;
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.email = email;
        this.birthDay = birthDay;
        this.maritalStatus = maritalStatus;
        this.coment = coment;
    }
}


let pacients = [];

const rutElement = document.getElementById('txtRut');
const phoneElement = document.getElementById('txtFono');
const emailElemet = document.getElementById('txtEmail');

emailElemet.addEventListener('change', function(event){

    let emailValue = event.target.value;
    if (!validateEmail(emailValue)) {
        alert('El formato del correo electrónico no es válido.');
        // Limpia el campo de entrada
        event.target.value = '';
    }


})

function validateEmail(email) {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}





phoneElement.addEventListener('input', function(event) {

    
    
    let valorInput = event.target.value;
    

    event.target.value = valorInput.replace(/\D/g, '');
});

rutElement.addEventListener('input', function (event) {
    var valorInput = event.target.value;
    event.target.value = valorInput.replace(/[^\dkK]/g, '');
});

rutElement.addEventListener('change', function (event) {

    let inputValue = event.target.value;
    let verify = calculateVerify(inputValue);
    let vrut = getVrut(inputValue);

    if (verify != vrut) {
        alert('Rut Incorrecto')
    } else {
        
      
        if(findByRut(inputValue)===undefined){
            enableForm();
            rutElement.disabled = true;

        }else{
            let pacient = findByRut(inputValue);
            rutElement.disabled = true;
            enableForm();
            showPacient(pacient);
        }
       
    }
})



function allValues() {

    let formElement = document.getElementById("frmRegistro");
    let inputs = formElement.children;

    let values = [];

    for (let i = 0; i <= inputs.length - 1; i++) {
        if (i % 2 === 0) {
            let id = inputs[i + 1].id;
            let value = getValue(id);
            values.push(value);
        }
    }
    return values;
}

function getValue(element) {

    let value = document.getElementById(element).value;
    return value;
}

function setValue(element,value) {

    document.getElementById(element).value = value;
   
}


function loadData() {

    let values = allValues()

    if (values.some(value => value === '')) {
        alert('Debe ingresar todos los valores');
        return;
    }

    

    let rut = values[0];
    let name = values[1];
    let lastName = values[2];
    let address = values[3];
    let city = values[4];
    let phone = values[5];
    let email = values[6];
    let birthDay = values[7];
    let maritalStatus = values[8];
    let coment = values[9];


    let vrut = getVrut(rut);



    const pacient = new Pacient(rut,  name, lastName, address, city, phone, email, birthDay, maritalStatus, coment);
 
        addPacient(pacient);
        clearForm();
        enableElement('txtRut');
        disableForm();
        console.log(pacients);

}


function getVrut(rutText) {

    let vRut = rutText.substring(rutText.length - 1);

    return vRut;
}


function calculateVerify(rut) {

    const arrayCaracteres = rut.split('');
    const values = [];

    for (i = arrayCaracteres.length - 2, j = 2; i >= 0; i--, j++) {
        var value = parseInt(arrayCaracteres[i]);
        values.push(value * j);

        if (j == 7) {
            j = 1;
        }
    }

    let total = values.reduce((acumulador, currentValue) => acumulador + currentValue);

    return 11 - (total % 11);

}

function enableForm() {

    let formElement = document.getElementById("frmRegistro");

    let inputs = formElement.children;

    for (let i = 1; i <= inputs.length - 1; i++) {
        if (i % 2 === 0) {
            let id = inputs[i + 1].id;
            enableElement(id);
        }
    }
}

function disableForm() {

    let formElement = document.getElementById("frmRegistro");

    let inputs = formElement.children;

    for (let i = 1; i <= inputs.length - 1; i++) {
        if (i % 2 === 0) {
            let id = inputs[i + 1].id;
            disableElement(id);
        }
    }
}

function clearForm() {

    let formElement = document.getElementById("frmRegistro");

    let inputs = formElement.children;

    for (let i = 0; i <= inputs.length - 1; i++) {
        if (i % 2 === 0) {
            let id = inputs[i + 1].id;
            clearElement(id);
        }
    }
}

function enableElement(element) {

    document.getElementById(element).disabled = false;
}


function disableElement(element) {

    document.getElementById(element).disabled = true;
}


function clearElement(element){

   document.getElementById(element).value='';

}

function addPacient(pacient) {

    const existingPacientIndex = pacients.findIndex(item => item.rut === pacient.rut);

    if (existingPacientIndex !== -1) {
        // El paciente ya existe, actualiza sus valores
        pacients[existingPacientIndex] = pacient;
    } else {
        // El paciente no existe, agrégalo al arreglo
        pacients.push(pacient);
    }
}

function findByRut(rutText){

    
    var finded = pacients.find(item => item.rut == rutText);

    return finded;

}

function showPacient(pacient){

   document.getElementById("txtNombre").value = pacient.name;
   document.getElementById("txtApellido").value = pacient.lastName;
   document.getElementById("txtDirec").value = pacient.address;
   document.getElementById("txtCiudad").value = pacient.city;
   document.getElementById("txtFono").value = pacient.phone;
   document.getElementById("txtEmail").value = pacient.email;
   document.getElementById("txtFecNac").value = pacient.birthDay;
   document.getElementById("txtEstadoCivil").value = pacient.maritalStatus;
   document.getElementById("txtComent").value = pacient.coment;

   document.getElementById('cmdEliminar').disabled = false;
   
}



function deletePacient() {
    let rutText  = rutElement.value;


    const indexToDelete = pacients.findIndex(item => item.rut === rutText);

    if (indexToDelete !== -1) {
        pacients.splice(indexToDelete, 1);
        alert("Paciente eliminado:", pacients);
        clearForm();
        rutElement.disabled = false;
        disableForm();
        document.getElementById('cmdEliminar').disabled = true;
        console.log(pacients);
    } else {
        alert("No se encontró un paciente con el RUT especificado.");
    }
}

function listarPacientesEnTabla() {
    // Obtener el elemento donde se insertará la tabla
    let tabla = document.getElementById('tablaPacientes');

    // Crear el elemento de tabla
    let tablaElement = document.createElement('table');
    tablaElement.classList.add('table'); // Agregar clases Bootstrap u otras si es necesario

    // Crear la fila de encabezado (thead)
    let encabezado = tablaElement.createTHead();
    let encabezadoFila = encabezado.insertRow();

    // Crear las celdas de encabezado
    for (const campo in pacients[0]) {
        let th = document.createElement('th');
        th.textContent = campo;
        encabezadoFila.appendChild(th);
    }

    // Crear el cuerpo de la tabla (tbody)
    let cuerpoTabla = tablaElement.createTBody();

    // Iterar sobre los pacientes y agregar filas a la tabla
    pacients.forEach(paciente => {
        let fila = cuerpoTabla.insertRow();
        for (const campo in paciente) {
            let celda = fila.insertCell();
            celda.textContent = paciente[campo];
        }
    });

    // Agregar la tabla al elemento contenedor
    tabla.appendChild(tablaElement);
}

