const fetch = require("isomorphic-fetch");

module.exports.verify = (req, res) => {
  const token = req.body.token;
  //   console.log("server side", req.body);
  const secret_key = "6LcSrqoZAAAAAADgBLi85V2RexZiygR3Nr3trFrz";
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => res.json({ google_response }))
    .catch((error) => res.json({ error }));
};
