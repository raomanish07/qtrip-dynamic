import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(config.backendEndpoint+'/reservations/');
    const reservation = await response.json();
    return reservation;
  } catch (error) {
    //console.log('Fetch error: ', error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  var tblBody = document.getElementById('reservation-table');
  if(reservations.length>0){
    document.getElementById('no-reservation-banner').style.display="none";
    document.getElementById('reservation-table-parent').style.display="block";
    let options = {
      day:"numeric",
      month: "long", 
      year: "numeric",    
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      second:"numeric"
  }
    reservations.forEach(element => {
      let date = new Date(element.date).toLocaleDateString('en-IN');      
      let timeFormat = new Date(element.time).toLocaleString('en-IN', options)
      let rowInnerHtml=`<tr>
                      <td><b>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.adventureName}</td>
                    <td>${element.person}</td>
                    <td>${date}</td>
                    <td>${element.price}</td>
                    <td>${timeFormat}</td>
                    <td id="${element.id}"><a id="${element.adventure}" href="../detail/?adventure=${element.adventure}" class="reservation-visit-button">Visit Adventure </a> </td>
                   </tr>`
      
      tblBody.innerHTML= tblBody.innerHTML + rowInnerHtml;
      
    }); 
    
   
}
else{
  document.getElementById('no-reservation-banner').style.display="block";
  document.getElementById('reservation-table-parent').style.display="none";
}



  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
