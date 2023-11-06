meal_url = "http://localhost:3000/meals";
let meals_cards = document.querySelector(".meals_cards");
axios(meal_url).then((res) => {
  let meals = res.data;
  meals.forEach((meal) => {
    meals_cards.innerHTML += `
    <div class="col-3 mb-4">
    <div class="my_card card" style="width: 16rem;">
    <div class="img_wrapper"><img src="${meal.imageLink}" class="my_card_img card-img-top" alt="..."></div>
    <div class="my_card_body card-body">
        <h5 class="my_card_name card-title">${meal.name}</h5>
        <p class="my_card_text card-text"><span class="name">$${meal.price}</p>
        <div class="buttons d-flex w-100% m-0">
      
        <a href="./meal_detail.html?id=${meal.id}"><button class="detail_btn btn btn-outline-primary">Detail</button></a>


        <button name="${meal.id}" class="basket_btn btn"><i class="fa-solid fa-cart-shopping fa-2x"></i></button>
        </div>
        </div>
    </div>
</div>
</div>
`;
  });
  // add basket

  let basket_btns = document.querySelectorAll(".basket_btn");
  let meals_at_basket = [];
  let new_meal = {
    id: this.id,
    count: 1,
  };
  if (JSON.parse(localStorage.getItem("basketed_meals"))) {
    meals_at_basket = [...JSON.parse(localStorage.getItem("basketed_meals"))];
  }
    console.log("hi");
    for (let basket_btn of basket_btns) {
      basket_btn.addEventListener("click", function () {

        if (JSON.parse(localStorage.getItem("basketed_meals"))) {
          let basketCount = JSON.parse(localStorage.getItem("basketed_meals")).length;
          nav_basket.textContent = basketCount++;
        }
        else {
          nav_basket.textContent = 0
        }

        console.log(this.name);

    let is_found=meals_at_basket.find((meal)=>meal.id===this.name)
    console.log(is_found);

  if (is_found) {
        is_found.count++
      }
    else {
      new_meal = {
        id: this.name,
        count: 1,
      };

      meals_at_basket.push(new_meal);
    }

    console.log("test", meals_at_basket);
    localStorage.setItem("basketed_meals", JSON.stringify(meals_at_basket));
})
}

// search
let search_food_inp=document.querySelector(".search_food_inp")

search_food_inp.addEventListener("input",function(e){
  meals_cards.innerHTML=""

  for(let meal of meals){
    if(meal.name.toLowerCase().trim().includes(search_food_inp.value.toLowerCase().trim())){
      meals_cards.innerHTML += `
      <div class="col-3 mb-4">
      <div class="my_card card" style="width: 16rem;">
      <div class="img_wrapper"><img src="${meal.imageLink}" class="my_card_img card-img-top" alt="..."></div>
      <div class="my_card_body card-body">
          <h5 class="my_card_name card-title">${meal.name}</h5>
          <p class="my_card_text card-text"><span class="name">$${meal.price}</p>
          <div class="buttons d-flex w-100% m-0">
        
          <a href="./meal_detail.html?id=${meal.id}"><button class="detail_btn btn btn-outline-primary">Detail</button></a>
  
  
          <button name="${meal.id}" class="basket_btn btn"><i class="fa-solid fa-cart-shopping fa-2x"></i></button>
          </div>
          </div>
      </div>
  </div>
  </div>
  `;;
    }
  }
})




})

let nav_basket = document.querySelector(".navbar .basket a sup");
// console.log(nav_basket)
// if (JSON.parse(localStorage.getItem("basketed_meals"))) {
//   let basketCount = JSON.parse(localStorage.getItem("basketed_meals")).length;
//   nav_basket.textContent = basketCount;
// }