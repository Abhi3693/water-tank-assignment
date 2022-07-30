let inputTableHead = document.getElementById("input-table-head");
let inputTableBody = document.getElementById("input-table-body");
let outputTableHead = document.getElementById("output-table-head");
let outputTableBody = document.getElementById("output-table-body");
let inputArray = document.querySelector(".input-array");
let input = document.getElementById("form-control");
let form = document.getElementById("form");
let countWater = document.querySelector(".count");

let inputValue = [];
let count = 0;

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  inputValue = event.target.children[0].value.split(",").map(Number);
  input.value = '';
  generateInputUI();
  generateOutputUI();
}

const generateInputUI = () => {
  inputTableBody.innerHTML ="";
  inputTableHead.innerHTML ="";

  if (inputValue.length > 1) {

    let tableWidth = [...inputValue];
    let tableHeight = [...inputValue].sort((a, b) => b - a)[0] ;
    let tableRowArray = Array.from(Array(tableHeight).keys());

    tableWidth.forEach((elm, i) => {
      let td = document.createElement("td");
      td.classList.add("empty");
      inputTableHead.append(td)
    });
    
    tableRowArray.forEach((elm, outerIndex) => {

      let prevWall = 0;
      let nextWall = 0;

      let tr = document.createElement("tr");

      tableWidth.forEach((col, innerIndex) => {

        if(col) {
          prevWall = col;
        }

        for(let i = innerIndex+1; i <=tableWidth.length; i++) {
          nextWall = tableWidth[i];
          if(nextWall) {
            break
          }
        }

        let td = document.createElement("td");
        if (!col) {
          let lowerVal = prevWall < nextWall ? prevWall : nextWall;
          if(innerIndex > 0 && innerIndex < tableWidth.length-1 && lowerVal + outerIndex >= tableHeight) {
            td.classList.add("filled");
          }
        }
        if ( col + outerIndex >= tableHeight) {
          td.classList.add("wall");
        }
        tr.append(td);
      });
      inputTableBody.append(tr);
    });
  }

}


const generateOutputUI = () => {
  outputTableBody.innerHTML = "";
  outputTableHead.innerHTML ="";
  count = 0;

  if (inputValue.length > 1) {

    let tableWidth = [...inputValue];
    let tableHeight = [...inputValue].sort((a, b) => b - a)[0];
    let tableRowArray = Array.from(Array(tableHeight).keys());
    
    tableWidth.forEach((elm, i) => {
      let td = document.createElement("td");
      td.classList.add("empty");
      outputTableHead.append(td)
    });
    
    tableRowArray.forEach((elm, outerIndex) => {

      let prevWall = 0;
      let nextWall = 0;

      let tr = document.createElement("tr");

      tableWidth.forEach((col, innerIndex) => {

        if(col) {
          prevWall = col;
        }

        for(let i = innerIndex+1; i <=tableWidth.length; i++) {
          nextWall = tableWidth[i];
          if(nextWall) {
            break
          }
        }

        let td = document.createElement("td");
        if (!col) {
          let lowerVal = prevWall < nextWall ? prevWall : nextWall;
          if(innerIndex > 0 && innerIndex < tableWidth.length-1 && lowerVal + outerIndex >= tableHeight) {
            td.classList.add("filled");
            count++;
          }
        }
        tr.append(td);
        countWater.innerText = count;
        inputArray.innerText = tableWidth
      });
      outputTableBody.append(tr);
    });
  }
}
