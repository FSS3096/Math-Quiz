function add_user(){
	var player_1_name = document.getElementById('player_1').value;
	var player_2_name = document.getElementById('player_2').value;
	localStorage.setItem('Player 1 name', player_1_name);
	localStorage.setItem('Player 2 name', player_2_name);
	window.location.replace('s.html');
}

// Read stored names (may be null if not set yet)
var Player1_name = localStorage.getItem("Player 1 name");
var Player2_name = localStorage.getItem("Player 2 name");

var player1_score = 0;
var player2_score = 0;

// question/answer turn state
var question_turn = "player1";
var answer_turn = "player2";
var actual_answer = null;

// Initialize page only when the game page elements exist (prevents errors when this file is loaded on index/login page)
function initGamePage(){
	if(!document.getElementById("player1_name")){
		// Not on the game page. Nothing to init.
		return;
	}

	document.getElementById("player1_name").innerHTML = (Player1_name ? Player1_name : "Player 1") + " : ";
	document.getElementById("player2_name").innerHTML = (Player2_name ? Player2_name : "Player 2") + " : ";

	document.getElementById("player1_score").innerHTML = player1_score ;
	document.getElementById("player2_score").innerHTML = player2_score ;

	document.getElementById("player_question").innerHTML = "Question Turn - " + (Player2_name ? Player2_name : "Player 2");
	document.getElementById("player_answer").innerHTML = "Answer Turn - " + (Player1_name ? Player1_name : "Player 1");

	// Auto-generate and show the first question so it's visible right after login
	generateQuestion();
}

// Generates a random multiplication question and displays it (used on load and can be reused)
function generateQuestion(){
	// If the inputs exist in DOM, we'll populate them and show the question in the output area
	var n1 = Math.floor(Math.random() * 10) + 1; // 1..10
	var n2 = Math.floor(Math.random() * 10) + 1; // 1..10
	actual_answer = n1 * n2;

	var question_number = "<h4>" + n1 + " X "+ n2 +"</h4>";
	var input_box = "<br>Answer : <input type='text' id='input_check_box'>";
	var check_button = "<br><br><button class='btn btn-info' onclick='check()'>Check</button>";
	var row =  question_number + input_box + check_button ;

	var out = document.getElementById("output");
	if(out){
		out.innerHTML = row;
	}

	// If there are number inputs, populate them too (so send() still works if used)
	var ni1 = document.getElementById("number1");
	var ni2 = document.getElementById("number2");
	if(ni1) ni1.value = n1;
	if(ni2) ni2.value = n2;
}

// Keep the original send function behavior (optional manual entry)
function send() {
	var number1 = document.getElementById("number1").value;
	var number2 = document.getElementById("number2").value;
	actual_answer = parseInt(number1) * parseInt(number2);
	console.log(actual_answer);

	var question_number = "<h4>" + number1 + " X "+ number2 +"</h4>";
	var input_box = "<br>Answer : <input type='text' id='input_check_box'>";
	var check_button = "<br><br><button class='btn btn-info' onclick='check()'>Check</button>";
	var row =  question_number + input_box + check_button ; 
	var out = document.getElementById("output");
	if(out) out.innerHTML = row;
	document.getElementById("number1").value = "";
	document.getElementById("number2").value = "";
}

function check()
{
	var get_answer_el = document.getElementById("input_check_box");
	if(!get_answer_el) return;
	var get_answer = get_answer_el.value;
	if(get_answer == actual_answer)    
	{
		if(answer_turn == "player1")
		{
			player1_score = player1_score +1;
			document.getElementById("player1_score").innerHTML = player1_score;
		}
		else 
		{
			player2_score = player2_score +1;
			document.getElementById("player2_score").innerHTML = player2_score;
		}
	}
    
	if(question_turn == "player1")
	{
		question_turn = "player2"
		document.getElementById("player_question").innerHTML = "Question Turn - " + (Player2_name ? Player2_name : "Player 2");
	}
	else 
	{
		question_turn = "player1"
		document.getElementById("player_question").innerHTML = "Question Turn - " + (Player1_name ? Player1_name : "Player 1");
	}

	if(answer_turn == "player1")
	{
		answer_turn = "player2"
		document.getElementById("player_answer").innerHTML = "Answer Turn - " + (Player2_name ? Player2_name : "Player 2");
	}
	else 
	{
		answer_turn = "player1"
		document.getElementById("player_answer").innerHTML = "Answer Turn - " + (Player1_name ? Player1_name : "Player 1");
	}

	var out = document.getElementById("output");
	if(out) out.innerHTML = "";
}

// Initialize when DOM is ready
if(typeof window !== 'undefined'){
	window.addEventListener('DOMContentLoaded', initGamePage);
}
