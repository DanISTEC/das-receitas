const getElement = (selector) => {
  const element = document.querySelector(selector)

  if (element) return element
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  )
}

const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')

navBtnDOM.addEventListener('click', () => {
  links.classList.toggle('show-links')
})

const date = getElement('#date')
const currentYear = new Date().getFullYear()
date.textContent = currentYear

// Recipe data with proper tags
const recipes = [
  {
    id: 1,
    title: "Carne Asada",
    image: "./assets/recipes/recipe-1.jpeg",
    prepTime: "15min",
    cookTime: "5min",
    tags: ["beef", "dinner"]
  },
  {
    id: 2,
    title: "Greek Ribs",
    image: "./assets/recipes/recipe-2.jpeg",
    prepTime: "15min",
    cookTime: "5min",
    tags: ["beef", "dinner"]
  },
  {
    id: 3,
    title: "Vegetable Soup",
    image: "./assets/recipes/recipe-3.jpeg",
    prepTime: "15min",
    cookTime: "5min",
    tags: ["carrots", "dinner", "vegetarian"]
  },
  {
    id: 4,
    title: "Banana Pancakes",
    image: "./assets/recipes/recipe-4.jpeg",
    prepTime: "15min",
    cookTime: "5min",
    tags: ["breakfast", "pancakes"]
  }
]

// Function to filter recipes by tag
function filterRecipesByTag(tag) {
  return recipes.filter(recipe => recipe.tags.includes(tag.toLowerCase()))
}

// Function to render recipes
function renderRecipes(recipesToRender) {
  const recipesList = document.querySelector('.recipes-list')
  if (!recipesList) return

  recipesList.innerHTML = recipesToRender.map(recipe => `
    <a href="single-recipe.html" class="recipe">
      <img
        src="${recipe.image}"
        class="img recipe-img"
        alt="${recipe.title}"
      />
      <h5>${recipe.title}</h5>
      <p>Prep : ${recipe.prepTime} | Cook : ${recipe.cookTime}</p>
    </a>
  `).join('')
}

// Function to update tag counts
function updateTagCounts() {
  const tagCounts = {}
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  return tagCounts
}

// Initialize tag filtering if we're on a tag page
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search)
  
  // Check if we're on the tag template page
  const recipesList = document.querySelector('.recipes-list')
  if (recipesList) {
    const tag = urlParams.get('tag')
    
    if (tag) {
      const filteredRecipes = filterRecipesByTag(tag)
      renderRecipes(filteredRecipes)
      
      // Update the page title
      const pageTitle = document.querySelector('.featured-recipes h4')
      if (pageTitle) {
        pageTitle.textContent = tag.charAt(0).toUpperCase() + tag.slice(1)
      }
    } else {
      // If no tag is specified, show all recipes
      renderRecipes(recipes)
      
      // Update the page title
      const pageTitle = document.querySelector('.featured-recipes h4')
      if (pageTitle) {
        pageTitle.textContent = 'All Recipes'
      }
    }
  }
})


