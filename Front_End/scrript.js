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
        window.location.href = "./expense.html";
      } else {
        throw new Error("Failed to login");
      }
    })
    .catch((err) => alert(err.message));
}

function addnewExpense(event) {
  event.preventDefault();
 
  let expenseDetails = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("des").value,
    category: document.getElementById("cat").value,
  };
  
  axios
    .post("http://localhost:3000/expense/addexpense", expenseDetails)
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
     <button onclick = deleteUser('${expenseDetails.amount}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
      </li>`
d.innerHTML=d.innerHTML + li
   }

window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  axios.get("http://localhost:3000/expense/getexpense")
  .then((response) => {
    const d = document.getElementById("ul");
    for (let i = 0; i < response.data.data.length; i++) {
      const li = `<li id="${response.data.data[i].amount}"> ${response.data.data[i].amount},${response.data.data[i].description},${response.data.data[i].category}
            <button onclick = editUser('${response.data.data[i].amount}','${response.data.data[i].description}','${response.data.data[i].category}')> Edit </button> 
            <button onclick = deleteUser('${response.data.data[i].amount}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
             </li>`;
      d.innerHTML = d.innerHTML + li;
    }
  });
});
