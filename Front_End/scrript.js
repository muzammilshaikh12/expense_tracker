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
    alert('Successfully Signed up')
    window.location.href='./login.html'
   } else {
    throw new Error ('Failed to Signup')
   }
})
.catch(err=>{
    alert(err.response.data.message)
    // alert(err)
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
    axios.post('http://localhost:3000/users/login', details)
    .then(response=>{
        if(response.status == 200){
            console.log(response)
            alert('Successfully Logged in')
        }else {
            throw new Error ('Failed to login')
        }
    })
    .catch(err=>alert(err.message))
}