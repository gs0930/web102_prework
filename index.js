/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){


        // create a new div element, which will become the game card
        // <div class = "game-card">
        //     document.createElement(display);
        // </div>

        const element = document.createElement("div")
        element.className = "game-card"


        // add the class game-card to the list
        //element.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // const game = JSON.parse(games);
        const display = `
            <div class = "games">
                <img id = "game-img" src = "${games[i].img}" width = "200" height ="200"/>
                <h3>${ games[i].name } </h3>
                <p>${ games[i].description} </p>
                <p>Goal: ${games[i].goal} </p>
                
            </div>
        `;
        //<p>Goal: ${showAllGames[i].goal} </p>

        // append the game to the games-container
        
        element.innerHTML = display;
        gamesContainer.append(element);

        // const addGame = (newcard) => {
        //     games-container.append(newcard);
        // }
    }
    
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
},0);

//contributionsCard.append(totalContributions.toLocaleString('en-US'));

console.log(totalContributions);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${totalContributions.toLocaleString('en-US')}</p>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
},0);
// set inner HTML using template literal
raisedCard.innerHTML = `<p>${totalRaised.toLocaleString('en-US')}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// const numGames = GAMES_JSON.reduce((acc) => {
//     return acc + 1;
// },0);
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfGames = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });
    addGamesToPage(listOfGames); //filter out games


    // use the function we previously created to add the unfunded games to the DOM

}
console.log(filterUnfundedOnly())

document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let listOfFunded = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });
    addGamesToPage(listOfFunded); 

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
document.getElementById("all-btn").addEventListener("click", showAllGames);

function showAllGames() {
    deleteChildElements(gamesContainer);


    // add all games from the JSON data to the DOM
    let all = GAMES_JSON.filter((game)=>{
        return game;
    });
    addGamesToPage(all); 

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let listOfGames = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
});
const len = listOfGames.length;
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $100,000 has been raised for 4 games. Currently, ${len} game${len==1 ? "" : "s"} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const element = document.createElement("p");
        element.innerHTML = `<p>${displayStr}</p>`;
    descriptionContainer.append(element);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
//let first, second = [sortedGames[0], sortedGames[1]];
const first = `${sortedGames[0].name}`;
const second = `${sortedGames[1].name}`;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const element2 = document.createElement("p");
element2.innerHTML = `<p> ${first}</p>`;
firstGameContainer.append(element2);

const element3 = document.createElement("p");
element3.innerHTML = `<p>${second}</p>`;
secondGameContainer.append(element3);
// do the same for the runner up item