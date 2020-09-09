 // Necesary Variables
const rootURL = "https://jservice.io/api/"; // Root URL used to fetch data
const numCats = 6; // Amount of categories to be included in header
const numClues = 5; // Amount of clues to be displayed under each category

let categories = []; // how categories, the main data structure, should be displayed.

//STEP ONE: What happens when the page loads? 
// Fetch data from the categories API and return as an array
async function getCategories() {
    let response = await axios.get(`${rootURL}categories?count=100`);
    let catIds = response.data.map(cat => cat.id);
    return _.sampleSize(catIds, numCats); // which will return a collection (array) of categories 
};

// Fetch data to receive clues for each category and return as an object
async function getClues(catId) {
    let response = await axios.get(`${rootURL}category?id=${catId}`); // Fetches the data; the request
    let category = response.data; // Stores the data of the response
    let catClues = category.clues; // Extracts the clues from the data
    let ranClues = _.sampleSize(catClues, numClues)// creates a collection (array) of clues for said category
    let clues = ranClues.map(cat => ({ // iterates over each clue
        question: cat.question, // displays the clue
        answer: cat.answer, // displays the answer
        showing: null // displays nothing
    }));

    return {title: category.title, clues} // returns the title of the category, and category's clues
}

// Create Game Board, using HTML Table #jeopardy
/*  Fill the HTML table #jeopardy with the categories & cells for questions.
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function populateGameBoard () {
    $("#jeopardy thead").empty() // Removes header text
    let $tr = $("<tr>"); // Set for the table row
    for (let catIdx = 0; catIdx < numCats; catIdx++) { // iterates thru each category index
        $tr.append($("<td>").text(categories[catIdx].title)) // append the category's title to the header cell
    }
    $("#jeopardy thead").append($tr); // appends table row to the header content of the page

    $("#jeopardy tbody").empty() // Removes body text
    for(let clueIdx = 0; clueIdx < numClues; clueIdx++){ // iterates thru the clue index
        let $tr = $("<tr>"); // Set for table row
        for(let catIdx = 0; catIdx < numCats; catIdx++){ // iterates thru category index again
            $tr.append($("<td>").attr("id", `${catIdx}-${clueIdx}`).text("?")); // appends data to row, changes id to the index of category and clue, inputs a ? as the intial text
        }
        $("#jeopardy tbody").append($tr); // appends table row to body content of the page
    }
}


// Page Setup & Start
async function setupStart() {
    let catIds = await getCategories(); // calls getCategories function, which fetches category data

    for(let catId of catIds){ // iterate through the categories
        categories.push(await getClues(catId)) // push the data from the getClues function into an empty array
    }

    populateGameBoard(); // populate the game board with fetched data
}


// STEP TWO: What happens when I click one of the category’s questions?
function handleClick (e) {
    let id = e.target.id; // Sets event target
    let [catId, clueId] = id.split("-"); // Sets catId & clueId to 
    let clue = categories[catId].clues[clueId]; // Sets clue to the correct index

    let msg;

    if(!clue.showing){ // If null, show question and set .showing to question
        msg = clue.question;
        clue.showing = "question";
    } else if (clue.showing === "question"){ // If "question", show answer, and set .showing to answer
        msg = clue.answer;
        clue.showing = "answer"
    } else { // If "answer", ignore, and return nothing
        return;
    }
    $(`#${catId}-${clueId}`).html(msg); // Text cell is updated to display correct msg

}


 // STEP THREE: What happens when I click the “Restart Game” button?

 // Add on click to restart button
     $("#restart").on("click", setupStart); // Puts an event listener on the restart button

// Set up Page Load
    $(async function () {
        setupStart(); // calls the setupStart function
        $("#jeopardy").on("click", "td", handleClick); // Puts an event listerner on the td when clicked
    });
