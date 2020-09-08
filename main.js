var sodokuNumbers = [];
var boardCompleteNumbers;

// pre-load work
window.onload = function () {
    loadSodukoSectionNumber();

    generateSudokuBoard();

    // getNumbersByRow(0);
    // getNumbersByRow(1);
    // getNumbersByRow(2);
    // getNumbersByRow(3);
    // getNumbersByRow(4);
    // getNumbersByRow(5);
    // getNumbersByRow(6);
    // getNumbersByRow(7);
    // getNumbersByRow(8);

    // getNumbersByColumn(0);
    // getNumbersByColumn(1);
    // getNumbersByColumn(2);
    // getNumbersByColumn(3);
    // getNumbersByColumn(4);
    // getNumbersByColumn(5);
    // getNumbersByColumn(6);
    // getNumbersByColumn(7);
    // getNumbersByColumn(8);
}

function loadSodukoSectionNumber() {
    var sectionNames = ["section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8", "section9"];
    for (var i = 0; i < sectionNames.length; i++) {
        var section = document.getElementById(sectionNames[i]);
        var sectionNumbers = [];
        for (var j = 0; j < section.children.length; j++) {
            if (section.children[j].tagName === "INPUT") {
                var number = section.children[j].value;
                sectionNumbers.push(Number.parseInt(number));
            }
        }
        sodokuNumbers.push(sectionNumbers);
    }
    console.log(sodokuNumbers);
}

function checkUniqueNumbers1(array) {
    var dictionary = {};
    for (var i = 0; i < array.length; i++) {
        if (dictionary[array[i]] == null) {
            dictionary[array[i]] = 1;
        }
        else {
            return false;
        }
    }
    return true;
}

function getNumbersByRow(rowIndex) {
    var numbers = [];
    var rowIncrement = Math.floor(rowIndex / 3) * 3;
    for (var i = 0 + rowIncrement; i < 3 + rowIncrement; i++) {
        var array = sodokuNumbers[i]; // sodokuNumbers[i] is the section at index i
        for (var j = 0 + (rowIndex * 3) % 9; j < 3 + (rowIndex * 3) % 9; j++) {
            numbers.push(array[j]);
        }
    }
    return numbers;
}

function getNumbersByColumn(columnIndex) {
    var numbers = [];
    var sectionStartIndexes = [0, 3, 6];
    var sectionIncrement = Math.floor(columnIndex / 3);
    for (var i = 0; i < 3; i++) {
        var array = sodokuNumbers[sectionStartIndexes[i] + sectionIncrement];
        for (var j = 0; j < 3; j++) {
            numbers.push(array[sectionStartIndexes[j] + columnIndex % 3]);
        }
    }
    console.log(numbers);
    return numbers;
}

// numbers is array type
function shuffleNumbers(numbers) {
    var shuffledNumbers = Array.from(numbers);

    for (var i = 0; i < shuffledNumbers.length; i++) {
        var randomeIndex = Math.floor(Math.random() * shuffledNumbers.length);

        // swap numbers
        var temp = shuffledNumbers[i];
        shuffledNumbers[i] = shuffledNumbers[randomeIndex];
        shuffledNumbers[randomeIndex] = temp;
    }

    return shuffledNumbers;
}

function generateSudokuBoard() {
    var initialNumbers = [];
    for (var i = 0; i < 9; i++) {
        initialNumbers[i] = i + 1;
    }

    var shuffledNumbers = this.shuffleNumbers(initialNumbers);

    boardCompleteNumbers = [
        shuffledNumbers,
        [shuffledNumbers[3], shuffledNumbers[4], shuffledNumbers[5], shuffledNumbers[6], shuffledNumbers[7], shuffledNumbers[8], shuffledNumbers[0], shuffledNumbers[1], shuffledNumbers[2]],
        [shuffledNumbers[6], shuffledNumbers[7], shuffledNumbers[8], shuffledNumbers[0], shuffledNumbers[1], shuffledNumbers[2], shuffledNumbers[3], shuffledNumbers[4], shuffledNumbers[5]],
        [shuffledNumbers[1], shuffledNumbers[2], shuffledNumbers[0], shuffledNumbers[4], shuffledNumbers[5], shuffledNumbers[3], shuffledNumbers[7], shuffledNumbers[8], shuffledNumbers[6]],
        [shuffledNumbers[4], shuffledNumbers[5], shuffledNumbers[3], shuffledNumbers[7], shuffledNumbers[8], shuffledNumbers[6], shuffledNumbers[1], shuffledNumbers[2], shuffledNumbers[0]],
        [shuffledNumbers[7], shuffledNumbers[8], shuffledNumbers[6], shuffledNumbers[1], shuffledNumbers[2], shuffledNumbers[0], shuffledNumbers[4], shuffledNumbers[5], shuffledNumbers[3]],
        [shuffledNumbers[2], shuffledNumbers[1], shuffledNumbers[0], shuffledNumbers[5], shuffledNumbers[3], shuffledNumbers[4], shuffledNumbers[8], shuffledNumbers[6], shuffledNumbers[7]],
        [shuffledNumbers[5], shuffledNumbers[3], shuffledNumbers[4], shuffledNumbers[8], shuffledNumbers[6], shuffledNumbers[7], shuffledNumbers[2], shuffledNumbers[1], shuffledNumbers[0]],
        [shuffledNumbers[8], shuffledNumbers[6], shuffledNumbers[7], shuffledNumbers[2], shuffledNumbers[0], shuffledNumbers[1], shuffledNumbers[5], shuffledNumbers[3], shuffledNumbers[4]],
    ];


    // for (var i = 0; i < 9; i++) {
    //     this.generateRow(boardCompleteNumbers[i], i);
    // }

    //board init
    var boardIndexes = [];
    var initialBoardNumbers = JSON.parse(JSON.stringify(boardCompleteNumbers));

    //shuffle board indexes and cut empty cells    
    for (i = 0; i < 81; i++) {
        boardIndexes[i] = i;
    }

    boardIndexes = this.shuffleNumbers(boardIndexes);
    boardIndexes = boardIndexes.slice(0, 32);

    //build the init board    
    for (i = 0; i < boardIndexes.length; i++) {
        // board_init[boardIndexes[i]] = this.boardSolution[boardIndexes[i]];
        var randomIndex = boardIndexes[i];
        var rowIndex = Math.floor(randomIndex / 9);
        var columnIndex = randomIndex % 9;
        initialBoardNumbers[rowIndex][columnIndex] = NaN;
    }

    for (var i = 0; i < 9; i++) {
        this.generateRow(initialBoardNumbers[i], i);
    }

    // for (var i = 0; i < 9; i++) {
    //     this.generateRow(boardCompleteNumbers[i], i);
    // }

    updateView(initialBoardNumbers);
    // updateView(boardCompleteNumbers);
}

// numbers is a one dimension array
// rowIndex is the row index in the whole Sodoku board
// return sudoku board with 2d array numbers maped to sudoku board sections
function generateRow(numbers, rowIndex) {

    var currentIndex = 0; // used to iterate numbers in numbers array

    var rowIncrement = Math.floor(rowIndex / 3) * 3;
    for (var i = 0 + rowIncrement; i < 3 + rowIncrement; i++) {
        for (var j = 0 + (rowIndex * 3) % 9; j < 3 + (rowIndex * 3) % 9; j++) {
            sodokuNumbers[i][j] = numbers[currentIndex];  // sodokuNumbers[i] is the section at index i
            currentIndex++;
        }
    }
}

// numbers is a 2d array. each array in this 2d array means a row in the sudoku board
function updateView(numbers) {
    var sectionNames = ["section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8", "section9"]
    for (var i = 0; i < sectionNames.length; i++) {
        var section = document.getElementById(sectionNames[i]);
        var breakTagCount = 0;
        for (var j = 0; j < section.children.length; j++) {
            if (section.children[j].tagName === "INPUT") {
                var test = section.children[j];
                var testValue = test.value;
                if (!isNaN(numbers[i][j - breakTagCount])) {
                    section.children[j].value = numbers[i][j - breakTagCount];
                    section.children[j].disabled = true;
                }
                else {
                    section.children[j].value = "";
                }
            }
            else {
                breakTagCount++;
            }
        }
    }
}
