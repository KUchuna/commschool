let data;

const getData = async () => {
  try {
    const result = await fetch('https://dummyjson.com/products/category/smartphones');
    data = await result.json();
  } catch (error) {
    errorMessage.innerHTML = error.message;
  } finally {
    console.log(data);
    if (data?.products) {
      drawList(data.products);
    }
  }
};


const paginationContainer = document.querySelector('.pagination');
let pageSize = 9;
let currentPage = 1;


const pageSizeSelect = document.getElementById('page-size');


function drawList(listings) {
  const listCont = document.getElementById('list-container');
  listCont.innerHTML = '';
  for (let i = (currentPage - 1) * pageSize; i < pageSize * currentPage; i++)  {
    const listing = listings[i];
    const card = document.createElement('div');
    card.classList.add("card-container")
    card.innerHTML = `
      <img src=${listing.thumbnail} class="card-thumbnail"/>
      <div class="card-description-container">
        <div class="card-price-rating-container">
          <div>
            <div>
              <strong>$${listing.price}</strong>
              <span class="card-original-price">$${Math.round(listing.price+listing.price*listing.discountPercentage/100)}.00</span>
            </div>
            <div class="card-rating-container"><div class="card-star-container"></div>${listing.rating}</div>
          </div>
          <div class="card-favorite-icon"></div>
        </div>
        <p class="card-description">${listing.description.slice(0,50)}...</p>
      </div>
    `;

    const starContainer = card.querySelector('.card-star-container');
    const fullStarSVG = '<img src="./assets/logos/fullstar.svg" alt="Full Star" />';
    const emptyStarSVG = '<img src="./assets/logos/emptystar.svg" alt="Empty Star" />';
    const fullStars = Math.floor(listing.rating);
    const emptyStars = 5 - fullStars;

    for (let j = 0; j < fullStars; j++) {
      starContainer.innerHTML += fullStarSVG;
    }
    for (let j = 0; j < emptyStars; j++) {
      starContainer.innerHTML += emptyStarSVG;
    }

    const cardFavoriteIcon = card.querySelector('.card-favorite-icon')

    cardFavoriteIcon.innerHTML=`<img src="./assets/logos/heart.svg" />`

    listCont.appendChild(card);
  }
  drawPagination(listings)
}

getData()

const onPaginationClick = (nextPage) => {
  currentPage = nextPage
  drawList(data.products)
}

const drawPagination = (listings) => {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(listings.length / pageSize);

  for (let i = 0; i < pageCount; i++) {
    const singleItem = document.createElement('div');
    singleItem.classList.add('single-item');
    singleItem.innerText = i + 1;


    singleItem.addEventListener('click', (e) => {

      document.querySelectorAll('.single-item').forEach((item) => item.classList.remove('active'));

      e.target.classList.add('active');
      currentPage = i + 1;
      onPaginationClick(currentPage);
    });

    paginationContainer.appendChild(singleItem);
  }

  if (paginationContainer.firstChild) {
    paginationContainer.firstChild.classList.add('active');
  }
};

pageSizeSelect.addEventListener('change', () => {
  pageSize = parseInt(pageSizeSelect.value, 10);
  currentPage = 1; 
  drawPagination(data.products);
  drawList(data.products); 
});