"use strict";

import {
  applyShineAnimationTL,
  imageBlurAnimation,
  imageFocusAnimation,
} from "./utils/animations.js";
import { dummyData } from "./utils/data.model.js";

// DarkMode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// getData
totalTechnicians.textContent = dummyData.length;
let currentPage = 1;
let recordsPerPage = 10;

const paginationDescriptionPageStartElement = document
  .getElementsByClassName("pagination-description")[0]
  .getElementsByTagName("span")[0];

const paginationDescriptionPageEndElement = document
  .getElementsByClassName("pagination-description")[0]
  .getElementsByTagName("span")[1];

const paginatedTableBodyElement = document.getElementById(
  "paginated-table-body"
);
const paginationNavElementHolder = document.getElementById(
  "pagination-nav-element-holder"
);

const paginationTableRecordElements = Array.from(
  document.getElementsByTagName("tr")
).filter((element, index) => index < 0);

const computeNumberOfPages = (totalRecords, recordsPerPage) => {
  return Math.ceil(totalRecords / recordsPerPage);
};

const computePaginationDescriptionPageStart = (currentPage, recordsPerPage) => {
  return currentPage * recordsPerPage - (recordsPerPage - 1);
};

const computePaginationDescriptionPageEnd = (currentPage, recordsPerPage) => {
  return currentPage * recordsPerPage;
};

const createPageNavElements = (noOfPages, navElementHolder) => {
  for (let i = 0; i < noOfPages; i++) {
    const button = document.createElement("button");

    button.setAttribute(
      "class",
      "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    );
    button.textContent = i + 1;

    navElementHolder.appendChild(button);
  }
};

let updatePaginatedTableRecords = (
  tableBodyElement,
  records,
  recordStartIndex,
  recordEndIndex
) => {
  tableBodyElement.innerHTML = "";

  records
    .filter(
      (record, index) => index >= recordStartIndex - 1 && index < recordEndIndex
    )
    .forEach((record, index) => {
      const tr = document.createElement("tr");
      onRowEntryEvent(tr);
      onRowExitEvent(tr, index + recordStartIndex);
      const td = document.createElement("td");
      td.setAttribute("class", "text-cell rounded-l-lg");
      td.innerHTML = index + recordStartIndex;

      const td1 = document.createElement("td");
      const img = document.createElement("img");
      const div = document.createElement("div");
      img.setAttribute("src", record.image);
      div.setAttribute("class", "image-mask");
      td1.appendChild(img);
      td1.appendChild(div);

      const td2 = document.createElement("td");
      td2.setAttribute("class", "text-cell");
      td2.innerHTML = record.fullname;

      const td3 = document.createElement("td");
      td3.setAttribute("class", "text-cell");
      td3.innerHTML = record.id;

      const td4 = document.createElement("td");
      td4.setAttribute("class", "text-cell");
      td4.innerHTML = record.speciality;

      const td5 = document.createElement("td");
      td5.setAttribute("class", "text-cell");
      td5.innerHTML = record.country;

      const td6 = document.createElement("td");
      td6.setAttribute("class", "text-cell rounded-r-lg");
      td6.innerHTML = record.date;

      tr.appendChild(td);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);

      tableBodyElement.appendChild(tr);
    });
};

const linearTextFillAnimation = (cell) => {
  const text = String(cell.innerHTML);
  const textLength = text.length;
  const textPlaceholder = "_".repeat(textLength);

  cell.innerHTML = textPlaceholder;

  let count = 0;

  const linearTextFillAnimationInterval = setInterval(() => {
    if (count < textLength) {
      console.log(cell.innerHTML);
      cell.innerHTML =
        text.slice(0, count + 1) + textPlaceholder.slice(count + 1);

      count++;
    } else {
      clearInterval(linearTextFillAnimationInterval);
    }
  }, 10);
};

// Handles row entry
const onRowEntryEvent = (row) => {
  row.addEventListener("mouseenter", (e) => {
    const target = e.target;

    Array.from(target.querySelectorAll(".text-cell")).forEach((cell) => {
      linearTextFillAnimation(cell);
    });

    imageFocusAnimation(target.children[1].children[1]);
  });
};

// Handles row exit
const onRowExitEvent = (row, rowIndex) => {
  row.addEventListener("mouseleave", (e) => {
    const target = e.target;
    const currentData = Object.entries(dummyData[rowIndex - 1]).filter(
      (data) => data[0] !== "image"
    );

    Array.from(target.querySelectorAll(".text-cell")).forEach((cell, index) => {
      if (index) {
        if (index >= 0) {
          if (currentData[index - 1]) {
            cell.innerHTML = currentData[index - 1][1];
          }
        }
      } else {
        cell.innerHTML = rowIndex;
      }
    });

    imageBlurAnimation(target.children[1].children[1]);
  });
};

let onClickPaginationNavElement = () => {
  Array.from(paginationNavElementHolder.getElementsByTagName("button")).forEach(
    (button) => {
      button.addEventListener("click", (e) => {
        currentPage = e.target.textContent;

        updatePaginatedTableRecords(
          paginatedTableBodyElement,
          dummyData,
          computePaginationDescriptionPageStart(currentPage, recordsPerPage),
          computePaginationDescriptionPageEnd(currentPage, recordsPerPage)
        );

        paginationDescriptionPageStartElement.innerHTML =
          computePaginationDescriptionPageStart(currentPage, recordsPerPage);
        paginationDescriptionPageEndElement.innerHTML =
          computePaginationDescriptionPageEnd(currentPage, recordsPerPage);
      });
    }
  );
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    updatePaginatedTableRecords(
      paginatedTableBodyElement,
      dummyData,
      computePaginationDescriptionPageStart(currentPage, recordsPerPage),
      computePaginationDescriptionPageEnd(currentPage, recordsPerPage)
    );

    paginationDescriptionPageStartElement.innerHTML =
      computePaginationDescriptionPageStart(currentPage, recordsPerPage);
    paginationDescriptionPageEndElement.innerHTML =
      computePaginationDescriptionPageEnd(currentPage, recordsPerPage);
  }
};

const nextPage = () => {
  if (currentPage < computeNumberOfPages(dummyData.length, recordsPerPage)) {
    currentPage++;
    updatePaginatedTableRecords(
      paginatedTableBodyElement,
      dummyData,
      computePaginationDescriptionPageStart(currentPage, recordsPerPage),
      computePaginationDescriptionPageEnd(currentPage, recordsPerPage)
    );

    paginationDescriptionPageStartElement.innerHTML =
      computePaginationDescriptionPageStart(currentPage, recordsPerPage);
    paginationDescriptionPageEndElement.innerHTML =
      computePaginationDescriptionPageEnd(currentPage, recordsPerPage);
  }
};

// const applyEventListenerToRecordElement = (recordElements) => {
//     console.log(recordElements)
//   recordElements.forEach((row, index) => {
//     onRowEntryEvent(row);
//     onRowExitEvent(row, index);
//   });
// };

let callFunc = function () {
  updatePaginatedTableRecords(
    paginatedTableBodyElement,
    dummyData,
    computePaginationDescriptionPageStart(currentPage, recordsPerPage),
    computePaginationDescriptionPageEnd(currentPage, recordsPerPage)
  );
  createPageNavElements(
    computeNumberOfPages(dummyData.length, recordsPerPage),
    paginationNavElementHolder
  );
  onClickPaginationNavElement();
  applyShineAnimationTL(".image-mask");
};

document.getElementById("previous").addEventListener("click", prevPage);
document.getElementById("next").addEventListener("click", nextPage);
// function getData(){

// }

// let a = document.createElement("a");
// a.setAttribute(
//   "class",
//   "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
// );
// a.setAttribute("href", "#");

// Gets all table rows after DOM is loaded

window.addEventListener("load", () => {
  callFunc();

  paginationDescriptionPageStartElement.innerHTML =
    computePaginationDescriptionPageStart(currentPage, recordsPerPage);
  paginationDescriptionPageEndElement.innerHTML =
    computePaginationDescriptionPageEnd(currentPage, recordsPerPage);

//   applyEventListenerToRecordElement(paginationTableRecordElements);
});
