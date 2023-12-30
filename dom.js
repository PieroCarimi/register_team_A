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
                <li style="margin-right: 6px;cursor:pointer;"><a id="${x.id}">${x.name}</a></li>
                <i class="bi bi-pencil" style="color:blue;" onclick="editName('${x.id}')"></i>
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteRegister('${x.id}')"></i>
            </div>`;
    });
    matterList.innerHTML = listHTML;
    console.log(registers)
});

function editName(id) {
    let newName = prompt("Inserisci il nuovo nome per la materia:");
    updateRegister(id,newName)
}

function updateUI() {
    let listHTML = "";
    registers.forEach(function (x) {
        listHTML += `
            <div class="d-flex">
                <li style="margin-right: 6px;">${x.id}</li>
                <li style="margin-right: 6px;cursor:pointer;"><a id="${x.id}">${x.name}</a></li>
                <i class="bi bi-pencil" style="color:blue;" onclick="editName('${x.name}')"></i>
                <i class="bi bi-x" style="font-size: 19.3px; color:red; cursor: pointer;" onclick="deleteRegister('${x.id}')"></i>
            </div>`;
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
