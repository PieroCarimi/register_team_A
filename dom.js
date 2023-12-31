let formMatter = document.getElementById("formMatter")
formMatter.addEventListener("submit", function(e) {
    e.preventDefault();
    let formInputMatter = document.getElementById("formInputMatter")
    createRegister(formInputMatter.value)
    let matterList = document.getElementById("matterList")
    let listHTML = "";
    registers.forEach(function(x) {
        listHTML += `
            <div class="d-flex">
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px; cursor: pointer;" onclick="registerView('${x.id}', '${x.name}')">${x.name}</li>
                <i class="bi bi-pencil" style="color:blue;" onclick="editName('${x.id}')"></i>
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteRegister('${x.id}')"></i>
            </div>`;
    });
    matterList.innerHTML = listHTML;
    console.log(registers)
});

function editName(id) {
    // Chiedi all'utente di inserire il nuovo nome per la materia
    let newName = prompt("Inserisci il nuovo nome per la materia:");
    
    // Trova l'oggetto corrispondente nella lista registers
    let registerToUpdate = registers.find(x => x.id === id);
    
    // Aggiorna il campo name con il nuovo nome
    if (registerToUpdate) {
        registerToUpdate.name = newName;
    }
    
    // Aggiorna l'HTML della lista
    let listHTML = "";
    registers.forEach(function(x) {
        listHTML += `
            <div class="d-flex">
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px; cursor: pointer;" onclick="registerView('${x.id}', '${x.name}')">${x.name}</li>
                <i class="bi bi-pencil" style="color:blue;" onclick="editName('${x.id}')"></i>
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteRegister('${x.id}')"></i>
            </div>`;
    });
    
    // Aggiorna l'HTML della lista nel DOM
    matterList.innerHTML = listHTML;
    
    // Aggiorna l'interfaccia utente (se necessario)
    updateUI();
    
    console.log(id);
    console.log(registers);
}


function updateUI() {
    let listHTML = "";
    registers.forEach(function (x) {
        listHTML += `
            <div class="d-flex">
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px; cursor: pointer;" onclick="registerView('${x.id}', '${x.name}')">${x.name}</li>
                <i class="bi bi-pencil" style="color:blue;" onclick="editName('${x.id}')"></i>
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteRegister('${x.id}')"></i>
            </div>`;
            registerView(x.id,x.name)
    });
    matterList.innerHTML = listHTML;
}

let formStudent = document.getElementById("insertStudent")
formStudent.addEventListener("submit", function(e) {
    e.preventDefault();
    let formNameStudent = document.getElementById("studentName");
    let formLastNameStudent = document.getElementById("studentLastname");
    let formEmailStudent = document.getElementById("studenteEmail");
    createStudent(formNameStudent.value, formLastNameStudent.value, formEmailStudent.value);
    console.log(formNameStudent.value, formLastNameStudent.value, formEmailStudent.value);
});

const getSortedStudentList = () => {
    return students.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));
};

// Funzione per popolare il corpo della tabella degli studenti nel modal
const studentUI = () => {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = ''; // Pulisce il corpo della tabella prima di popolarlo

    const sortedStudents = getSortedStudentList();

    sortedStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Edit</button>
                <button onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
};

let currentEditingStudent = null;

function editStudent(id) {
    currentEditingStudent = students.find(s => s.id === id);
    if (currentEditingStudent) {
        // Altri codici per popolare il form nel modale
        document.getElementById("editStudentName").value = currentEditingStudent.name;
        document.getElementById("editStudentLastName").value = currentEditingStudent.lastName;
        document.getElementById("editStudentEmail").value = currentEditingStudent.email;

        // Visualizza il modale per la modifica dello studente
        document.getElementById('editStudentModal').style.display = 'block';
    } else {
        console.log("Studente non trovato.");
    }
}

// Aggiungi questa funzione a dom.js
function closeEditStudentModal() {
    // Chiude il modale di modifica dello studente
    document.getElementById('editStudentModal').style.display = 'none';
}

function saveEditedStudentModal() {
    if (currentEditingStudent) {
        const id = currentEditingStudent.id;
        const editedName = document.getElementById("editStudentName").value;
        const editedLastName = document.getElementById("editStudentLastName").value;
        const editedEmail = document.getElementById("editStudentEmail").value;

        // Aggiorna lo studente
        updateStudent(id, editedName, editedLastName, editedEmail);

        // Chiudi il modal dopo aver salvato le modifiche
        closeEditStudentModal();

        // Aggiorna la tabella degli studenti nella pagina principale
        studentUI();
    } else {
        console.log("Studente non trovato.");
    }
}


// Funzione per aprire il modal degli studenti e popolare la tabella
const openStudentListModal = () => {
    document.getElementById('id03').style.display = 'block';
    studentUI();
};

let idregistro = ""
function registerView(id, name) { // Definizione della funzione "registerView" che accetta due parametri: "id" e "name"
    idregistro = id
    console.log(id + name);
     // Ottieni l'elemento HTML con l'id "registromateria"
    let materia = document.getElementById("registromateria");
    // Inizializza una stringa HTML per la visualizzazione della materia
    let listHTML = "";
    listHTML += `
        <div class="d-flex justify-content-center">
            <div class="row">
                <br>
                <h1>${name}</h1>
                <p style="font-size:10px">${id}</p>
            </div>
        </div>
        <button type="button" class="btn btn-primary" onclick="document.getElementById('connectedStudentToRegister').style.display='block'">addStudent</button>
        <button type="button" class="btn btn-primary" onclick="document.getElementById('addLesson').style.display='block'">addLesson</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="lessonDropDown()">
            Lesson List
        </button>
        <!-- Aggiunta tabella per registro -->
        <ul class="dropdown-menu" id="lessonDropDown">
        </ul>
        <table class="table table-striped" style="display: none;" id="tableRegisterLessonDisplay">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Orario di entrata</th>
                    <th scope="col">Orario di uscita</th>
                    <th scope="col">Presenza</th>
                    <th scope="col">Actions</th>
                    <th scope="col" colspan="2">Argomento</th>
                </tr>
            </thead>
            <tbody id="idbody">
            </tbody>
            </table>

        `
        // Aggiorna il contenuto dell'elemento "registromateria" con la stringa HTML
        materia.innerHTML = listHTML;
        console.log(registers)

}
      // Definizione della funzione "idRegister" che restituisce il valore corrente di "idregistro"
      function idRegister (){return idregistro}
    
      function ottieniData() {
        const calendarioInput = document.getElementById('calendarioInput');
        const dataSelezionata = calendarioInput.value;
        console.log(idRegister())
        const searchRegister = registers.find(x => x.id === idregistro)
        addLesson(idRegister(),dataSelezionata)
        //searchRegister.lessonList.push(dataSelezionata)
        console.log(registers)
        console.log(`Data selezionata: ${dataSelezionata}`);
        return dataSelezionata
      }

      let lessonId = ""  // id dinamico per le lezioni
      function lessonDropDown() {  //Ordinare per più recenti le date delle lezioni
        const searchRegister = registers.find(x => x.id === idRegister());
        const copySearchRegister = [...searchRegister.lessonList];
        let lessonDropDown = document.getElementById("lessonDropDown");
        let listHTML = "";
    
        // Ordina l'array in base alla data
        const sortedDate = copySearchRegister.sort(function (a, b) {
            return new Date(a.lessonDate) - new Date(b.lessonDate);
        });
    
        // Creazione dell'HTML usando il risultato ordinato
        sortedDate.forEach(function (x) {
            listHTML += `
                <div class="d-flex">
                <li style="margin-right: 6px; cursor: pointer;" onclick="lessonTable('${x.lessonId}')">${x.lessonId} ${x.lessonDate}</li>
                    <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="removeLesson('${idRegister()}', '${x.lessonId}');"></i>
                </div>`;
            });
    
        lessonDropDown.innerHTML = listHTML;
    }
  
       function lessonTable(x){  // creazione tabella per ogni registro
        lessonId = x
        let listHTML = "";
        let tableRegisterLesson = document.getElementById("idbody")
        console.log(lessonId)
        let registro = registers.find(x => x.id === idRegister() )  //find per trovare l'oggetto registro corrispondente
        let ciao = document.getElementById("tableRegisterLessonDisplay")
        ciao.style.display = "block"
        registro.students.forEach(function (x){ //creazione tabella dinamica per inseriri le informazioni degli utenti
        listHTML += `<div class="container mt-4">
            <tr>
                  <td>${x.id}</td>
                  <td>${x.name}</td>
                  <td>${x.lastName}</td>
                  <td> <input type="time" id="orarioentrata" name="orario" required></td>
                  <td> <input type="time" id="orariouscita" name="orario" required></td>
                  <td><input type="radio" id="html" name="fav_language" value="SI">
                  <label for="html">SI</label><br>
                  <input type="radio" id="css" name="fav_language" value="NO">
                  <label for="css">NO</label></td>
                  <td><button class="btn btn-primary id="editStudentLesson">edit</button></td>
             </tr>      
            </tbody>
        </table>
    </div>
    `;
})

    tableRegisterLesson.innerHTML = listHTML
    
}







    


    
       
       
    
    



