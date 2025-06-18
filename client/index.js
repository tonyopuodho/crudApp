const bodyElement = document.getElementById('tbody');
const searchBtn = document.getElementById('searchBtn');
const editBody = document.getElementById('vbody');
const searchInput = document.getElementById('search')
const messageBar = document.querySelector('.mesg')
const messageElement = document.getElementById('msg')
const viewElement = document.querySelector('.view-table')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const phoneElement = document.getElementById('phone')
const emailElement = document.getElementById('email')
const firstnamev = document.getElementById('vfirstname')
const lastnamev = document.getElementById('vlastname')
const phoneElementv = document.getElementById('vphone')
const emailElementv = document.getElementById('vemail')
const editButton = document.getElementById('editBtn')
const closeBtn = document.getElementById('closeBtn')
const view = document.querySelector('.view-element')

async function displaytableBody() {
    const results = await fetch('http://localhost:5000/api/users',{method:'GET'})
    const response = await results.json()
    response.forEach((user) => {
        const {firstName, lastName,email,phone,id} = user
        bodyElement.innerHTML += `
          <tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <button data-id=${id} class="view-row-btn">View</button>
                <button data-id=${id} class="edit-row-btn">Edit</button>   
                <button data-id=${id} class="delete-row-btn">Delete</button>
            </td>
         </tr>
        
        `
    })
}

searchBtn.addEventListener('click',() => {
    const userinfo = searchInput.value;
    fetch('http://localhost:5000/api/search',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstName:userinfo,
            lastName:userinfo,
            email:userinfo,
            phone:userinfo
        })        
    })
    .then(response => response.json())
    .then(results => displaySingleUser(results))

    searchInput.value = '';
})

let displaySingleUser = (user) => {
    bodyElement.innerHTML = '';
    if (user.length > 0 ) {
        user.forEach((details) => {
            const {firstName,lastName,email,phone,id} = details
            bodyElement.innerHTML += `
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>
                    <button data-id=${id} class="view-row-btn">View</button>
                    <button data-id=${id} class="edit-row-btn">Edit</button>   
                    <button data-id=${id} class="delete-row-btn">Delete</button>
                </td>
            </tr>
            `
        })
   } else{
    
    bodyElement.innerHTML = `
         <tr>
                <td colspan="5">User not found</td>
        </tr>
    `
    
   }
}


let deleteuser = () => {
    bodyElement.addEventListener('click', (event) => {
            
        if (event.target.className === "delete-row-btn") {
                const buttonId = event.target.dataset.id
                deleterowId(buttonId);
        } 
        
    }) 
}

let edituser = () => {
    bodyElement.addEventListener('click', (event) => {
        if (event.target.className === "edit-row-btn") {

            viewElement.classList.add('active')
            const editId = event.target.dataset.id
            editRow(editId)
            editDetails(editId)

        }
    })
}


let editRow = (id) => {
    fetch('http://localhost:5000/api/users/' + id,{method:'GET'})
    .then(response => response.json())
    .then(results => {
        results.forEach((names) => {
            const {firstName,lastName,email,phone} = names
            firstname.value = firstName
            lastname.value = lastName
            emailElement.value = email
            phoneElement.value = phone
        })
    })

}

let editDetails = (id) => {
    editButton.addEventListener('click', () => {
        fetch('http://localhost:5000/api/users',{method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                firstName:firstname.value,
                lastName:lastname.value,
                email:emailElement.value,
                phone:phoneElement.value,
                id:id
            })
        })
        .then(response => response.json())
        .then(result => displayDeletemessage(result))

        viewElement.classList.remove('active')
    })

}

let displayRow = () => {
    bodyElement.addEventListener('click', (event) => {
        if (event.target.className === "view-row-btn") {
            view.classList.add('active')
            const viewId = event.target.dataset.id
            console.log(viewId)
            rowsData(viewId)
        }
    })
}

let rowsData = (id) => {
    fetch('http://localhost:5000/api/users/' + id,{method:'GET'})
    .then(response => response.json())
    .then(results => {
        console.log(results)
        results.forEach((names) => {
            const {firstName,lastName,email,phone} = names
            firstnamev.value = firstName
            lastnamev.value = lastName
            emailElementv.value = email
            phoneElementv.value = phone
        })
    })    
}

closeBtn.addEventListener('click',() => {
    view.classList.remove('active')
})


let deleterowId = (id) => {

      fetch(`http://localhost:5000/api/users/` + id,{method:'DELETE'})
      .then(response => response.json())
      .then(results => displayDeletemessage(results))

}

let displayDeletemessage = (msg) => {
   
    msg.forEach((messages) => {
        messageBar.classList.add('active')
        const { message } = messages
        messageElement.innerHTML = message
    })

    setInterval(() => {

        messageBar.classList.remove('active')
        location.reload()

    },2000)
}

displayRow();
deleteuser();
edituser();
displaytableBody();
