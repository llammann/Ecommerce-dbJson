let basketed_items=document.querySelector(".basketed_items")
let your_basketed_items=[]
let last_total=0
if (JSON.parse(localStorage.getItem("basketed_meals"))) {
    your_basketed_items = [...JSON.parse(localStorage.getItem("basketed_meals"))];
  }
  for(let item of your_basketed_items ){
axios("http://localhost:3000/meals/"+item.id).then((res) => {
  let meal = res.data;
    basketed_items.innerHTML += `
    <div class="basketed_item d-flex p-3">
                    <div class="item_img_wrapper m-2">
                        <img src="${meal.imageLink}" alt="">
                    </div>
                    <div class="item_name_price">
                        <h3 class="item_name">${meal.name}</h3>
                        <h4 class="item_price">$<span>${meal.price}</span></h4>
                    </div>
                    <div class="item_counter d-flex">
                        <button name="${meal.id}" class="minus btn btn-dark"><i class="fa-solid fa-minus"></i></button>
                        <div class="item_count m-2">${item.count}</div>
                        <button name="${meal.id}" class="plus btn btn-dark"><i class="fa-solid fa-plus"></i></button>
                    </div>

                    <div class="all_price">
                        <h2 class="total_price">Total Price </br>$${meal.price* item.count}</br></h2>
                    </div>
                    <button name="${meal.id}" class="remove_item btn btn-danger">Remove</button>
                </div>
`
last_total+=meal.price* item.count
// DECREASE COUNT START

let decrease=document.querySelectorAll(".minus")
console.log(decrease)
for(let minus of decrease){
    console.log(minus)


    minus.addEventListener("click",function(e) {
        e.preventDefault();
    let minus_id = this.getAttribute("name");

for (let item of your_basketed_items) {
      if (item.id === minus_id) {
        item.count--;

        if (item.count === 0) {

            let nav_basket = document.querySelector(".navbar .basket a sup");
            let basketCount=your_basketed_items.length
      nav_basket.textContent = basketCount--;

            this.parentElement.parentElement.remove()
                your_basketed_items = your_basketed_items.filter((basketed_item) => basketed_item.id !== minus_id);
          }
        this.parentElement.querySelector(".item_count").textContent = item.count;

let main_price=this.parentElement.previousElementSibling.querySelector(".item_price span").textContent
// console.log(main_price)
this.parentElement.parentElement.querySelector(".total_price").innerHTML = `Total Price <br />$${item.count * main_price}<br />`;

     }
}

localStorage.setItem("basketed_meals", JSON.stringify(your_basketed_items));
})
}
// DECREASE COUNT END

// INCREASE COUNT START
let increase=document.querySelectorAll(".plus")
for(let plus of increase){
    plus.addEventListener("click",function(e) {
        e.preventDefault();
    let plus_id = this.getAttribute("name");

for (let item of your_basketed_items) {
      if (item.id === plus_id) {
        item.count++;

        let nav_basket = document.querySelector(".navbar .basket a sup");
        let basketCount=your_basketed_items.length
  nav_basket.textContent = basketCount++;
  

        this.parentElement.querySelector(".item_count").textContent = item.count;

        let main_price=this.parentElement.previousElementSibling.querySelector(".item_price span").textContent
        // console.log(main_price)
        this.parentElement.parentElement.querySelector(".total_price").innerHTML = `Total Price <br />$${item.count * main_price}<br />`;
        
      }
}
localStorage.setItem("basketed_meals", JSON.stringify(your_basketed_items));
})
}
// INCREASE COUNT END

// REMOVE ITEM START
let remove_items=document.querySelectorAll(".remove_item")
for(let remove_item of remove_items) {
    remove_item.addEventListener("click",function(e) {

        let nav_basket = document.querySelector(".navbar .basket a sup");
        // let basketCount = JSON.parse(localStorage.getItem("basketed_meals")).length;
//         let basketCount=your_basketed_items.length
//   nav_basket.textContent = basketCount--;
  
        this.parentElement.remove()
  nav_basket.textContent = your_basketed_items.length;

        your_basketed_items = your_basketed_items.filter((basketed_item) => basketed_item.id !== remove_item.name);
localStorage.setItem("basketed_meals", JSON.stringify(your_basketed_items));
    })
}
// REMOVE ITEM END
  });
}

// REMOVE ALL START
let remove_all=document.querySelector(".remove_all")
remove_all.addEventListener("click",function() {
    // console.log(this.parentElement.previousElementSibling)
    this.parentElement.previousElementSibling.remove()
    your_basketed_items=[]

    let nav_basket = document.querySelector(".navbar .basket a sup");
  nav_basket.textContent = 0;

localStorage.setItem("basketed_meals", JSON.stringify(your_basketed_items));
})
let result_section=document.querySelector(".result_section")
if (!your_basketed_items.length) {
    result_section.classList.add("d-none");
}
// REMOVE ALL END

// TOTAL START
// let last_total=document.querySelector(".last_total")
// // last_total.innerHTML=
// let total_prices=document.querySelectorAll(".total_price")
// for(let tot of total_prices){
//     console.log(tot)
// }
// TOTAL END

let hm_last_total=document.querySelector(".last_total span")
hm_last_total.innerHTML=last_total



function calculateTotalPrice() {
    last_total = 0; // Initialize the total price to 0

    for (let item of your_basketed_items) {
        axios("http://localhost:3000/meals/" + item.id).then((res) => {
            let meal = res.data;
            last_total += meal.price * item.count;
        });
    }

    // Update the "last_total" element
    hm_last_total.textContent = `$${last_total.toFixed(2)}`;
}

calculateTotalPrice();

// REMOVE ALL START
// let remove_all = document.querySelector(".remove_all");
// remove_all.addEventListener("click", function () {
//     basketed_items.innerHTML = '';
//     your_basketed_items = [];
//     localStorage.setItem("basketed_meals", JSON.stringify(your_basketed_items));
//     last_total = 0;
//     hm_last_total.textContent = `$0.00`;
// });

// let result_section = document.querySelector(".result_section");
// if (!your_basketed_items.length) {
//     result_section.classList.add("d-none");
// }
// REMOVE ALL END

let nav_basket = document.querySelector(".navbar .basket a sup");
console.log(nav_basket)
if (JSON.parse(localStorage.getItem("basketed_meals"))) {
  let basketCount = JSON.parse(localStorage.getItem("basketed_meals")).length;
  nav_basket.textContent = basketCount;
}