<!-- TITLE/ -->
<h1>Connect 4 and Poetry</h1>
<!-- /TITLE -->

<!-- DESCRIPTION/ -->
React app built to simulate a Connect 4 game - however, the rules are that the game is over when the board is full.

Chip colors alternate between red & blue. During each move, the app pulls JSON data from http://poetrydb.org/author/Shakespeare.

A user may undo each move, up until the beginning of the game where there are zero chips on the game board/tray.

Once the board is full, the player(s) may choose press the 'Play Again' button, resulting in a reset of the board.

<h4>Note:</h4>
The game may be played either locally or on Heroku.

If you choose to play on Heroku, please note that due to the poetry API using HTTP instead of HTTPS, your browser will not display 
the poetry on the right-hand side panel unless you allow unsafe scripts.

As such, it is recommended you play the game locally.

If you still would like to play this game on Heroku, please visit: https://react-connect-4-and-poetry.herokuapp.com/
<!-- /DESCRIPTION -->

<!-- Download/ -->
<h2>Download</h2>

<code>git clone https://github.com/adambrikman/connect4</code>

<!-- /Download -->

<!-- Install & Launch -->
<h2>Install & Running the Game</h2>

Once downloaded, after navigating to the downloaded file, in your command prompt/terminal/code editor, run the following command to install all dependencies:

<code>npm i</code>

After this, run the following command to open the game locally:

<code>npm run start</code>

That's it! The game is up and running. your default browser should open up to http://localhost:3000, where you and your friend can begin playing!
<!-- /Install & Launch -->