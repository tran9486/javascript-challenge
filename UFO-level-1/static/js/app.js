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

// function to filter data
function dataFilter() {
    // prevent data from refreshing
    d3.event.preventDefault();

    // remove present data
    tbody.selectAll("tr").remove()

    // select entered date to filter by
    var inputDate = d3.select("#datetime");
    var dateValue = inputDate.property("value");

    // if else to determine whether to filter
    if (dateValue === "") {
        dateFilter = tableData;
    }
    else {
        dateFilter = tableData.filter(tableData => tableData.datetime === dateValue)
    }

    // filter data and append filtered data
    dateFilter.forEach(sighting => {
        var row = tbody.append("tr")
        Object.entries(sighting).forEach(([key, value]) => {
            row.append("td").text(value);
        });
    });;
}