var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1337/photomatons', true)

xhr.onload = function (r) {
  let resp = JSON.parse(r.currentTarget.response)
  console.log(resp)
};

xhr.send(null)