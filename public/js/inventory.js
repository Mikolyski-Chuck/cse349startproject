'use strict'

//get a list of items in inventory based on the classification_id
let classificationList = document.querySelector('#classification_id')
classificationList.className = "management-select";
classificationList.addEventListener("change", function () {
    let classifiction_id = classificationList.value
    console.log(`classification_id is: ${classifiction_id}`)
    let classIdURL = "inv/getInventory/" + classifiction_id
    fetch(classIdURL)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw Error("Network response was not OK");
    })
    .then(function (data) {
        console.log(data);
        buildInventoryList(data);
    })
    .catch(function (error) {
        console.log('There was a problem: ', error.message)
    })
})

//build inventory items into HTML table components and inject into DOM
function buildInventoryList (data) {
    let inventoryDisplay = document.getElementById("inventoryDisplay");
    //set up the table labels
    let dataTable = '<thead';
    dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
    dataTable += '<thead';
    //set up the table body
    dataTable += '<tbody>';
    //Iterate over all the vehicles in the array and put each in a row
    data.forEach(function (element) {
        console.log(element.inv_id + ", " + element.inv_model);
        dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
        dataTable += `<td><a href='inv/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`;
        dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`;
    })
    dataTable += '</tbody>';
    //Display the contents in the Inventory Management view
    inventoryDisplay.innerHTML = dataTable;
}