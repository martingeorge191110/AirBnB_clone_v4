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

    const apiVar = $("#api_status");
    fetch('http://0.0.0.0:5001/api/v1/status/')
      .then(response => response.json())
      .then(data => {
          if (data.status === 'OK') {
              apiVar.addClass("available");
          } else {
              apiVar.removeClass("available");
          }

        })
      .catch(error => console.error("API Fetch Error:", error));


    fetch('http://127.0.0.1:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        for (const place of data) {
            const html = `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`;
            $('section.places').append(html);
        }
    })
    .catch(error => console.error("Error fetching places:", error));

    const click_b = $('button')
    click_b.click(function () {
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amenities: Object.keys(checkedAmenities) })
    })
    .then(response => response.json())
    .then(data => {
        for (const place of data) {
            const html = `<article>
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guests</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                            </div>
                        </article>`
            $('places-list"').append(html);
        }
    })
    .catch(error => console.error("Error fetching places:", error));
    })
});
