# Jeopardy

Jeopardy Project Breakdown
What are the details of each of these operations? 

What happens when the page loads? 
The Jeopardy game board appears fully populated as detailed below.
There should be a header that includes each separate category, with a bold font.
The board should include a grid that holds 6 categories and 5 clues per category.
Upon the page loading data should be fetched from the following API -- https://jservice.io/api/categories?count=100 and https://jservice.io/api/category?id=${categoryId}
The API should then populate the categories’ header and clues within the grid/game board.
The clues should follow their category vertically within the grid; each clue should have a ‘?’ (centered) within its individual grid square.
A “Restart Game” button should be placed below the game board.
 
What happens when I click one of the category’s questions?
Upon the first click of grid square, a clue will be revealed.
Upon clicking a revealed clue, the correct answer will be revealed.
 
What happens when I click the “Restart Game” button?
Upon clicking the “Restart Game” button, the game board will be reset and populated with new categories and clues fetched from the original API.
Bonus: show loading screen when jservice API requests are in-flight. That way the player knows something is happening (and they won’t reload the page accidentally)
