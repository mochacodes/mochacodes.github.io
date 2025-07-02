/* Raj Ray
July 4, 2025
uml ID: 01978862
raj_ray@student.uml.edu
github: mochacodes */

import { ScrabbleTiles } from "./Pieces_AA_Jesse.js";

//No functionality, just a template for the Tiles and their attributes/relevant data.
class Tile {
    constructor (letter, value, icon, id) {
        this.letter = letter;                           //letter val
        this.value  = value;                            //point val
        this.icon   = icon;                             //image icon
        this.id     = id;                               //tile's ID

        this.wrapper = document.createElement('div');               //Creates the div for the tile so it can be dragged and tangible and not just an image, then sets it up
        this.wrapper.className = "Tile";                
        this.wrapper.id = id;
        this.wrapper.style.backgroundImage = `url("${icon}")`;
        this.wrapper.draggable = true;

        this.wrapper.addEventListener("dragstart", e => {           //Event Listener for moving the tile
                                                                    //if statement only lets it start dragging if it's in the hand
            if (this.wrapper.parentElement.id !== "hand") {
                e.preventDefault();
                return;
            }
            e.dataTransfer.setData("text/plain", this.wrapper.id);
        });


        this.wrapper.tileInstance = this;                           //reference back to object so I don't just throw the wrapper div around
    }
}

//Acts as the bag with all the Tiles inside it. 
class Bag {
    constructor () {
        this.bag = this.extract();                                  //sets up Bag array with associated array. 
    }
                                                                    //This loops through the given Assoc. Array and adds the 100 Tile Objs into the bag (array)
    extract() {
        var tileBag = [];
        for (const letter in ScrabbleTiles) {
            const l1 = ScrabbleTiles[letter];
            const totalCount = l1["original-distribution"];
            for (var i = 0;  i < totalCount; i++) {
                const tile = new Tile(letter, l1.value, l1.icon, `${letter}-${i}`);
                tileBag.push(tile);
            }
        }
        return tileBag;
    }
    //RNG to pick a random index, takes it out of the bag array and then returns the wrapper div to be able to display on screen
    selectRandomTile(){
        const rIndex = Math.floor(Math.random() * this.bag.length);
        const tile    = this.bag.splice(rIndex, 1)[0];
        return tile.wrapper;
    }
    //checks if bag is empty
    isEmpty() {
        if (this.bag.isEmpty()) return true;
        return false;
    }
}

//This class acts as the players hand/Tile rack. Manages the tile section of the board and handles tile management
class Hand {
    constructor(bag){                                   // Takes in Bag obj by reference as well as hand section of board to handle ui and backend mechanics
        this.bag = bag;
        this.hand = document.getElementById("hand");    //reference to hand div in html ui
        this.handCount = 0;                             //tracks hand count for draw and refill functions.
    }

    drawHand () {                                       //Draws 7 tiles from the Bag and updates hand size tracker
        this.handCount = 0;
        for (let i = 0; i < 7; i++) {
            const tile = this.bag.selectRandomTile();
            this.hand.appendChild(tile);
            this.handCount += 1;
        }
    }

    refillHand(){                                       // If player has some tiles they want to keep but need to fill back up to 7
        while (this.checkHandCount() < 7) {
            const tile = this.bag.selectRandomTile();
            this.hand.appendChild(tile);
            this.handCount += 1;
        }
    }

    checkHandCount () {                                 //getter function for hand size. returns the number
        this.handCount = this.hand.querySelectorAll(".Tile").length;
        return this.handCount;
    }
}

//Main class, handles all of the game logic and manages the other classes.
class Game {
                                                                                //sets up screen's buttons, and event handlers for the actual board.
    constructor (bag, hand) {
        this.gameBag = bag;                                                     //bag object
        this.hand    = hand;                                                    //hand object
        this.board   = document.getElementById("board");                        //reference to html board element
        this.totalScoreValue = 0;                                               //total game score
        this.potentialScoreValue = 0;                                           //round score

                                                                                //allows player to drag and drop tiles onto board spaces
        document.querySelectorAll("#board .cell").forEach(cell => {             //loops through all the cells in the board
        cell.addEventListener("dragover", function (e) {e.preventDefault()});   //event listener for dragging tiles over the drop zone
        cell.addEventListener("drop", e => {                                    //this has to be arrow so it updates, dont change it. idk why it doesnt work with a reg func.
            if (cell.querySelector(".Tile")) return;                            //this is so that you can't put two tiles on one square.
            e.preventDefault();                                                 //the following transfers Tile data, appends tile to board grid's cell and then locks it so that it can't move.
            const id   = e.dataTransfer.getData("text/plain");
            const tile = document.getElementById(id);
            cell.appendChild(tile);
            tile.draggable = false;
            tile.classList.add("locked");
            this.scoreboard();                                                  //updates scoreboard
        });});
        
                                                                                //sets up the buttons by binding functions to them. 
        const newHandButton = document.getElementById("newHand");
        newHandButton.onclick = this.draw.bind(this);

        const submitButton = document.getElementById("submit");
        submitButton.onclick = this.submitPlay.bind(this);

        const resetButton = document.getElementById("reset");
        resetButton.onclick = this.reset.bind(this);
    }

    // shuffles Tiles in hand back into bag if the bag isnt empty, removes them from the board and draws a whole new hand
    //if hand is empty it just refills. Can also be used to reshuffle hand if player doesn't like current tiles.
    draw() {
        if (this.hand.checkHandCount() !== 0) {                                 
            this.hand.hand.querySelectorAll(".Tile").forEach(wrapper => {       
                const tile = wrapper.tileInstance;                              //tile instance just references the actual tile obj instead of just the wrapper.
                this.gameBag.bag.push(tile); });

            this.hand.hand.querySelectorAll(".Tile").forEach(i =>  i.remove()); //removes old tiles and draws new
            this.hand.drawHand();
        }else {
            this.hand.refillHand();
        }
    }

    //scores the board by looping through the grid cells and accessing the Tile Obj's value property.
    // Also updates the ui scoreboard and internal score keeping variables. 
    scoreboard() {
        const cells = document.querySelectorAll("#board .cell");                    //reference to html/css grid cells
        this.potentialScoreValue = 0;                                               //round score
        
        cells.forEach(cell => {
            var multiplier = 1;
            if(cell.id === "dletter" && cell.querySelector(".Tile") !== null) {     
                multiplier = 2;
            }
                                                                                    //adds up values
            cell.querySelectorAll(".Tile").forEach(wrapper => {
            this.potentialScoreValue += (wrapper.tileInstance.value * multiplier);
            });
        });
        

        const roundScore = document.getElementById("roundScore");                   //updates the ui
        const totalScore = document.getElementById("totalScore");
        roundScore.textContent = `Potential Score: ${this.potentialScoreValue}`;
        totalScore.textContent = `Total Score:     ${this.totalScoreValue}`;
    }

    //submit button function. Removes all tiles from the board, adds potential score to total score.
    // then resets the current word potential score and updates ui scoreboard text values.
    submitPlay () {
        let doubleWordActive = false;
        const dCells = this.board.querySelectorAll("#dword"); // Select all cells with id "dword"
        dCells.forEach(cell => {
            if (cell.querySelector(".Tile") !== null) {
                doubleWordActive = true;
            }
        });
        if (doubleWordActive) {
            this.potentialScoreValue *= 2;
        }

        this.board.querySelectorAll(".Tile").forEach(i =>  i.remove());                                     //removes tiles from board
        this.totalScoreValue += this.potentialScoreValue;                                                   //updates total score and resets round score
        this.potentialScoreValue = 0;
        this.hand.refillHand();                                                                             //refills hand to 7
        document.getElementById("totalScore").textContent = `Total Score: ${this.totalScoreValue}`;         //updates ui
        document.getElementById("roundScore").textContent = `Potential Score: ${this.potentialScoreValue}`;
    }

    reset() {
        window.location.reload();                       
    }
}

//sets objects up. probably definitely not the best way to set up a game loop but whatevs. it works. IT WORKS. ITS FUNCTIONAL. 
function main() {
    const bag = new Bag();
    const hand = new Hand(bag);
    const game = new Game(bag, hand);
    game.draw()
}


main();
