//Method declaration

//constructor functions for data types
function bug(summary, details, owner, priority, status){
    this.summary = summary;
    this.details = details;
    this.owner = owner;
    this.date = new Date().getDate();
    this.priority = priority;
    this.status = status;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function person(firstName, lastName, role){
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function project(projectName, projectDescription){
    this.projectName = projectName
    this.projectDescription = projectDescription;
    this.teamMembers = [];
    this.bugs = [];
}
//methods for loading and saving data using WebStorage API
let appData; //Global variable for quicker data access;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function loadData(){
    if(localStorage.getItem("appData") == null){
        appData = [];
        saveData();
    }
    else{
        appData = JSON.parse(localStorage.getItem("appData"));
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function saveData(){
    localStorage.setItem("appData", JSON.stringify(appData));
}
//Other methods
function loadProjectCards(){
    let page = document.getElementById('dashboard');
    page.innerHTML = "";
    let row = document.createElement('div');
    row.className = "row";
    page.appendChild(row);
    let colCounter = 0;
    let cardNumber = -1;
    appData.map(project => {
        if(colCounter == 3){
            row = document.createElement('div');
            row.className = "row";
            page.appendChild(row);
            colCounter = 0;
        }
        colCounter++;
        cardNumber++;
        let col = document.createElement('div');
        col.className = "col-md-4";
        row.appendChild(col);
        let card = document.createElement('div');
        card.className = "card";
        card.classList.add("card-hover-shadow");
        card.classList.add("mt-4");
        card.classList.add("mx-4");
        col.appendChild(card);
        let cardHeader = document.createElement('div');
        cardHeader.className = "card-header"
        cardHeader.style.backgroundColor = "white"
        card.appendChild(cardHeader);
        let closeCardButton = document.createElement('button');
        closeCardButton.style.position = "absolute";
        closeCardButton.style.right = "10px";
        closeCardButton.style.backgroundColor = "white";
        closeCardButton.style.border = "none";
        closeCardButton.style.top = "10px";
        closeCardButton.id = "deleteProjectButton" + cardNumber;
        cardHeader.appendChild(closeCardButton);
        let closeIcon = document.createElement('i');
        closeIcon.className = "fa fa-trash";
        closeCardButton.appendChild(closeIcon);
        let cardBody = document.createElement('div');
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        let cardTitle = document.createElement('h4');
        cardTitle.className = "card-title";
        cardTitle.id = "projectCardTitle" + cardNumber;
        cardTitle.innerText = project.projectName;
        cardHeader.appendChild(cardTitle);
        let cardText = document.createElement('p');
        cardText.className = "card-text";
        cardText.innerText = project.projectDescription;
        cardBody.appendChild(cardText);
        let editButton = document.createElement('button');
        editButton.style.border = "none";
        editButton.style.backgroundColor = "white";
        editButton.style.position = "absolute";
        editButton.style.bottom = "10px";
        editButton.style.left = "48%";
        editButton.id = "editProjectButton" + cardNumber;
        editButton.dataset.bsToggle = "modal";
        editButton.dataset.bsTarget = "#projectModal";
        cardBody.appendChild(editButton);
        let editIcon = document.createElement('i');
        editIcon.className = "fa fa-edit";
        editButton.appendChild(editIcon);
    });

    let addButton = document.getElementById('addProject');

    document.getElementById('navButtonProjects').classList.add('activeNavButton');
    document.getElementById('navButtonBugs').classList.remove('activeNavButton');
    document.getElementById('navButtonPeople').classList.remove('activeNavButton');

    if(addButton.classList.contains('hide')){
        addButton.classList.remove('hide');
        document.getElementById('addBug').classList.add('hide');
        document.getElementById('addPerson').classList.add('hide');
    }

    //adding event handlers for dynamic buttons
    for(let i = 0; i < appData.length; i++){
        document.getElementById('deleteProjectButton' + i).addEventListener('click', () => {deleteProjectClick(i)});
        document.getElementById('editProjectButton' + i).addEventListener('click', () => {editProjectClick(i)});
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function loadPeopleCards(){
    let addButton = document.getElementById('addPerson');
    let page = document.getElementById('dashboard');
    page.innerHTML = "";
    let row = document.createElement('div');
    row.className = "row";
    let colCounter = 0;
    let cardNumber = -1;
    page.appendChild(row);
    appData.map(project => {
        let index = -1;
        project.teamMembers.map(teamMember => {
            if(colCounter == 3){
                row = document.createElement('div');
                row.className = "row";
                page.appendChild(row);
                colCounter = 0;
            }
            colCounter++;
            cardNumber++;
            index++;
            let col = document.createElement('div');
            col.className = "col-md-4";
            row.appendChild(col);
            let card = document.createElement('div');
            card.className = "card";
            card.classList.add("card-hover-shadow");
            card.classList.add("mt-4");
            card.classList.add("mx-4");
            col.appendChild(card);
            let cardHeader = document.createElement('div');
            cardHeader.className = "card-header";
            cardHeader.style.backgroundColor = "white"
            card.appendChild(cardHeader);
            let closeCardButton = document.createElement('button');
            closeCardButton.style.position = "absolute";
            closeCardButton.style.right = "10px";
            closeCardButton.style.backgroundColor = "white";
            closeCardButton.style.border = "none";
            closeCardButton.style.top = "10px";
            closeCardButton.id = "deletePersonButton" + cardNumber;
            cardHeader.appendChild(closeCardButton);
            let closeIcon = document.createElement('i');
            closeIcon.className = "fa fa-trash";
            closeCardButton.appendChild(closeIcon);
            let cardBody = document.createElement('div');
            cardBody.className = "card-body";
            card.appendChild(cardBody);
            let cardTitle = document.createElement('h4');
            cardTitle.className = "card-title";
            cardTitle.id = "personCardTitle" + cardNumber;
            cardTitle.dataset.projectName = project.projectName;
            cardTitle.dataset.index = index;
            cardTitle.innerText = teamMember.firstName + " " + teamMember.lastName;
            cardHeader.appendChild(cardTitle);
            let cardText = document.createElement('p');
            cardText.className = "card-text";
            cardText.innerText = teamMember.role + "\nfor\n" + project.projectName;
            cardBody.appendChild(cardText);
            let editButton = document.createElement('button');
            editButton.style.border = "none";
            editButton.style.backgroundColor = "white";
            editButton.style.position = "absolute";
            editButton.style.bottom = "10px";
            editButton.style.left = "48%";
            editButton.id = "editPersonButton" + cardNumber;
            editButton.classList.add('btn');
            editButton.dataset.bsToggle = "modal";
            editButton.dataset.bsTarget = "#personModal";
            cardBody.appendChild(editButton);
            let editIcon = document.createElement('i');
            editIcon.className = "fa fa-edit";
            editButton.appendChild(editIcon);
        });
    });

    document.getElementById('navButtonPeople').classList.add('activeNavButton');
    document.getElementById('navButtonProjects').classList.remove('activeNavButton');
    document.getElementById('navButtonBugs').classList.remove('activeNavButton');

    if(addButton.classList.contains('hide')){
        addButton.classList.remove('hide');
        document.getElementById('addBug').classList.add('hide');
        document.getElementById('addProject').classList.add('hide');
    }

    let i = -1;
    appData.map(project => {
        project.teamMembers.map(() => {
            i++;
            let index = document.getElementById('personCardTitle' + i).dataset.index;
            let projectName = document.getElementById('personCardTitle' + i).dataset.projectName;
            document.getElementById('editPersonButton' + i).addEventListener('click', () => {editPersonClick(index, projectName)});
            document.getElementById('deletePersonButton' + i).addEventListener('click', () => {deletePersonClick(index, projectName)});
        });
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function loadBugCards(){
    let addButton = document.getElementById('addBug');
    let page = document.getElementById('dashboard');
    page.innerHTML = "";
    let row = document.createElement('div');
    row.className = "row";
    let colCounter = 0;
    let cardNumber = -1;
    page.appendChild(row);
    appData.map(project => {
        let index = -1;
        project.bugs.map(bug => {
            if(colCounter == 3){
                row = document.createElement('div');
                row.className = "row";
                page.appendChild(row);
                colCounter = 0;
            }
            colCounter++;
            cardNumber++;
            index++;
            let col = document.createElement('div');
            col.className = "col-md-4";
            row.appendChild(col);
            let card = document.createElement('div');
            card.className = "card";
            card.classList.add("card-hover-shadow");
            card.classList.add("mt-4");
            card.classList.add("mx-4");
            col.appendChild(card);
            let cardHeader = document.createElement('div');
            cardHeader.className = "card-header"
            if(bug.status == "resolved"){
                cardHeader.style.backgroundColor = "green";
            }
            else if(bug.status == "open"){
                cardHeader.style.backgroundColor = "orange";
            }else{
                cardHeader.style.backgroundColor = "red";
            }
            card.appendChild(cardHeader);
            let closeCardButton = document.createElement('button');
            closeCardButton.style.position = "absolute";
            closeCardButton.style.right = "10px";
            closeCardButton.style.backgroundColor = "transparent";
            closeCardButton.style.border = "none";
            closeCardButton.style.top = "10px";
            closeCardButton.id = "deleteBugButton" + cardNumber;
            cardHeader.appendChild(closeCardButton);
            let closeIcon = document.createElement('i');
            closeIcon.className = "fa fa-trash";
            closeIcon.style.backgroundColor = "transparent";
            closeCardButton.appendChild(closeIcon);
            let cardBody = document.createElement('div');
            cardBody.className = "card-body";
            card.appendChild(cardBody);
            let cardTitle = document.createElement('h4');
            cardTitle.className = "card-title";
            cardTitle.id = "bugCardTitle" + cardNumber;
            cardTitle.dataset.projectName = project.projectName;
            cardTitle.dataset.index = index;
            cardTitle.innerText = bug.summary;
            cardHeader.appendChild(cardTitle);
            let cardText = document.createElement('p');
            cardText.className = "card-text";
            cardText.innerText = "Project: " + project.projectName
                                + "\n" + "Priority: " + bug.priority
                                + "\n" + "Owner: " + bug.owner
                                + "\n" + "Status: " + bug.status
                                + "\n" + "Details: " + "\n"
                                + bug.details;
            cardBody.appendChild(cardText);
            let editButton = document.createElement('button');
            editButton.style.border = "none";
            editButton.style.backgroundColor = "white";
            editButton.style.position = "absolute";
            editButton.style.bottom = "10px";
            editButton.style.left = "48%";
            editButton.id = "editBugButton" + cardNumber;
            editButton.classList.add('btn');
            editButton.dataset.bsToggle = "modal";
            editButton.dataset.bsTarget = "#bugModal";
            cardBody.appendChild(editButton);
            let editIcon = document.createElement('i');
            editIcon.className = "fa fa-edit";
            editButton.appendChild(editIcon);
        });
    });

    document.getElementById('navButtonBugs').classList.add('activeNavButton');
    document.getElementById('navButtonProjects').classList.remove('activeNavButton');
    document.getElementById('navButtonPeople').classList.remove('activeNavButton');

    if(addButton.classList.contains('hide')){
        addButton.classList.remove('hide');
        document.getElementById('addProject').classList.add('hide');
        document.getElementById('addPerson').classList.add('hide');
    }

    let i = -1;
    appData.map(project => {
        project.bugs.map(() => {
            i++;
            let index = document.getElementById('bugCardTitle' + i).dataset.index;
            let projectName = document.getElementById('bugCardTitle' + i).dataset.projectName;
            document.getElementById('editBugButton' + i).addEventListener('click', () => {editBugClick(index, projectName)});
            document.getElementById('deleteBugButton' + i).addEventListener('click', () => {deleteBugClick(index, projectName)});
        });
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function populateCombobox(screen){
    if (screen == "people"){
        let cbx = document.getElementById('personProject');
        cbx.innerHTML = "";
        appData.map(project => {
            let option = document.createElement('option');
            option.value = project.projectName;
            option.innerText = project.projectName;
            cbx.appendChild(option);
        });
    }
    else{
        let cbx = document.getElementById('bugProject');
        cbx.innerHTML = "";
        appData.map(project => {
            let option = document.createElement('option');
            option.value = project.projectName;
            option.innerText = project.projectName;
            cbx.appendChild(option);
        });
    }
}
//event handler methods
function addProjectClick(){
    document.getElementById('projectModalTitel').innerText = "Add new project";
    document.getElementById('projectName').value = "";
    document.getElementById('projectDesc').value = "";
    delete document.getElementById('projectModal').dataset.edit;

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function submitNewProjectClick(){
    let projectName = document.getElementById('projectName').value;
    let projectDesc = document.getElementById('projectDesc').value;

    if (document.getElementById('projectModal').dataset.edit != undefined){
        const curProjectName = document.getElementById('projectModal').dataset.projectName;
        for(let i = 0; i < appData.length; i++){
            if(appData[i].projectName == curProjectName){
                appData[i] = new project(projectName, projectDesc);
                break;
            }
        }
    }
    else{
        let newProject = new project(projectName, projectDesc);
        document.getElementById('projectName').value = "";
        document.getElementById('projectDesc').value = "";
        appData.push(newProject);
    }

    saveData();
    loadProjectCards();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function deleteProjectClick(index){
    appData.splice(index, 1);
    saveData();
    loadProjectCards();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function editProjectClick(index){
    document.getElementById('projectModalTitel').innerText = "Edit project";
    document.getElementById('projectName').value = appData[index].projectName;
    document.getElementById('projectDesc').value = appData[index].projectDescription;
    document.getElementById('projectModal').dataset.edit = "edit";
    document.getElementById('projectModal').dataset.projectName = appData[index].projectName;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function submitNewPersonClick(){
    let projectName = document.getElementById('personProject').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let role = document.getElementById('role').value;
    let editIndex = document.getElementById('personModal').dataset.editIndex;
    let editProject = document.getElementById('personModal').dataset.editProject;
    if(editIndex != undefined){
        appData.map(project => {
            if(project.projectName == editProject){
                project.teamMembers[editIndex] = new person(firstName, lastName, role);
            }
        });
    }
    else{
        for(let i = 0; i < appData.length; i++){
            console.log(appData[i]);
            if(appData[i].projectName == projectName){
                appData[i].teamMembers.push(new person(firstName, lastName, role));
                break;
            }
        }
    }

    saveData();
    loadPeopleCards();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function deletePersonClick(index, projectName){
    for(let i = 0; i < appData.length; i++){
        if(appData[i].projectName == projectName){
            appData[i].teamMembers.splice(index, 1);
        }
    }

    saveData();
    loadPeopleCards();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function editPersonClick(index, projectName){
    document.getElementById('personModalTitel').innerText = "Edit person";

    populateCombobox("people");
    for(let i = 0; i < appData.length; i++){
        if(appData[i].projectName == projectName){
            document.getElementById('firstName').value = appData[i].teamMembers[index].firstName;
            document.getElementById('lastName').value = appData[i].teamMembers[index].lastName;
            document.getElementById('role').value = appData[i].teamMembers[index].role;
            document.getElementById('personProject').disabled = true;
        }
    }

    document.getElementById('personModal').dataset.editIndex = index;
    document.getElementById('personModal').dataset.editProject = projectName;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function addPersonClick(){
    document.getElementById('personModalTitel').innerText = "Add new person";
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('role').value = "";
    document.getElementById('personProject').disabled = false;
    populateCombobox("people");

    delete document.getElementById('personModal').dataset.editIndex;
    delete document.getElementById('personModal').dataset.editProject;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function submitNewBugClick(){
    let summary = document.getElementById('summary').value;
    let projectName = document.getElementById('bugProject').value;
    let owner = document.getElementById('owner').value;
    let group = document.getElementsByName('priority');
    let priority;
    group.forEach(item => {
        if(item.checked){
            priority = item.value;
        }
    });
    let status = document.getElementById('status').value;
    let details = document.getElementById('details').value;
    let editIndex = document.getElementById('bugModal').dataset.editIndex;
    let editProject = document.getElementById('bugModal').dataset.editProject;

    if(editProject != undefined){
        for(let i = 0; i < appData.length; i++){
            if(appData[i].projectName == projectName){
                appData[i].bugs[editIndex] = new bug(summary, details, owner, priority, status);
                break;
            }
        }
    }else{
        for(let i = 0; i < appData.length; i++){
            if(appData[i].projectName == projectName){
                appData[i].bugs.push(new bug(summary, details, owner, priority, status));
                break;
            }
        }
    }

    saveData();
    loadBugCards();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function addBugClick(){
    document.getElementById('bugModalTitel').innerText = "Add new bug";
    document.getElementById('summary').value = "";
    document.getElementById('status').value = "open";
    document.getElementById('details').value = "";
    populateCombobox();
    bugProjectChange(document.getElementById('bugProject').value);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function bugProjectChange(projectName){
    let cbx = document.getElementById('owner');
    cbx.innerHTML = "";
    for(let i = 0; i < appData.length; i++){
        if(appData[i].projectName == projectName){
            appData[i].teamMembers.map(teamMember => {
                let opt = document.createElement('option');
                opt.value = teamMember.firstName + " " + teamMember.lastName;
                opt.innerText = teamMember.firstName + " " + teamMember.lastName;
                cbx.appendChild(opt);
            });
            break;
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function deleteBugClick(index, projectName){
    for(let i = 0; i < appData.length; i++){
        if(appData[i].projectName == projectName){
            appData[i].bugs.splice(index, 1);
        }
    }

    saveData();
    loadBugCards();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////
function editBugClick(index, projectName){
    document.getElementById('bugModalTitel').innerText = "Edit bug";

    populateCombobox();
    bugProjectChange(projectName);
    for(let i = 0; i < appData.length; i++){
        if(appData[i].projectName == projectName){
            document.getElementById('summary').value = appData[i].bugs[index].summary;
            document.getElementById('bugProject').value = projectName;
            document.getElementById('owner').value = appData[i].bugs[index].owner;
            let group = document.getElementsByName('priority');
            group.forEach(item => {
                if(item.value == appData[i].bugs[index].priority){
                    item.checked = true;
                }
                else{
                    item.checked = false;
                }
            });
            document.getElementById('status').value = appData[i].bugs[index].status;
            document.getElementById('details').value = appData[i].bugs[index].details;
        }
    }

    document.getElementById('bugModal').dataset.editIndex = index;
    document.getElementById('bugModal').dataset.editProject = projectName;
}
//adding event handlers
document.getElementById('submitNewProject').addEventListener('click', submitNewProjectClick);
document.getElementById('addProject').addEventListener('click', addProjectClick);
document.getElementById('navButtonProjects').addEventListener('click', loadProjectCards);
document.getElementById('navButtonPeople').addEventListener('click', loadPeopleCards);
document.getElementById('navButtonBugs').addEventListener('click', loadBugCards);
document.getElementById('addPerson').addEventListener('click', addPersonClick);
document.getElementById('submitNewPerson').addEventListener('click', submitNewPersonClick);
document.getElementById('submitNewBug').addEventListener('click', submitNewBugClick);
document.getElementById('addBug').addEventListener('click', addBugClick)
document.getElementById('bugProject').addEventListener('change', () => {bugProjectChange(document.getElementById('bugProject').value)});
//init AppScreen
loadData()
loadProjectCards()