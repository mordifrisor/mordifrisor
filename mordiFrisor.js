
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
let tbody = document.getElementById("tbody")









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

 /* inpSalong.value= ""; */
};

skjema.onsubmit = regNewOrder ;


function showOrder(snapshot) {
  let order = snapshot.val();
  tbody.innerHTML += `
    <tr>
      <td> ${order.navn} </td>
      <td> ${order.klipp} </td>
      <td> ${order.salong} </td>
      <td> ${order.behandler}</td>
    </tr>
    `; 
    }

 

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

// kan man lage slette knapp for enkelt bestillinger?

// endre "Få jobb" til "Jobb"