const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
            option.selected = true;
        }

        select.append(option);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

// Update flag
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert currency
btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${from}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data[from][to];
        let finalAmount = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data!";
        console.error(error);
    }
});






