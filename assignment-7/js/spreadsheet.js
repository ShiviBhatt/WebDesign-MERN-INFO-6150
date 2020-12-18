//  --------------- spreadsheet js--------------------------------
var colHigh = -1;
var rowHigh = -1;
let defRows = 4,
    defColumns = 8;

// Initialize table on page load
let init = (event) => {
createTable(event);
}

window.onload = function (event) {
    init(event);
};
// Create default table on page load
let createTable = (event) => {
    let tableBody = document.getElementById('table');
    let table = document.createElement('table');
 
    table.setAttribute("id", "tableId");    // Assigning id to table
    let tbody = document.createElement('tbody');
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Create rows
    for (let i = 0; i <= defRows; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr_" + i); // Assigning id to row
        if (i > 0) {
            // Create columns
            for (let j = 0; j <= defColumns; j++) {
                let td = document.createElement('td');

                eventHandlersTd (td, event);
                if (j > 0) {
                    // Makes all the cells except the first cell as an input
                    let x = document.createElement("INPUT");
                    x.setAttribute("type", "text");
                    td.appendChild(x);
                    td.setAttribute("id", str.charAt(j - 1) + i);       // Assigning id to cell
                } else {
                    // Adds numbers in the first column of each row
                    let x = document.createTextNode(i);
                    td.appendChild(x);
                }
                tr.appendChild(td);
            }
        } else {
            for (let j = 0; j <= defColumns; j++) {
                let th = document.createElement('th');
                if (j > 0) {
                    // Adds alphabets as the name of the columns
                    let x = document.createTextNode(str.charAt(j - 1));
                    th.appendChild(x);
                } else {
                    let x = document.createTextNode("");       // First column of first row is made empty
                    th.appendChild(x);
                }
                tr.appendChild(th);
            }
        }
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
    tableBody.appendChild(table);
}

// variables created to get element from index.html
var addRow = document.getElementById("addRow");
var addCol = document.getElementById("addCol");
var delRow = document.getElementById("delRow");
var delCol = document.getElementById("delCol");
var importFromCSV = document.getElementById("importCSVToTable");
var exportToCSV = document.getElementById("exportTableToCSV");

// EventListeners for buttons on the index page
addRow.addEventListener('click', insertRow);
addCol.addEventListener('click', insertColumn);
delRow.addEventListener('click', removeRow);
delCol.addEventListener('click', removeCol);
importFromCSV.addEventListener('click', importCSVToTable);
exportToCSV.addEventListener('click', exportTableToCSV);

//Mouse Handler
document.onmouseup = myMouseUpHandler;
let isMouseDown;
function myMouseUpHandler() {
    isMouseDown = false;
}

// CSV method
function importCSVToTable(event) {
        
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }
                }
                var upCSV = document.getElementById("tableId");
                upCSV.innerHTML = "";
                upCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

//Export to CSV Functions
function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
        type: "text/csv"
    });
    if (navigator.msSaveBlob) {    
        navigator.msSaveBlob(csvFile, filename);
    } else {

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }
}
//Export CSV Main Function
function exportTableToCSV(event) {
    if (event.isTrusted) {
        let filename = 'spreadsheet.csv';
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            let row = [];
            if (i > 0) {
                let cols = rows[i].querySelectorAll("td");
                for (let j = 0; j <= cols.length; j++) {
                    if (j > 0) {
                        cols = rows[i].querySelectorAll("td input");
                        row.push(cols[j - 1].value);
                    } else {
                        row.push(cols[j].innerText);
                    }
                }
            } else {
                let cols = rows[i].querySelectorAll("th");
                for (let j = 0; j < cols.length; j++) {
                    row.push(cols[j].innerText);
                }
            }
            csv.push(row.join(","));
        }

        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
    }
}


//Method to Insert a Column
function insertColumn(event) {
    if (event.isTrusted) {        
        let tr = document.getElementsByTagName('tr');
        let length = tr.length;
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Insert column in each row
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                let td = tr[i].insertCell();
                eventHandlersTd(td);
                let x = document.createElement("INPUT");   // Make cell as an input element
                x.setAttribute("type", "text");
                td.appendChild(x);
                td.setAttribute("id", str.charAt(tr[0].cells.length - 2) + i);    // Assign id to cell
            } else {
                let th = document.createElement("th");
                let x = document.createTextNode(str.charAt(tr[0].cells.length - 1));                 // Columns in first row will be assigned by a letter
                th.appendChild(x);
                tr[i].appendChild(th); // append rows
            }
        }
    }
}
//Method to Insert Row
function insertRow(event) {
    if (event.isTrusted) {
        let table = document.getElementById('tableId');
        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);
        // Assign id to row
        row.setAttribute("id", "tr_" + rowCount);
        // Add cells in each newly added row
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            createCell(row.insertCell(i), i, rowCount);
        }
    }
}
//Insert the cells
function createCell(cell, count, rowCount) {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // If its not the first column, make cell as an input type
    if (count > 0) {
        let x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        cell.appendChild(x);
        cell.setAttribute("id", str.charAt(count - 1) + rowCount);    // Assign id to each cell
    } else {
        // If first cell of the row, assign the number as the position of the row
        let x = document.createTextNode(rowCount);
        cell.appendChild(x);
    }

    eventHandlersTd(cell);
}
//Deletes the Row and Updates the Table with Headers and Cells Ids
function removeRow(event) {
    if (event.isTrusted) {
        let tbl = document.getElementById('tableId');
        lastRow = tbl.rows.length - 1,             // set the last row index
        i;
            if(lastRow >= 2){
                if(rowHigh != -1){
                    for (i = 0; i < tbl.rows.length; i++) {
                        tbl.deleteRow(rowHigh);
                    }
                    rowHigh = -1;
                }
            else
                tbl.deleteRow(lastRow);
                tbl = document.getElementById('tableId');
                console.log(tbl.rows.length + "tbl.rows.length");
            if( tbl.rows.length-1 > 1){ // actual header is also included so we removing that header from the count
            for(var i=1; i<tbl.rows.length; i++){
                tbl.rows[i].getElementsByTagName('td')[0].setAttribute('id',(i));
                tbl.rows[i].getElementsByTagName('td')[0].innerHTML = i;
            }
            for(var i=1; i<tbl.rows.length; i++){
                for(var j=1; j<tbl.rows[i].cells.length; j++){
                    var ch = tbl.rows[1].getElementsByTagName('td')[j].getAttribute('id');
                    tbl.rows[i].getElementsByTagName('td')[j].querySelector("input").setAttribute("id",ch+""+(i-1));
                }
            }
            }
        }
        else{
            alert("Cannot delete rows further");
        }
    }
}
//Deletes the Columns and Updates the Headers and Cell Ids
function removeCol(event) {
    if (event.isTrusted) {
        let tbl = document.getElementById('tableId');
        lastCol = tbl.rows[0].cells.length - 1,    // set the last column index
        i, j;
        // delete cells with index greater then 0 (for each row)
        if(lastCol >= 2){
            if(colHigh != -1){
                for (i = 0; i < tbl.rows.length; i++) {
                        tbl.rows[i].deleteCell(colHigh);
                }
                colHigh = -1;
            }
            else{
                for (i = 0; i < tbl.rows.length; i++) {
                    tbl.rows[i].deleteCell(lastCol);
                }
            }
            if(tbl.rows[0].cells.length > 1){
                var prev = 65;
                for(var i=2; i<=tbl.rows[0].cells.length; i++){
                    tbl.rows[0].cells[i-1].setAttribute('id', String.fromCharCode(prev));
                    tbl.rows[0].cells[i-1].innerHTML = String.fromCharCode(prev); // render the character header after deletion
                    prev += 1;
                }
                for(var j=1; j<tbl.rows[0].cells.length; j++){
                    for(var i=1; i<tbl.rows.length; i++){
                        var ch = tbl.rows[0].cells[j].getAttribute('id');
                        tbl.rows[i].cells[j].querySelector("input").setAttribute("id", ch+""+(i-1));
                    }
                }
            }
        }
        else{
            alert("Cannot delete columns further");
        }

}
}

var eventHandlersTd = (td, event) => {
    //Double Click to select Cells to Delete
    td.addEventListener('click', function (event) {
        if (event.isTrusted) {
            if(this.classList.contains("formula")){
                this.querySelector('input').value = this.dataset.formula;
            }else{
                console.log(td.querySelector('input').value);
            }
        }
    });

    td.addEventListener('focusout', function (event) {
        if(this.classList.contains("formula")){
            calculateValuesForFormula(this); 
            this.removeEventListener('focusout', this);
        }else{
            console.log(td.querySelector('input').value);
        }
    });


    //On Change of Event To Check for Arithmatic Operations
    Rx.Observable.fromEvent(td, 'change').subscribe(function (event) {
        if (event.isTrusted) {
            // For Addition
            // Operations 
            console.log("Change of Event = " + td.querySelector('input').value);

            let validOperator = td.querySelector('input').value.toLowerCase().indexOf("=")==0
            || td.querySelector('input').value.toLowerCase().indexOf("=sum")==0;
            if (validOperator) {
                // Sets the formula as Data Attribute
                td.dataset.formula = td.querySelector('input').value;
                td.classList.remove("selected");
                td.classList.remove("highlight");
                td.classList.add("formula");           
            }else if(td.dataset.formula){
                delete td.dataset.formula; 
                td.classList.remove("formula");   
            }

			let formulaCells = Array.from(document.getElementsByClassName("formula"));
			formulaCells.forEach(formula => {
                calculateValuesForFormula(formula);
			});
        }
    });
}

// Method for calculate Bodmas operation /arithmetic operations
var bosmasCalculation = new Rx.Subject(); 
bosmasCalculation.map(args => {
    let {id, x} = args;
    var stringOfSubstitutedValues = "";
    var tempString = "";
    for (let i = 1; i < x.length; i++) {
        if(x[i] == '+' || x[i] == '-' || x[i] == '*' || x[i] == '/'){
            var upper = tempString.toUpperCase();
            if(document.getElementById(upper)){
                var res = document.getElementById(upper).querySelector('input').value;
                stringOfSubstitutedValues = stringOfSubstitutedValues + res + x[i];
                tempString = "";
            }else{
                return {id: id, sum: "!err"};
            }
        }else{
            tempString += x[i];
        }
    }

    if(tempString.length != 0){
        var upper = tempString.toUpperCase();
        if(document.getElementById(upper)){
            var res = document.getElementById(upper).querySelector('input').value;
            stringOfSubstitutedValues +=  res;
        }else{
            return {id: id, sum: "!err"};
        }
    }
    try{
        var sum = eval(stringOfSubstitutedValues);
        if(isNaN(sum)){
            return {id: id, sum: "!err"};
        }
        return {id: id, sum: sum};
    }catch(e){
        return {id: id, sum: "!err"};
    }
   
}).subscribe(data => {
	document.getElementById(data.id).querySelector('input').value = data.sum;
});
// For Addition
var calculateSumSubject = new Rx.Subject(); 
calculateSumSubject.map(d => {
	let {id, x, y} = d;
	let sum = 0;
	if (x && y) {
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let firstNumber;
        let lastNumber;

        let fNumber = document.getElementById(x).parentNode.id.split("_");        // Row id of first parameter in the range
        let lNumber = document.getElementById(y).parentNode.id.split("_");        // Row id of second parameter in the range
        let firstLetter = document.getElementById(x).id;       // First letter of the first parameter of the range
        let lastLetter = document.getElementById(y).id;         // First letter of the second parameter of the range
        let tableBody = document.getElementById('tableId');
        let rowNumber1, rowNumber2;
        let regex = /[+-]?\d+(?:\.\d+)?/g;
        let match1 = regex.exec(firstLetter);
        // Starting range while calculating for columns
        rowNumber1 = match1[0];
        regex.lastIndex = 0;
        let match2 = regex.exec(lastLetter);
        // Ending range while calculating for columns
        rowNumber2 = match2[0];
        // Check when the operation is for rows
        if (fNumber[1] == lNumber[1]) {
            let cellsArea = tableBody.rows[fNumber[1]].cells;
            for (let i = 0; i < str.length; i++) {
                // Get number equivalent of the letter which is the name of the column
                if (str[i] == firstLetter[0]) {
                    firstNumber = i + 1;
                }
                if (str[i] == lastLetter[0]) {
                    lastNumber = i + 1;
                }
            }
            // calculate sum
            sum = 0;
            for (let i = firstNumber; i <= lastNumber; i++) {
                let val1 = cellsArea[i].querySelector('input').value;
                // Only accept positive, negative and float numbers, else the value will be made 0
                if (val1 == "" || !val1.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                    val1 = 0;
                }
                sum += parseFloat(val1);
            }
        // Check when the operation is for columns
        } else if (firstLetter[0] == lastLetter[0]) {
            let colNumber;
            for (let i = 0; i < str.length; i++) {
                // Get number value as the position of the letter in the column
                if (str[i] == firstLetter[0]) {
                    colNumber = i + 1;
                }
            }
            // Login to calculate sum
            sum = 0;
            for (let j = parseInt(rowNumber1); j <= parseInt(rowNumber2); j++) {
                if (colNumber > 0) {
                    let val2 = tableBody.rows[j].querySelectorAll('td')[colNumber].querySelector('input').value;
                    // Only accept positive, negative and float numbers, else the value will be made 0
                    if (val2 == "" || !val2.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
                        val2 = 0;
                    }
                    sum += parseFloat(val2);
                }
            }
            
        }
		return {id: id, sum: sum};
    }
	
}).subscribe(data => {
	document.getElementById(data.id).querySelector('input').value = data.sum;
});



function calculateValuesForFormula(formula) {
    var isUsed = false;
    let dataId = formula.id;
    console.log("dataId = " + dataId);
    // Gets the data attribute
    let dataFormula = formula.dataset.formula;
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(dataFormula);
    if (matches) {
        // Adds range in the array
        let array = matches[1].toUpperCase().split(':');
        if (array.length == 2) {
            // publish data to subscriber
            let f = dataFormula.toLowerCase();
            if (f.indexOf("=sum") == 0) {
                isUsed = true;
                console.log("Shivi");
                calculateSumSubject.next({ id: dataId, x: array[0], y: array[1] });
                console.log("Shivi 2");
            }
        }
    }
    if (!isUsed) {
        console.log("dataFormula = " + dataFormula);
        bosmasCalculation.next({ id: dataId, x: dataFormula });
    }
}
//  -------x-------- spreadsheet js---------------x-----------------