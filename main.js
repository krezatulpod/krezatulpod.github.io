let xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/users", true);
let myJson = [];
xhr.onload = function () {
  let dataLoaded = JSON.parse(this.responseText);
  myJson.push(dataLoaded);
  createTable(dataLoaded);
};

xhr.send();

function createTable(data) {
  let dataThatINeed = data.map((elem) => {
    return elem;
  });

  let objectEntries = ["id", "login", "url", "type", "mail"];

  document.querySelector("#userData").innerHTML = "";

  for (let i = 0; i < dataThatINeed.length; i++) {
    let tableTemplate = document.querySelector("#table-template").innerHTML;
    for (let a = 0; a < objectEntries.length; a++) {
      tableTemplate = tableTemplate.replace(
        "{{" + objectEntries[a] + "}}",
        function (x) {
          if (x == "{{url}}") {
            let createLink = document.createElement("a");
            createLink.innerHTML = dataThatINeed[i][objectEntries[a]];
            createLink.setAttribute("onclick", `sendData(this.innerHTML)`);
            createLink.setAttribute("href", "users.html");

            return createLink.outerHTML;
          } else {
            return dataThatINeed[i][objectEntries[a]];
          }
        }
      );
    }

    document.querySelector("#userData").innerHTML += tableTemplate;
    sendMail(dataThatINeed, document.querySelector("#mailFormat"), i);
  }
  return dataThatINeed;
}

function sendMail(data, cell, index) {
  let populateMail = cell;
  let myData = data;

  let createButton = document.createElement("button");
  createButton.setAttribute("type", "button");
  createButton.setAttribute("data-bs-toggle", "modal");
  createButton.setAttribute("data-bs-target", "#exampleModal");
  createButton.innerHTML = "Send E-mail";
  createButton.classList.add("btn", "btn-primary");

  console.log(myData);
  populateMail.id = "mailFormat" + index;
  createButton.id = "modalBtn" + index;

  document.querySelector("#mailFormat" + index).appendChild(createButton);

  console.log(document.querySelector("#modalBtn" + index));
  document
    .querySelector("#modalBtn" + index)
    .setAttribute("onclick", "sendToIt(this.parentElement.parentElement)");
}

function sendToIt(buttonData) {
  let userName = buttonData.children[1].innerHTML;
  let createButton = document.createElement("button");
  createButton.classList.add("btn", "btn-primary");
  createButton.setAttribute("type", "submit");
  createButton.setAttribute("URL", userName + "@yahoo.com");

  createButton.innerHTML = "Send @" + userName;

  let createCloseButton = document.createElement("button");
  createCloseButton.classList.add("btn", "btn-secondary");
  createCloseButton.setAttribute("data-bs-dismiss", "modal");
  createCloseButton.setAttribute("type", "button");
  createCloseButton.innerHTML = "Close";
  document.querySelector(".modal-footer").innerHTML =
    createCloseButton.outerHTML + createButton.outerHTML;

  return true;
}

function orderTable(col, myData) {
  let colOrder = col.getAttribute("data-order");
  let colName = col.getAttribute("data-id");
  let data = myData[0];
  let newOrder = [];

  if (colOrder == "desc") {
    col.setAttribute("data-order", "asc");
    document.querySelector("#" + colName).innerHTML = "&#9650";
    newOrder = data.sort(function (first, second) {
      if (first[colName] > second[colName]) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    col.setAttribute("data-order", "desc");
    document.querySelector("#" + colName).innerHTML = "&#9660";
    newOrder = data.sort(function (first, second) {
      if (first[colName] < second[colName]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  createTable(newOrder);
}

function sendData(clickName) {
  localStorage.setItem("myURL", clickName);
  return false;
}
