// меню бургера
const burgerImage = document.querySelector('.header__burger-img');
const burgerWindow = document.querySelector('.header__burger-window');
const black = document.querySelector('.black');
const overFlow = document.querySelector('.header__burger');
const body = document.querySelector('body');
let i = 1;

burgerImage.addEventListener('click', () => {
    openWindow();
});

black.addEventListener('click', () => {
    openWindow();
});

let padd = window.innerWidth - body.offsetWidth + 'px';

function openWindow() {
    i++;
    if (i % 2 == 0) {
        burgerWindow.classList.remove('closeWindow');
        burgerWindow.classList.add('openWindow');
        black.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        black.style.zIndex = '11';
        overFlow.style.overflow = 'visible';
        body.style.overflow = 'hidden';
        body.style.paddingRight = padd;
        
    } else {
        burgerWindow.classList.remove('openWindow');
        burgerWindow.classList.add('closeWindow');
        black.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        black.style.zIndex = '-1';
        overFlow.style.overflow = 'hidden';
        body.style.overflow = 'visible';
        body.style.paddingRight = '0px';
        
    }
}

//slider

const leftArrow = document.querySelector('.slider__left-arrow');
const rightArrow = document.querySelector('.slider__right-arrow');
const sliderMove = document.querySelector('.slider__container');
const slider1 = document.querySelector('.slider__first');
const slider2 = document.querySelector('.slider__second');
const slider3 = document.querySelector('.slider_third');
const sliderFirstBlack = document.querySelector('.slider__first-black');
const sliderSecondBlack = document.querySelector('.slider__second-black');
const sliderThirdBlack = document.querySelector('.slider__third-black');
const sliderBuyFirst = document.querySelector('.slider__text-buy-first');
const sliderBuyThird = document.querySelector('.slider__text-buy-third');
let transform = -1200;


leftArrow.addEventListener('click', () => {
    transform += 1200;
    sliderMove.style.transform = `translate(${transform}px)`;
    if (transform == 0) {
        sliderBuyFirst.style.zIndex = '19';
        sliderFirstBlack.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        sliderFirstBlack.style.zIndex = '18';
        sliderSecondBlack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        sliderSecondBlack.style.zIndex = '20';
        leftArrow.style.display = 'none';
        slider1.style.minWidth = '80%';
        slider1.style.marginLeft = '11%';
    } else if (transform == -1200) {
        sliderThirdBlack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        sliderThirdBlack.style.zIndex = '20';
        sliderSecondBlack.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        sliderSecondBlack.style.zIndex = '18';
        rightArrow.style.display = 'block';
        slider2.style.minWidth = '80%';
        slider3.style.marginLeft = '7.5%';
    }
})

rightArrow.addEventListener('click', () => {
    transform -= 1200;
    sliderMove.style.transform = `translate(${transform}px)`;
    if (transform == -1200) {
        sliderFirstBlack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        sliderFirstBlack.style.zIndex = '20';
        sliderSecondBlack.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        sliderSecondBlack.style.zIndex = '18';
        leftArrow.style.display = 'block';
        slider1.style.minWidth = '1100px';
        slider1.style.marginLeft = '140px';
    } else if (transform == -2400) {
        sliderBuyThird.style.zIndex = '19';
        sliderThirdBlack.style.zIndex = '18';
        sliderThirdBlack.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        sliderSecondBlack.style.zIndex = '20';
        sliderSecondBlack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        rightArrow.style.display = 'none';
        slider1.style.minWidth = '1100px';
        slider2.style.minWidth = '1100px';
        slider3.style.marginLeft = '100px';
    }
})

const lookMore = document.querySelector('.lookMore');
const filmsSecond = document.querySelector('.films-second');
const line = document.querySelector('.line3');

lookMore.addEventListener('click', () => {
    filmsSecond.style.display = 'block';
    lookMore.style.display = 'none';
    line.style.display = 'block';
})



//----------------------------------------------slider-------------------------------------

let windowInnerWidth = window.innerWidth // ширина окна браузера
let sliderPosition = -750; // позиция слайдера динамическая
const SLIDER_POSITION = -750; // позиция слайдера статическая(изначальная)
let numberOfSliders = 2; // количество листаемых слайдов от изначальной позиции
let moveStep = 390; //шаг сдвига 
let startSlider = 2;
let endSlider = 4;

//TODO:
class Element { //общий класс для всех элементов, получаем селектор и ложим его в обьект который созданее позже
    constructor(selector) {
        this.$element = document.querySelector(selector)
    }
}

//TODO:
class ArrayElement { //общий класс для всех элементов, повторяемых, берет массив ноды и распаковываем ее через array.from
    constructor(selector) {
        this.$element = Array.from(document.querySelectorAll(selector))
    }
}

class MoveElement extends Element { // класс для движения слайдера
    constructor(element) {
        super(element.selector)
    }
    moveSlider(value) {
        this.$element.style.transform = `translate(${value}px)`
    }
}

class SliderContainer extends Element { // класс для движения слайдера
    constructor(element) {
        super(element.selector)
    }
    changeMargin(marginRight, marginLeft) {
        this.$element.style.margin = `15px ${marginRight}% 10px ${marginLeft}px`
    }
    changeMargin0(marginRight, marginLeft) {
        this.$element.style.margin = `15px ${marginRight}% 10px ${marginLeft}%`
    }
}

class Arrow extends Element { // класс для стрелок, реализовываем методы движения слайдера
    constructor(arrow) {
        super(arrow.selector)
    }
    moveLeft() {
        sliderPosition += moveStep // добавляем шаг к позиции слайдера и двигаем его
        if (sliderPosition == SLIDER_POSITION + moveStep * numberOfSliders) {
            this.$element.style.display = 'none' // если позиция слайдера равна, изначальной + шаг + количество слайдов - выключаем стрелку
        }
        moveElement.moveSlider(sliderPosition) // двигаем слайдер на новое значение, посчитаное выше
    }
    moveRight() { // все тоже самое что и метод moveLeft
        sliderPosition -= moveStep
        if (sliderPosition == SLIDER_POSITION - moveStep * numberOfSliders) {
            this.$element.style.display = 'none'
        }
        moveElement.moveSlider(sliderPosition)
    }
}

/*создаем класс, который наследуется от предыдущего, который нашел массив ноды и распаковал его, задаем this.minWidth и this.minWidthActive, значения ширины слайдов 
в пикселях и процентах, this.minWidth и element.minWidth это все slidesArray.minWidth (созданный далее), только element.minWidth это то что мы передаем в конструктор 
при создании, а this.minWidth это значение которые мы создаем в конструкторе*/

const sliderContainer = new SliderContainer({
    selector: '.look-now__slider',
})

class Slides extends ArrayElement {
    constructor(element) {
        super(element.selector)
        this.minWidth = element.minWidth
        this.minWidthActive1160 = element.minWidthActive1160
        this.minWidthActive700 = element.minWidthActive700
        this.minWidthActive0 = element.minWidthActive0

        if (windowInnerWidth >= 1160 && windowInnerWidth <= 1366) {
            endSlider = 4;
            sliderContainer.changeMargin(5.7, 50)
            this.$element.forEach(el => { el.style.marginRight = '2.4%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive1160}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
        if (windowInnerWidth >= 700 && windowInnerWidth <= 1159) {
            endSlider = 3;
            sliderContainer.changeMargin(8, 50)
            this.$element.forEach(el => { el.style.marginRight = '4%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive700}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
        if (windowInnerWidth < 700) {
            endSlider = 2;
            sliderContainer.changeMargin0(17, 20)
            this.$element.forEach(el => { el.style.marginRight = '10%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive0}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
    }
    getWidth1160() { // меняем ширины и паддинги при смене слайда
        this.$element.forEach(el => { el.style.marginRight = '2.4%'; el.style.minWidth = `${this.minWidth}px` })
        this.$element.filter((el, index) => {
            if (index >= startSlider && index <= endSlider) {
                el.style.minWidth = `${this.minWidthActive1160}%`
            }
            if (index < startSlider) {
                el.style.marginRight = '57px'
            }
        });
    }
    getWidth700() { // меняем ширины и паддинги при смене слайда
        this.$element.forEach(el => { el.style.marginRight = '4%'; el.style.minWidth = `${this.minWidth}px` })
        this.$element.filter((el, index) => {
            if (index >= startSlider && index <= endSlider) {
                el.style.minWidth = `${this.minWidthActive700}%`
            }
            if (index < startSlider) {
                el.style.marginRight = '57px'
            }
        });
    }
    getWidth0() { // меняем ширины и паддинги при смене слайда
        sliderContainer.changeMargin0(17, 20)
        this.$element.forEach(el => { el.style.marginRight = '10%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
        this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
            if (index >= startSlider && index <= endSlider) {
                el.style.minWidth = `${this.minWidthActive0}%`
            }
            if (index < startSlider) {
                el.style.marginRight = '57px'
            }
        });
    }
    changeWidth() { //меняем ширины и паддинги при смене ширины окна
        if (windowInnerWidth >= 1160 && windowInnerWidth <= 1366) {
            sliderContainer.changeMargin(5.7, 50)
            this.$element.forEach(el => { el.style.marginRight = '2.4%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive1160}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
        if (windowInnerWidth >= 700 && windowInnerWidth <= 1159) {
            sliderContainer.changeMargin(8, 50)
            this.$element.forEach(el => { el.style.marginRight = '4%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive700}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
        if (windowInnerWidth < 700) {
            sliderContainer.changeMargin0(17, 20)
            this.$element.forEach(el => { el.style.marginRight = '10%'; el.style.minWidth = `${this.minWidth}px` }) // задаем всем элементам марджин и ширину
            this.$element.filter((el, index) => { // фильтруем элементы по тем которые рендерят при просмотре и задаем ширину для адаптива
                if (index >= startSlider && index <= endSlider) {
                    el.style.minWidth = `${this.minWidthActive0}%`
                }
                if (index < startSlider) {
                    el.style.marginRight = '57px'
                }
            });
        }
        if (windowInnerWidth >= 700 && windowInnerWidth <= 870) {
            sliderContainer.changeMargin(9, 30)
        }
    }
}

const slidesArray = new Slides({
    selector: '.look-now__slider-item',
    minWidth: 328,
    minWidthActive1160: 14.5,
    minWidthActive700: 21.5,
    minWidthActive0: 43
})

const moveElement = new MoveElement({
    selector: '.look-now__slider-container'
})

const arrowLeftSlider = new Arrow({
    selector: '.look-now__slider-arrows-left',
})

const arrowRightSlider = new Arrow({
    selector: '.look-now__slider-arrows-right'
})



arrowLeftSlider.$element.addEventListener('click', function () { // событие клика, меняет значение переменных начального и конечного слайда, запускает методы
    --startSlider
    --endSlider
    arrowLeftSlider.moveLeft()
    if (windowInnerWidth >= 1160 && windowInnerWidth <= 1366) {
        slidesArray.getWidth1160()
    } else if (windowInnerWidth >= 700 && windowInnerWidth <= 1159) {
        slidesArray.getWidth700()
    } else if (windowInnerWidth < 700) {
        slidesArray.getWidth0()
    }
    arrowRightSlider.$element.style.display = 'block' // возобновляет стрелку правую
})

arrowRightSlider.$element.addEventListener('click', function () {
    ++startSlider
    ++endSlider
    arrowRightSlider.moveRight()
    if (windowInnerWidth >= 1160 && windowInnerWidth <= 1366) {
        slidesArray.getWidth1160()
    } else if (windowInnerWidth >= 700 && windowInnerWidth <= 1159) {
        slidesArray.getWidth700()
    } else if (windowInnerWidth < 700) {
        slidesArray.getWidth0()
    }
    arrowLeftSlider.$element.style.display = 'block'
})

window.onresize = change

function change() { // смена ширины окна
    windowInnerWidth = window.innerWidth
    slidesArray.changeWidth()
}


//----------------------------------------------btn-about-------------------------------------

class AllBtn extends ArrayElement {
    constructor(element) {
        super(element.selector)
        this.$element.forEach(el => {
            el.addEventListener('click', (e) => {
                openAbout(e)
            })
        })
    }
}

const btnArray = new AllBtn({
    selector: '.look-now__slider-btn',
})

function openAbout(e) {
    let clickedAbout = e.target

}


