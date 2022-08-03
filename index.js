const InternalCSS = document.createElement('style');
document.head.appendChild(InternalCSS);
const grid = document.querySelector('#grid');
const squaresInput = document.querySelector('#squares-input');
const colorPicker = document.querySelector('#color-picker');
const colorButtons = document.querySelectorAll('.color-button');
let currentColor = '#000000';

init();

//////////////////////////////////////////////////////////////////////
//EVENT LISTENERS////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// event listener that calls the drawGrid function after the number input is changed
squaresInput.addEventListener('change', e => {
	if (+e.target.value > +e.target.max) e.target.value = e.target.max;
	if (+e.target.value < +e.target.min) e.target.value = e.target.min;
	drawGrid(+e.target.value);
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

// creates n divs of class square and appends them to grid after emptying it
function fillGrid(n) {
	grid.textContent = '';
	for (let i = 0; i < n; i++) {
		const square = document.createElement('div');
		square.classList.add('square');
		grid.appendChild(square);
	}
}

// changes the background color of the pickColor button
function changePickColorBackground(color) {
	const btn = document.querySelector('#pick-color-button');
	btn.style.backgroundColor = color;
}

// gives the selected button the class picked
function showSelectedButton(btn) {
	colorButtons.forEach(Element => Element.classList.remove('picked'));
	btn.classList.add('picked');
}

// initialize page when loaded
function init() {
	drawGrid(squaresInput.value);
	changePickColorBackground(colorPicker.value);
}
