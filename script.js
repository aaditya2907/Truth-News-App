const API_KEY = "9f4d2a195a1241ad8853d25426b93b5d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });

}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    }).slice(0,10);

    newsSource.innerHTML=`${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank")
    })
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

let curSelectedNav=null;
function onNavItemClick(param){
    if(searchText.value){
        searchText.value="";
    }
    fetchNews(param);
    const navItem = document.getElementById(param);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


searchButton.addEventListener('click', ()=>{
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
})

searchText.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
  
        searchButton.click(); // Simulates a click on the button
  
    }
  
  });