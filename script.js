let result = document.getElementById("result"); // Reference to the HTML element where the result will be displayed
let searchBtn = document.getElementById("search-btn"); // Reference to the search button
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // The API endpoint for meal data

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value; // Get user input from the input field

  // Check if the input field is empty
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    // Fetch meal data from the API based on user input
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0]; // Get the first meal from the API response

        // Log meal details to the console for debugging
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];

        // Loop through meal properties to extract ingredients and measures
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        // Log the list of ingredients to the console
        console.log(ingredients);

        // Populate the result section with meal information
        result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        // Create a list of ingredients and append it to the ingredient container
        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        // Event listener to hide the recipe section
        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });

        // Event listener to show the recipe section
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});
