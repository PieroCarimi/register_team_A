

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
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
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
        console.log(registers)
    }
       // Funzione per creare la tabella delle lezioni per ogni registro
function lessonTable(x) {
    // Impostare l'ID della lezione corrente
    lessonId = x;
    console.log(lessonId);

    // Stringa HTML che conterrà la tabella delle lezioni
    let listHTML = "";

    // Ottenere il riferimento all'elemento del corpo della tabella nel DOM
    let tableRegisterLesson = document.getElementById("idbody");

    // Trovare l'oggetto registro corrispondente all'ID del registro corrente
    let registro = registers.find(x => x.id === idRegister());

    // Ottenere la lista degli studenti ordinata per cognome
    const orderStudents = registro.students.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Ottenere il riferimento all'elemento di visualizzazione della tabella delle lezioni
    let ciao = document.getElementById("tableRegisterLessonDisplay");
    ciao.style.display = "block";

    // Trovare l'oggetto lezione corrispondente all'ID della lezione corrente
    let lessonRegister = registro.lessonList.find(lesson => lesson.lessonId === lessonId);
    console.log(lessonRegister);

    // Iterare sugli studenti ordinati per creare righe della tabella
    orderStudents.forEach(function (x) {
        // Trovare la presenza dello studente nella lezione corrente
        let AttendanceStudent = lessonRegister.attendance.find(x => x.studentId === studentId);

        // Variabili per l'orario di entrata, uscita e presenza dello studente
        let orarioEntrata, orarioUscita;

        // Verificare se è presente una registrazione di presenza per lo studente
        if (AttendanceStudent) {
            // Ottenere l'orario di entrata, uscita e presenza dalla registrazione di presenza
            orarioEntrata = getAttendances(idRegister(), lessonId, studentId).entryTime;
            console.log(orarioEntrata);
            orarioUscita = getAttendances(idRegister(), lessonId, studentId).exitTime;
            console.log(orarioUscita);
        } else {
            // Se non c'è registrazione di presenza, impostare gli orari a vuoti
            orarioEntrata = "";
            orarioUscita = "";
        }

        // Costruire la stringa HTML per la riga della tabella
        listHTML += `<div class="container mt-4">
            <tr>
                  <td>${x.id}</td>
                  <td>${x.name}</td>
                  <td>${x.lastName}</td>
                   <td id="orarioentrata_${x.id}">${orarioEntrata}</td>
                <td id="orariouscita_${x.id}">${orarioUscita}</td>
                <td id="presenza_${x.id}"></td>
                  <td><button class="btn btn-primary id="editStudentLesson" onclick="document.getElementById('formAttendance').style.display='block'; addAttendance('${x.id}')">edit</button></td>
                  <td><button class="btn btn-danger id="deleteStudentLesson">delete</button></td>
                  <td id="argomento"></td>
             </tr>      
            </tbody>
        </table>
    </div>
    `;
    });

    // Inserire la stringa HTML nella tabella delle lezioni
    tableRegisterLesson.innerHTML = listHTML;
}


function deleteLessonStudents(idStudent){
    removeStudent(idRegister,idStudent)
    let registro = registers.find(x => x.id === idRegister())
    const studentIndex = registro.students.findIndex((student) => student.id === idStudent);
    registro.students.splice(studentIndex, 1);
    const orderStudents = registro.students.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));
    console.log(orderStudents)
    let lessonRegister = registro.lessonList.find(lesson => lesson.lessonId === lessonId)
    let listHTML = "";
        let tableRegisterLesson = document.getElementById("idbody")
        let ciao = document.getElementById("tableRegisterLessonDisplay")
        ciao.style.display = "block"
        orderStudents.forEach(function (x){ //creazione tabella dinamica per inseriri le informazioni degli utenti
            let AttendanceStudent = lessonRegister.attendance.find(x => x.studentId === studentId)
            if(AttendanceStudent){
                var orarioEntrata =  getAttendances(idRegister(), lessonId, studentId).entryTime
                console.log(orarioEntrata)
                var orarioUscita =  getAttendances(idRegister(), lessonId, studentId).exitTime
                console.log(orarioUscita)
                var presenza =  getAttendances(idRegister(), lessonId, studentId).presenza
               }
               else{
                orarioEntrata = ""
                orarioUscita = ""
               }
            listHTML += `<div class="container mt-4">
                <tr>
                      <td>${x.id}</td>
                      <td>${x.name}</td>
                      <td>${x.lastName}</td>
                       <td id="orarioentrata_${x.id}">${orarioEntrata}</td>
                    <td id="orariouscita_${x.id}">${orarioUscita}</td>
                    <td id="presenza_${x.id}"></td>
                      <td><button class="btn btn-primary id="editStudentLesson" onclick="document.getElementById('formAttendance').style.display='block'; addAttendance('${x.id}')">edit</button></td>
                      <td><button class="btn btn-danger id="deleteStudentLesson">delete</button></td>
                      <td id="argomento"></td>
                 </tr>      
                </tbody>
            </table>
        </div>
        `;
    })
    
        tableRegisterLesson.innerHTML = listHTML
        
    }
    
    let studentId = ""
    function addAttendance(studentIdx){
        studentId = studentIdx
    }

// Ottenere il riferimento al form di registrazione presenze dal DOM
let formAttendance = document.getElementById("formAttendance");

// Aggiungere un gestore di eventi per l'invio del modulo di registrazione presenze
const formAttendances = formAttendance.addEventListener("submit", function (e) {
    // Impedire l'invio del modulo tradizionale
    e.preventDefault();

    // Ottenere i valori dei campi del modulo (orario di ingresso e uscita)
    let oraIngresso = document.getElementById("oraIngresso").value;
    let oraUscita = document.getElementById("oraUscita").value;

    // Aggiungere la registrazione della presenza allo studente per la lezione corrente
    addAttendanceStudentToLesson(idRegister(), lessonId, studentId, oraIngresso, oraUscita);

    // Ottenere i riferimenti agli elementi HTML per visualizzare i dati aggiornati
    let orarioEntrataElement = document.getElementById(`orarioentrata_${studentId}`);
    let orarioUscitaElement = document.getElementById(`orariouscita_${studentId}`);
    let presenzaElement = document.getElementById(`presenza_${studentId}`);

    // Aggiornare gli elementi HTML con i nuovi dati
    if (orarioEntrataElement) {
        orarioEntrataElement.innerHTML = oraIngresso;
    }
    if (orarioUscitaElement) {
        orarioUscitaElement.innerHTML = oraUscita;
    }
    if (presenzaElement) {
        // Impostare la presenza come "Presente"
        presenzaElement.innerHTML = `<span>Presente</span>`;
    }

    // Stampare l'oggetto "registers" nella console dopo l'aggiornamento
    console.log(registers);
});



   
   



    


    
       
       
    
    



