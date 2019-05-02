
const proxy = 'https://cors-anywhere.herokuapp.com/';
const api = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=ST1gmEm7UZwZ6kmY4B75Wn8Mdvh9CzmmHnguDOWc&nutrients=205";
const spinner = document.getElementById("spinner");


/* XHR load on Button click */
$("#fetch").click(function () {

  spinner.removeAttribute('hidden');

  $('html, body').animate({
    scrollTop: $("#pleasewait").offset().top
}, 1000);

let request = new XMLHttpRequest();
  request.open('GET', api);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    spinner.setAttribute('hidden', '');
    let data = request.response;
    fillInfo(data)
  }
});

function fillInfo(json) {
  let currentbg = document.getElementById('currentbg').value;
  var realData = json.report.foods;
  var $tree = $('<div>', { id: 'items-tree' });
  /* Low Blood Sugar Level - Greater than 60, Less than 100 */
  if (currentbg < 50) {
    alert("Your blood sugar is dangerously low, please seek medical attention!")
  }
  else if (currentbg > 50 && currentbg < 100) {
    realData = realData.filter(realData => realData.nutrients[0].value > 50);
    console.log(realData);
    console.log(currentbg);

    for (var key in realData) {
      var $gItem = $('<div>', {
        id: 'item',
        class: 'holder'
      });

      var $name = $('<div>', {
        class: 'name'
      }).text(realData[key].name);
      $gItem.append($name);

      var $measure = $('<div>', {
        class: 'measure'
      }).text("Measurement = " + realData[key].measure);
      $gItem.append($measure);

      var $carbs = $('<div>', {
        class: 'carbs'
      }).text("Carbohydrates = " + realData[key].nutrients[0].value);
      $gItem.append($carbs);

      $tree.append($gItem);
    }
    $('.holder').append($tree);
  }

  /* Mid Blood Sugar Level - Greater than 100, Lower than 150 */
  else if (currentbg > 100 && currentbg < 150) {
    realData = realData.filter(realData => realData.nutrients[0].value < 35);
    console.log(realData);
    for (var key in realData) {
      var $gItem = $('<div>', {
        id: 'item',
        class: 'holder'
      });

      var $name = $('<div>', {
        class: 'name'
      }).text(realData[key].name);
      $gItem.append($name);

      var $measure = $('<div>', {
        class: 'measure'
      }).text("Measurement = " + realData[key].measure);
      $gItem.append($measure);

      var $carbs = $('<div>', {
        class: 'carbs'
      }).text("Carbohydrates = " + realData[key].nutrients[0].value);
      $gItem.append($carbs);

      $tree.append($gItem);
    }
    $('.holder').append($tree);
  }
  /* High Blood Sugar - Higher than 150, Lower than 300 */
  else if (currentbg > 150 && currentbg < 200) {
    realData = realData.filter(realData => realData.nutrients[0].value < 5);
    console.log(realData);
    for (var key in realData) {
      var $gItem = $('<div>', {
        id: 'item',
        class: 'holder'
      });

      var $name = $('<div>', {
        class: 'name'
      }).text(realData[key].name);
      $gItem.append($name);

      var $measure = $('<div>', {
        class: 'measure'
      }).text("Measurement = " + realData[key].measure);
      $gItem.append($measure);

      var $carbs = $('<div>', {
        class: 'carbs'
      }).text("Carbohydrates = " + realData[key].nutrients[0].value);
      $gItem.append($carbs);

      $tree.append($gItem);
    }
    $('.holder').append($tree);
  }
  else {
    alert("You're blood sugar is too high, seek medical attention!")
  }
};
