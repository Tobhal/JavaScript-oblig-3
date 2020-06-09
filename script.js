window.onload = startup;

function readFile() {   // This is the file reader. It also defined the object i store the data in
    let file = document.getElementById("file").files.item(0);   // Gets the file from the HTML
    let reader = new FileReader();  // Creates a new filereader
    let text

    let data = {    // Defines the object I store the data. I store all of the coums in a object and the object have a array that stores the row information
        date: [],           // The date of the pucnes
        type: [],           // The type of puches
        place: [],          // Where the puches happend
        amount: [],         // This is the amount paid
        serialNumber: []    // This is the index of all of the transaction
    };

    reader.readAsText(file)         // Asigns the importet CSV file to the file reader
    reader.onload = function(e) {   // When the filereader is done reading the file it will run this
        text = reader.result;       // Setts the read file as a variable, so i can use it to create a object

        convertToObject(text, data);    // Converts text to a object and stores the colums in the object "data"
        getStats(data);     // Runs the getStats function to create all of the stats

    };
}

function convertToObject(file, data) {      // Takes the file and data object and places the data form file to the object
    let text = file.split("\n");    // Splits the document on new line so i can gett all of my columns

    for (let i = 0; i < text.length; i++) {     // Loops thru the columns
        let temp = text[i].split(",");      // Splits the i culumn in rows so i can acces them, using the temp array
        
        let tempDate = new Date(temp[0]).getTime();     // Converts the date that is written in a default form to a int, this is so that i can use it later
        data.date[i] = tempDate;    // Adds the date to the correct object
        data.type[i] = temp[1];     // Adds the type of puches to the object
        data.place[i] = temp[2];    // Adds the place of puches to the object
        data.amount[i] = parseInt(temp[3]);     // Adds the amount of the puches to the object
        data.serialNumber[i] = i    // Creats a index
    }
}

function filtredObject(data, tableCreateArray) {    // Just creats a new object with the filtred values, so i dont need to rewrite all of the code
    let filtredData = {     // The same as the other object
        date: [],
        type: [],
        place: [],          
        amount: [],         
        serialNumber: []
    }

    for (let i = 0; i < tableCreateArray.length; i++) {     // Here i add the filtred data in the correct place in the object
        filtredData.date[i] = data.date[tableCreateArray[i]];
        filtredData.type[i] = data.type[tableCreateArray[i]];
        filtredData.place[i] = data.place[tableCreateArray[i]];
        filtredData.amount[i] = data.amount[tableCreateArray[i]];
        filtredData.serialNumber[i] = data.amount[tableCreateArray[i]];
    }

    stats.display(filtredData);     // Displays the firlted data
}

function getStats(data) {   // The stats display 
    table.create(data);
    stats.display(data);
}

function setDropdown(data) {        // Creates the dropdown menu when the CSV file is loaded
    let selectPlace = document.getElementById("selectPlace");       // Selects the dropdown also so i can use them later
    let selectType = document.getElementById("selectType");         // Selects the dropdown also so i can use them later
    
    selectPlace.options.length = 0;     // Setts the amount of options to 0, to resett all of the potions    
    selectType.options.length = 0;      // Setts the amount of options to 0, to resett all of the potions

    selectPlace.options[selectPlace.options.length] = new Option("All", "All");     // Adds a new option to the dropdown with the display string All (the first value) and value "All" (The secont location)
    selectType.options[selectType.options.length] = new Option("All", "All");       // Adds a new option to the dropdown with the display string All (the first value) and value "All" (The secont location)

    let locations = stats.location(data);       // Adds the stats location to a variable so i dont need to request the data more than i need
    let types = stats.types(data);              // Adds the stats type to a variable so i dont need to request the data more than i need
    
    for (let i = 0; i < locations.length; i++) {        // Adds all of the locations to the dropdown
        selectPlace.options[selectPlace.options.length] = new Option(locations[i], locations[i])        // Does the same as when i add the "All" option above
    }
    
    for (let i = 0; i < types.length; i++) {        // Adds all of the types to a dropdown
        selectType.options[selectType.options.length] = new Option(types[i], types[i])      // Does the same as when i add the "All" option above
    }
    
    selectPlace.addEventListener("change", function () {        // Adds a event linsner to the dropdown menu so I can change the graf when the dropdown changes value, so i down need a button.
        update.tableData(data, selectPlace, selectType);        // Uppdates the data in the table
    });
    selectType.addEventListener("change", function () {         // Adds a event linsner to the dropdown menu so I can change the graf when the dropdown changes value, so i down need a button.
        update.tableData(data, selectPlace, selectType);        // Uppdates the data in the table
    });
    document.getElementById("grafType").addEventListener("change", function () {    // Adds a event liner to the graf type so the graf can change when the dropdown changes
        update.tableData(data, selectPlace, selectType);        // Updates the graff
    });
}

/*----- table functions -----*/

let table = {
    create: function(data) {
        table.clear()       // Clears the table

        for (let i = 0; i < data.serialNumber.length; i++) {    // This loopt thru the array part of the object, this is so I can create i new column for the array length. 
    
            let tempDate = new Date(data.date[i])   // A temprary variable for storing the date, to get ready to convert back to a readeble date form
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  // This is to tell javascript how to write the date
    
            let table = document.getElementById("myTable");     // Gets the table from HTML
            let row = table.insertRow(-1);      // Definef that row should insert a row int he column, -1 saying that it shoyld add it to the last place
    
            let cellSerialNumber = row.insertCell(0);   // Defines what cell the index should be stored
            let cellDate = row.insertCell(1);           // Defines what cell the date should be stored
            let cellLocation = row.insertCell(2);       // Defines what cell the location should be stored
            let cellType = row.insertCell(3);           // Defines what cell the tyoe should be stored
            let cellSpendt = row.insertCell(4);         // Defines what cell the spendt should be stored
    
            // Displays the table
            cellSerialNumber.innerHTML = data.serialNumber[i];      // Setts the innherHTML to serialNumber i
            cellDate.innerHTML = tempDate.toLocaleDateString("en-EN", options);     // Setts the date to a normal format (in English style). It also setts it in the table
            cellLocation.innerHTML = data.place[i];
            cellType.innerHTML = data.type[i];
            cellSpendt.innerHTML = data.amount[i] + "&nbsp;KR";
        }
    
        setDropdown(data);      // Setts the dropdown menu
    },
    clear: function() {     // Clears the table
        let table = document.getElementById("myTable");

        for (let i = table.rows.length - 1; i > 0; i--) {       // Deletes all of the rows
            table.deleteRow(i);
        }
    }
}

/*----- update functions -----*/

let update = {      // For updating things
    tableData: function(data, selectPlace, selectType) {        // Creates a arrays to use when i filter the data object.
        let tempArray = [];
        let tableCreateArray = [];

        for (let i = 0; i < data.serialNumber.length; i++) {
            if (selectPlace.value == data.place[i] || selectPlace.value == "All") {     // Pushes the index value for the lines i need to filter to a array, so when i need to filter i can read the index location insted of testing all of the spots
                tempArray.push(data.serialNumber[i]);
            }
        }
    
        for (let i = 0; i < tempArray.length; i++) {
    
            if (data.type[tempArray[i]] == selectType.value || selectType.value == "All") {     // Pushes the index value for the lines i need to filter to a array, so when i need to filter i can read the index location insted of testing all of the spots
                tableCreateArray.push(tempArray[i]);
            }
        }
    
        update.table(data, tableCreateArray);       // Updates the table
    },

    table : function(data, tableCreateArray) {
        table.clear();

        for (let i = 0; i < tableCreateArray.length; i++) {    // This loopt thru the array part of the object, this is so I can create i new column for the array length. 
    
            let tempDate = new Date(data.date[tableCreateArray[i]])   // A temprary variable for storing the date, to get ready to convert back to a readeble date form
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };  // This is to tell javascript how to write the date
    
            let table = document.getElementById("myTable");     // Gets the table from HTML
            let row = table.insertRow(-1);      // Definef that row should insert a row int he column, -1 saying that it shoyld add it to the last place
    
            let cellSerialNumber = row.insertCell(0);   // Defines what cell the index should be stored
            let cellDate = row.insertCell(1);           // Defines what cell the date should be stored
            let cellLocation = row.insertCell(2);       // Defines what cell the location should be stored
            let cellType = row.insertCell(3);           // Defines what cell the tyoe should be stored
            let cellSpendt = row.insertCell(4);         // Defines what cell the spendt should be stored
    
            // Displays the table
            cellSerialNumber.innerHTML = data.serialNumber[tableCreateArray[i]];      // Setts the innherHTML to serialNumber i
            cellDate.innerHTML = tempDate.toLocaleDateString("en-EN", options);     // Setts the date to a normal format (in English style). It also setts it in the table
            cellLocation.innerHTML = data.place[tableCreateArray[i]];
            cellType.innerHTML = data.type[tableCreateArray[i]];
            cellSpendt.innerHTML = data.amount[tableCreateArray[i]] + "&nbsp;KR";
        }
        
        filtredObject(data, tableCreateArray);
    }
}

/*----- stats functions -----*/

let stats = {   // A object with alot of functions to do alot of the calculations i need
    
    sum : function(data) {      // The total sum of money spent
        let temp = 0;
        for (let i = 0; i < data.amount.length; i++) {
           temp += data.amount[i];
        }
        return temp;
    }, 
    avrage : function(data) {   // The avrage amount of money spent
        let temp = 0;
        for (let i = 0; i < data.amount.length; i++) {
            temp += data.amount[i];
        }
        return temp / data.amount.length;
    },
    maximum : function(data) {  // The maximum amount of money spent 
        let temp = data.amount[0];
        for (let i = 0; i < data.amount.length; i++) {
            data.amount[i] < temp ? temp = data.amount[i] : undefined;
        }
        return temp;
    },
    minimum : function(data) {  // The maximum amount of money spent 
        let temp = data.amount[0];
        for (let i = 0; i < data.amount.length; i++) {
            data.amount[i] > temp ? temp = data.amount[i] : undefined;
        }
        return temp;
    },
    date : function(data) {     // How many days the data is taken from
        let tempSmall = new Date(data.date[0]);
        let tempLarge = new Date(data.date[0]);
    
        for (let i = 0; i < data.date.length; i++) {    // Finds the last date
            if (tempSmall > data.date[i]) {
                tempSmall = new Date(data.date[i]);
            }
            
            if (tempLarge < data.date[i]) {     // Finds the first day
                tempLarge = new Date(data.date[i]);
            }
        }
    
        let timeDiff = Math.abs(tempLarge.getTime() - tempSmall.getTime())
        let timeDiffrance = Math.ceil(timeDiff / (1000 * 3600 * 24))

        return {small: tempSmall, large: tempLarge, timeDiff: timeDiffrance};
    },
    location : function(data) {     // All the difrent locations
        let locations = [];

        for (let i = 0; i < data.place.length; i++) {   // Stores the place taht is diffren to the array
            if (locations.includes(data.place[i])) {    // Test if the array includes the place alreaty, if not then puch it to the array

            } else {
                locations.push(data.place[i]);
            }
        }
        return locations;
    },
    types : function(data) {        // All the types of pucheses
        let types = [];

        for (let i = 0; i < data.type.length; i++) {    //  Stores the type that is diffrent to a array
            if (types.includes(data.type[i])) {     // Test if the array includes the type, if not then puch it to the array

            } else {
                types.push(data.type[i]);
            }
        }
        return types;
    },
    display : function(data) {
        let tempDateFirst = new Date(stats.date(data).small);       // The first day for the observation persiod, temp
        let tempDateLast = new Date(stats.date(data).large);        // The last day for the observation period, temp
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
        let text = document.getElementById("stats");    // Gets the text feald to display the stats
        // Writes the stats to the HTML document
        text.innerHTML =    `
                            The total spendt: ${stats.sum(data)} KR. <br>
                            The avrage is: ${stats.avrage(data)} KR. <br>
                            The maximum and minimum spend is: ${stats.maximum(data)} KR max and ${stats.minimum(data)} KR min. <br>
                            <br>
                            A total of ${stats.location(data).length} places was visited. <br>
                            The locations was: ${stats.location(data)}. <br>
                            <br>
                            A total of ${stats.types(data).length} difrent types of thing was purchased. <br>
                            All of them was: ${stats.types(data)}.
                            <br>
                            The total observation persiod was ${stats.date(data).timeDiff} days. <br>
                            The start day was: ${tempDateFirst.toLocaleDateString("en-US", options)} <br>
                            The end day was: ${tempDateLast.toLocaleDateString("en-US", options)}
                            `
        stats.draw(data);       // Draws the graf

        let locationRadio = document.getElementById("locationRadio");   
        let typeRadio = document.getElementById("typeRadio");           
  
        locationRadio.addEventListener("change", function() {   // Adds a event lintener to lisen for when the radio button i change and then drawn the new updatet graf
            stats.draw(data);
        });
  
        typeRadio.addEventListener("change", function() {       // Adds a event lintener to lisen for when the radio button i change and then drawn the new updatet graf
            stats.draw(data);
        });
    },

    perLocation : function(data) {      // Calculates stats per location
        let temp = stats.location(data);
        let tempArr = [];
        let tempCalc = 0;
        let calcArr = [];

        while (temp.length) tempArr.push(temp.splice(0,1));     // Turns my 1D array to a 2D array

        for (let i = 0; i < data.amount.length; i++) {

            for (let l = 0; l < tempArr.length; l++) {
                if (data.place[i] == tempArr[l][0]) {
                    tempArr[l].push(data.amount[i])
                }
            }    
        }

        for (let i = 0; i < tempArr.length; i++) {
            tempCalc = 0;
            for (let l = 0; l < tempArr[i].length; l++) {
                if (typeof tempArr[i][l] == "number"){
                    tempCalc += tempArr[i][l];
                }
            }

            switch (grafType.value) {       // Switch to se what the graf dropdown is and dues the coresponding task
                case "avrage":
                    calcArr.push(Math.round(tempCalc / tempArr[i].length - 1));
                    break;

                case "total":
                    calcArr.push(tempCalc);
                    break;

                case "minimum":
                    calcArr[i] = tempArr[i][1];
                    for (let l = 1; l < tempArr[i].length; l++) {
                        if (tempArr[i][l] < calcArr[i]) {
                            calcArr[i] = tempArr[i][l];
                        }
                    }
                    break;
                case "maximum":
                    calcArr[i] = tempArr[i][1];
                    for (let l = 1; l < tempArr[i].length; l++) {
                        if (tempArr[i][l] > calcArr[i]) {
                            calcArr[i] = tempArr[i][l];
                        }
                    }
                    break

                default:
                    break;
            }
            
        }
        return calcArr;
    },

    perType : function(data) {      // Almost the same as per location
        let temp = stats.types(data);
        let tempArr = [];
        let tempCalc = 0;
        let calcArr = [];

        while (temp.length) tempArr.push(temp.splice(0,1));

        for (let i = 0; i < data.type.length; i++) {

            for (let l = 0; l < tempArr.length; l++) {
                if (data.type[i] == tempArr[l][0]) {
                    tempArr[l].push(data.amount[i])
                }
            }    
        }

        for (let i = 0; i < tempArr.length; i++) {
            tempCalc = 0;
            for (let l = 0; l < tempArr[i].length; l++) {
                if (typeof tempArr[i][l] == "number"){
                    tempCalc += tempArr[i][l];
                }
            }
            calcArr.push(Math.round(tempCalc / tempArr[i].length - 1));
        

            switch (grafType.value) {
                case "avrage":
                    calcArr.push(Math.round(tempCalc / tempArr[i].length - 1));
                    break;

                case "total":
                    calcArr.push(tempCalc);
                    break;

                case "minimum":
                    for (let i = 0; i < tempCalc.length; i++) {
                        calcArr.push(tempCalc[1]);
                        for (let l = 1; l < tempCalc[i].length; i++) {
                            if (calcArr[i] > tempCalc[i][l]) {
                                calcArr[i] = tempCalc[i][l];
                            }
                        }
                    }
                    break;
                case "maximum":
                    calcArr[i] = tempArr[i][1];
                    for (let l = 1; l < tempArr[i].length; l++) {
                        if (tempArr[i][l] > calcArr[i]) {
                            calcArr[i] = tempArr[i][l];
                        }
                    }    
                    break

                default:
                    break;
            }
        }
        return calcArr;
    },




    draw : function(data) {     // Desides waht should be drawn
        if (locationRadio.checked) {
            stats.drawPlace(data);
        } else if (typeRadio.checked) {
            stats.drawType(data);
        };
    
    },
    drawPlace : function(data) {        // Draws stats for place
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');

        let width = 10

        let location = stats.location(data);
        let locationStats = stats.perLocation(data);

        ctx.clearRect(0, 0, canvas.width, canvas.height);       // Clears the canvas

        ctx.font = "20px Times New Roman";      // Setts the font
    
        ctx.fillStyle = 'black';        // Setts the fill color
        
        for (let i = 0; i < location.length; i++) {     // Draws the bars
            let tempLocation = location[i];     // Storing the array that i need so i can use it easy

            ctx.fillRect(width, canvas.height - 30, 25, -locationStats[i] / canvas.height * 30);        // Draws the bars

            ctx.fillText(tempLocation, width, canvas.height - 10);     // Draws the text
            
            width += ctx.measureText(tempLocation).width + 10;      // Adds the distanse for the next stats
        }
    },
    drawType : function(data) {     // Draws stats for type
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext('2d');

        let width = 10

        let type = stats.types(data);
        let typeStats = stats.perType(data);

        ctx.clearRect(0, 0, canvas.width, canvas.height);       // Clears the canvas

        ctx.font = "20px Times New Roman";      // Setts the font
    
        ctx.fillStyle = 'black';        // Setts the fill color
        
        for (let i = 0; i < type.length; i++) {     // Draws the bars
            let tempLocation = type[i];     // Storing the array that i need so i can use it easy

            ctx.fillRect(width, canvas.height - 30, 25, -typeStats[i] / canvas.height * 30);        // Draws the bars

            ctx.fillText(tempLocation, width - 10, canvas.height - 10);     // Draws the text
            
            width += ctx.measureText(tempLocation).width + 10;      // Adds the distanse for the next stats
        }
    }
}



function startup() {
    document.getElementById("file").addEventListener("change", readFile);    // Adds a event linsner to lisen for when you have uploaded a CSV file. i can also use .onchange
}