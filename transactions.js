const transactionBodyElements = document.querySelectorAll(".common");
let transactionListHeight = document.querySelector(".tablecommon");
const sidebarsButton = document.querySelectorAll(".nav-item");
const viewAll = document.querySelector(".viewAll");
let click = false;
// function that is used to hide the dashboard elements and show the all transactions list
function HideShow(click) {
    if (click === false) {
        transactionListHeight.style.height = "730px";
        transactionListHeight.style.overflow = "scroll";
        for (let element of transactionBodyElements) {
            element.style.display = "none";
        }
        click = true;
        return;
    }
    return;
}
// Function when user clicks sidebar transaction button
sidebarsButton[1].addEventListener("click", () => {
    for (let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    sidebarsButton[1].classList.add("active");
    HideShow(click);
    return;
});
// Function when user click viewAll in dashboard
viewAll.addEventListener("click", () => {
    for (let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    sidebarsButton[1].classList.add("active");
    HideShow(click);
    return;
});
// Function when user clicks sidebar dashboard button
sidebarsButton[0].addEventListener("click", () => {
    for (let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    sidebarsButton[0].classList.add("active");
    transactionListHeight.style.height = "365px";
    transactionListHeight.style.overflow = "hidden";
    for (let element of transactionBodyElements) {
        element.style.display = "";
    }
    click = false;
    return;
});
// Function when user click reports button on side bar
sidebarsButton[2].addEventListener("click", () => {
    for (let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    sidebarsButton[2].classList.add("active");
    // Function implementation left
    return;
});
export {};
