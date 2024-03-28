let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});
// can create function and get price
const tickers = ["ethereum", "bitcoin", "cardano"];
const url = "https://api.coincap.io/v2/assets/";
const list = document.getElementById("coinlist");
for (const coin of tickers) {
  console.log(url + coin);
  fetch(url + coin)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      // cud have use destructing and done {} = result
      // const {name,priceUsd}=result
      const coinEl = document.createElement("div");

      coinEl.classList.add(
        "bg-gray-800",
        "px-6",
        "py-6",
        "rounded-2xl",
        "flex",
        "items-center",
        "space-x-3",
        "justify-between",
        "shadow-inner",
        "shadow-slate-400/80"
      );
      coinEl.innerHTML = `<div class="flex items-center space-x-6">
      <img src="${
        "https://visheshsingh.host20.uk/" + result.data.name.toLowerCase()
      }" class="max-w-[100px] shadow-lg shadow-gray-600 rounded-full">
      <div class="text-white pr-24">
        <span class="text-left uppercase text-3xl ">${result.data.name}</span>
        <span class="text-lg">/USD</span>
      </div>
      </div>
      <div class="flex-col flex items-end ">
        <span class="priceEl text-2xl text-red-500 ">
          $<span class="price">${parseFloat(result.data.priceUsd).toFixed(
            3
          )}</span>
        </span>
        <span class="change text-lg text-white font-rSlab tracking-wide ">
          
          </span>
          </div>
          `;
      list.append(coinEl);

      async function newPrice() {
        let myObject = await fetch(url + coin);
        let jsonPromise = await myObject.json();
        const { priceUsd } = jsonPromise.data;
        if (priceUsd != coinEl.querySelector(".priceEl").innerText.slice(1)) {
          coinEl.querySelector(".change").innerHTML = `
              ${(priceUsd-coinEl.querySelector(".priceEl").innerText.slice(1)).toFixed(6) + "$"
              }
              `;
          // % change
          // (((coinEl.querySelector('.price').innerText - priceUsd)/coinEl.querySelector('.price').innerText)*100).toFixed(6)+'%'

          if (priceUsd > +coinEl.querySelector(".priceEl").innerText.slice(1)) {
            coinEl.querySelector(".priceEl").classList.remove("text-red-500");
            coinEl.querySelector(".priceEl").classList.add("text-green-500");
          } else if (
            priceUsd < +coinEl.querySelector(".priceEl").innerText.slice(1)
          ) {
            coinEl.querySelector(".priceEl").classList.remove("text-green-500");
            if (
              !coinEl
                .querySelector(".priceEl")
                .classList.contains("text-red-500")
            ) {
              coinEl.querySelector(".priceEl").classList.add("text-red-500");
            }
          }
          coinEl.querySelector(".priceEl").innerHTML = `
    ${"$" + parseFloat(priceUsd).toFixed(4)}
    `;
        }
      }

      setInterval(newPrice, 500);
    });
}
// old code without slice
//       async function newPrice() {
//     let myObject = await fetch(url + coin);
//     let jsonPromise = await myObject.json();
//     const { priceUsd } = jsonPromise.data;
//     if (priceUsd != coinEl.querySelector(".price").innerText) {
//       coinEl.querySelector(".change").innerHTML = `
//           ${
//             (coinEl.querySelector(".price").innerText - priceUsd).toFixed(
//               6
//             ) + "$"
//           }
//           `;
//       // (((coinEl.querySelector('.price').innerText - priceUsd)/coinEl.querySelector('.price').innerText)*100).toFixed(6)+'%'

//       if (priceUsd > +coinEl.querySelector(".price").innerText) {
//         coinEl
//           .querySelector(".price")
//           .parentElement.classList.remove("text-red-500");
//         coinEl
//           .querySelector(".price")
//           .parentElement.classList.add("text-green-500");
//       } else if (priceUsd < +coinEl.querySelector(".price").innerText) {
//         coinEl
//           .querySelector(".price")
//           .parentElement.classList.remove("text-green-500");
//         if (
//           !coinEl
//             .querySelector(".price")
//             .parentElement.classList.contains("text-red-500")
//         ) {
//           coinEl
//             .querySelector(".price")
//             .parentElement.classList.add("text-red-500");
//         }
//       }
//       coinEl.querySelector(".price").innerHTML = `
// ${parseFloat(priceUsd).toFixed(4)}
// `;

//     }
//   }
