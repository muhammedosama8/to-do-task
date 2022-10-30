const form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    submit: document.getElementById("submit"),
  };
 form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "https://reqres.in/api/login";
  
    fetch(login, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = 'pages/home.html';
      })
      .catch((err) => {
        console.log(err);
      });
  });
