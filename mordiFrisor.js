
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCR9VLAoNClN8WtLQyBj2O3UdJG9FGcYPM",
    authDomain: "mordifrisor-472cd.firebaseapp.com",
    databaseURL: "https://mordifrisor-472cd.firebaseio.com",
    projectId: "mordifrisor-472cd",
    storageBucket: "mordifrisor-472cd.appspot.com",
    messagingSenderId: "1061841958822",
    appId: "1:1061841958822:web:f6c616a39e8c20f1174167"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




const skjema = document.getElementById("skjema");

var database = firebase.database();
const orders = database.ref("orders");


const inpNavn = document.getElementById("navn");
const inpSalong = document.getElementById("salong");
const inpBehandler = document.getElementById("behandler");
const inpKlipp = document.getElementById("klipp");

let orderTable = document.getElementById("orderTable");
let tbody = document.getElementById("tbody");

var loginSite = document.getElementById("loginSite");
const regNewUsername = document.getElementById("regNewUsername");
const regNewPassword = document.getElementById("regNewPassword");

const passwordInp = document.getElementById("password");
const usernameInp = document.getElementById("username");

let users = database.ref("users")


function regNewOrder(evt){
  evt.preventDefault();


  var chosenIndex1 = inpSalong.selectedIndex;
  var chosenSalon = inpSalong[chosenIndex1];



  var chosenIndex2 = inpBehandler.selectedIndex;
  var chosenBehandler = inpBehandler[chosenIndex2];



  var chosenIndex3 = inpKlipp.selectedIndex;
  var chosenKlipp = inpKlipp[chosenIndex3];


    var newOrder = {
    navn: `${inpNavn.value}`,
    salong: `${inpSalong.value}`,
    behandler: `${inpBehandler.value}`,
    klipp: `${inpKlipp.value}`
  } ;


 orders.push(newOrder);
 inpNavn.value = "";
 inpSalong.selectedIndex = 0;
 inpKlipp.selectedIndex = 0;
 inpBehandler.selectedIndex = 0;

window.alert("Din time er bestilt!")
};

skjema.onsubmit = regNewOrder ;





function regNewUser() {

  var newUser = {
    username: `${regNewUsername.value}`,
    password: `${regNewPassword.value}`,
  };

  users.push(newUser);

  window.alert("du er registrert" + " " + regNewUsername.value + "!");
  regNewUsername = "";
  regNewPassword = "";
}





function hide(imgId, pk) {
 var img = document.getElementById(imgId);
 var row = document.getElementById(pk);

 img.style.display = "none"
 row.style.backgroundColor = "transparent"
  row.style.color = "black";
}

function show(imgId, pk) {
 var img = document.getElementById(imgId);

 var row = document.getElementById(pk);


 img.style.display = "grid";
 row.style.backgroundColor = "rgb(240 150 66)";
 row.style.color = "white";

}

function showOrder(snapshot) {
  let order = snapshot.val();
  var pk = snapshot.key; // skaffer oss primærnøkkelen jæ
  var imgId = pk + "img";

  tbody.innerHTML += `
    <tr id="${pk}" 
        onmouseover="show('${imgId}','${pk}');" 
        onmouseout="hide('${imgId}','${pk}');">
      <td> ${order.navn} </td>
      <td> ${order.klipp} </td>
      <td> ${order.salong} </td>
      <td> ${order.behandler}</td>
      <td class="closeTd"> 
        <img class="delete" 
              id="${imgId}" 
              src="images/close.png"
              onclick="deleteOrder('${pk}');"
      </td>
    </tr>`;}

function showAllOrders() {
  tbody.innerHTML = "";
  orders.on("child_added", showOrder);
};



/* hvorfor får jeg ikke kjørt funksjonen min??*/


function searchFunction() {

// Bestemmer de ulike variablene

var input, filter, tr, td, i, txtValue;
input = document.getElementById("input");
filter = input.value.toUpperCase();
tr = orderTable.getElementsByTagName("tr");

/* Looper gjennom alle radene [i] og gjemmer de som ikke
 macher med input tr[i].style.display ="none" */

 /* bruker toUpperCase gjennom funksjonen så søket ikke vil bestemmes 
 av små eller store bokstaver (mordi = MoRdI) */

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



function deleteOrder(pk) {
  var order = orders.child(pk);
  order.remove();
  var row = document.getElementById(pk);
  tbody.removeChild(row);
}




function usernameTest(snapshot) {
  let user = snapshot.val();


  if(passwordInp.value == user.password && usernameInp.value == user.username) {



window.open("javaTest.html");

}


else {


  }

}


//if else = added child window.alert = feil brukernavn else {} også hvos det er riktig brukernavn så tømmes den.
// hva gjøre med at pop up blockes? dette gjør at jeg ikke kan fjerne det som står i input fordi da må man trykke i toppen liksom

function passwordTest() {

users.on("child_added", usernameTest);

}

// kan man lage slette knapp for enkelt bestillinger?

// endre "Få jobb" til "Jobb"