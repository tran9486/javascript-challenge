// from data.js
var tableData = data;

// select table body
var tbody = d3.select("tbody");

// loop through table data
tableData.forEach(sightings => {
    // append new row
    var row = tbody.append("tr")
    // loop through data entries
    Object.entries(sightings).forEach(([key, value]) => {
        // append data to table cells
        row.append("td").text(value);
    });
});

// select button and form
var button = d3.select("#filter-btn");
var form = d3.select("form");

// event handlers
button.on("click", dataFilter);
form.on("submit", dataFilter);

// add new filter boxes to form
var list = d3.select("ul");
var cityList = list.append("li").attr("class", "filter list-group-item");
cityList.append("label").attr("for", "city").text("Enter a City");
cityList.append("input").attr("class", "form-control").attr("id", "city").attr("placeholder", "benton");

var stateList = list.append("li").attr("class", "filter list-group-item");
stateList.append("label").attr("for", "state").text("Enter a state");
stateList.append("input").attr("class", "form-control").attr("id", "state").attr("placeholder", "ar");

var countryList = list.append("li").attr("class", "filter list-group-item");
countryList.append("label").attr("for", "country").text("Enter a country");
countryList.append("input").attr("class", "form-control").attr("id", "country").attr("placeholder", "us");

var shapeList = list.append("li").attr("class", "filter list-group-item");
shapeList.append("label").attr("for", "shape").text("Enter a shape");
shapeList.append("input").attr("class", "form-control").attr("id", "shape").attr("placeholder", "circle");

// function to filter data
function dataFilter() {
    // prevent data from refreshing
    d3.event.preventDefault();

    // remove present data
    tbody.selectAll("tr").remove()

    // select entered date to filter by
    var inputDate = d3.select("#datetime");
    var dateValue = inputDate.property("value");

    var inputCity = d3.select("#city");
    var cityValue = inputCity.property("value");

    var inputState = d3.select("#state");
    var stateValue = inputState.property("value");

    var inputCountry = d3.select("#country");
    var countryValue = inputCountry.property("value");

    var inputShape = d3.select("#shape");
    var shapeValue = inputShape.property("value");

    // if else to determine whether to filter for each filter
    if (dateValue === "") {
        dateFilter = tableData;
    }
    else {
        dateFilter = tableData.filter(tableData => tableData.datetime === dateValue)
    }

    if (cityValue === "") {
        cityFilter = dateFilter;
    }
    else {
        cityFilter = dateFilter.filter(dateFilter => dateFilter.city === cityValue)
    }

    if (stateValue === "") {
        stateFilter = cityFilter;
    }
    else {
        stateFilter = cityFilter.filter(cityFilter => cityFilter.state === stateValue)
    }

    if (countryValue === "") {
        countryFilter = stateFilter;
    }
    else {
        countryFilter = stateFilter.filter(stateFilter => stateFilter.country === countryValue)
    }

    if (shapeValue === "") {
        shapeFilter = countryFilter;
    }
    else {
        shapeFilter = countryFilter.filter(countryFilter => countryFilter.shape === shapeValue)
    }

    // filter data and append filtered data
    shapeFilter.forEach(sighting => {
        var row = tbody.append("tr")
        Object.entries(sighting).forEach(([key, value]) => {
            row.append("td").text(value);
        });
    });
}