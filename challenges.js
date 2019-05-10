/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click',function() {
	if(gamePlaying) {
		// Random number
        var dice1 = Math.floor(Math.random() * 6) + 1; 
        var dice2 = Math.floor(Math.random() * 6) + 1; 
        
		// Display the result
		document.querySelector('#dice-1').style.display = 'block';
		document.querySelector('#dice-2').style.display = 'block';
		document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png'
		document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png'

		// Update the random score IF the rolled number was NOT a 1
		// if (dice > 1 && dice <= 5) { 
		// 	// Add score
		// 	roundScore += dice;
		// 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		// }
		// else if(dice === 6) {
		// 	if(prevDice === 6) {
		// 		roundScore = 0;
		// 		scores[activePlayer] = 0;
		// 		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		// 		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// 		nextPlayer();
		// 	}
		// 	else {
		// 		roundScore += dice;
		// 		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		// 	}
        // }
        if (dice1 !== 1 && dice2 !== 1) { 
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else {
			// Next Player
			nextPlayer();
		}
		// prevDice = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
        console.log(roundScore);
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }
		console.log(winningScore);
		// Check if player won the game
		if (scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('#dice-1').style.display = 'none';
		    document.querySelector('#dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else {
			// Next Player
			nextPlayer();
		}
	}
});


function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('#dice-1').style.display = 'block';
		document.querySelector('#dice-2').style.display = 'block';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init () {
	gamePlaying = true;
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;

	document.querySelector('#dice-1').style.display = 'none';
	document.querySelector('#dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
