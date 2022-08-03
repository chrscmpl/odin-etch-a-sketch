const InternalCSS = document.createElement('style');
document.head.appendChild(InternalCSS);
const grid = document.getElementById('grid');
const squaresInput = document.getElementById('squares-input');
const colorPicker = document.getElementById('color-picker');
const colorButtons = document.querySelectorAll('.color-button');
const clearButton = document.getElementById('clear-button');
let currentColor = '#000000';
let writeEnable = false;

init();

//////////////////////////////////////////////////////////////////////
//EVENT LISTENERS////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// event listener that calls the drawGrid function after the number input is changed
squaresInput.addEventListener('change', e => {
	const value = +e.target.value;
	if (value > +e.target.max) e.target.value = e.target.max;
	if (value < +e.target.min) e.target.value = e.target.min;
	drawGrid(value);
});

// event listener that changes the currently selected color
// and invokes the function to display the currently selected
// button when a button is clicked
colorButtons.forEach(btn =>
	btn.addEventListener('click', e => {
		currentColor = e.target.value;
		showSelectedButton(
			e.target.id === 'color-picker' ? e.target.parentElement : e.target
		);
	})
);

// event listener that changes the currently selected color and
// picker button background color when a new color is picked
colorPicker.addEventListener('change', e => {
	currentColor = e.target.value;
	changePickColorBackground(e.target.value);
});

// event listeners to enable writing when holding left-click
window.addEventListener('mousedown', () => (writeEnable = true));
window.addEventListener('mouseup', () => (writeEnable = false));

//event listener to clear the grid when the clear button is pressed
clearButton.addEventListener('click', () => drawGrid(squaresInput.value));

//////////////////////////////////////////////////////////////////////
//FUNCTION DECLARATIONS//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// takes the number of squares per side as a parameter,
// calls resizeSquares() with the correct percentage to fill the grid completely
// and calls fillGrid with the total number of squares (side * side)
function drawGrid(squaresPerSide) {
	resizeSquares(100 / squaresPerSide);
	fillGrid(squaresPerSide * squaresPerSide);
}

// sets the height and width of elements of class square to a percentage
function resizeSquares(percentage) {
	InternalCSS.textContent = `.square {height: ${percentage}%; width: ${percentage}%;}`;
}

// empties the grid and fills it with n squares
function fillGrid(n) {
	grid.textContent = '';
	for (let i = 0; i < n; i++) {
		square = createSquare();
		grid.appendChild(square);
	}
}

// creates a div, gives it the class square, and
// adds an event listener for writing to it
function createSquare() {
	const square = document.createElement('div');
	square.classList.add('square');
	square.addEventListener('mouseover', colorSquare);
	return square;
}

// changes the background color of the pickColor button
function changePickColorBackground(color) {
	const btn = document.getElementById('pick-color-button');
	btn.style.backgroundColor = color;
}

// gives the selected button the class picked
function showSelectedButton(btn) {
	colorButtons.forEach(Element => Element.classList.remove('picked'));
	btn.classList.add('picked');
}

// changes the background color of a square if writeEnable is true
function colorSquare(e) {
	if (!writeEnable) return;
	const color = currentColor !== 'rainbow' ? currentColor : randomColor();
	e.target.style.backgroundColor = color;
}

// constructs a hex color string from 6 random values between 0x0 and 0xf
function randomColor() {
	let color = '#';
	for (let i = 0; i < 6; i++) color += random(16).toString(16);
	return color;
}

// returns a random number between 0 and n (not included)
function random(n) {
	return Math.floor(Math.random() * n);
}

// initialize page when loaded
function init() {
	drawGrid(squaresInput.value);
	changePickColorBackground(colorPicker.value);
}
