function changeView() {


    if(localStorage.getItem("sPlants")){
        if(plants){
            if(plants.length > JSON.parse(localStorage.getItem("sPlants")).length){
                localStorage.setItem("sPlants", JSON.stringify(plants));
            }
        } else {
            plants = JSON.parse(localStorage.getItem("sPlants"));
        }
    } else {
        plants = defaultPlants;
        localStorage.setItem("sPlants", JSON.stringify(plants));
    }


    let itemsHolder = document.getElementById("Items-Holder");

    //clearing the div
    while (itemsHolder.lastElementChild) {
        itemsHolder.removeChild(itemsHolder.lastElementChild);
    }
    itemsHolder.classList.remove("items-holder-tile");
    itemsHolder.classList.remove("items-holder-list");

    if (document.getElementById("view-type").value === "tiles") {
        appendPlants(itemsHolder, "tile");
    } else {
        appendPlants(itemsHolder, "list");
    }
}

function appendPlants(itemsHolder, className) {
    let c = 0;
    itemsHolder.classList.add(`items-holder-${className}`);

    for (let i = 0; i <= quantity; i++) {
        // block div
        let block = document.createElement("div");
        block.classList.add(className);
        itemsHolder.appendChild(block);


        // image
        c = i;
        while (c >= plants.length) {
            c -= plants.length;
        }

        let helper = document.createElement("span");
        helper.classList.add("helper");

        let img = document.createElement("img");
        img.classList.add(`image-${className}`);
        if (plants[c].myReader) {
            img.src = plants[c].myReader;
        } else {
            if (plants[c].colorChange) {
                img.src = "img/colors/lulred.jpg";
            } else {
                img.src = "img/plant" + c + ".jpg";
            }
        }

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
        spanName.appendChild(document.createTextNode(plants[c].name));
        spanName.classList.add(`name-${className}`);


        // color choosing thingy
        let spanColor;
        let colorHolder; // used for storing color for the modalItem
        if (plants[c].colorChange) {
            spanColor = document.createElement("span");
            spanColor.classList.add(`color-${className}`);
            let redColor = document.createElement("div");
            redColor.classList.add("color-red");
            redColor.classList.add("color-circle");
            redColor.classList.add("selected");
            colorHolder = "red";
            redColor.addEventListener("click", function() {
                changeColor.call(redColor, "red");
                colorHolder = "red";
            });
            spanColor.appendChild(redColor);
            let greenColor = document.createElement("div");
            greenColor.classList.add("color-green");
            greenColor.classList.add("color-circle");
            greenColor.addEventListener("click", function() {
                changeColor.call(greenColor, "green");
                colorHolder = "green";
            });
            spanColor.appendChild(greenColor);
            let yellowColor = document.createElement("div");
            yellowColor.classList.add("color-yellow");
            yellowColor.classList.add("color-circle");
            yellowColor.addEventListener("click", function() {
                changeColor.call(yellowColor, "yellow");
                colorHolder = "yellow";
            });
            spanColor.appendChild(yellowColor);
            if (className === "tile") {
                titleBlock.appendChild(spanColor);
            }
        }

        // desc
        let spanDesc = document.createElement("span");
        spanDesc.appendChild(document.createTextNode(plants[c].desc));
        spanDesc.classList.add(`desc-${className}`);

        // price
        let spanPrice = document.createElement("span");
        spanPrice.appendChild(document.createTextNode(plants[c].price));
        spanPrice.classList.add(`price-${className}`);

        let id = plants[c].id;

        if (className === "list" && plants[c].colorChange) {
            titleBlock.appendChild(spanColor);
        }
        if(className === "tile"){

            spanName.addEventListener("click", function () {
                openModalItem(className, block, id, colorHolder);
            });
            spanDesc.addEventListener("click", function () {
                openModalItem(className, block, id, colorHolder);
            });
            titleBlock.appendChild(spanName);
            titleBlock.appendChild(spanDesc);
            titleBlock.appendChild(spanPrice);
        } else {
            let titleHolder = document.createElement("div");
            titleHolder.addEventListener("click", function () {
                openModalItem(className, block, id, colorHolder);
            });
            titleHolder.classList.add("title-list-holder");
            titleHolder.appendChild(spanName);
            titleHolder.appendChild(spanDesc);
            titleHolder.appendChild(spanPrice);
            titleBlock.appendChild(titleHolder);
        }
        img.addEventListener("click", function () {
            openModalItem(className, block, id, colorHolder);
        });

    }

    // adding opening modal for view

}

function changeColor(color, modalColor) {
    let parent = this.parentElement;
    let children = parent.children;
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("selected");
    }
    this.classList.add("selected");
    let imageElement;
    if(!modalColor){
        let parentOfParentOfParent = this.parentElement.parentElement.parentElement;
        if (parentOfParentOfParent.classList.contains("list")) {
            imageElement = parentOfParentOfParent.getElementsByClassName("image-list");
        } else {
            imageElement = parentOfParentOfParent.getElementsByClassName("image-tile");
        }
    } else {
        imageElement = document.getElementsByClassName("modal-item--image");
    }

    imageElement[0].src = `img/colors/lul${color}.jpg`;
}

function openModal() {
    let modalWindow = document.getElementById("modal-window");
    modalWindow.style.display = "block";

    document.getElementById("enter-image").value = "";
    document.getElementById("enter-name").value = "";
    document.getElementById("enter-desc").value = "";
    document.getElementById("enter-price").value = "";
}

function closeModal() {
    let modalWindow = document.getElementById("modal-window");
    modalWindow.style.display = "none";

}

function modalAdd() {
    let name = document.getElementById("enter-name");
    let desc = document.getElementById("enter-desc");
    let price2 = document.getElementById("enter-price");
    let price;
    if (!name.value || name.value.length < 5) {
        return 0;
    }

    if (!desc.value || desc.value.length < 7) {
        return 0;
    }

    if (!price2.value) {
        return 0;
    } else {
        price = Number(price2.value);
        if (price < 1 || price > 999) {
            return 0;
        }
    }

    if (!file) {
        return 0;
    }

    plants.push({
        id: plants[plants.length - 1].id + 1,
        name: name.value,
        desc: desc.value,
        price: price,
        myReader: reader.result
    });
    closeModal();
    changeView();

}

function loadFile() {
    file = document.getElementById("enter-image").files[0];
    reader = new FileReader();
    reader.addEventListener("load", function() {}, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function loadMore() {
    quantity += 8;
    if (quantity === 7) {
        let button = document.getElementsByClassName("button-more")[0];
        button.textContent = "Load More";

        scroll(0, 0);
    }
    changeView();
    if (quantity > 23) {
        quantity = -1;
        let button = document.getElementsByClassName("button-more")[0];
        button.textContent = "Collapse";
    }
}

function openModalItem(className, block, id, colorHolder) {
    document.getElementById("modal-window-item").style.display = "block";

    let nameHolder = document.getElementsByClassName("modal-item--name")[0];
    nameHolder.textContent = block.getElementsByClassName(`name-${className}`)[0].textContent;

    let descHolder = document.getElementsByClassName("modal-item--desc")[0];
    descHolder.textContent = block.getElementsByClassName(`desc-${className}`)[0].textContent;

    let priceHolder = document.getElementsByClassName("modal-item--price")[0];
    priceHolder.textContent = block.getElementsByClassName(`price-${className}`)[0].textContent;

    let imageHolder = document.getElementsByClassName("modal-item--image")[0];
    imageHolder.src = block.getElementsByClassName(`image-${className}`)[0].src;

    if(document.getElementsByClassName("color-modal")[0]){
        document.getElementsByClassName("color-modal")[0].remove();
    }

    if(plants[id].colorChange){
        let spanColor;
        spanColor = document.createElement("span");
        spanColor.classList.add("color-modal");
        let redColor = document.createElement("div");
        redColor.classList.add("color-red");
        redColor.classList.add("color-circle-modal");
        redColor.addEventListener("click", function() {
            changeColor.call(redColor, "red", true);
        });
        spanColor.appendChild(redColor);
        let greenColor = document.createElement("div");
        greenColor.classList.add("color-green");
        greenColor.classList.add("color-circle-modal");
        greenColor.addEventListener("click", function() {
            changeColor.call(greenColor, "green", true);
        });
        spanColor.appendChild(greenColor);
        let yellowColor = document.createElement("div");
        yellowColor.classList.add("color-yellow");
        yellowColor.classList.add("color-circle-modal");
        yellowColor.addEventListener("click", function() {
            changeColor.call(yellowColor, "yellow", true);
        });
        spanColor.appendChild(yellowColor);
        document.getElementsByClassName("modal-item-price-row")[0].appendChild(spanColor);
        if(colorHolder === "red") {
            redColor.classList.add("selected");
        } else if(colorHolder === "green"){
            greenColor.classList.add("selected");
        } else if(colorHolder === "yellow"){
            yellowColor.classList.add("selected");
        }
    }


}

function closeModalItem(){
    let modalWindow = document.getElementById("modal-window-item");
    modalWindow.style.display = "none";
}

let defaultPlants = [
    {
        id: 0,
        name: "Aloe Vera",
        desc: "In Mini Dolores Planter",
        price: 80,
        colorChange: true
    },
    {
        id: 1,
        name: "Air Plant",
        desc: "In Tillinadz Stand Planter",
        price: 75
    },
    {
        id: 2,
        name: "Aloe Plant Trio",
        desc: "In Mini Dolores Planter",
        price: 50
    },
    {
        id: 3,
        name: "Aloe Vera",
        desc: "In Big Dolores Planter",
        price: 78
    },
    {
        id: 4,
        name: "Aloe Vera",
        desc: "In Mini Quirk Planter",
        price: 59
    },
    {
        id: 5,
        name: "Air Plant Trio",
        desc: "In Mini Dolores Planter",
        price: 90
    }
];
let reader;
let file; // variable for image
let quantity = 7;
let plants;


document.getElementById("view-type").addEventListener("change", changeView);
document.getElementsByClassName("button-open-modal")[0].addEventListener("click", openModal);
document.getElementsByClassName("modal-close")[0].addEventListener("click", closeModal);
document.getElementsByClassName("modal-add")[0].addEventListener("click", modalAdd);
document.getElementsByClassName("button-more")[0].addEventListener("click", loadMore);
document.getElementById("enter-image").addEventListener("change", loadFile);
document.getElementsByClassName("modal-item-close")[0].addEventListener("click", closeModalItem);

window.onload = function() {
    changeView();
};
