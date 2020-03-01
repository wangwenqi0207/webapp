var showCbrPickerButton = document.getElementById('ycbrgx_dialog');
var cbrResult = document.getElementById('ycbrgxResult');
var relationshipInsUser;

var checked = [0]; /* 已选选项 */

var cbrgxPicker = new Picker({
    data: [ycbrgxData],
    title: '与参保人关系'
});

cbrgxPicker.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = ycbrgxData[selectedIndex[0]].text;
    cbrResult.innerText = text1;
    console.log(selectedVal);
    console.log(selectedIndex);
    relationshipInsUser = ycbrgxData[selectedIndex[0]].value;
});

/*cbrgxPicker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
  console.log(selectedIndex);
});*/

showCbrPickerButton.addEventListener('click', function () {
    cbrgxPicker.show();
});



