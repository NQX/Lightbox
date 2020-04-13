var element = document.createElement("div");

const margin = 150;


element.innerHTML = 
`<div class="lightbox">
    <div class="lightbox-content">
        <div class="container-close">
            <div class="btn-close">&times;</div>
        </div>
        <div class="lower-container">
            <div class="arrow" id="left-btn">&lt;</div>
                <div class="lightbox-div">
                    <img class="lightbox-img">
                </div>
                <div class="arrow" id="right-btn">&gt;</div>
            </div>
            <p class="number">1 of 3</p>
        </div>
    </div>`

document.body.appendChild(element);





const lightboxContainer = document.querySelector('.lightbox')
const lightboxContent = document.querySelector('.lightbox-content')
const closeBtn = document.querySelector('.btn-close');
const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");
const containerClose = document.querySelector('.container-close');
const image = document.querySelector('.lightbox-img');

const portfolioItems = document.querySelectorAll('[data-lightbox]');

const counter = document.querySelector(".number");


//console.log(portfolioItems[0].getAttribute("data-lightbox"))

image.width = 500;
image.height = 500;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    
    if(evt.keyCode === 27) {
        lightboxContainer.classList.remove("open")

    } else if(evt.keyCode === 37) {
        prev()

    } else if(evt.keyCode === 39) {
        next()
    }
}


let index;
let imgSrc;

for(let i=0; i<portfolioItems.length; i++) {
    

    portfolioItems[i].addEventListener("click", (e) => {
        e.preventDefault();
        index = i;

        changeImg();
        lightbox()
    })
} 


function lightbox() {
    lightboxContainer.classList.toggle("open")
    counter.innerHTML = index+1 + " of " + portfolioItems.length
    
}

function changeImg() {
    console.log('start loading')
    imgSrc = portfolioItems[index].getAttribute("href");


    var downloadingImage = new Image();
    downloadingImage.src = imgSrc;
    downloadingImage.onload = function() {
        image.src = this.src
        let ratio = downloadingImage.width / downloadingImage.height;
        
        if(downloadingImage.width - (2*margin) > window.innerWidth) {
            image.width = downloadingImage.width = window.innerWidth - (2*margin);    
        }

        if(downloadingImage.height - (2*margin) > window.innerHeight) {
            image.height = downloadingImage.height = window.innerHeight - (2*margin);
            image.width = downloadingImage.width = downloadingImage.height * ratio
        }
        containerClose.style.width = image.width + 'px'
        
        console.log('loaded')
    }

    
    
    
}









closeBtn.addEventListener('click', (e) => {
    lightboxContainer.classList.toggle("open")
});

leftBtn.addEventListener('click', (e) => {
    prev();
})

rightBtn.addEventListener('click', (e) => {
    next();
})


lightboxContainer.addEventListener('click', (e) => {
    
    if(e.target === lightboxContent) {
        lightboxContainer.classList.toggle("open")   
    }
})

function prev() {
    if(index > 0) {
        index--;
        counter.innerHTML = index+1 + " of " + portfolioItems.length
        changeImg()
    }
}

function next() {
    if(index < portfolioItems.length -1 ){
        index++;
        counter.innerHTML = index+1 + " of " + portfolioItems.length
        changeImg();
    }
}

