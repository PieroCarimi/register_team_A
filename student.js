const students = []

function createStudent(name, lastName, email, phoneNumber){
    const newStudent = {
        id: generateUniqueId(),
        name,
        lastName,
        email,
        phoneNumber,
    };
    students.push(newStudent);
};

function deleteStudent(idStudent){
    const index = students.findIndex((student) => student.id === idStudent);
    if (index !== -1 && registers.length > 0) {
        students.splice(index, 1);
        console.log(students);

    }
    else if (index !== -1 && registers.length < 1) {
        students.splice(index, 1);
        console.log(students);

    }

}

function updateStudent(idStudent, name, lastName, email, phoneNumber){
    const studentIndex = students.findIndex((s) => s.id === idStudent);
    if (studentIndex !== -1) {
        students[studentIndex].name = name;
        students[studentIndex].lastName = lastName;
        students[studentIndex].email = email;
        students[studentIndex].phoneNumber = phoneNumber;
        console.log(students);
    } else {
        console.log("Studente non trovato.");
    }
};


function getStudentList(){
    return students;
};