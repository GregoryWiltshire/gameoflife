//TODO
function draw_matrix(){

}


//function that will determine the next state of the board
function next_state(matrix){
	//copy of the old array
	new_matrix = create_matrix(matrix.length,matrix[1].length);

	//ignore the outer two rows and columns
	for(let i = 2; i<matrix.length-2;i++){
		//for each column
		for(let j =2; j< matrix[0].length-2;j++){
			new_matrix[i][j] = sum_neighbors(i,j,matrix);
			console.log(new_matrix[i][j])
		}
	}

	return new_matrix;
	//f(sum_neighbors(i,j,matrix)>2)
}

function sum_neighbors(x,y,matrix){
	//visit each of the surrounding elements of the point
	//y is the row position, x is the column position
	let sum = 0;
	//go up
	sum += matrix[x-1][y+1];
	sum += matrix[x][y+1];
	sum += matrix[x+1][y+1];
	//go down
	sum += matrix[x-1][y-1];
	sum += matrix[x][y-1];
	sum += matrix[x+1][y-1];
	//goleft goright
	sum += matrix[x-1][y];
	sum += matrix[x+1][y];
	return sum;
}


function create_matrix(rows, columns){
	let matrix = new Array(rows);
	for(let i =0; i<columns; i++){
			matrix[i] = new Array(columns);
	}
	return matrix;
}


function populate_matrix(matrix){
	//for each row
	for(let i = 0; i<matrix.length;i++){
		//for each column
		for(let j =0; j< matrix[0].length-1;j++){
			matrix[i][j] = Math.round(Math.random());
		}
	}
	//overwrite the outer two elements for each side
	for(let i = 0; i<matrix.length;i++){
		matrix[i][0] = 0;
		matrix[i][1] = 0;
		matrix[i][matrix[i].length-1] = 0;
		matrix[i][(matrix[i].length-2)] = 0;
	}
	for(let j = 0; j<matrix.length;j++){
		matrix[matrix.length-1][j] = 0;
		matrix[matrix.length-2][j] = 0;
		matrix[0][j] = 0;
		matrix[1][j] = 0;
	}
	//console.table(matrix);
}//end populate_matrix


function run_game(){
	//boolean to start/stop the game
	let game_stopped = true;
	//draw the first matrix

	while(!game_stopped){
		//calculate the next state

		//draw the next state
	}
}





matrix = create_matrix(10,10);

populate_matrix(matrix);
console.table(matrix);

newmatrix = next_state(matrix);
console.table(new_matrix);

