const clearbutton = document.querySelector(".clearbutton");
const date = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");
const clear = document.getElementById("clearbutton");

// Setting todays date for input time stamps.
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date().toLocaleDateString("en-US", options);
const timeNow = new Date();
const hours = timeNow.getHours() % 12;
const mins = timeNow.getMinutes();
const time = hours + ":" + mins;
//Empty array for list of input values.
let itemsList = [];



/*
localStorage.setItem("addItem", JSON.stringify(itemsList));

// Saving data to local storage, and clearing it.
let data = localStorage.getItem("addItem");
if (data){
    itemsList = JSON.parse(data);
    loadList(itemsList);
}else{
itemsList = [];
}
function loadList(array){
    array.forEach(function(item){
        addToList(item.name, item.done, item.trash);
    });
}

*/


function addToList(addItem, trash) {
    if (trash) { return; }

    const item = `<li class="item">
                <h3>${addItem}</h3> 
                <p>${today} ${time}</p>
                <i class="de fa fa-trash-o" job="delete"></i>
            </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {

        const addItem = parseInt(input.value);

        if (addItem) {
            addToList(addItem);
            itemsList.push(addItem);
        }
        //Save data to Local Storage 
        localStorage.setItem("addItem", JSON.stringify(itemsList));

        input.value = "";
    }
});

function removeItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    itemsList[element.id].trash = true;
};
list.addEventListener("click", function (event) {
    const element = event.target;
    const elementDelete = element.attributes.job.value;
    if (elementDelete == "delete") {
        removeItem(element);
    }
});

// Reloads the page, clearing list.
clear.addEventListener("click", function (event) {
    location.reload();
});

//Send input to list.
$('.send').click(function () {

    function getAvg(itemsList) {
        const total = itemsList.reduce((acc, c) => acc + c, 0);
        return total / itemsList.length;
    }
    const average = getAvg(itemsList);
    console.log(average);
    document.querySelector('.average').innerHTML = Math.floor(average);
    localStorage.setItem("addItem", JSON.stringify(itemsList));

});


