export default function menu(menuItemSelector) {
    const menuItem = document.querySelectorAll(menuItemSelector);
    menuItem.forEach(function(item) {
        item.addEventListener('mouseenter' , showSub);
        item.addEventListener('mouseleave' , hideSub);
    });
}
function showSub() {
    if(this.children.length > 1) {
        this.children[1].style.display = 'flex';
    } else {
        return false;
    }
}

function hideSub() {
    if(this.children.length > 1) {
        this.children[1].style.display = 'none';
    } else {
        return false;
    }
}
export function screenCheck(phone) {
    let number = document.querySelector('.header-navbar__number');
    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            number.textContent = phone;
        } else {
            number.textContent = '';
        }
    });
}