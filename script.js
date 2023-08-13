const API_KEY="a969c67167c249b4a29f15f09e8a23a7";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>{
    fetchNews("India");
});
function reload() {
    window.location.reload();
}
// window.addEventListener('load', ()=>fetchNews("India"));
async function fetchNews(query){
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
//    console.log(data);
    bindData(data.articles);
    
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const cardstemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML='';
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = cardstemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

    });
}
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name}${date}`;
    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url,"_blank");
    });

}
let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const NavItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = NavItem;
    currSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("news-input");

searchButton.addEventListener("click", ()=>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
});