let users_url = "http://localhost:3000/users";
let form = document.querySelector(".login_form");

// console.log(login_btn);
// console.log(form);

let username_inp = document.querySelector(".username");
let password_inp = document.querySelector(".password");

// let is_found_user = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(users_url)
    .then((res) => res.json())
    .then((users) => {
      let isLog = users.find(
        (x) =>
          x.username === username_inp.value && x.password == password_inp.value
      );

      if (isLog) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            isLogged: true,
            userID: isLog.id,
          })
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "./index.html";
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Wrong username or password!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  //   localStorage.setItem(
  //     "logged_users_ids_arr",
  //     JSON.stringify({
  //       user_id: user.id
  //     })
  //   );

  //   console.log(users);
  //   let is_found_user = false;
  //   let isLogged = false;
  //   if (JSON.parse(localStorage.getItem("isLoggedLocal"))) {
  //     isLogged = isLoggedLocal;
  //   }

  //   for (let user of users) {
  //     if (
  //       username_inp.value === user.username &&
  //       email_inp.value === user.email &&
  //       password_inp.value === user.password
  //     ) {
  //       is_found_user = true;
  //     } else {
  //       Swal.fire("Not found user");
  //     }
  //   }
});
