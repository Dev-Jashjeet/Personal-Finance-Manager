let email = document.querySelector("#email")! as HTMLInputElement;
let password = document.querySelector("#password")! as HTMLInputElement;
const button = document.querySelector(".login-btn")! as HTMLButtonElement;
let emailPassError = document.querySelectorAll(".error-message")! ;
let loader = document.querySelector(".loader-cont")! as HTMLDivElement;
interface userDetails {
    email: string,
    password: string,
};

button.addEventListener('click', (e): void => {
    e.preventDefault();
    let count: number = 0;
    if(email.value !== "" && password.value !== "") {
        loader.style.display = "flex";
        setTimeout(() => {
            if(localStorage.getItem("usersDetails") !== null) {
                const userDetailsStr: string = localStorage.getItem("usersDetails")!;
                const userDetailsObj: userDetails[] = JSON.parse(userDetailsStr);
                for(let userDetail of userDetailsObj) {
                    if(userDetail.email === email.value && userDetail.password === password.value) {
                        loader.style.display = "none";
                        alert("Access Guranteed");
                        window.location.replace("dashboard.html");
                        count++;
                        return;
                    }
                }
                if(count===0) {
                    loader.style.display = "none";
                    email.value = "";
                    password.value = "";
                    alert("User not found, please sign up");
                    return;
                }
            }
            else {
                loader.style.display = "none";
                email.value = "";
                password.value = "";
                alert("USER NOT FOUND PLEASE SIGN UP");
                return;
            }
        }, 2000);
    }
    else {
        (emailPassError[0] as HTMLSpanElement).style.opacity = "1";
        (emailPassError[1] as HTMLSpanElement).style.opacity = "1";
    }
    return;
});

// Completed
