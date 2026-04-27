/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Maxine
  Date: 
  Filename: script.js
*/

"use strict";

// Create an in-memory object array for each table in the restaurant
let tables = [
  { tableNumber: 1, capacity: 2, isReserved: false },
  { tableNumber: 2, capacity: 4, isReserved: false },
  { tableNumber: 3, capacity: 4, isReserved: false },
  { tableNumber: 4, capacity: 6, isReserved: false },
  { tableNumber: 5, capacity: 8, isReserved: false }
];

// Create a function reserveTable
function reserveTable(tableNumber, callback, time) {
  let table = tables.find(function (currentTable) {
    return currentTable.tableNumber === tableNumber;
  });

  if (table && !table.isReserved) {
    table.isReserved = true;

    setTimeout(function () {
      callback(`Success! Table ${tableNumber} has been reserved.`);
    }, time);
  } else {
    callback(`Sorry, table ${tableNumber} is not available.`);
  }
}

// When the form is submitted, call the reserveTable function
let reservationForm = document.getElementById("reservationForm");
let message = document.getElementById("message");

reservationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let tableNumber = Number(document.getElementById("tableNumber").value);

  if (!name || !tableNumber) {
    message.textContent = "Please enter your name and select a table.";
    message.className = "message error";
    return;
  }

  message.textContent = `Checking availability for ${name}...`;
  message.className = "message waiting";

  reserveTable(
    tableNumber,
    function (reservationMessage) {
      message.textContent = `${name}, ${reservationMessage}`;

      if (reservationMessage.startsWith("Success")) {
        message.className = "message success";
      } else {
        message.className = "message error";
      }
    },
    1000
  );
});
