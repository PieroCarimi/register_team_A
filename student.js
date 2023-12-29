let students = []
const createStudent = (name, lastName, email) => {
    const newStudent = {
        id: generateUniqueId(),
        name,
        lastName,
        email,
        lectures: []
    };
    students.push(newStudent);
};

const deleteStudent = (idStudent) => {
    const index = scripts.students.findIndex((student) => student.id === idStudent);
    if (index !== -1) {
        students.splice(index, 1);
    }
};

const updateStudent = (idStudent, name, lastName, email) => {
    const studentIndex = students.findIndex((s) => s.id === idStudent);
    if (studentIndex !== -1) {
        scripts.students[studentIndex].name = name;
        scripts.students[studentIndex].lastName = lastName;
        scripts.students[studentIndex].email = email;
    } else {
        console.log("Studente non trovato.");
    }
};

/*const connectStudentToRegister = (studentId, registerId) => {
    const student = students.find((s) => s.id === studentId);
    const register = registers.find((r) => r.id === registerId);
    if (student && register) {
        // Check if the student is not already registered
        if (!register.students.includes(studentId)) {
            register.students.push(studentId);
        } else {
            console.log("Lo studente è già registrato a questo registro.");
        }
    }
*/

const getStudentList = () => {
    return students;
};

createStudent("Gaetano","Alessandretto","ciao")
console.log(getStudentList())
