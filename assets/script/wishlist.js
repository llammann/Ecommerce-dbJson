let your_faved_items=[]
if (JSON.parse(localStorage.getItem("faved_singers"))) {
    your_faved_items = [...JSON.parse(localStorage.getItem("faved_singers"))];
  }

  let wished_cards=document.querySelector(".wished_cards")
  
  for(let faved_item of your_faved_items) {
    axios("http://localhost:3000/singers/"+faved_item).then((res) => {
  let singer = res.data;
  wished_cards.innerHTML += `
  <div class="col-3 mb-4">
  <div class="my_card card" style="width: 16rem;">
  <div class="img_wrapper"><img src="${singer.imagelink}" class="my_card_img card-img-top" alt="..."></div>
  <div class="my_card_body card-body">
      <h5 class="my_card_name card-title">${singer.name}</h5>
      <p class="my_card_text card-text"><span class="name">${singer.name}</span> is <span
              class="nationality">${singer.nationality}</span></p>
      <div class="buttons d-flex m-0">
      
      <a href="./singer_detail.html?id=${singer.id}"><button class="detail_btn btn btn-outline-primary">Detail</button></a>
      
      <div class="right">
      <button name="${singer.id}" class="fav_btn"><i  name="${singer.id}"class="fav_icon fa-solid fa-heart fa-2x" style="color: #b82828;"></i></button></div>
      </div>

  </div>
</div>
</div>
    `

// remove wishlist

let fav_btns = document.querySelectorAll(".fav_btn");
console.log(fav_btns)
for(let fav_btn of fav_btns) {
    console.log(fav_btn)
    fav_btn.addEventListener("click",function() {
        // console.log(this)
        this.closest(".col-3").remove()
        your_faved_items=your_faved_items.filter((id)=>id !==fav_btn.name)
localStorage.setItem("faved_singers", JSON.stringify(your_faved_items));

    })
}
// let fav_icon = fav_btn.querySelector(".fav_icon");
// console.log(fav_icon)

})
  }