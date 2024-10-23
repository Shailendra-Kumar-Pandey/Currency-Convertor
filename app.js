const BASE_URL="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const selects = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of selects){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;   
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let ammount = document.querySelector(".Evalue");
    let amtVal = ammount.value;
    // console.log(amtVal);
    if (amtVal==="" || amtVal < 1) {
        amtVal = 1;
        ammount.value ="1";
    }
    // console.log( fromCurr.value ,toCurr.value );
    const URL = `${BASE_URL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data.rate;
    // console.log(rate)
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})
