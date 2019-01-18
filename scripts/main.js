//"use strict"

(function() {

let content_boxes;

function isVisible(partial){
    let element = this;
    let element_rect = element.getBoundingClientRect();
    let viewport_width = document.documentElement.clientWidth;
    let viewport_height = document.documentElement.clientHeight;

    //if(element_rect.top > viewport_height){//} || element_rect.bottom < 0){
    if(partial === false){
        if(element_rect.bottom > viewport_height){
            return false;
        }
    }else{
        if(element_rect.top > viewport_height){
            return false;
        }
    }

    return true;
}

function updateBoxes(){
    content_boxes.forEach( (box, i) => {
        //console.log(box.innerText); 

        if(box.isVisible(true)){ 
            if(i % 2 == 0){
                box.classList.add("slide-from-left");
            }else{
                box.classList.add("slide-from-right");
            }
            box.classList.remove("hidden");
        } else if(!box.isVisible(true)){
            box.classList.add("hidden");
            box.classList.remove("slide-from-left");
            box.classList.remove("slide-from-right");
        }
    });
}

function init(){
    content_boxes = document.querySelectorAll(".content-slider");
    content_boxes.forEach((box, i) => {
        box.isVisible = isVisible;
        if(box.isVisible(true)){
            box.style.animationDuration = (1 + (0.2*i)) + "s";
        }

    });

    updateBoxes();
    window.addEventListener('scroll', updateBoxes); 

}

window.onload = () => {init();};

})();