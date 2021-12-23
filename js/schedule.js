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


//---------------------------------------------------------Даты-------------------------------------------------------------

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

let n = -1; // для смены дат, -1 - сегодня
let select = 0; // для выбраной даты

function getThisDate(date) {
    const days = ["воскресение", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    const months = ["января", "февратя", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let getDate = function (date) {
        date = new Date(date);
        return {
            "date": date,
            "day": days[date.getDay()],
            "month": months[date.getMonth()],
            "day_num": date.getDate()
        };
    }
    return getDate(date);
};

let dateNow = getThisDate(Date.now()+24*n*60*60*1000);

class ArrayMonthAndNumber extends ArrayElement { //дата верх, число месяц
    constructor(element) {
        super(element.selector)
        this.$element.forEach(element => {
                n++
                dateNow = getThisDate(Date.now()+24*n*60*60*1000);
                element.innerHTML = dateNow.day_num + " " + dateNow.month;
        })
    }
}

class ArrayDay extends ArrayElement {
    constructor(element) {
        super(element.selector)
        this.$element.forEach(element => { // дата низ, день
                n++
                dateNow = getThisDate(Date.now()+24*n*60*60*1000);
                element.innerHTML = dateNow.day;
        })
    }
}

//------------------------стили

class ArrayContainer extends ArrayElement {
    constructor(element) {
        super(element.selector)
        this.$element.forEach((element, index) => { // стили для первого элемента
            if (index == select) {
                element.style.backgroundColor = '#ffde59'
                Array.from(element.children).forEach(el => {
                    el.style.color = '#12161f'
                })
            }
        })
        this.$element.forEach(element => { // стили для элемента по которому кликнул
            element.addEventListener('click', function() {
                deleteStyle() // убираем стили для всех кнопок
                this.style.backgroundColor = '#ffde59'
                Array.from(this.children).forEach(el => {
                    el.style.color = '#12161f'
                })
            })
        })
    }
}

function deleteStyle() { // убираем стили для всех кнопок
    arrayContainer.$element.forEach(element => {
        element.style.backgroundColor = '#12161f'
        Array.from(element.children).forEach(el => {
            el.style.color = 'white'
        })
    })
}

const arrayContainer = new ArrayContainer({
    selector: '.schedule-days__item'
})

const arrayMonthAndNumber = new ArrayMonthAndNumber({
    selector: '.schedule-days__month-and-number'
})

const arrayDay = new ArrayDay({
    selector: '.schedule-days__day'
})