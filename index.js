"use strict";

import {
  applyShineAnimationTL,
  imageBlurAmimation,
  imageFocusAmimation,
} from "./utils/animations";
import { dummyData } from "./utils/data.model";
// import

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

//getData
totalTechnicians.textContent = dummyData.length;
let current_page = 1;
let recordPerPage = 10;

let pageNo = function () {
  return Math.ceil(dummyData.length / recordPerPage);
};

let pageNumbers = function () {
  for (let i = 0; i < pageNo(); i++) {
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute(
      "class",
      "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium clickPageNumber"
    );
    a.textContent = i + 1;
    let pageNumber = document.getElementById("page_number");
    pageNumber.appendChild(a);
  }
};

let changePage = function (page) {
  if (page < 1) {
    page = 1;
  }
  if (page > pageNo() - 1) {
    page = pageNo();
  }

  const tableBody = document.getElementById("paginated-table-body");
  tableBody.innerHTML = "";

  for (
    let j = (page - 1) * recordPerPage;
    j < page * recordPerPage && j < dummyData.length;
    j++
  ) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.setAttribute("class", "text-cell rounded-l-lg");
    td.innerHTML = j + 1;

    const td1 = document.createElement("td");
    const img = document.createElement("img");
    const div = document.createElement("div");
    img.setAttribute("src", dummyData[j].image);
    div.setAttribute("class", "image-mask");
    td1.appendChild(img);
    td1.appendChild(div);

    const td2 = document.createElement("td");
    td2.setAttribute("class", "text-cell");
    td2.innerHTML = dummyData[j].fullname;

    const td3 = document.createElement("td");
    td3.setAttribute("class", "text-cell");
    td3.innerHTML = dummyData[j].id;

    const td4 = document.createElement("td");
    td4.setAttribute("class", "text-cell");
    td4.innerHTML = dummyData[j].speciality;

    const td5 = document.createElement("td");
    td5.setAttribute("class", "text-cell");
    td5.innerHTML = dummyData[j].country;

    const td6 = document.createElement("td");
    td6.setAttribute("class", "text-cell rounded-r-lg");
    td6.innerHTML = dummyData[j].date;

    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tableBody.appendChild(tr);
  }
};

// const tableRowEventHoverEventListener
// console.log(document.getElementsByTagName("tr").length);

window.addEventListener("load", () => {
  const rows = Array.from(document.getElementsByTagName("tr"));

  rows.forEach((row, index) => {
    if (index !== 0) {
      row.addEventListener("mouseenter", (e) => {
        const target = e.target;
        imageFocusAmimation(target.children[1].children[1]);
      });

      row.addEventListener("mouseleave", (e) => {
        const target = e.target;
        imageBlurAmimation(target.children[1].children[1]);
      });
    }
  });
});

document.addEventListener("mouseover", (e) => {
  const element = e.target;
  //   console.log(element);
  if (element.nodeName === "TR") {
    console.log("habi");
  }
});

document.addEventListener("mouseover", (e) => {
  console.log(e);
  if (
    e.target.nodeName === "TD" &&
    e.target.firstChild?.nodeName.match("#text")
  ) {
    const text = String(e.target.innerHTML);
    const textLength = text.length;
    const textPlaceholder = "_".repeat(textLength);

    e.target.innerHTML = textPlaceholder;

    let count = 0;

    const interrrr = setInterval(() => {
      if (count < textLength) {
        e.target.innerHTML =
          text.slice(0, count + 1) + textPlaceholder.slice(count + 1);

        count++;
      } else {
        clearInterval(interrrr);
      }
    }, 10);
  }
});

let clickPage = function () {
  document.addEventListener("click", function (e) {
    if (
      e.target.nodeName == "A" &&
      e.target.classList.contains("clickPageNumber")
    ) {
      current_page = e.target.textContent;
      changePage(current_page);
    }
  });
};

let prevPage = function () {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
};

let nextPage = function () {
  if (current_page < pageNo()) {
    current_page++;
    changePage(current_page);
  }
};

let callFunc = function () {
  changePage(1);
  pageNumbers();
  clickPage();
  applyShineAnimationTL(".image-mask");
};

callFunc();
// function getData(){

// }

//tabulateData

let a = document.createElement("a");
a.setAttribute(
  "class",
  "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
);
a.setAttribute("href", "#");
