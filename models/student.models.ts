import {TStudent} from "../declarations";
import {generateUniqueId, students} from "../scripts";

const createStudent = (
    name: TStudent["name"],
    lastName: TStudent["lastName"],
    email: TStudent["email"],
    //registerIds: Array<TRegister["id"]>
): void => {
    const newStudent: TStudent = {
        id: generateUniqueId(),
        name,
        lastName,
        email,
        lectures: [] //registerIds,
    };
    students.push(newStudent);
    //connectStudentToRegister(newStudent.id, registerIds); // Ricordati di fornire l'ID del registro
};

const deleteStudent = (idStudent: TStudent["id"]): void => {
    const index = students.findIndex((student) => student.id === idStudent);
    if (index !== -1) {
        students.splice(index, 1);
    }
};

const updateStudent = (
    idStudent: TStudent["id"],
    name: TStudent["name"],
    lastName: TStudent["lastName"],
    email: TStudent["email"]
): void => {
    const studentIndex = students.findIndex((s) => s.id === idStudent);

    if (studentIndex !== -1) {
        students[studentIndex].name = name;
        students[studentIndex].lastName = lastName;
        students[studentIndex].email = email;
    } else {
        console.log("Studente non trovato.");
    }
};

const getStudentList = (): typeof students => {
    return students;
};