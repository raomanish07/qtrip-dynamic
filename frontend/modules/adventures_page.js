
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
      const urlParams = new URLSearchParams(search);
      const city = urlParams.get('city')
      return city;


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    const adventures = await response.json();
    return adventures;
  } catch (error) {
    //console.log('Fetch error: ', error);
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
 
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  //const [category,costPerHead,currency,duration,id,image,name] = element;
  adventures.forEach(element => {
    let containerDiv=document.createElement('div');
    containerDiv.className ="col-6 col-sm-6 col-lg-3 mb-4";
    let innerHtmlElm=`<a id="${element.id}" href="detail/?adventure=${element.id}">
                        <div class="activity-card">
                          <p class="category-banner">${element.category}</p>
                          <img src="${element.image}"/>
                          <div class="mt-3" style="display: flex;width: 100%;justify-content: space-around;align-items:center;">
                            <p>${element.name}</p>
                            <p>${element.currency =="INR"?"₹":"$"}${element.costPerHead}</p>
                          </div>
                          <div style="display: flex;width: 100%;justify-content: space-around;align-items:center;">
                            <p>Duration</p>
                            <p>${element.duration} Hours</p>
                          </div>
                        </div>
                      </a>`
    containerDiv.innerHTML=innerHtmlElm;
    document.getElementById('data').appendChild(containerDiv)
    
    
 });
 
    
    

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  //console.log(list)
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durationFilteredList= list.filter((item)=>{
    return item.duration >= low && item.duration <= high;
   })
//console.log(durationFilteredList)
return durationFilteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 let catgFilteredList= list.filter((item)=>{
  return categoryList.find(element => element == item.category);
 })
 return catgFilteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(filters)
  let filteredList=[];
  let durationArray=filters.duration.split('-');
  if(filters.duration.length >0  && filters.category.length>0){
    filteredList= filterByDuration(list,durationArray[0],durationArray[1]);
    filteredList =filterByCategory(filteredList,filters.category);

  }
  else if(filters.duration.length > 0){
    
    filteredList= filterByDuration(list,durationArray[0],durationArray[1]);
    
  }
  else if(filters.category.length>0){
    filteredList =filterByCategory(list,filters.category);
  }
  else{
    filteredList =list;
  }
  
   // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
//let filterSringyfy= JSON.stringify(filters) ;
window.localStorage.setItem("filters",JSON.stringify(filters) );

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

let filters= window.localStorage.getItem('filters')
  // Place holder for functionality to work in the Stubs
  return JSON.parse(filters);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryListContainer=document.getElementById('category-list');
  document.getElementById("duration-select").value = filters.duration;
  filters.category.forEach((filter)=>{
    let innerHTML=`<p class="category-filter">${filter}</p>`
    categoryListContainer.innerHTML= categoryListContainer.innerHTML +innerHTML;
  })
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
