$(document).ready(() => {
    const amenities = {};
 
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(":checked")) {
        amenities[$(this).attr("data-id")] = $(this).attr("data-name");
      } else {
        delete amenities[$(this).attr("data-id")];
      }
 
      $(".amenities h4").text(Object.values(amenities).join(", "));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const apiVar = document.querySelector("#api_status");
    fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'OK') {
            apiVar.classList.add("available");
        }
        else {
            apiVar.classList.remove();
        }
    })
});
