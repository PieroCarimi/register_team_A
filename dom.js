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
        <div class="d-flex justify-content-center mt-4">
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
        <table class="table table-striped mt-4" style="display: none;" id="tableRegisterLessonDisplay">
            <thead>
                <tr>
                    <th scope="col" class="text-center">id</th>
                    <th scope="col" class="text-center">Nome</th>
                    <th scope="col" class="text-center">Cognome</th>
                    <th scope="col" class="text-center">Orario di entrata</th>
                    <th scope="col" class="text-center">Orario di uscita</th>
                    <th scope="col" class="text-center">Presenza</th>
                    <th scope="col" class="text-center">Aggiungi Presenza</th>
                    <th scope="col" class="text-center">Rimuovi Presenza</th>
                    <th scope="col" class="text-center">Lista voti</th>
                    <th scope="col" class="text-center">Aggiungi voto</th>
                    <th scope="col" colspan="2" class="text-center">Argomento</th>
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

function registerTableUI(){
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
        console.log(AttendanceStudent)
        // Variabili per l'orario di entrata, uscita e presenza dello studente
        let orarioEntrata, orarioUscita;

        let registerLessonDate = registro.lessonList.find(x => x.lessonId === lessonId)
        console.log(registerLessonDate)
        console.log(studentId)
        let gradeStudent = registro.gradeList.find(grade => grade.idStudent === studentId && grade.gradeDate === registerLessonDate.lessonDate);
        let insertGrade;
        if(gradeStudent){
            insertGrade = gradeStudent.gradeValue;
        }else{
            insertGrade = "";
        }

        // Verificare se è presente una registrazione di presenza per lo studente
        
            // Ottenere l'orario di entrata, uscita e presenza dalla registrazione di presenza
           /* orarioEntrata = getAttendances(idRegister(), lessonId, studentId).entryTime;
            console.log(orarioEntrata);
            orarioUscita = getAttendances(idRegister(), lessonId, studentId).exitTime;*/
            // Ottenere l'array di presenze e assenze per la lezione corrente
  let attendanceObject = getAttendances(idRegister(), lessonId,x.id);

    // Trova l'oggetto corrispondente nell'array di presenze e assenze

        

    // Aggiorna gli elementi HTML con i nuovi dati
    
       let orarioEntrataElement  = attendanceObject ? attendanceObject.entryTime : '';
       console.log(orarioEntrataElement)
       
       let orarioUscitaElement  = attendanceObject ? attendanceObject.exitTime : '';
       
      let presenzaElement = attendanceObject ? (attendanceObject.presence? "Presente": "")  : '';
    

    console.log(registers);

        
        // Costruire la stringa HTML per la riga della tabella
        listHTML += `<div class="container">
            <tr>
                <td class="text-center align-middle">${x.id}</td>
                <td class="text-center align-middle">${x.name}</td>
                <td class="text-center align-middle">${x.lastName}</td>
                <td id="orarioentrata_${x.id}" class="text-center align-middle">${orarioEntrataElement}</td>
                <td id="orariouscita_${x.id}" class="text-center align-middle">${orarioUscitaElement}</td>
                <td id="presenza_${x.id}" class="text-center align-middle">${presenzaElement}</td>
                <td class="text-center align-middle"><button class="btn btn btn-outline-primary" id="editStudentLesson" onclick="document.getElementById('formAttendance').style.display='block'; addAttendance('${x.id}');">Aggiungi</button></td>
                <td class="text-center align-middle"><button class="btn btn-outline-danger" id="deleteStudentLesson" onclick="deleteAttendancesView('${idRegister()}','${lessonId}','${x.id}')">Rimuovi</button></td>
                <td id="grade_${x.id}" class="text-center align-middle">
                    <button class="btn btn-outline-secondary" onclick="document.getElementById('gradeTable').style.display='block'; studentGrade('${x.id}')">Lista voti</button>
                </td>
                <td class="text-center align-middle"><button class="btn btn btn-outline-primary" id="addGrade" onclick="document.getElementById('formGrade').style.display='block'; addAttendance('${x.id}')">Aggiungi</button></td>
                <td id="argomento" class="text-center align-middle"></td>
             </tr>      
            </tbody>
        </table>
    </div>
    `;
    });

    // Inserire la stringa HTML nella tabella delle lezioni
    tableRegisterLesson.innerHTML = listHTML;
    
}

       // Funzione per creare la tabella delle lezioni per ogni registro
function lessonTable(x) {
    // Impostare l'ID della lezione corrente
    lessonId = x;
    console.log(lessonId);

    registerTableUI();
}


function deleteLessonStudents(idStudent){
    removeStudent(idRegister,idStudent)
    let registro = registers.find(x => x.id === idRegister())
    const studentIndex = registro.students.findIndex((student) => student.id === idStudent);
    registro.students.splice(studentIndex, 1);
    registerTableUI();
    }

    let studentId = ""
function addAttendance(studentIdx){
    studentId = studentIdx
    return studentId
}



const formAttendance = document.getElementById("formAttendance");

formAttendance.addEventListener("submit", function (e) {
    e.preventDefault();

    let oraIngresso = document.getElementById("oraIngresso").value;
    let oraUscita = document.getElementById("oraUscita").value;
    let presenza = document.getElementById("presenza").value

    // Aggiungere la registrazione della presenza allo studente per la lezione corrente
    addAttendanceStudentToLesson(idRegister(), lessonId, studentId, oraIngresso, oraUscita,presenza);
    registerTableUI();
    
});

function deleteAttendancesView(registerId, lessonId, studentId){
    deleteAttendances(registerId, lessonId, studentId)
    console.log(registers)
    registerTableUI();
}


 

let formGrade = document.getElementById("formGrade");

// Aggiungere un gestore di eventi per l'invio del modulo di registrazione presenze
const formGrades = formGrade.addEventListener("submit", function (e) {
    registerTableUI();
    // Impedire l'invio del modulo tradizionale
    e.preventDefault();

    // Ottenere i valori dei campi del modulo (orario di ingresso e uscita)
    let grade = document.getElementById("voto").value;
    //let comment = document.getElementById("").value;

    let registro = registers.find(x => x.id === idRegister());
    let registerLessonDate = registro.lessonList.find(x => x.lessonId === lessonId)
    console.log(registerLessonDate);
    // Aggiungere la registrazione della presenza allo studente per la lezione corrente
    addGrade(idRegister(), studentId, registerLessonDate.lessonDate, grade)

    // Ottenere i riferimenti agli elementi HTML per visualizzare i dati aggiornati
    let gradeElement = document.getElementById(`grade_${studentId}`);

    // Aggiornare gli elementi HTML con i nuovi dati
    //if (gradeElement) {
     //   gradeElement.innerHTML = grade;
    //}

    // Stampare l'oggetto "registers" nella console dopo l'aggiornamento
    console.log(registers);
});

   
const studentGrade = (studentId) => {
    const studentTableBody = document.getElementById('studentTableBodyGrade');
    
    studentTableBody.innerHTML = ''; // Pulisce il corpo della tabella prima di popolarlo

    // const sortedStudents = getSortedStudentList();
    const gradeStudentList = registers.find(x => x.id === idRegister()).gradeList;
    const oggettiFiltrati = gradeStudentList.filter((oggetto) => oggetto.idStudent === studentId);

    let registro = registers.find(x => x.id === idRegister());

    // Trova l'oggetto lezione corrispondente all'ID della lezione corrente
    //let lessonRegister = registro.lessonList.find(lesson => lesson.lessonId === lessonId);

    // Trova l'oggetto studente corrispondente all'ID dello studente corrente
    let student = registro.students.find(student => student.id === studentId);

    // Ottenere il nome dello studente
    const studentName = student ? `${student.name} ${student.lastName}` : '';

    // Ottenere il nome della materia
    const subjectName = registro.name;

    // Aggiungi i dati dello studente e della materia a "StudentAndSubject"
    const studentAndSubject = document.getElementById('studentAndSubject');
    studentAndSubject.innerHTML = `<h2>${studentName}</h2><p>${subjectName}</p>`;

    // Ordina l'array in base alla data crescente
    oggettiFiltrati.sort((a, b) => new Date(a.gradeDate) - new Date(b.gradeDate));

    console.log(oggettiFiltrati);

    oggettiFiltrati.forEach(student => {
        const row = document.createElement('tr');
        row.id = `gradeRow_${student.gradeId}`; // Aggiungi un ID unico basato sull'ID del voto
        row.innerHTML = `
            <td class="text-center">${student.gradeDate}</td>
            <td class="text-center">${student.gradeValue}</td>
            <td class="text-center">
                <button class="btn btn-outline-danger" onclick="removeSingleGrade('${idRegister()}','${student.gradeId}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
};

function removeSingleGrade(register_id, grade_id) {
    // Rimuovi il voto dal registro
    removeGrade(register_id, grade_id);

    // Se la rimozione è avvenuta con successo, aggiorna solo la riga associata al voto
    const rowToRemove = document.getElementById(`gradeRow_${grade_id}`);
    if (rowToRemove) {
        rowToRemove.remove();
    }
}



    


    
       
       
    
    



