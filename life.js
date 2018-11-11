//TODO
function draw_matrix() {
}
//function that will determine the next state of the board
function next_state(matrix) {

	new_matrix = create_matrix(matrix.length, matrix[1].length);
	//ignore the outer two rows and columns
	for (let i = 2; i < matrix.length - 2; i++) {
		//for each column
		for (let j = 2; j < matrix[0].length - 2; j++) {
			let bitvalue = matrix[i][j];
			let neighbors = sum_neighbors(i, j, matrix);
			//if alive
			if (bitvalue == 1) {
				//if more than 3, or less than 2 neighbors he dead
				if (neighbors < 2 || neighbors > 3) {
					bitvalue = 0;
				}
			}
			//if dead
			else {
				if (neighbors == 3) {
					bitvalue = 1;
				}
			}
			new_matrix[i][j] = bitvalue;
		}
	}
	return new_matrix;
	//f(sum_neighbors(i,j,matrix)>2)
}

function sum_neighbors(x, y, matrix) {
	//visit each of the surrounding elements of the point
	//y is the row position, x is the column position
	let sum = 0;
	//go up
	sum += matrix[x - 1][y + 1];
	sum += matrix[x][y + 1];
	sum += matrix[x + 1][y + 1];
	//go down
	sum += matrix[x - 1][y - 1];
	sum += matrix[x][y - 1];
	sum += matrix[x + 1][y - 1];
	//goleft goright
	sum += matrix[x - 1][y];
	sum += matrix[x + 1][y];
	return sum;
}
function create_matrix(rows, columns) {
	let matrix = new Array(rows);
	for (let i = 0; i < columns; i++) {
		matrix[i] = new Array(columns);
	}
	return matrix;
}


function populate_matrix(matrix) {
	//for each row
	for (let i = 0; i < matrix.length; i++) {
		//for each column
		for (let j = 0; j < matrix[0].length - 1; j++) {
			matrix[i][j] = Math.round(Math.random());
		}
	}
	//overwrite the outer two elements for each side
	for (let i = 0; i < matrix.length; i++) {
		matrix[i][0] = 0;
		matrix[i][1] = 0;
		matrix[i][matrix[i].length - 1] = 0;
		matrix[i][(matrix[i].length - 2)] = 0;
	}
	for (let j = 0; j < matrix.length; j++) {
		matrix[matrix.length - 1][j] = 0;
		matrix[matrix.length - 2][j] = 0;
		matrix[0][j] = 0;
		matrix[1][j] = 0;
	}
	//console.table(matrix);
}//end populate_matrix


function run_game() {
	//boolean to start/stop the game
	let game_stopped = true;
	//draw the first matrix

	while (!game_stopped) {
		//calculate the next state

		//draw the next state
	}
}
var matrix = create_matrix(100, 100);
populate_matrix(matrix);
console.table(matrix);
newmatrix = next_state(matrix);
console.table(new_matrix);
var table = $("#ourTable")[0];
var cell = table.rows[0].cells[0];

function color() {
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            if (matrix[i][j] == 1) {
                cell = table.rows[i].cells[j];
                $(cell).css('background-color', 'black');
            }
            else {
                cell = table.rows[i].cells[j];
                $(cell).css('background-color', 'white');
            }
        }
    }
}
color();

var intervalID = null;
var counter = 0;

var twentyThree = function(){
	if(counter<23){
		counter++;
		tick();
	}
	else{
		clearInterval(intervalID);
	}
}



function tick(interval) {

	matrix = next_state(matrix);
	color();
	console.log(counter);
}

function twentythreebutton(){
	counter = 0;
	var intervalID = setInterval(twentyThree, 250);
} 

// function twentyThreeGenerations() {
// 	counter = 0;
// 	var intervalID = setInterval(tick, 500);
	
// 	if (counter == 5) {
// 		window.clearInterval(intervalID);
// 		counter = 0;
// 	}
// }