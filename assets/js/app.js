const foodData = document.querySelector(".food-data-list");
const form = document.querySelector("form");
const input = document.getElementById("search");
let searchData = "";

const API_KEY = "fc98226f66bfc678f6f2962d4ea5f8c6";
const API_ID = "ad36e776";
let FoodArray = []; //Empty Array

/* Form */

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = input.value;

  searchData = inputData;
  getData();
});

/* Form END */

const getData = async () => {
  try {
    const food_URL = `https://api.edamam.com/search?q=${searchData}&app_id=${API_ID}&app_key=${API_KEY}`;
    const response = await fetch(food_URL);
    FoodArray = await response.json();
    loadData(FoodArray.hits);
    input.value = "";

    if (!FoodArray.more) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Recipe Found!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loadData = (foods) => {
  const html = foods
    .map((data) => {
      return `
    <div class="data">
        <img src="${data.recipe.image}" alt="">
            <div class="data-info">
                    <h3>${data.recipe.label}</h3>
                <div class='view-recipe'>
                   <button><a href='${data.recipe.url}'>View Recipe </a></button>
                </div>
            </div>
    </div>
    `;
    })
    .join("");

  foodData.innerHTML = html;
};
