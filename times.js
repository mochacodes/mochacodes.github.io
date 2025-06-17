/*
Raj Ray
June 15, 2025
uml ID: 01978862
raj_ray@student.uml.edu
github: mochacodes
*/


function saveAndValidateInputs(){
    /*gets inputs*/
    var minCol = parseInt(document.getElementById("minCol").value);
    var maxCol = parseInt(document.getElementById("maxCol").value);
    var minRow = parseInt(document.getElementById("minRow").value);
    var maxRow = parseInt(document.getElementById("maxRow").value);
    var container = document.getElementById("inputs");

    //createse element for error message.
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Min values must be less than Max values. They can't be the same. Must be inbetween -50 and 50 inclusive. No Decimals";
    errorMsg.id = "errorMsg";
    //removes old error message so that duplicates don't spawn everytime you hit submit.
    const errorMsgExists = document.getElementById("errorMsg");
    if (errorMsgExists) {
        errorMsgExists.remove();
    }


    //Error Handling conditional block - i know this if block is ugly but it works.
    if (minCol >= maxCol || minRow >= maxRow 
        || minCol > 50 || minCol < -50 || maxCol > 50 || maxCol < -50
        || minRow > 50 || minRow < -50 || maxRow > 50 || maxRow < -50
        || !Number.isInteger(minCol) || !Number.isInteger(maxCol) || !Number.isInteger(minRow) || !Number.isInteger(maxRow)) {
        container.appendChild(errorMsg);
        return null;
    }   // returns null so that table isn't created if invalid
    
    return [minCol, maxCol, minRow, maxRow]
}



function createTable() {
    let [minCol, maxCol, minRow, maxRow] = saveAndValidateInputs();
    console.log(minCol, maxCol, minRow, maxRow);
    
    //removes old table if params are changed/submit button gets hit again. 
    document.getElementById("table1").innerHTML = "";
    
    const TABLE = document.getElementById("table1")

    //INITIALIZE COLUMN HEADER
    const colHeader = document.createElement("tr");
    //adds top left square so col header isnt shifted left by 1
    colHeader.appendChild(document.createElement("th"));
    
    //loop just adds the iterator num to each header square and appends the square to the row then the row to the table.
    for (let i = minCol; i <= maxCol; i++) {
        const th = document.createElement("th");
        th.textContent = i;
        colHeader.appendChild(th);
    }
    TABLE.appendChild(colHeader);

    //creates the row headers and data
    for (let i = minRow; i <= maxRow; i++) {
        //creates a row and row header. sets row header to i cause it'll always match the first element of the row
        const tr = document.createElement("tr");
        const rowHeader = document.createElement("th");
        rowHeader.textContent = i;
        tr.appendChild(rowHeader);
        //this loop creates the table data and appends it. simple nested loop and appends to row after.
        for (let j = minCol; j <= maxCol; j++) {
            const td = document.createElement("td");
            td.textContent = j * i;
            tr.appendChild(td);
        }
        //add row to table
        TABLE.appendChild(tr);
    }

}






    // for (let i = minRow; i <= maxRow; row++) {
    //     const tr = document.createElement("tr");

    //     for (let j = minCol; j <= maxCol; j++) {
    //         const td = document.createElement("td");
    //         td.textContent = "r";
    //         tr.appendChild(td);
    //     }
    //     TABLE.appendChild(tr);
    // }   
