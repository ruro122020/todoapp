//determines which input box to execute the pixie dust graphics
var input;
$(function(){
	$("#add-input-text").on('click', inputSelect);
	$("#change-input-text").on('click', inputSelect);
})
//helper function
function inputSelect(event){
	input = event.target;
	window.onload = reposition;
	window.onresize = reposition;
	//reposition is defined in graphics/js/index.js file
	reposition();
	input.onfocus = function() {
		hasFocus = true;
	};
	input.onblur = function() {
		hasFocus = false;
	};
}
// keyup class added to change and add input
// addInput.classList.add("keyup");
// changeInput.classList.add("keyup");