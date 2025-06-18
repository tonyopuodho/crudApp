const firstNameElement = document.getElementById('firstname');
const lastNameElement = document.getElementById('lastname');
const emailElement = document.getElementById('email');
const phoneElement = document.getElementById('phone');
const submitBtn = document.getElementById('adduser');
const messageBar = document.querySelector('.msg');
const messageElement = document.getElementById('message')


submitBtn.addEventListener('click',() => {
    const fname = firstNameElement.value;
    const lname = lastNameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    
    fetch('http://localhost:5000/api/users',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstName:fname,
            lastName:lname,
            email:email,
            phone:phone
        })
    })
    .then(response => response.json())
    .then(result => displaymessage(result))

    firstNameElement.value = '';
    lastNameElement.value = '';
    emailElement.value = '';
    phoneElement.value = '';
})

let displaymessage = (msg) => {
    msg.forEach((mess) => {
        const { message } = mess
        messageElement.innerHTML = message
        messageBar.classList.add('active')
    })

    setTimeout(()=>{
        messageBar.classList.remove('active')
    },2000)

}