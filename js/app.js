'use strict';

var myStores = ['Seattle ', 'Tokyo ', 'Dubai ', 'Paris ', 'Lima '];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];

var stores = [];

function Store(name, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerCustomer) {
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.name = name;
  this.cookiesPerHourArr = [];
  this.totalDailyCookies = 0;


  stores.push(this);
  this.render();

}

Store.prototype.cookiesPerHour = function () {
  console.log('inside cookiesPerhour function');

  for (var i = 0; i < hours.length; i++) {
    console.log('inside for loop at ' + i);

    // getting random amount of customers between two numbers min and max

    var numOfCustomers = Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers + 1))
    console.log(numOfCustomers);

    // getting number of cookies

    var numOfCookies = Math.floor(numOfCustomers * this.avgCookiesPerCustomer);
    console.log(numOfCookies);

    this.cookiesPerHourArr.push(numOfCookies);

    this.totalDailyCookies += numOfCookies;

  }
  this.cookiesPerHourArr.push(this.totalDailyCookies);
  console.log(this.totalDailyCookies);
  console.log(this.cookiesPerHourArr);

};


Store.prototype.render = function () {

  //body
  var tableBody = document.getElementById('tbl-body');
  var storeRow = document.createElement('tr');
  var tdStoreName = document.createElement('td');
  tdStoreName.textContent = this.name;
  storeRow.appendChild(tdStoreName);

  this.cookiesPerHour();
  console.log(this.cookiesPerHourArr);
  for (var i = 0; i < this.cookiesPerHourArr.length; i++) {
    var tdCookieCount = document.createElement('td');
    tdCookieCount.textContent = this.cookiesPerHourArr[i];
    storeRow.appendChild(tdCookieCount);
  }

  tableBody.appendChild(storeRow);
};

function createTable() {
  var section = document.getElementById('main-content');
  var table = document.createElement('table');
  var tableHead = document.createElement('thead');
  var tableBody = document.createElement('tbody');
  var tableFooter = document.createElement('tFooter');

  section.appendChild(table);
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  table.appendChild(tableFooter);

  table.id = 'Cookie-Table';
  tableHead.id = 'tbl-head';
  tableBody.id = 'tbl-body';
  tableFooter.id = 'tbl-foot';
  table.className = 'tbl';

  //create table header
  var tableHeader = document.getElementById('tbl-head');
  var tableHeaderRow = document.createElement('tr');

  //first table head is empty
  var emptyTableHead = document.createElement('th');
  tableHeaderRow.appendChild(emptyTableHead);




  //remainder of table heads are store hours
  for (var i = 0; i < hours.length; i++) {

    var tableHead = document.createElement('th');
    tableHead.textContent = hours[i];
    tableHeaderRow.appendChild(tableHead);
  }

  tableHeader.appendChild(tableHeaderRow);

  // Last table head is the total
  var global = document.createElement('th')
  global.textContent = 'Total';
  tableHeaderRow.appendChild(global);

}

function createFooterRow() {
  //footer (alignment didn't look right when I used tbl-foot so I changed to tbl-body...why didn't tbl-foot work??)
  var tableBody = document.getElementById('tbl-body');
  var totalRow = document.createElement('tr');

  totalRow.setAttribute('id', 'totalRow'); //need this to delete the total row and recreate if new store is added

  var tdTotalsLabel = document.createElement('td');
  var totalCookiesPerDay = 0;
  tdTotalsLabel.textContent = 'Totals';
  totalRow.appendChild(tdTotalsLabel);

  //for loop will loop through the hours
  for (var i = 0; i < hours.length; i++) {
    var totalCookiesPerHour = 0;

    //for loop for stores
    for (var j = 0; j < stores.length; j++) {
      totalCookiesPerHour += stores[j].cookiesPerHourArr[i];
    }
    totalCookiesPerDay += totalCookiesPerHour;

    var tdTotalCookies = document.createElement('td');
    tdTotalCookies.textContent = totalCookiesPerHour;
    totalRow.appendChild(tdTotalCookies);

  }
  var dailyTotalEl = document.createElement('td');
  dailyTotalEl.textContent = totalCookiesPerDay;
  totalRow.appendChild(dailyTotalEl);
  tableBody.appendChild(totalRow);


}

createTable();


new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 15, 69, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

createFooterRow();

console.log(stores);


var locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var locationInput = event.target.locationInput.value;
  var minInput = event.target.minInput.value;
  var maxInput = event.target.maxInput.value;
  var avgCookiesInput = event.target.avgCookiesInput.value;

  //delete total row
  var totalRow = document.getElementById('totalRow');
  totalRow.parentNode.removeChild(totalRow);

  //create new store
  new Store(locationInput, minInput, maxInput, avgCookiesInput);

  //recreate footer with the new store that's been added
  createFooterRow();
  
  console.log(stores);

  event.target.locationInput.value = '';
  event.target.minInput.value = '';
  event.target.maxInput.value = '';
  event.target.avgCookiesInput.value = '';
});












