// jshint esversion:8

// CHECK FOR DATE ELEMENT AND INSERT IF FOUND
if (document.body.contains(document.getElementById("date"))) {
  var dateTime = Date();
  document.getElementById("date").textContent = dateTime;
}

// ADD EVENT LISTENERS
var e = document.getElementById("criteria");
if (e) {
  e.addEventListener("change", showDropdown);
}

// DROPOWN FUNCTION
function showDropdown() {

  if (criteria.value > 0) {
    $(".serviceSearchButton").css("display", "block");
  } else {
    $(".serviceSearchButton").css("display", "none");
  }

  if (criteria.value > 0 && criteria.value < 3 || criteria.value == 6) {
    $(".searchBox").css("display", "block");
  } else {
    $(".searchBox").css("display", "none");
  }


  if (criteria.value == 3) {
    $(".driverSearch").css("display", "block");
  }

  if (criteria.value == 4) {
    $(".driverSearch").css("display", "none");
  }

  if (criteria.value == 5) {
    $(".driverSearch").css("display", "none");
  }

  if (criteria.value == 6) {
    $(".driverSearch").css("display", "none");
  }
}

// FETCH DATABASE FROM API AND STORE
const url = "https://portal-service-tracker.herokuapp.com/testing";

console.log("woah");

if (document.getElementById("openTable")) {
  fetch(url)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      appendData(data);
    })
    .catch(function(err) {
      alert("Something's fucky!!");
      console.log(err);

    });
}

// INSERT DATA INTO TABLE
function appendData(data) {
  for (i = 0; i < data.customers.length; i++) {
    var table = document.getElementById("openTable");
    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data.customers[i].ticket_no;
    cell2.innerHTML = data.customers[i].name;
    cell3.innerHTML = data.customers[i].street;

  }

}

const customerForm = document.getElementById("customerForm");

if (customerForm) {
  customerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let form = e.currentTarget;
    let url = form.action;

    try {
      let formData = new FormData(form);
      let responseData = await postFormFieldsAsJson({
        url,
        formData
      });

      let {
        serverDataResponse
      } = responseData;
      console.log(serverDataResponse);
    } catch (error) {
      console.error(error);
    }
  });

}
async function postFormFieldsAsJson({
  url,
  formData
}) {
  console.log(url);
  console.log(formData);
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataJsonString = JSON.stringify(formDataObject);

  let fetchOptions = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": ""*"",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  let res = await fetch(url, fetchOptions);

  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  // console.log(res);
  return res;
}
