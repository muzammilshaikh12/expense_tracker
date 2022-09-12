function createUser(event) {
    event.preventDefault()

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let userDetails = {
        name : name,
        email:email,
        password:password
    }
axios.post('http://localhost:3000/users/signup',userDetails)
.then(result=>{
   if(result.status == 201) {
    window.location.href='./login.html'
   } else {
    throw new Error ('Failed to Login')
   }
})
.catch(err=>{
    alert(err)
})
}

function login(event) {
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
let details = {
    email : email,
    password: password
}
    localStorage.setItem(email,JSON.stringify(details))
}