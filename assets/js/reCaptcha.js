function handleClick(token) {
  return function () {
    var data = {
      token: token,
    };
    // console.log(token);
    fetch("/send", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((text) => {
        if (text.substr(30, 4) === "true") {
          console.log("i will submit");
          document.getElementsByTagName("form")[0].submit();
        }
      })
      .catch((error) => console.log(error));
  };
}

grecaptcha.ready(function () {
  grecaptcha
    .execute("6LcSrqoZAAAAAK0aeqX8ASYUggxQ5iPshTnahzeb", { action: "demo" })
    .then(function (token) {
      document
        .querySelector("#send_button")
        .addEventListener("click", handleClick(token));
    });
});
