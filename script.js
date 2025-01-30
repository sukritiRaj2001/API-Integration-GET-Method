$(document).ready(function () {
  // Helper function to show loading spinner
  function showLoading(container) {
    $(container).html(
      '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    );
  }

  // Helper function to show an error message
  function showError(container, message) {
    $(container).html(
      `<p class="text-danger">${
        message || "Failed to fetch data. Please try again."
      }</p>`
    );
  }

  // Fetch and display a random dog image
  $("#fetchImageBtn").click(function () {
    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    const container = "#imageContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        const imageUrl = data.message; // Get the image URL
        $(container).html(`
          <img src="${imageUrl}" alt="Random Dog Image" class="img-fluid">
          <p class="mt-3">Random Dog Image</p>
        `);
      },
      error: function () {
        showError(container, "Failed to fetch the random dog image.");
      },
    });
  });

  //  Fetch ZIP Code Data
  $("#fetchZipDataBtn").click(function () {
    const apiUrl = "https://api.zippopotam.us/us/33162";
    const container = "#zipDataContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        let output = `
            <h3 class="text-center text-primary">ZIP Code Information</h3>
            <p><strong>ZIP Code:</strong> ${data["post code"]}</p>
            <p><strong>Country:</strong> ${data.country} (${data["country abbreviation"]})</p>
            
            <h3 class="text-center text-success">Places Information</h3>
            <table class="table table-bordered table-striped">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>Place Name</th>
                  <th>State</th>
                  <th>State Abbreviation</th>
                  <th>Longitude</th>
                  <th>Latitude</th>
                </tr>
              </thead>
              <tbody>`;

        // Loop through places array and populate table rows
        data.places.forEach(function (place, index) {
          output += `
              <tr>
                <td>${index + 1}</td>
                <td>${place["place name"]}</td>
                <td>${place.state}</td>
                <td>${place["state abbreviation"]}</td>
                <td>${place.longitude}</td>
                <td>${place.latitude}</td>
              </tr>`;
        });

        output += `</tbody></table>`; // Closing table

        $(container).html(output);
      },
      error: function () {
        showError(container, "Failed to fetch ZIP Code data.");
      },
    });
  });

  // Fetch Population Data (Nested Loops)
  $("#fetchPopulationBtn").click(function () {
    const apiUrl =
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    const container = "#populationDataContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (response) {
        let output = `
            <h3 class="text-center text-primary">Population Data</h3>
            <table class="table table-bordered table-striped">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nation</th>
                  <th>Year</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>`;

        //  Loop through array and populate table rows
        response.data.forEach(function (record, index) {
          output += `
              <tr>
                <td>${index + 1}</td>
                <td>${record.Nation}</td>
                <td>${record.Year}</td>
                <td>${record.Population}</td>
              </tr>`;
        });

        output += `</tbody></table>`; // Closing table

        $(container).html(output);
      },
      error: function () {
        showError(container, "Failed to fetch Population data.");
      },
    });
  });

  //  Fetch Nationality Data (Nested Loop for Country Probabilities)
  $("#fetchNationalityBtn").click(function () {
    const apiUrl = "https://api.nationalize.io/?name=nathaniel";
    const container = "#nationalityDataContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        let output = `<h3>Nationality Data for ${data.name}</h3><ul class="list-group">`;

        data.country.forEach(function (nation, index) {
          output += `<li class="list-group-item">
                      <h5>Country ${index + 1}</h5>
                      <strong>Country ID:</strong> ${nation.country_id} <br>
                      <strong>Probability:</strong> ${nation.probability}
                    </li>`;
        });

        output += "</ul>";
        $(container).html(output);
      },
      error: function () {
        showError(container, "Failed to fetch Nationality data.");
      },
    });
  });

  //  Fetch Gender Data
  $("#fetchGenderBtn").click(function () {
    const apiUrl = "https://api.genderize.io/?name=vishal";
    const container = "#genderDataContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        $(container).html(`
          <h3>Gender Prediction</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Gender:</strong> ${data.gender}</p>
          <p><strong>Probability:</strong> ${data.probability}</p>
        `);
      },
      error: function () {
        showError(container, "Failed to fetch Gender data.");
      },
    });
  });

  $("#fetchAgeBtn").click(function () {
    const apiUrl = "https://api.agify.io/?name=vishal"; // API URL
    const container = "#ageDataContainer"; // Data container

    showLoading(container); // Show loading spinner

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        $(container).html(`
            <h5 class="text-success">Predicted Age for <strong>${data.name}</strong></h5>
            <p class="fs-4"><strong>Age:</strong> ${data.age} years</p>
          `);
      },
      error: function () {
        showError(container, "Failed to fetch Age data.");
      },
    });
  });

  //  Fetch Cat Fact Data
  $("#fetchCatFactBtn").click(function () {
    const apiUrl = "https://catfact.ninja/fact";
    const container = "#catFactContainer";

    showLoading(container);

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: function (data) {
        $(container).html(`
          <h3>Cat Fact</h3>
          <p>${data.fact}</p>
        `);
      },
      error: function () {
        showError(container, "Failed to fetch Cat Fact.");
      },
    });
  });
});
