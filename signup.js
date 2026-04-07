let Details = document.querySelectorAll("input");
let Button = document.querySelector("button");
let showPassImg = document.querySelectorAll("i");
let loader = document.querySelector(".loader-cont");
let sgninBtn = document.querySelector("a");
let spanError = document.querySelectorAll(".spanErr");
let show1 = true;
let show2 = true;
// CREATE ACCOUNT FUNCTION
Button.addEventListener("click", () => {
    loader.style.display = "flex";
    setTimeout(() => {
        let count = 0, passCount = 0;
        for (let i = 0; i < Details.length; i++) {
            //Count value 5 if all have values
            if (Details[i].value !== "") {
                count++;
            }
        }
        if (Details[2].value.replaceAll(" ", "") ===
            Details[3].value.replaceAll(" ", "")) {
            //passCount value 1 if condition satisfied
            passCount++;
        }
        if (count === 5 && passCount === 1) {
            for (let i = 0; i < spanError.length; i++) {
                spanError[i].style.display = "none";
            }
            if (localStorage.getItem("usersDetails") === null) {
                const usersData = [];
                let user = {
                    name: Details[0].value,
                    email: Details[1].value.replaceAll(" ", ""),
                    password: Details[2].value.replaceAll(" ", ""),
                    transactions: [],
                };
                usersData.push(user);
                let strUserData = JSON.stringify(usersData);
                localStorage.setItem(`usersDetails`, strUserData);
            }
            else {
                let check = 0;
                let strUserData = localStorage.getItem("usersDetails") || "[]";
                let userArray = JSON.parse(strUserData);
                for (let user in userArray) {
                    if (Details[1].value.replaceAll(" ", "") ===
                        userArray[user].email) {
                        alert("EMAIL ID ALREADY PRESENT PLEASE SIGN IN");
                        check++;
                        break;
                    }
                }
                if (check === 0) {
                    let user = {
                        name: Details[0].value,
                        email: Details[1].value.replaceAll(" ", ""),
                        password: Details[2].value.replaceAll(" ", ""),
                        transactions: [],
                    };
                    userArray.push(user);
                    let strUserData = JSON.stringify(userArray);
                    localStorage.setItem(`usersDetails`, strUserData);
                }
            }
        }
        else {
            for (let i = 0; i < spanError.length; i++) {
                spanError[i].style.display = "block";
            }
        }
        loader.style.display = "none";
        return;
    }, 2000);
    return;
});
// CREATE ACCOUNT ENDED
// VIEW PASSWORD FUNCTION
showPassImg[0].addEventListener("click", () => {
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
// VIEW PASSWORD FUNCTION ENDED
// SIGN-IN FUNCTION
sgninBtn.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("index.html");
        return;
    }, 1000);
    return;
});
export {};
// SIGN-IN ENDED
