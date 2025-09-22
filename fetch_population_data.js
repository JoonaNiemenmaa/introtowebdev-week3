const tbody = document.getElementById("table_body");

var even = false;

function add_data_row(municipality, population) {
    const trow = document.createElement("tr");

    const td_municipality = document.createElement("tr");
    td_municipality.innerText = municipality;

    const td_population = document.createElement("td");
    td_population.innerText = population;

    trow.appendChild(td_municipality);
    trow.appendChild(td_population);

    trow.classList.add(even ? "even" : "odd");

    tbody.appendChild(trow);
    even = !even;
}

const url =
    "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11ra.px";

const json_promise = fetch("fetch.json");

json_promise
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        return fetch(url, options);
    })
    .then((response) => {
        console.log("Received response: ${response.status}");
        return response.json();
    })
    .then((data) => {
        console.log(data);

        var key_to_index = data.dimension.Alue.category.index;
        var populations = data.value;
        console.log(key_to_index);
        console.log(populations);

        for ([key, label] of Object.entries(
            data.dimension.Alue.category.label,
        )) {
            var population = populations[key_to_index[key]];
            add_data_row(label, population);
        }
    });
