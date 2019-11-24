var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://128.199.44.66:1337/photomatons', true)

xhr.onload = function (r) {
  let resp = JSON.parse(r.currentTarget.response)
  console.log(resp)
};

xhr.send(null)