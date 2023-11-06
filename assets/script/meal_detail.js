let detail_btns = document.querySelectorAll(".detail_btn");
let detailed_meal = document.querySelector(".detailed_meal");

console.log(detail_btns);

let id = new URLSearchParams(location.search).get("id");

console.log(id);

meal_url = "http://localhost:3000/meals";
axios(meal_url).then((res) => {
  let meals = res.data;
  let meal = meals.find((x) => x.id == id);
  console.log(meal);
  detailed_meal.innerHTML = `
  <div class="my_detailed_card card" style="width: 30rem;">
  <div class="img_wrapper"><img src="${meal.imageLink}" class="my_card_img card-img-top" alt="...">
  </div>
  <div class="my_card_body card-body">
      <h5 class="my_card_name card-title">${meal.name}</h5>
      <p><strong>Ingredients:</strong> </br>${meal.ingredients}</p>
      <div class="buttons d-flex">
          <a href="./meals.html"><button class="detail_btn btn btn-outline-primary">Home</button></a>
          <div class="right">
              <button name="${meal.id}" class="fav_btn"><i class="fa-regular fa-heart fa-2x"
                      style="color: #b82828;"></i></button>
          </div>
      </div>

  </div>
</div>
  `;
});
