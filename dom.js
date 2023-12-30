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



