function createUser(event) {
    let name = document.getElementById('name').value
   
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let userDetails = {
        name : name,
        email:email,
        password:password
    }

    localStorage.setItem(JSON.stringify(userDetails.email),JSON.stringify(userDetails))
}