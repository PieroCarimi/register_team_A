
const registers = [];

function createRegister(registerName) {
    const newRegister = {
        id: generateUniqueId(),
        name: registerName,
        lessonList: [],
        gradeList: [],
        students: []
    };
    registers.push(newRegister);
    return newRegister;
}
 
function updateRegister(registerId, newName) {
    const registerToUpdate = registers.find(register => register.id === registerId);

    if (registerToUpdate) {
        registerToUpdate.name = newName;
        updateUI();
        console.log(registers)
        return registerToUpdate;
    } else {
        console.error("Register not found");
        return null;
    }
}

function deleteRegister(registerId) {
    const registerIndex = registers.findIndex(register => register.id === registerId);

    if (registerIndex !== -1) {
        registers.splice(registerIndex, 1);
        console.log("Register deleted successfully");
        updateUI(); // Aggiorna l'interfaccia utente dopo la cancellazione
    } else {
        console.error("Register not found");
    }
}

function getRegister(registerId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        return register;
    } else {
        console.error("Register not found");
        return null;
    }
}

function addStudent(registerId, studentId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const studentRegister = students.findIndex(student => student.id === studentId);
        if(studentRegister !== -1){
            const studentObj = students.find(student => student.id === studentId);
            register.students.push(studentObj);
            console.log("Student added successfully to register:", register.name);
            }
    } else {
        console.error("Register not found");
    }
}

function removeStudent(registerId, studentId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const studentIndex = register.students.findIndex(student => student.id === studentId);

        if (studentIndex !== -1) {
            // Rimuovi lo studente dalla lista degli studenti nel registro
            register.students.splice(studentIndex, 1);

            // Rimuovi l'informazione di presenza per lo studente in tutte le lezioni nel registro
            register.lessonList.forEach(lesson => {
                const studentAttendanceIndex = lesson.attendance.findIndex(att => att.studentId === studentId);
                if (studentAttendanceIndex !== -1) {
                    lesson.attendance.splice(studentAttendanceIndex, 1);
                }
            });

            // Rimuovi i voti dello studente nel registro
            register.gradeList = register.gradeList.filter(grade => grade.idStudent !== studentId);

            console.log("Student removed successfully from register:", register.name);
        } else {
            console.error("Student not found in the register");
        }
    } else {
        console.error("Register not found");
    }
}

function addLesson(registerId, lessonDate) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lesson = {
            lessonId: generateUniqueId(),
            lessonDate: lessonDate,
            attendance: []
        };
        register.lessonList.push(lesson);
        console.log("Lesson added successfully to register:", register.name);
    } else {
        console.error("Register not found");
    }
}

function removeLesson(registerId, lessonId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lessonIndex = register.lessonList.findIndex(lesson => lesson.lessonId === lessonId);

        if (lessonIndex !== -1) {
            // Rimuovi la lezione dalla lista delle lezioni
            register.lessonList.splice(lessonIndex, 1);

            // Rimuovi l'informazione di presenza per tutti gli studenti nella lezione
            register.lessonList[lessonIndex].attendance = [];

            console.log("Lesson removed successfully from register:", register.name);
        } else {
            console.error("Lesson not found");
        }
    } else {
        console.error("Register not found");
    }
}

function addGrade(registerId, idStudent, gradeDate, gradeValue) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const grade = {
            gradeId: generateUniqueId(),
            idStudent: idStudent,
            gradeDate: gradeDate,
            gradeValue: gradeValue
        };
        register.gradeList.push(grade);
        console.log("Grade added successfully to register:", register.name);
    } else {
        console.error("Register not found");
    }
}

function removeGrade(registerId, gradeId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const gradeIndex = register.gradeList.findIndex(grade => grade.gradeId === gradeId);

        if (gradeIndex !== -1) {
            // Rimuovi il voto dalla lista dei voti
            register.gradeList.splice(gradeIndex, 1);
            console.log("Grade removed successfully from register:", register.name);
        } else {
            console.error("Grade not found");
        }
    } else {
        console.error("Register not found");
    }
}

function addAttendanceStudentToLesson(registerId, lessonId, studentId, entryTime, exitTime) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lessonIndex = register.lessonList.findIndex(lesson => lesson.lessonId === lessonId);

        if (lessonIndex !== -1) {
            // Check if the student is already in the attendance list for this lesson
            const studentAttendanceIndex = register.lessonList[lessonIndex].attendance.findIndex(att => att.studentId === studentId);

            if (studentAttendanceIndex === -1) {
                // If the student is not in the attendance list, add the new attendance record
                register.lessonList[lessonIndex].attendance.push({
                    studentId: studentId,
                    entryTime: entryTime,
                    exitTime: exitTime
                });
                console.log("Attendance added successfully to register:", register.name);
            } else {
                console.log("The student is already in the attendance list");
            }
        } else {
            console.error("Lesson not found");
        }
    } else {
        console.error("Register not found");
    }
}

function getAttendances(registerId, lessonId, studentId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lessonIndex = register.lessonList.findIndex(lesson => lesson.lessonId === lessonId);

        if (lessonIndex !== -1) {
            const studentAttendance = register.lessonList[lessonIndex].attendance.find(att => att.studentId === studentId);

            if (studentAttendance) {
                const student = register.students.find(student => student.id === studentId);

                if (student) {
                    return {
                        lessonId: lessonId,
                        studentId: studentId,
                        studentName: student.name,
                        entryTime: studentAttendance.entryTime,
                        exitTime: studentAttendance.exitTime
                    };
                } else {
                    console.log("Student not found with the specified ID");
                    return null;
                }
            } else {
                console.log("Student not found in the attendance list for the specified lesson");
                return null;
            }
        } else {
            console.error("Lesson not found");
            return null;
        }
    } else {
        console.error("Register not found");
        return null;
    }
}

function updateAttendances(registerId, lessonId, studentId, entryTime, exitTime) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lessonIndex = register.lessonList.findIndex(lesson => lesson.lessonId === lessonId);

        if (lessonIndex !== -1) {
            const studentAttendanceIndex = register.lessonList[lessonIndex].attendance.findIndex(att => att.studentId === studentId);

            if (studentAttendanceIndex !== -1) {
                register.lessonList[lessonIndex].attendance[studentAttendanceIndex] = {
                    studentId: studentId,
                    entryTime: entryTime,
                    exitTime: exitTime
                };
                console.log("Attendance updated successfully in register:", register.name);
            } else {
                console.log("The student is not in the attendance list");
            }
        } else {
            console.error("Lesson not found");
        }
    } else {
        console.error("Register not found");
    }
}

function deleteAttendances(registerId, lessonId, studentId) {
    const register = registers.find(register => register.id === registerId);

    if (register) {
        const lessonIndex = register.lessonList.findIndex(lesson => lesson.lessonId === lessonId);

        if (lessonIndex !== -1) {
            const studentAttendanceIndex = register.lessonList[lessonIndex].attendance.findIndex(att => att.studentId === studentId);

            if (studentAttendanceIndex !== -1) {
                // Rimuovi l'informazione di presenza per lo studente nella lezione
                register.lessonList[lessonIndex].attendance.splice(studentAttendanceIndex, 1);
                console.log("Attendance deleted successfully from register:", register.name);
            } else {
                console.log("Student not found in the attendance list for the specified lesson");
            }
        } else {
            console.error("Lesson not found");
        }
    } else {
        console.error("Register not found");
    }
}


