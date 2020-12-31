/* Laboplus function with close button */
var laboButton = document.getElementById("laboBtn");
var divLabo = document.getElementById("laboPopUp");
var bodyWrap = document.querySelector("body");
laboButton.addEventListener("click", laboPop);

function laboPop() {
  divLabo.classList.add("translate");
  bodyWrap.scrollIntoView();
  bodyWrap.classList.add("overflowY");
  if (closePop) {
    divLabo.style.display = "flex";
  }
}

var closeButton = document.getElementById("closeBtn");

closeButton.addEventListener("click", closePop);

function closePop() {
  divLabo.classList.remove("translate");
  bodyWrap.classList.remove("overflowY");
}

/* SmartphoneRepair function with close button */
var smartButton = document.getElementById("smartBtn");
var divSmart = document.getElementById("smartPopUp");

smartButton.addEventListener("click", smartPop);
function smartPop() {
  divSmart.classList.add("translate");
  bodyWrap.scrollIntoView();
  bodyWrap.classList.add("overflowY");
  if (closePop2) {
    divSmart.style.display = "flex";
  }
}

var closeButton2 = document.getElementById("closeBtn2");
closeButton2.addEventListener("click", closePop2);
function closePop2() {
  divSmart.classList.remove("translate");
  bodyWrap.classList.remove("overflowY");
}

/* ProElectro pop up function with close button  */

var electroButton = document.getElementById("electroBtn");
var divElectro = document.getElementById("electroPopUp");

electroButton.addEventListener("click", electroPop);
function electroPop() {
  divElectro.classList.add("translate");
  bodyWrap.scrollIntoView();
  bodyWrap.classList.add("overflowY");
  if (closePop3) {
    divElectro.style.display = "flex";
  }
}

var closeButton3 = document.getElementById("closeBtn3");

closeButton3.addEventListener("click", closePop3);

function closePop3() {
  divElectro.classList.remove("translate");
  bodyWrap.classList.remove("overflowY");
}
