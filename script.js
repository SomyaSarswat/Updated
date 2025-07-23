const gnewsApiKey = `563b69bf0b04e82bac5aa9ea6da4b673`; // ✅ Fixed: Variable name was wrong

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchBton = document.getElementById("searchbutton");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${gnewsApiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Random News:", data); // Optional: Debugging
    return data.articles;
  } catch (error) {
    console.error("Error fetching GNews:", error);
    return [];
  }
}

searchBton.addEventListener('click', async () => {
  const query = searchField.value.trim();

  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&token=${gnewsApiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Search Results:", data); // Optional: Debugging
    return data.articles;
  } catch (error) {
    console.error("Error fetching GNews by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.image || "https://placehold.co/600x400"; // ✅ GNews uses 'image' not 'urlToImage'
    img.alt = article.title || "News Image";

    const title = document.createElement("h2");
    title.textContent = article.title || "No title available";

    const description = document.createElement("p");
    description.textContent = article.description || "No description available.";

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogCard.addEventListener('click', () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
