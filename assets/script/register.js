let form = document.querySelector(".register_form");

let users_url = "http://localhost:3000/users";
let login_btn = document.querySelector(".login");

// console.log(form);

let username_inp = form.querySelector(".username");
let password_inp = form.querySelector(".password");
let email_inp = form.querySelector(".email");
let balance_inp = form.querySelector(".balance");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //   console.log(username_inp.value);
  let new_user = {
    username: username_inp.value,
    password: password_inp.value,
    emai: email_inp.value,
    balance: balance_inp.value,
  };
  console.log(new_user);

  fetch(users_url)
    .then((res) => res.json())
    .then((users) => {
      if (users.find((user) => user.username === username_inp.value)) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Invalid username!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        fetch(users_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_user),
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You can login now!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "./login.html";
        });
      }
    });
});
