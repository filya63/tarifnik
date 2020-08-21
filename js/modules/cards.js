export class Card {
    constructor(title, imgSpeed, altImgSpeed, speed, imgChanel, altImgChanel, chanel, price, parentSelector) {
        this.title = title;
        this.imgSpeed = imgSpeed;
        this.altImgSpeed = altImgSpeed;
        this.speed = speed;
        this.imgChanel = imgChanel;
        this.altImgChanel = altImgChanel;
        this.chanel = chanel;
        this.price = price;
        this.parentSelector = document.querySelector(parentSelector);
    }
    render() {
        this.parentSelector.insertAdjacentHTML('beforeend', `<div class="services-list__item">
            <h3 class="services-list__item-title">${this.title}</h3>
            <div class="services-list__item-classes">
                <div class="services-list__item-class">
                    <img src=${this.imgSpeed} alt=${this.altImgSpeed} class="services-list__item-class_image">
                    <div class="services-list__item-class_descr">${this.speed}</div>
                </div>
                <div class="services-list__item-class">
                    <img src=${this.imgChanel} alt=${this.altImgChanel} class="services-list__item-class_image">
                    <div class="services-list__item-class_descr">${this.chanel}</div>
                </div>
            </div>
            <div class="services-list__item-connect">
                <div class="services-list__item-connect-price">
                    <span class="services-list__item-connect-price_value">${this.price}</span><span class="services-list__item-connect-price_currency">руб</span><span class="services-list__item-connect-price_time">мес</span>
                </div>
                <button class="services-list__item-connect-btn">
                    Подключить
                </button>
            </div>
        </div>`
        );
    }
};