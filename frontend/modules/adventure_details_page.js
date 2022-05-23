import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search)
  const urlParams = new URLSearchParams(search);
  const adventureID = urlParams.get('adventure')
  return adventureID;


  // Place holder for functionality to work in the Stubs
  //return adventureID;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    const adventureDetail = await response.json();
    return adventureDetail;
  } catch (error) {
    //console.log('Fetch error: ', error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let innerHtmlElm=`<div>
                      <h1 id="adventure-name">${adventure.name}</h1>
                      <p style="font-size: 20px; color: #999" id="adventure-subtitle">${adventure.subtitle}</p>
                    </div>
                    <div class="row mb-3" id="photo-gallery"></div>
                    <hr />
                    <h5>About the Experience</h5>
                    <div id="adventure-content">${adventure.content}</div>`
  document.querySelector('.adventure-detail-card').innerHTML=innerHtmlElm;                  
  adventure.images.forEach((element,index)=>{
    let imgDiv=document.createElement('div');
    let imgElement=document.createElement('img');
    imgElement.src= element;
    imgElement.className="activity-card-image";
    imgDiv.appendChild(imgElement);
    document.getElementById('photo-gallery').appendChild(imgDiv)
  })                  
  


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML="";
  document.getElementById('photo-gallery').className="carousel slide";
  document.getElementById('photo-gallery').setAttribute('data-bs-ride','carousel');
  let indicatorContainer= document.createElement('div');
  indicatorContainer.className="carousel-indicators";  

  let innerHTMLIndicators=`
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" ></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" ></button>
  `
  indicatorContainer.innerHTML=innerHTMLIndicators;
 let navigationButtonInnerHtml=`
  <button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`
  
  let carouselContainer=document.createElement('div');
  carouselContainer.className= "carousel-inner";
  images.forEach((element,index)=>{
    let imgDiv=document.createElement('div');
    imgDiv.className="carousel-item";
    index ==0?imgDiv.classList.add('active'):""
    let imgElement=document.createElement('img');
    imgElement.src= element;
    imgElement.className="activity-card-image";
    imgDiv.appendChild(imgElement);
    carouselContainer.appendChild(imgDiv);
  }) 
  document.getElementById('photo-gallery').appendChild(indicatorContainer);
  document.getElementById('photo-gallery').appendChild(carouselContainer);
  document.getElementById('photo-gallery').innerHTML=document.getElementById('photo-gallery').innerHTML+navigationButtonInnerHtml;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
