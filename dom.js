//input che prende i dati del form insertStudent

const {createStudent, getStudentList, deleteStudent, updateStudent} = require("./models/student.models.js");
const {createRegister, getRegisterList, updateRegister, deleteRegister, connectStudentToRegister} = require("./models/register.models.js");
