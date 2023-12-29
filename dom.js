function createRegister(name) {
    const newRegister = {
        id: this.generateUniqueId(),
        name,
        students: [],
        votes: [],
        attendances: [],
    };
    registers.push(newRegister);
}
