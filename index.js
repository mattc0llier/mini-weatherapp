function loadAPI(searchQuery) {
  figureNode.innerHTML = "";
  if (searchQuery === undefined) {
    searchQuery = "london";
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&APPID=9b822755fc73e821682d43bd42988bd8
`)
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      getSearch(body.weather[0].description);
    });
}

function getSearch(search) {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=8c68a31beb02d4db00929a5bc5fa68d0c3ec7fadfceb2866db41ab2e53c6145a`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      let imgLinks = [];
      for (let i = 0; i <= 8; i++) {
        imgLinks.push(body.results[i].urls.regular);
      }
      console.log(imgLinks);
      //const imgLinks = body.results.urls.regular
      const mainImg = imgLinks[0];
      createImageNode(mainImg);
      createThumbNailNodes(imgLinks);
    });
}

const figureNode = document.querySelector(".photo");

function createImageNode(imgUrl) {
  const imgNode = document.createElement("img");
  imgNode.setAttribute("src", imgUrl);

  figureNode.appendChild(imgNode);
}

const searchSubmit = document.querySelector("form");

searchSubmit.addEventListener("submit", function(searchEvent) {
  searchEvent.preventDefault();
  console.log(searchEvent.target);
  let searchInput = document.querySelector(".search__input");
  loadAPI(searchInput.value);
});

function createThumbNailNodes(thumbnails) {
  const divNodes = document.querySelector(".thumbs");
  thumbnails.forEach(thumb => {
    const thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", thumb);
    divNodes.appendChild(thumbnail);
  });
}

// fetch load API for first load.
loadAPI();
