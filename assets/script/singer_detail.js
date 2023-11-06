let detail_btns = document.querySelectorAll(".detail_btn");
let detailied_singer = document.querySelector(".detailied_singer");

console.log(detail_btns);

let id = new URLSearchParams(location.search).get("id");

console.log(id);

sin_url = "http://localhost:3000/singers";
axios(sin_url).then((res) => {
  let singers = res.data;
  let singer = singers.find((sin) => sin.id == id);
  console.log(singer);
  detailied_singer.innerHTML = `
  <div class="my_detailied_card card" style="width: 30rem;">
  <div class="img_wrapper"><img src="${singer.imagelink}" class="my_card_img card-img-top" alt="..."></div>
  <div class="my_card_body card-body">
      <h5 class="my_card_name card-title">${singer.name}</h5>
      <p class="my_card_text card-text"><span class="name">${singer.name}</span> is <span
              class="nationality">${singer.nationality}</span></p>
      <p>Age: ${singer.age}</p>
      <p>Genre: ${singer.genre}</p>
      <div class="buttons d-flex">
      <a href="./index.html"><button class="detail_btn btn btn-outline-primary">Home</button></a>
      <div class="right">
      <button name="${singer.id}" class="fav_btn"><i class="fa-regular fa-heart fa-2x"
              style="color: #b82828;"></i></button></div>
      </div>

  </div>
</div>
  `;
});
