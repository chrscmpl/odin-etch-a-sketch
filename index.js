const grid = document.querySelector('#grid');
const squaresInput = document.querySelector('#squares-input');
const squaresStyle = document.createElement('style');
document.head.appendChild(squaresStyle);

squaresInput.addEventListener('change', e => drawGrid(e.target.value));

drawGrid(squaresInput.value); // fill when the page is loaded

// takes the number of squares per side as a parameter,
// calls resizeSquares() with the correct percentage to fill the grid completely
// and calls fillGrid with the total number of squares (side * side)
function drawGrid(squaresPerSide) {
	resizeSquares(100 / squaresPerSide);
	fillGrid(squaresPerSide * squaresPerSide);
}

// sets the height and width of elements of class square to a percentage
function resizeSquares(percentage) {
	squaresStyle.textContent = `.square {height: ${percentage}%; width: ${percentage}%;}`;
}

// creates n divs of class square and appends them to grid after emptying it
function fillGrid(n) {
	grid.textContent = '';
	for (let i = 0; i < n; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
		grid.appendChild(square);
	}
}
