var showCityPickerButton = document.getElementById('showCityPicker');
var cityResult3 = document.getElementById('addressReturn');
var province ,city, district;

var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */
var selectedIndex = [18, 6, 3]; /* 默认选中的地区 */
var checked = [18, 6, 3]; /* 已选选项 */

function creatList(obj, list){
  obj.forEach(function(item, index, arr){
  var temp = new Object();
  temp.text = item.name;
  temp.value = index;
  list.push(temp);
  })
}

creatList(cityList, first);

if (cityList[selectedIndex[0]].hasOwnProperty('sub')) {
  creatList(cityList[selectedIndex[0]].sub, second);
} else {
  second = [{text: '', value: 0}];
}

if (cityList[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
  creatList(cityList[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
} else {
  third = [{text: '', value: 0}];
}

var picker = new Picker({
	data: [first, second, third],
  selectedIndex: selectedIndex,
	title: '地址选择'
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = first[selectedIndex[0]].text;
  var text2 = second[selectedIndex[1]].text;
  var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
    cityResult3.innerText = text1 + ' ' + text2 + ' ' + text3;
    province = text1;
    city = text2;
    if (text3.length > 0) {
      district = text3;
    } else {
        district = "";
    }
});

picker.on('picker.change', function (index, selectedIndex) {
  if (index === 0){
    firstChange();
  } else if (index === 1) {
    secondChange();
  }

  function firstChange() {
    second = [];
    third = [];
    checked[0] = selectedIndex;
    var firstCity = cityList[selectedIndex];
    if (firstCity.hasOwnProperty('sub')) {
      creatList(firstCity.sub, second);

      var secondCity = cityList[selectedIndex].sub[0]
      if (secondCity.hasOwnProperty('sub')) {
        creatList(secondCity.sub, third);
      } else {
        third = [{text: '', value: 0}];
        checked[2] = 0;
      }
    } else {
      second = [{text: '', value: 0}];
      third = [{text: '', value: 0}];
      checked[1] = 0;
      checked[2] = 0;
    }

    picker.refillColumn(1, second);
    picker.refillColumn(2, third);
    picker.scrollColumn(1, 0)
    picker.scrollColumn(2, 0)
  }

  function secondChange() {
    third = [];
    checked[1] = selectedIndex;
    var first_index = checked[0];
    if (cityList[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
      var secondCity = cityList[first_index].sub[selectedIndex];
      creatList(secondCity.sub, third);
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    } else {
      third = [{text: '', value: 0}];
      checked[2] = 0;
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    }
  }

});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
  console.log(selectedIndex);
});

showCityPickerButton.addEventListener('click', function () {
	picker.show();
});



