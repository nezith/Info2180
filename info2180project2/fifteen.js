

(function() {
	
	"use strict";
	
	// module-global variables
	var N = 4; // 4x4 squares
	var DIMENSION = 100; // 100px x 100px for each square
	
	// the empty square position that relative to 2 dimensional array
	var X = 3;
	var Y = 3; 
	
	var SHUFFLE = 1000; // number of movements in shuffle
	
	window.onload = function() {
		
		backgroundOptions();
		creator(); // create the tiles
		organize(); // modify the style 
		document.getElementById("shufflebutton").onclick = shuffle;
		
	}; // end of function
	
// =================================================================
	
	// add a drop-list for background options  
	function backgroundOptions() {
		
		var controls = document.getElementById("controls");
		
		//create the drop-list
		var dropList = document.createElement("select");
		var myOptions = ["mario","luigi","peach","bowser", "toad"];
		for (var i=0; i < myOptions.length; i++) {
			var myOption = document.createElement("option");
			myOption.value = myOptions[i];
			myOption.innerHTML = myOptions[i];
			dropList.appendChild(myOption);
		}
		dropList.onchange = changeBackground;
		dropList.id = "backgroundOptions";
		controls.appendChild(dropList);
		
	} 

// =================================================================

// once one option is chosen, the background will change
	function changeBackground() {
		var myOptions = document.getElementById("backgroundOptions");
		var tiles = document.getElementsByClassName("tile");
		for (var i=0; i < tiles.length; i++) {
			tiles[i].style.backgroundImage = "url(\'" +
			 myOptions.options[myOptions.selectedIndex].text + ".jpg\')";
		}
	}	
	
// =================================================================
	
	// creator creates all the tiles 
	function creator() {
		
		var puzzlearea = document.getElementById("puzzlearea");
				
		for (var i = 1; i < N*N; i++) {
			var tile = document.createElement("div");
			tile.className = "tile";
			tile.innerHTML = i + "";
						
			// put in the area
			puzzlearea.appendChild(tile);
			
			tile.onclick = move;
			tile.onmouseover = hover;
			tile.onmouseout = out;
			
		} // end of for
		
	} // end of creator
	
// =================================================================

	// this function organizes the tiles into place
	function organize() {
		
		var area = document.getElementById("puzzlearea");
		
		// set appearance for puzzle area
		area.style.backgroundSize = N*DIMENSION + "px " + N*DIMENSION + "px";
		area.style.height = N*DIMENSION + "px";
		area.style.width = N*DIMENSION + "px";
		
		var tiles = document.querySelectorAll("#puzzlearea .tile");
			
		for (var i = 0; i < tiles.length; i++) {
			
			// set appearance 
			// size
			tiles[i].style.height = (DIMENSION-2) + "px"; // 2px border
			tiles[i].style.width = (DIMENSION-2) + "px";
			
			// position
			tiles[i].style.position = "absolute";
			tiles[i].style.left = leftX(i+1)*DIMENSION + "px"; // i=0 left = "0px"
			tiles[i].style.top = topY(i+1)*DIMENSION + "px"; // i=0 top = "0px"
			
			// id
			tiles[i].id = "tile_" + topY(i+1) + "_" + leftX(i+1); // i=0 id="tile_0_0"
			
			// background
			tiles[i].style.backgroundPosition = -(leftX(i+1)*DIMENSION ) + "px " +
			 -(topY(i+1)*DIMENSION ) + "px"; // i=0 backgroundPosition = "0px 0px"
		
		} // end for
		
	} // end organize		
			
// =================================================================
	
	// return the row position for tile # i starts from 0
	function topY(i){
		return ~~((i-1)/N); // N=4 i=1,2,3,4 return 0
	}

// =================================================================
	
	// return the column position for tile # i starts from 0
	function leftX(i){
		return ((i-1) % N); // N=4 i=1,5,9,13 return 0
	}
		
// =================================================================

	// this function check is the tile is movable based on its id
	function movable(tileId){ 
		var id = tileId.split("_");
		var row = id[1];
		var col = id[2];
		if ( (row == X) || (col == Y) ) {
			return true;
		} else {
			return false;
		}
	}

// =================================================================

	// this function is called when mouse is over a tile
	function hover(){
		if ( movable(this.id) ) {
			this.style.borderColor = "red";	
			this.style.cursor = "pointer";
		}
	}
	
// =================================================================

	// this function is called when mouse is out of a tile
	function out(){
		if ( movable(this.id) ) {
			this.style.borderColor = "black";	
			this.style.cursor = "default";
		}
	}	

// =================================================================

// this function shuffle all the tiles
// top = 1, left = 2, bottom = 3, right = 4
	function shuffle(){
		for (var i = 0; i < SHUFFLE; i++) {
			var random = Math.floor( Math.random()*4 );
			moveElement(random);	
		}
	}
	
// =================================================================

// this function move a neighbor tile (top/bottom/left/right) to the empty space if it exists
// number decides which tile to move: top = 1, left = 2, bottom = 3, right = 4
	function moveElement(number){
		var row = X;
		var col = Y;
		
		// top
		if ( (number == 1) && (X > 0) ) {
			row--;
		} else if (number == 2 && (Y > 0) ) { // left
			col--;
		} else if (number == 3 && (X < 3) ) { // bottom
			row++;
		} else if (Y < 3) { // right
			col++;
		}
		
		// generate id
		var id = "tile_" + row + "_" + col;
		
		// move
		var tile = document.getElementById(id);
		
		// if the tile exists
		if (tile) {
			tile.id = "tile_" + X + "_" + Y;
			tile.style.left = Y*DIMENSION + "px";
			tile.style.top = X*DIMENSION + "px";
			
			//set X, Y
			X = row;
			Y = col;
		}
	}
		
// =================================================================	
	
// this function is called when a tile is clicked	
// follow the rule of moveElement: top = 1, left = 2, bottom = 3, right = 4
	function move(){
		var id = this.id.split("_");
		var row = id[1];
		var col = id[2];
		
		if (row == X) { // same row
			while (col < Y) { // left
				moveElement(2);
			} 
			while (col > Y) { //right
				moveElement(4);
			}
		} else if (col == Y) { // same col
			while (row < X) { // top
				moveElement(1);
			} 
			while (row > X) { //bottom
				moveElement(3);
			}
		} // end else
	} // end move

// =================================================================

	
})();
