// Sign Up
// localStorage.clear()
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

// Log In

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
        localStorage.setItem("token", response.data.token);
        window.location.href = "./expense.html";
      } else {
        throw new Error("Failed to login");
      }
    })
    .catch((err) => alert(err.message));
}

// Adding Expense

function addnewExpense(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  let expenseDetails = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("des").value,
    category: document.getElementById("cat").value,
  };

  axios
    .post("http://localhost:3000/expense/addexpense", expenseDetails, {
      headers: { Authorization: token },
    })
    .then((response) => {
      alert("Expense Added");
    })
    .catch((err) => {
      console.log(err);
    });
  showNewUseronScreen(expenseDetails);
}

function showNewUseronScreen(expenseDetails) {
  const d = document.getElementById("ul");
  const li = `<li id="${expenseDetails.amount}" class="li"><div class="lidiv"> ${expenseDetails.amount},${expenseDetails.description},${expenseDetails.category}</div>
     <button onclick = editUser('${expenseDetails.amount}','${expenseDetails.description}','${expenseDetails.category}') class="editbtn"> Edit </button> 
     <button onclick = deleteExpense('${expenseDetails.amount}') class="deletebtn"> Delete </button> 
      </li>`;
  d.innerHTML = d.innerHTML + li;
}

//  Fetching all the expenses of user from DB

window.addEventListener("DOMContentLoaded", (event) => {
  const token = localStorage.getItem("token");

  // console.log(token)
  event.preventDefault();
  axios
    .get("http://localhost:3000/expense/getexpense", {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.data.user.isPremium == true) {
        document.querySelector(".nav").classList.add("premium");
        document.querySelector(".wrapper").classList.add("premium");
        document.querySelector(".footer").classList.add("premium");
        let pop = document.getElementById("pop");
        let btn = `<a href="./premiumExpenses.html"id="popbtn">Hit Me!!!!</a>`;
        pop.innerHTML += btn;
        document.querySelector("#premiumbtn").remove();
      }
      const d = document.getElementById("ul");
      for (let i = 0; i < response.data.data.length; i++) {
        const li = `<li id="${response.data.data[i].amount}" class="li"> <div class="lidiv">${response.data.data[i].amount},${response.data.data[i].description},${response.data.data[i].category}</div>
             
            <button onclick = deleteExpense('${response.data.data[i].id}') class="deletebtn"> Delete </button> 
             </li>`;
        d.innerHTML = d.innerHTML + li;
      }
    });
});

// Deleting the expense

function deleteExpense(expenseId) {
  const token = localStorage.getItem("token");

  axios
    .delete(`http://localhost:3000/expense/deleteexpense/${expenseId}`, {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}

// go premium
const URLTOBACKEND = "http://localhost:3000/";
const EMAILID = "muzammildoc@gmail.com";
const PHONENO = 9110821690;
async function gopremium(event) {
  const token = localStorage.getItem("token");
  event.preventDefault();
  const response = await axios.get("http://localhost:3000/premium", {
    headers: { Authorization: token },
  });
  var options = {
    key: response.data.key_id,
    name: "Muzammil Shaikh",
    order_id: response.data.order.id,
    prefill: {
      name: "Muzammil Shaikh",
      email: `${EMAILID}`,
      contact: `${PHONENO}`,
    },
    theme: {
      color: "#3399cc",
    },

    //This handler function will handle the success payment
    handler: function (response) {
      console.log(response);
      axios
        .post(
          `http://localhost:3000/updatetransactionstatus`,
          {
            orderId: options.order_id,
            paymentId: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
          document.querySelector(".nav").classList.add("premium");
          document.querySelector(".wrapper").classList.add("premium");
          document.querySelector(".footer").classList.add("premium");
          let nav = document.getElementById("nav");
          let btn = document.createElement("button");
          nav.append(btn);
          document.querySelector("#premiumbtn").remove();
        })
        .catch(() => {
          console.log("Something went wrong. Try Again!!!");
        });
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();

  rzp1.on("payment.failed", function (response) {
    // alert(response.error.code);
    // alert(response.error.description);

    console.log(response);
  });
}

// Forgot Password
function resetPassword(event) {
  event.preventDefault();
  console.log("Hello");
}
