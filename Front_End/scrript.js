function createUser(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let userDetails = {
    name: name,
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:3000/users/signup", userDetails)
    .then((result) => {
      if (result.status == 201) {
        alert("Successfully Signed up");
        window.location.href = "./login.html";
      } else {
        throw new Error("Failed to Signup");
      }
    })
    .catch((err) => {
      console.log(err);
      // alert(err)
    });
}

function login(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let details = {
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:3000/users/login", details)
    .then((response) => {
      if (response.status == 200) {
        console.log(response);
        alert("Successfully Logged in");
        localStorage.setItem('token',response.data.token)
        window.location.href = "./expense.html";
      } else {
        throw new Error("Failed to login");
      }
    })
    .catch((err) => alert(err.message));
}

function addnewExpense(event) {
  event.preventDefault();
 const token = localStorage.getItem('token')
  let expenseDetails = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("des").value,
    category: document.getElementById("cat").value,
  };
  
  axios
    .post("http://localhost:3000/expense/addexpense", expenseDetails,{headers: {"Authorization": token}} )
    .then((response) => {
      alert("Expense Added"), console.log(response);
      
    })
    .catch((err) => {
      console.log(err);
    });
    showNewUseronScreen(expenseDetails)
}

function showNewUseronScreen(expenseDetails){
    const d=document.getElementById('ul')
    const li= `<li id="${expenseDetails.amount}" class="expenses"> ${expenseDetails.amount},${expenseDetails.description},${expenseDetails.category}
     <button onclick = editUser('${expenseDetails.amount}','${expenseDetails.description}','${expenseDetails.category}')> Edit </button> 
     <button onclick = deleteExpense('${expenseDetails.amount}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
      </li>`
d.innerHTML=d.innerHTML + li
   }

window.addEventListener("DOMContentLoaded", (event) => {
  const token = localStorage.getItem('token')
  console.log(token)
  event.preventDefault();
  axios.get("http://localhost:3000/expense/getexpense", {headers: {"Authorization": token}})
  .then((response) => {
     const d = document.getElementById("ul");
    for (let i = 0; i < response.data.data.length; i++) {
      const li = `<li id="${response.data.data[i].amount}"> ${response.data.data[i].amount},${response.data.data[i].description},${response.data.data[i].category}
            <button onclick = editUser('${response.data.data[i].amount}','${response.data.data[i].description}','${response.data.data[i].category}')> Edit </button> 
            <button onclick = deleteExpense('${response.data.data[i].id}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
             </li>`;
      d.innerHTML = d.innerHTML + li;
    }
  });
});


function deleteExpense(expenseId) {
    const token = localStorage.getItem('token')
    // console.log(expenseId)
    axios.delete(`http://localhost:3000/expense/deleteexpense/${expenseId}`, {headers: {"Authorization": token}})
    .then(response=>{
        console.log(response)
        removeUserfromScreen(expenseId)
    })
    .catch(err=>console.log(err))
}

function removeUserfromScreen(expenseId){
const id = `expense-${expenseId}`
document.getElementById(id).remove()
}