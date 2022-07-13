// data fetching
const inputDaysDOM = document.getElementById("inputDays");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");
const threadSectionDOM = document.querySelector(".thread-section");

//Modal
const buttonOpen = document.getElementById('modalOpen');
const modal = document.getElementById('easyModal');
const buttonClose = document.getElementsByClassName('modalClose')[0];
const messageArea = document.getElementById("message");

let inputDays = "";
let inputContentText = "";

const getAllMembers = async function(inputDays)  {
    try{
     let allMembers = await axios.get(`/api/v1/list?ds=${inputDays}`);
     let { data } = allMembers;
    if(allMembers.data.length > 0 ){
        let headerTable = `
            <table><tr class='result_table'>
                <th>id</th>
                <th>displayName</th>
                <th>Email</th>
                <th>lastActivityAt</th>
                <th>active</th>
                <th>license</th>
                <th>role</th>
                <th>select</th>
            </tr>`;
        allMembers = data.map((thread) => {
            const { id, email ,displayName, lastActivityAt ,active ,license ,role} = thread;
            return `
            <tr>
            <td>${id}</td>
            <td>${displayName}</td>
            <td>${email}</td>
            <td>${lastActivityAt}</td>
            <td>${active}</td>
            <td>${license}</td>
            <td>${role}</td>
            <td><input type="checkbox" name='user_id' value="${id}"></td>
            </tr>
            `
        })
        .join("");
        let footerTable = `</table>`;
        threadSectionDOM.innerHTML = headerTable + allMembers + footerTable;
    }else{
        threadSectionDOM.innerHTML = "No Result";
    }
    }catch(err){
        console.log(err);
    }

};

const updateUsers = async function(uid,evt) {
    try{
        console.log('/api/v1/update-start');
        const ress = await axios.get(`/api/v1/update?ds=${uid}&evt=${evt}`);
        console.log('/api/v1/update-end');
        return ress['data'];
    }catch(err){
        console.log('err');
    }
}

const updateUserList = async function(evt)  {
    try{
        let uid = document.getElementsByName("user_id");
        const arr = [];
        var ErrUserObj = [];

        // console.log('1:' + evt + 'start');
        for (let i = 0; i < uid.length; i++) {
            if (uid[i].checked) {
              arr.push(uid[i].value);
            }
        }
        if(arr.length > 0){
            for (let i = 0; i < arr.length; i++) {
                let UpdateResult = await updateUsers(arr[i],evt);
                // console.log('2:update of ' + arr[i] + 'end');
                if(UpdateResult.name == 'AxiosError') {
                    ErrUserObj.push({
                        id: arr[i],
                        message:  UpdateResult.message
                       });

                    // console.log('3:push error user list end');
                }else{
                    // console.log('not error');
                }
            } 
            // console.log('4:return error user list end');
            return ErrUserObj;
        } else {
            return 'nocheck';
        }
    }catch(err){
        console.log(err);
    }
}


document.getElementById("submitButton").onclick = async (e) => {
    e.preventDefault();
    inputDays = inputDaysDOM.value;
    getAllMembers(inputDays);

};

document.getElementById("deactivateButton").onclick = async (e) => {
    e.preventDefault();
    const result = await updateUserList("deactivate");
    // console.log('5:"call modal open with ' + result);
    if(result == 'nocheck'){
        alert('please select users');
    }else{
        modalOpen(result);
    }
    
};


document.getElementById("activateButton").onclick = async (e) => {
    e.preventDefault();
    const result = await updateUserList("activate");
    // console.log('5:"call modal open with ' + result);
    if(result == 'nocheck'){
        alert('please select users');
    }else{
        modalOpen(result);
    }
};

function modalOpen(errorlist) {
    // console.log("open-modal");
    let userIDlist = '';
    let msg = '';
    for (let i = 0; i < errorlist.length; i++) {
        userIDlist = userIDlist + errorlist[i].id + " : " + errorlist[i].message + '<br />' ;
    }
    // userIDlist = userIDlist.replace(/,\s*$/, "");
    if(errorlist.length > 0) {
        msg = "<p>Can't update users </p>" + userIDlist ;   
    }else{
        msg =  "Updated!";
    }
    messageArea.innerHTML = msg;
    modal.style.display = 'block';
}

// Click X 
buttonClose.addEventListener('click', modalClose);
async function modalClose() {
    inputDays = inputDaysDOM.value;
    await getAllMembers(inputDays);
    modal.style.display = 'none';
//   e.preventDefault();
}

// Click outside of modal
addEventListener('click', outsideClose);
function outsideClose(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}