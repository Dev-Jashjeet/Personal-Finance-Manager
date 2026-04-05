let Details = document.querySelectorAll("input");
let Button = document.querySelector("button");
let showPassImg = document.querySelectorAll("i");
let show1 = true;
let show2 = true;
Button.addEventListener("click", () => {
    let count = 0, passCount = 0;
    for (let i = 0; i < Details.length; i++) { //Count value 5 if all have values
        if (Details[i].value !== "") {
            count++;
        }
    }
    if (Details[2].value === Details[3].value) { //passCount value 1 if condition satisfied
        passCount++;
    }
    if (count === 5 && passCount === 1) {
        // Logic begins....
    }
});
showPassImg[0].addEventListener('click', () => {
    if (show1) {
        Details[2].type = "text";
        show1 = false;
    }
    else {
        Details[2].type = "password";
        show1 = true;
    }
    return;
});
showPassImg[1].addEventListener("click", () => {
    if (show2) {
        Details[3].type = "text";
        show2 = false;
    }
    else {
        Details[3].type = "password";
        show2 = true;
    }
    return;
});
export {};
