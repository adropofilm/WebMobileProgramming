// an array of colors and assign it to a variable colors
var colors = [ "22ac5e", "d68236", "71b5c2", "af2655", "b34de7", "e6bd01", "104393", "ca4d94", "4a772d", "c180a7", "958112", "8d2f8d" ]
// sets the preview color to the one entered in the input and display its color code using setPreviewColor function
function setPreviewColor(color) {
    $('.preview').css('background-color', color);
    $('.color-code').text($('.preview').css('background-color'));
}
//adds color boxes to the favorite colors
function addBox(colorCode, colorContainer) {
  colorToAdd = document.createElement('div');
  colorToAdd.setAttribute('style', `background-color:${colorCode}`);
  colorToAdd.setAttribute('class', 'color_blocks')
  colorContainer.appendChild(colorToAdd);
  // clear input value
  $("#color").val("");
}

$(document).ready(function(){

    // display random color from colors array on pageload
    setPreviewColor(colors[Math.floor(Math.random()*colors.length)]);
    // set preview color when typed in input
    $(document).on('keydown keyup keypress', '#color', function(){
        color = $(this).val();
        setPreviewColor(color);
    })
    // Add color to favorites and clear input
    $(document).on('click', '#add-to-favorite', function() {
      colorCode = $("#color").val();
      colorContainer = document.getElementById('colors')
      addBox(colorCode, colorContainer);
    })

    // Change color of preview on hover/mousover of favorite colors:
    $(document).on('click mouseover', '.color_blocks', function () {
      color = $(this).css('background-color');
      setPreviewColor(color);
    });
});
