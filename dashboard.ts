interface user {
    name: string,
    email: string,
    password: string,
    salary: number,
    transactions: object[],
}
interface transaction {
    date: string,
    amount: number,
    type: "income"|"expense",
}
type income = "Income"|"Expense";
let userProfileName = document.querySelectorAll(".userprofile")! ;
let logoutBtn = document.querySelectorAll(".logout-btn")! ;
let BMESCont = document.querySelectorAll(".BMEScont")! ;
let transactionBtn = document.querySelector(".add-TransactionBtn")! as HTMLButtonElement;
let Person: user; // Main user Object where all calculations take place

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

// Function for top BMES Blocks to show balance,amount etc on boxes
function getBMES(Person: user): void {
    if(Person.transactions.length===0) {    // If new user login and he do not added any transactions
        (BMESCont[0]! as HTMLHeadingElement).innerHTML = `₹${String(Person.salary)}`;
        (BMESCont[1]! as HTMLHeadingElement).innerHTML = `₹${String(Person.salary)}`;
        (BMESCont[2]! as HTMLHeadingElement).innerHTML = "₹0";
        (BMESCont[3]! as HTMLHeadingElement).innerHTML = "₹0";
    }
    else {
        // When transaction length is not zero
    }
    return; 
}

// Function when page reloads
(function reload(): void {
    Person = getUserData();
    getBMES(Person); // Calling getBMES
    (userProfileName[0] as HTMLHeadingElement).innerHTML = Person.name;
    (userProfileName[1] as HTMLParagraphElement).innerHTML = Person.email;
    (userProfileName[2] as HTMLHeadingElement).innerHTML = `Welcome, ${(Person.name).split(" ")[0]}!`;
}) ();

//Function when user click logout
(logoutBtn[1] as HTMLButtonElement).addEventListener('click', (): void => {
    sessionStorage.clear();
    window.location.replace("index.html");
    return;
});

//Function when user wants to add transaction by clicking transaction button
transactionBtn.addEventListener("click", (): void => {
    let AID = document.querySelectorAll(".add-Transaction")!;
    const tBody = document.querySelector("#table-body")! as HTMLTableElement;
    let amount: number;
    if(Number((AID[0]! as HTMLInputElement).value) > 0  && (AID[1]! as HTMLSelectElement).value !=="Income / Expense" && (AID[2]! as HTMLInputElement).value !== "") {

        amount = Number((AID[0]! as HTMLInputElement).value);
        // This is the area that adds the desired transaction added in list -->
        let transType = (AID[1]! as HTMLSelectElement).value as income;
        let trow = document.createElement("tr");

        let tdes0 = document.createElement("td");
        let tdes1 = document.createElement("td");
        let tdes2 = document.createElement("td");
        let tdes3 = document.createElement("td");
        let tdes4 = document.createElement("td");
        let delbtn = document.createElement("button");

        tdes0.innerHTML = `${(AID[2]! as HTMLInputElement).value}`;
        tdes1.innerHTML = `₹ ${(AID[0]! as HTMLInputElement).value}`;
        tdes2.innerHTML = `Grocies`;
        tdes3.innerHTML = `${transType}`
        delbtn.innerHTML = "Delete";

        delbtn.classList.add("delete-btn");
        tdes4.appendChild(delbtn);

        tdes4.appendChild(delbtn);
        trow.appendChild(tdes0);
        trow.appendChild(tdes1);
        trow.appendChild(tdes2);
        trow.appendChild(tdes3);
        trow.appendChild(tdes4);
        tBody.appendChild(trow);

        // Local updation to Local Storage --->
        // let newTransaction: transaction = {
        //   date: tdes0.innerHTML,
        //   amount: Number((AID[0]! as HTMLInputElement).value),
        //   type: tdes3.innerHTML as "income"|"expense",
        // }
        // Person.transactions.push(newTransaction);

        // let usersDetails: user[] = JSON.parse(localStorage.getItem("usersDetails")!);
        // for(let user of usersDetails) {
        //     if(user.email === Person.email) {
        //         user.transactions = Person.transactions;
        //         break;
        //     }
        // }
        // localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
        //---------< Area completed

        (AID[0]! as HTMLInputElement).value = "";
        (AID[1]! as HTMLInputElement).value = "Income / Expense";
        (AID[2]! as HTMLInputElement).value = "";

        // ------< Area completed
    }
});
