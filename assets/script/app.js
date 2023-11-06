sin_url = "http://localhost:3000/singers";
let cards = document.querySelector(".cards");

axios(sin_url).then((res) => {
  let datas = res.data;
  datas.forEach((singer) => {
    cards.innerHTML += `
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
        <button name="${singer.id}" class="fav_btn"><i  name="${singer.id}"class="fav_icon fa-regular fa-heart fa-2x" style="color: #b82828;"></i></button></div>
        </div>

    </div>
</div>
</div>
`;

  });
  // add wishlist
  
  let fav_btns=document.querySelectorAll(".fav_btn")
// let fav_icons=document.querySelectorAll(".fav_icon")

your_faved_items=[]
if(JSON.parse(localStorage.getItem("faved_singers"))){
  your_faved_items=[...JSON.parse(localStorage.getItem("faved_singers"))]
}
console.log("bix")
for(let fav_btn of fav_btns){
    // console.log(fav_btn.name);
    // console.log(fav_btn);

    let fav_icon=fav_btn.querySelector(".fav_icon")
    console.log(fav_icon.getAttribute("name"));
    if(your_faved_items.find((x)=>x===fav_icon.getAttribute("name"))) {
      console.log("testtt")
      fav_icon.classList.add("fa-solid")
      fav_icon.classList.remove("fa-regular")
    }

      fav_btn.addEventListener("click",function(e) {
        e.preventDefault();
        if(fav_icon.classList.contains("fa-solid")){
        fav_icon.classList.remove("fa-solid")
        fav_icon.classList.add("fa-regular")
        your_faved_items= your_faved_items.filter((faved_item)=>faved_item !==this.name)
    localStorage.setItem("faved_singers",JSON.stringify(your_faved_items))

        }
    
    else {
        fav_icon.classList.add("fa-solid")
        fav_icon.classList.remove("fa-regular")
        your_faved_items.push(this.name)

    localStorage.setItem("faved_singers",JSON.stringify(your_faved_items))

    }
    // localStorage.setItem("faved_singers",JSON.stringify(your_faved_items))
  })
}


// search
let search_singer_inp=document.querySelector(".singer_search_inp")

search_singer_inp.addEventListener("input",function(e){
  cards.innerHTML=""

  for(let singer of datas){
    if(singer.name.toLowerCase().trim().includes(search_singer_inp.value.toLowerCase().trim())){
      cards.innerHTML += `
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
        <button name="${singer.id}" class="fav_btn"><i  name="${singer.id}"class="fav_icon fa-regular fa-heart fa-2x" style="color: #b82828;"></i></button></div>
        </div>

    </div>
</div>
</div>
`;
    }
  }
})



})



