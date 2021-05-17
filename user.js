let URL = localStorage.getItem("myURL");

console.log(localStorage);

let xhr = new XMLHttpRequest();
xhr.open("GET", URL, true);

xhr.onload = function () {
  let resp = JSON.parse(this.responseText);
  document.querySelector("#userName").innerHTML = resp.name + " _About";
  createTable(resp);
};

function createTable(data) {
  let table = document.querySelector("#userTable");

  let row = table.insertRow(0);
  let cellName = row.insertCell(0);
  let cellLogin = row.insertCell(1);
  let cellType = row.insertCell(2);
  let cellCompany = row.insertCell(3);
  let cellMail = row.insertCell(4);

  cellName.innerHTML = data.name;
  cellLogin.innerHTML = data.login;
  cellType.innerHTML = data.type;
  cellCompany.innerHTML = data.company;
  // cellMail.innerHTML = data.login + "@yahoo.com";

  let clickMail = document.createElement("a");
  let createTextNode = document.createTextNode(data.login + "@yahoo.com");
  clickMail.setAttribute("href", "mailto:" + data.login + "@yahoo.com");
  clickMail.appendChild(createTextNode);
  cellMail.innerHTML = clickMail.outerHTML;

  return table;
}

xhr.send();
