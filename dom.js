let id = "";  // id dinamico per l'update del registro
let currentEditingStudent = null;
let lessonId = "";  // id dinamico per le lezioni
let idregistro = "";
let isLessonManuallyOpened = false;
let studentId = "";

let formMatter = document.getElementById("formMatter");
let formStudent = document.getElementById("insertStudent");
const formAttendance = document.getElementById("formAttendance");
let formGrade = document.getElementById("formGrade");

formMatter.addEventListener("submit", function (e) {
    e.preventDefault();
    let formInputMatter = document.getElementById("formInputMatter")
    createRegister(formInputMatter.value)
    updateUI()
    closeModalCreateRegister();
    console.log(registers)
});

function closeModalCreateRegister() {
    document.getElementById('id01').style.display = 'none';
    let formInputMatter = document.getElementById("formInputMatter");
    formInputMatter.value = "";
}

// La funzione 'idUpdateRegister' prende un indice 'idx' come argomento e assegna il suo valore alla variabile globale 'id'.
function idUpdateRegister(idx) {
    id = idx
}

function editNameRegister() {
    let editRegister = document.getElementById("editRegister").value
    console.log(editRegister)

    let registro = getRegister(id);

    if (editRegister === "") {
        alert("Il nome del registro non può essere vuoto");
        return; // Esce dalla funzione senza inviare il form
    }

    updateRegister(id, editRegister);

    const sortedRegisters = [...registers];
    sortedRegisters.sort((a, b) => a.name.localeCompare(b.name));

    // Aggiorna l'HTML della lista
    let listHTML = "";
    sortedRegisters.forEach(function (x) {
        listHTML += `
            <div class="d-flex">
            <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteSingleRegister('${x.id}')"></i>
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px; cursor: pointer;" onclick="registerView('${x.id}', '${x.name}')">${x.name}</li>
                <i class="bi bi-pencil" style="color:blue;" onclick="idUpdateRegister('${x.id}');registerView('${registro.id}', '${registro.name}')"></i>
            </div>`;
    });

    // Aggiorna l'interfaccia utente 
    updateUI();
    document.getElementById("formEditRegister").style.display = "none" //impostare il modale dell'update del registro a display none
}

function getCurrentlyViewedRegister() {
    // Restituisci il registro attualmente visualizzato
    return registers.find(x => x.id === id);
}

function updateUI() {
    let listHTML = "";
    let currentlyViewedRegister = getCurrentlyViewedRegister(); // Assume che tu abbia una funzione che restituisce il registro attualmente visualizzato

    const sortedRegisters = [...registers];
    sortedRegisters.sort((a, b) => a.name.localeCompare(b.name));

    sortedRegisters.forEach(function (x) {
        listHTML += `
            <div class="d-flex">
            <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteSingleRegister('${x.id}')"></i>
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px; cursor: pointer;" onclick="registerView('${x.id}', '${x.name}')">${x.name}</li>
                <i class="bi bi-pencil" style="color:blue;" onclick="idUpdateRegister('${x.id}');document.getElementById('formEditRegister').style.display='block';"></i>
            </div>`;
    });

    matterList.innerHTML = listHTML;

    // Ripristina la visualizzazione del registro corrente
    if (currentlyViewedRegister) {
        registerView(currentlyViewedRegister.id, currentlyViewedRegister.name);
    }
}

function deleteSingleRegister(register_id) {
    deleteRegister(register_id);
    // Rimuovi l'HTML associato dalla pagina
    const materia = document.getElementById("registromateria");
    materia.innerHTML = "";

    // Aggiorna l'interfaccia utente
    updateUI();
}


formStudent.addEventListener("submit", function (e) {
    e.preventDefault();
    let formNameStudent = document.getElementById("studentName");
    let formLastNameStudent = document.getElementById("studentLastname");
    let formEmailStudent = document.getElementById("studenteEmail");
    let formPhoneStudent = document.getElementById("studentPhone");
    console.log(formNameStudent.value, formLastNameStudent.value, formEmailStudent.value, formPhoneStudent.value);
    createStudent(formNameStudent.value, formLastNameStudent.value, formEmailStudent.value, formPhoneStudent.value);
    console.log(formNameStudent.value, formLastNameStudent.value, formEmailStudent.value, formPhoneStudent.value);
    closeModalCreateStudent();
    console.log(isLessonManuallyOpened)
});


function closeModalCreateStudent() {
    document.getElementById('id02').style.display = 'none';
    let formNameStudent = document.getElementById("studentName");
    let formLastNameStudent = document.getElementById("studentLastname");
    let formEmailStudent = document.getElementById("studenteEmail");
    let formPhoneStudent = document.getElementById("studentPhone");

    formNameStudent.value = "";
    formLastNameStudent.value = "";
    formEmailStudent.value = "";
    formPhoneStudent.value = "";
}


function getSortedStudentList() {
    return students.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));
};

// Funzione per popolare il corpo della tabella degli studenti nel modal
function studentUI() {
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
            <td>${student.phoneNumber}</td>
            <td>
            <button class="btn btn-outline-primary" onclick="editStudent('${student.id}')">Edit</button>
            <button class="btn btn-outline-danger" onclick="deleteLessonStudents('${student.id}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
};


function editStudent(id) {
    currentEditingStudent = students.find(s => s.id === id);
    if (currentEditingStudent) {
        // Altri codici per popolare il form nel modale
        document.getElementById("editStudentName").value = currentEditingStudent.name;
        document.getElementById("editStudentLastName").value = currentEditingStudent.lastName;
        document.getElementById("editStudentEmail").value = currentEditingStudent.email;
        document.getElementById("editStudentPhone").value = currentEditingStudent.phoneNumber;

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
        const editedPhone = document.getElementById("editStudentPhone").value

        if (editedName === "" || editedLastName === "") {
            alert("Il nome e il cognome non possono essere vuoti.");
            return; // Esce dalla funzione senza inviare il form
        }

        // Aggiorna lo studente
        updateStudent(id, editedName, editedLastName, editedEmail, editedPhone);

        // Chiudi il modal dopo aver salvato le modifiche
        closeEditStudentModal();

        // Aggiorna la tabella degli studenti nella pagina principale
        studentUI();
        const tableId = document.getElementById("tableRegisterLessonDisplay");
        if (tableId) {
            registerTableUI();
        }
    } else {
        console.log("Studente non trovato.");
    }
}


// Funzione per aprire il modal degli studenti e popolare la tabella
function openStudentListModal() {
    document.getElementById('id03').style.display = 'block';
    studentUI();
};


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
                <h1 class="text-center">${name}</h1>
                <p class="text-center" style="font-size:10px">${id}</p>
            </div>
        </div>
        <button type="button" class="btn btn-primary" onclick="document.getElementById('connectedStudentToRegister').style.display='block'">Aggiungi studente</button>
        <button type="button" class="btn btn-primary" onclick="document.getElementById('addLesson').style.display='block'">Aggiungi lezione</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="lessonDropDown()">
            Lista lezioni
        </button>
        <!-- Aggiunta tabella per registro -->
        <ul class="dropdown-menu" id="lessonDropDown">
        </ul>
        <h3 class="text-center" id="currentDate"></h3>
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
                    </tr>
            </thead>
            <tbody id="idbody">
            </tbody>
            </table>
            <div class="card" id="cardArgomento" style="display:none;">
            <div class="card-header">
              <div class="d-flex align-items-center">
                <h4>Argomento</h4>
                <button type="button" class="btn btn-light" onclick="document.getElementById('modalArguments').style.display='block'; argumentValue()"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-light"><i class="bi bi-x" style="font-size: 20px; color:red; cursor: pointer;" onclick="deleteArguments()"></i></button>
            </div>
            </div>
            <div class="card-body">
              <span id="testoArgomento"></span>
            </div>
           </div>`
    // Aggiorna il contenuto dell'elemento "registromateria" con la stringa HTML
    materia.innerHTML = listHTML;
    console.log(registers)

}

// Definizione della funzione "idRegister" che restituisce il valore corrente di "idregistro"
function idRegister() { return idregistro }

function connectStudentToSingleRegister(studentId, registerId) {
    connectStudentToRegister(studentId, registerId);

    // Controlla se è aperta una lezione per quella materia e se è stata aperta manualmente
    if (lessonId !== null && lessonId !== "" && isLessonManuallyOpened) {
        let registro = registers.find(x => x.id === idRegister());
        let lessonRegister = registro.lessonList.find(lesson => lesson.lessonId === lessonId);

        // Verifica se l'oggetto lezione e la proprietà attendance sono definiti
        if (lessonRegister && lessonRegister.attendance) {
            registerTableUI();
            isLessonManuallyOpened = true;
        } else {
            console.error("L'oggetto lezione o la proprietà attendance non sono definiti.");
            isLessonManuallyOpened = false; // Resetta la variabile dopo aver visualizzato la lezione
        }


    }
}

function closeModalConnectedStudentToRegister() {
    document.getElementById('connectedStudentToRegister').style.display = 'none';
    const idStudent = document.getElementById("idStudent");
    idStudent.value = "";
}

function closeModalAddLesson() {
    document.getElementById("addLesson").style.display = "none";
    const calendarioInput = document.getElementById("calendarioInput");
    calendarioInput.value = "";
}

function ottieniData() {
    const calendarioInput = document.getElementById('calendarioInput');
    const dataSelezionata = calendarioInput.value;

    // Verifica se il campo della data è vuoto
    if (dataSelezionata.trim() === '') {
        console.log("Il campo della data è vuoto. Inserisci una data valida.");
    } else {

        // Converti la data da formato stringa a oggetto Date
        const data = new Date(dataSelezionata);

        // Estrai giorno, mese e anno dalla data
        const giorno = data.getDate().toString().padStart(2, '0');
        const mese = (data.getMonth() + 1).toString().padStart(2, '0'); // Mese è zero-based, quindi aggiungi 1
        const anno = data.getFullYear();

        // Formatta la data nel formato desiderato (giorno-mese-anno)
        const dataFormattata = `${giorno}-${mese}-${anno}`;

        console.log(idRegister());
        const searchRegister = registers.find(x => x.id === idregistro);
        addLesson(idRegister(), dataFormattata);

        console.log(registers);
        console.log(`Data selezionata: ${dataFormattata}`);
        return dataFormattata;
    }
}



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
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="removeLesson('${idRegister()}', '${x.lessonId}');"></i>
                <li style="margin-right: 6px; cursor: pointer;" onclick="lessonTable('${x.lessonId}')">${x.lessonId} ${x.lessonDate}</li>
                </div>`;
    });

    lessonDropDown.innerHTML = listHTML;
    console.log(registers)
}

function registerTableUI() {
    // Stringa HTML che conterrà la tabella delle lezioni
    let listHTML = "";

    // Ottenere il riferimento all'elemento del corpo della tabella nel DOM
    let tableRegisterLesson = document.getElementById("idbody");

    // Trovare l'oggetto registro corrispondente all'ID del registro corrente
    let registro = registers.find(x => x.id === idRegister());

    // Ottenere la lista degli studenti ordinata per cognome
    let orderStudents = [];
    if (!!registro && !!registro.students) {
        orderStudents = registro.students.slice().sort((a, b) => a.lastName.localeCompare(b.lastName));
    }

    // Ottenere il riferimento all'elemento di visualizzazione della tabella delle lezioni
    let tableDisplay = document.getElementById("tableRegisterLessonDisplay");
    if (tableDisplay) {
        tableDisplay.style.display = "block";
    }
    let cardArgomento = document.getElementById("cardArgomento");
    if (!!registro && registro.students && registro.students.length > 0) {
        if (cardArgomento) {
            cardArgomento.style.display = "block";
        }
    }
    else {
        if (cardArgomento) {
            cardArgomento.style.display = "none";
        }
    }

    // Trovare l'oggetto lezione corrispondente all'ID della lezione corrente
    let lessonRegister;
    if (!!registro && !!registro.lessonList) {
        lessonRegister = registro.lessonList.find(lesson => lesson.lessonId === lessonId);
    }
    console.log(lessonRegister);
    if (!!lessonRegister) {
        // Iterare sugli studenti ordinati per creare righe della tabella
        orderStudents.forEach(function (x) {
            // Trovare la presenza dello studente nella lezione corrente
            let AttendanceStudent = lessonRegister.attendance.find(x => x.studentId === studentId);
            console.log(AttendanceStudent)

            let registerLessonDate = registro.lessonList.find(x => x.lessonId === lessonId)
            console.log(registerLessonDate)
            console.log(studentId)

            let currentDate = document.getElementById("currentDate");
            currentDate.innerHTML = registerLessonDate.lessonDate;

            let gradeStudent = registro.gradeList.find(grade => grade.idStudent === studentId && grade.gradeDate === registerLessonDate.lessonDate);
            let insertGrade;
            if (gradeStudent) {
                insertGrade = gradeStudent.gradeValue;
            } else {
                insertGrade = "";
            }


            // Ottenere l'array di presenze e assenze per la lezione corrente
            let attendanceObject = getAttendances(idRegister(), lessonId, x.id);


            // Aggiorna gli elementi HTML con i nuovi dati

            let orarioEntrataElement = attendanceObject ? attendanceObject.entryTime : '';
            console.log(orarioEntrataElement)

            let orarioUscitaElement = attendanceObject ? attendanceObject.exitTime : '';

            let presenzaElement = attendanceObject ? (attendanceObject.presence ? "Presente" : "") : '';


            console.log(registers);

            let testoArgomento = document.getElementById("testoArgomento")
            console.log(registerLessonDate.arguments)
            console.log(testoArgomento)
            testoArgomento.innerHTML = registerLessonDate.arguments



            // Costruire la stringa HTML per la riga della tabella
            listHTML += `<div class="container">
            <tr>
                <td class="text-center align-middle">
                    <div style="display: flex; align-items: center;">
                        <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteStudentFromRegister('${idRegister()}','${x.id}')"></i>
                        <span style="margin-left: 5px;">${x.id}</span>
                    </div>
                </td>
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
               
             </tr>      
            </tbody>
        </table>
    </div>
    `;
        });

        // Inserire la stringa HTML nella tabella delle lezioni
        tableRegisterLesson.innerHTML = listHTML;
    }

}


// Funzione per creare la tabella delle lezioni per ogni registro
function lessonTable(x) {
    // Impostare l'ID della lezione corrente
    lessonId = x;
    console.log(lessonId);
    isLessonManuallyOpened = true;
    registerTableUI();
}


function deleteStudentFromRegister(register_id, student_id) {
    removeStudent(register_id, student_id);
    registerTableUI();
}


function deleteLessonStudents(idStudent) {
    deleteStudent(idStudent)
    removeStudent(idRegister(), idStudent)
    studentUI();
    registerTableUI();
}


function addAttendance(studentIdx) {
    studentId = studentIdx
    return studentId
}


formAttendance.addEventListener("submit", function (e) {
    e.preventDefault();

    let oraIngresso = document.getElementById("oraIngresso").value;
    let oraUscita = document.getElementById("oraUscita").value;
    let presenza = document.getElementById("presenza").value

    let registro = getRegister(idRegister());
    let lesson_list = registro.lessonList.find(lesson => lesson.lessonId = lessonId);
    let attendace_student = lesson_list.attendance.find(student => student.id = studentId);

    if (!attendace_student) {
        // Aggiungere la registrazione della presenza allo studente per la lezione corrente
        addAttendanceStudentToLesson(idRegister(), lessonId, studentId, oraIngresso, oraUscita, presenza);
    } else {
        updateAttendances(idRegister(), lessonId, studentId, oraIngresso, oraUscita, presenza);
    }
    closeModalAttendanceStudentToRegister()
    registerTableUI();
});

// Questa funzione viene chiamata per chiudere il modal (o finestra modale) relativo alla registrazione degli studenti collegati.

function closeModalAttendanceStudentToRegister() {
    // Nasconde l'elemento del modulo di registrazione degli studenti.
    document.getElementById('formAttendance').style.display = 'none';

    // Resetta il valore del campo 'oraIngresso' a una stringa vuota.
    document.getElementById('oraIngresso').value = '';

    // Resetta il valore del campo 'oraUscita' a una stringa vuota.
    document.getElementById('oraUscita').value = '';

    // Imposta la proprietà 'checked' del campo 'presenza' a falso, deselezionando la casella di controllo.
    document.getElementById('presenza').checked = false;
}



function deleteAttendancesView(registerId, lessonId, studentId) {
    deleteAttendances(registerId, lessonId, studentId)
    const gradeStudentList = registers.find(x => x.id === idRegister()).gradeList;
    const oggettiFiltrati = gradeStudentList.filter((oggetto) => oggetto.idStudent === studentId);
    let registro = registers.find(x => x.id === idRegister());
    let lessonIdDate = registro.lessonList.find(x => x.lessonId === lessonId).lessonDate
    oggettiFiltrati.forEach(student => {
        // Verifica se la data della valutazione coincide con la data della lezione.
        if (student.gradeDate === lessonIdDate) {
            // Se la condizione è verificata, chiama la funzione `removeGrade` per eliminare la valutazione dello studente.
            removeGrade(registerId, student.gradeId)
        }
    })
    // Aggiorna l'interfaccia utente del registro chiamando la funzione `registerTableUI`.
    registerTableUI();
}


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

    // Stampare l'oggetto "registers" nella console dopo l'aggiornamento
    console.log(registers);
    closeModalFormGrade();
});

function closeModalFormGrade() {
    document.getElementById('formGrade').style.display = 'none';
    let voto = document.getElementById("voto");
    voto.value = "";
}

function studentGrade(studentId) {
    const studentTableBody = document.getElementById('studentTableBodyGrade');

    studentTableBody.innerHTML = ''; // Pulisce il corpo della tabella prima di popolarlo

    // const sortedStudents = getSortedStudentList();
    const gradeStudentList = registers.find(x => x.id === idRegister()).gradeList;
    const oggettiFiltrati = gradeStudentList.filter((oggetto) => oggetto.idStudent === studentId);

    let registro = registers.find(x => x.id === idRegister());

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

function ottieniArgomento() {

    let valueArgomento = document.getElementById("valueArgomento").value
    let registro = registers.find(x => x.id === idRegister());
    let lesson = registro.lessonList.find(x => x.lessonId === lessonId)
    lesson.arguments = valueArgomento
    console.log(lesson.arguments)
    registerTableUI()

}

function closeModalArguments() {
    document.getElementById('modalArguments').style.display = 'none';
}


function argumentValue() {
    let registro = registers.find(x => x.id === idRegister());
    let lesson = registro.lessonList.find(x => x.lessonId === lessonId);
    let valueArgomento = document.getElementById("valueArgomento");

    // Imposta il valore del campo con l'argomento corrente, se presente
    if (lesson.arguments !== "") {
        valueArgomento.value = lesson.arguments;
    } else {
        valueArgomento.value = "";
    }
}


function deleteArguments() {
    let registro = registers.find(x => x.id === idRegister());
    let lesson = registro.lessonList.find(x => x.lessonId === lessonId)
    lesson.arguments = ""
    registerTableUI()

}
