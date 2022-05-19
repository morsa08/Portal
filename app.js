var dateTime = Date();
document.getElementById("date").textContent = dateTime;

var e = document.getElementById("criteria");
e.addEventListener("change", showDropdown);

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