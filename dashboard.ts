interface user {
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly salary: number,
    transactions: transaction[],
}
interface transaction {
    readonly date: string,
    readonly amount: number,
    readonly type: "Income"|"Expense",
}
interface calData {
    readonly totalBalance: number,
    readonly totalIncome: number,
    readonly totalExpense: number,
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
    for(const users of usersDetails) {
        if(users.email === loginUserEmail) {
            return users
        }
    }
    throw new Error("User not found");
}

// Function for top BMES Blocks to show balance,amount etc on boxes
function getBMES(Person: user): void {
    if(Person.transactions.length===0) {    // If new user login and he do not added any transactions
        (BMESCont[0]! as HTMLHeadingElement).innerHTML = `₹ ${Person.salary}`;
        (BMESCont[1]! as HTMLHeadingElement).innerHTML = `₹${0}`;
        (BMESCont[2]! as HTMLHeadingElement).innerHTML = "₹0";
        (BMESCont[3]! as HTMLHeadingElement).innerHTML = `₹ ${Person.salary}`;
    }
    else {
        const calcExpense: calData = calcIncomeExpense(Person);
        updateBMES(calcExpense);
    }
    return; 
}

// Function when page reloads
(function reload(): void {
    Person = getUserData();
    getBMES(Person); // Calling getBMES
    transactionList(Person); //Calling to add transaction list
    (userProfileName[0] as HTMLHeadingElement).innerHTML = Person.name;
    (userProfileName[1] as HTMLParagraphElement).innerHTML = Person.email;
    (userProfileName[2] as HTMLHeadingElement).innerHTML = `Welcome, ${(Person.name).split(" ")[0]}!`;
    return;
}) ();

//Function when user click logout
(logoutBtn[1] as HTMLButtonElement).addEventListener('click', (): void => {
    sessionStorage.clear();
    window.location.replace("index.html");
    return;
});

//Function when user wants to add transaction by clicking transaction button
transactionBtn.addEventListener("click", (): void => {
    const AID = document.querySelectorAll(".add-Transaction")!;
    const tBody = document.querySelector("#table-body")! as HTMLTableElement;
    let amount: number;
    if(Number((AID[0]! as HTMLInputElement).value) > 0  && (AID[1]! as HTMLSelectElement).value !=="Income / Expense" && (AID[2]! as HTMLInputElement).value !== "") {

        amount = Number((AID[0]! as HTMLInputElement).value);
        // This is the area that adds the desired transaction added in list -->
        const transType = (AID[1]! as HTMLSelectElement).value as income;

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
        // tdes4.appendChild(delbtn);

        tdes4.appendChild(delbtn);
        trow.appendChild(tdes0);
        trow.appendChild(tdes1);
        trow.appendChild(tdes2);
        trow.appendChild(tdes3);
        trow.appendChild(tdes4);
        tBody.prepend(trow);

        //Addition of the Entered transaction to the Person Object ---->
        const newTransaction: transaction = {
            date: tdes0.innerHTML,
            amount: Number((AID[0]! as HTMLInputElement).value),
            type: tdes3.innerHTML as "Income"|"Expense",
        }
        Person.transactions.push(newTransaction);
        // ---------< Area Completed

        getBMES(Person);
        
        // Local updation to Local Storage --->
        const usersDetails: user[] = JSON.parse(localStorage.getItem("usersDetails")!);
        for(const user of usersDetails) {
            if(user.email === Person.email) {
                user.transactions = Person.transactions;
                break;
            }
        }
        localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
        // ---------< Area completed

        (AID[0]! as HTMLInputElement).value = "";
        (AID[1]! as HTMLInputElement).value = "Income / Expense";
        (AID[2]! as HTMLInputElement).value = "";
        console.log(Person.transactions.length)
        // ------< Area completed
        
    }
    return;
});

function calcIncomeExpense(Person: user): calData {
    let totalIncome: number = 0;
    let totalExpense: number = 0;
    for(let tns of Person.transactions as transaction[]) {
        if(tns.type === "Expense") {
            totalExpense += tns.amount;
            continue;
        }
        totalIncome += tns.amount;
    }
    const totalBalance: number = totalIncome-totalExpense;
    return {totalBalance,totalIncome, totalExpense};
}

function updateBMES(data: calData): void {
    const totalBalance = data.totalBalance;
    const totalIncome = data.totalIncome;
    const totalExpense = data.totalExpense;
    (BMESCont[0]! as HTMLHeadElement).innerHTML = `₹ ${Person.salary+totalBalance}`;
    (BMESCont[1]! as HTMLHeadElement).innerHTML = `₹ ${data.totalIncome}`;
    (BMESCont[2]! as HTMLHeadElement).innerHTML = `₹ ${totalExpense}`;
    (BMESCont[3]! as HTMLHeadElement).innerHTML = `₹ ${Person.salary}`;
    return;
}

function transactionList(Person: user): void {
    const tBody = document.querySelector("#table-body")! as HTMLTableElement;
    for(let data of Person.transactions as transaction[]) {
        let trow = document.createElement("tr");
        let tdes0 = document.createElement("td");
        let tdes1 = document.createElement("td");
        let tdes2 = document.createElement("td");
        let tdes3 = document.createElement("td");
        let tdes4 = document.createElement("td");
        let delbtn = document.createElement("button");

        tdes0.innerHTML = `${data.date}`;
        tdes1.innerHTML = `₹ ${data.amount}`;
        tdes2.innerHTML = `Grocery`;
        tdes3.innerHTML = `${data.type}`;
        delbtn.innerHTML = `Delete`;

        delbtn.classList.add("delete-btn");
        // tdes4.appendChild(delbtn);

        tdes4.appendChild(delbtn);
        trow.appendChild(tdes0);
        trow.appendChild(tdes1);
        trow.appendChild(tdes2);
        trow.appendChild(tdes3);
        trow.appendChild(tdes4);
        tBody.prepend(trow);
    }
    return;
};
