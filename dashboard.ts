interface user {
    name: string,
    email: string,
    password: string,
    salary: number,
    transactions: object[],
}
let userProfileName = document.querySelectorAll(".userprofile")! ;
let logoutBtn = document.querySelectorAll(".logout-btn")! ;
let BMESCont = document.querySelectorAll(".BMEScont")! ;
let Person: user;

// Function that return Login User object
function getUserData(): user {
    const loginUserEmail: string = sessionStorage.getItem("loginemail")!;
    const usersDetails = JSON.parse(localStorage.getItem("usersDetails")!);
    for(let users of usersDetails) {
        if(users.email === loginUserEmail) {
            return users
        }
    }
    throw new Error("User not found");
}

// Function when page reloads
(function reload() {
    Person = getUserData();
    (userProfileName[0] as HTMLHeadingElement).innerHTML = Person.name;
    (userProfileName[1] as HTMLParagraphElement).innerHTML = Person.email;
    (userProfileName[2] as HTMLHeadingElement).innerHTML = `Welcome, ${(Person.name).split(" ")[0]}!`;


}) ();

//Function when user click logout
(logoutBtn[1] as HTMLButtonElement).addEventListener('click', () => {
    sessionStorage.clear();
    window.location.replace("index.html");
});
