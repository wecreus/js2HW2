

function appendPlants(){
    let itemsHolder = document.getElementsByClassName("plants-list")[0];

    // clear all
    while (itemsHolder.lastElementChild) {
        itemsHolder.removeChild(itemsHolder.lastElementChild);
    }

    if(!localStorage.getItem("sBagList")){
        let emptyBagMessage = document.createElement("div");
        emptyBagMessage.classList.add("empty-bag");
        emptyBagMessage.textContent = "Your bag is empty";
        document.getElementsByClassName("plants-list")[0].appendChild(emptyBagMessage);
        return 0;
    }
    let className = "list";
    let total = 0;
    let plants = JSON.parse(localStorage.getItem("sBagList"));
    let allPlants = JSON.parse(localStorage.getItem("sPlants"));

    for(let i = 0; i < plants.length; i++){

        let j;
        // searching for the plant
        for(j = 0; j < allPlants.length; j++){
            if(plants[i].idOfItem === allPlants[j].id){
                break;
            }
        }
        total += allPlants[j].price * plants[i].quantity;
        // block
        let block = document.createElement("div");
        block.classList.add(className);
        itemsHolder.appendChild(block);

        // helper
        let helper = document.createElement("span");
        helper.classList.add("helper");

        // img
        let img = document.createElement("img");
        img.classList.add(`image-${className}`);
        if (allPlants[j].myReader) { // all images loaded by user
            img.src = allPlants[j].myReader;
        } else {
            if (plants[i].color !== "default") { // if has colors
                if(plants[i].color === "red"){
                    img.src = `img/colors/lulred.jpg`;
                } else if(plants[i].color === "green"){
                    img.src = `img/colors/lulgreen.jpg`;
                } else {
                    img.src = `img/colors/lulyellow.jpg`;
                }

            } else { // all default images
                img.src = "img/plant" + allPlants[j].id + ".jpg";
            }
        }

        // some helpers
        let imageTileHelper = document.createElement("div");
        imageTileHelper.classList.add(`image-${className}-helper`);
        imageTileHelper.appendChild(helper);
        imageTileHelper.appendChild(img);
        block.appendChild(imageTileHelper);

        // title block
        let titleBlock = document.createElement("div");
        titleBlock.classList.add(`title-${className}`);
        block.appendChild(titleBlock);

        // name
        let spanName = document.createElement("span");
        spanName.appendChild(document.createTextNode("x" + plants[i].quantity + " " + allPlants[j].name));
        spanName.classList.add(`name-${className}`);


        // price
        let spanPrice = document.createElement("span");
        if(plants[i].quantity === "1"){
            spanPrice.appendChild(document.createTextNode(allPlants[j].price));
        } else {
            spanPrice.appendChild(document.createTextNode(allPlants[j].price + " each"));
        }
        spanPrice.classList.add(`price-${className}`);

        // appending stuff
        let titleHolder = document.createElement("div");
        titleHolder.classList.add("title-list-holder");
        titleHolder.appendChild(spanName);
        titleHolder.appendChild(spanPrice);
        titleBlock.appendChild(titleHolder);

    }

    // total price
    let totalPrice = document.createElement("div");
    totalPrice.classList.add("total-price");
    totalPrice.textContent = "Your total is: $" + total;
    itemsHolder.appendChild(totalPrice);
}

function updateBag() {
    let temp = 0;
    if(localStorage.getItem("sBagList")){
        let anotherTemp = JSON.parse(localStorage.getItem("sBagList"));
        for(let i = 0; i < anotherTemp.length; i++){
            temp += Number(anotherTemp[i].quantity);
        }
        if(temp > 99){
            temp = "99+";
        }
    }
    document.getElementsByClassName("header-link-bag")[0].textContent = temp + "";

}

function changeClearButton() {
    let temp = document.getElementsByClassName("button-clear")[0];
    if(localStorage.getItem("sBagList")){
        temp.classList.remove("button");
        temp.classList.remove("button-disabled");
        temp.classList.add("button");
    } else {
        temp.classList.remove("button");
        temp.classList.remove("button-disabled");
        temp.classList.add("button-disabled");
    }
}

document.getElementsByClassName("button-clear")[0].addEventListener("click", function() {
   if(localStorage.getItem("sBagList")){
       localStorage.removeItem("sBagList");
       changeClearButton();
       updateBag();
       appendPlants();
   }
});


window.onload = function() {
    changeClearButton();
    updateBag();
    appendPlants();
};