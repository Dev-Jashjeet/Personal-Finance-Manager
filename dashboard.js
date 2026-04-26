const userProfileName = document.querySelectorAll(".userprofile");
const logoutBtn = document.querySelectorAll(".logout-btn");
const BMESCont = document.querySelectorAll(".BMEScont");
const transactionBtn = document.querySelector(".add-TransactionBtn");
const body = document.querySelector("body");
let Person; // Main user Object where all calculations take place
// Function that return Login User object
function getUserData() {
    const loginUserEmail = sessionStorage.getItem("loginemail");
    const usersDetails = JSON.parse(localStorage.getItem("usersDetails"));
    for (const users of usersDetails) {
        if (users.email === loginUserEmail) {
            return users;
        }
    }
    throw new Error("User not found");
}
// Function for top BMES Blocks to show balance,amount etc on boxes
function getBMES(Person) {
    if (Person.transactions.length === 0) { // If new user login and he do not added any transactions
        BMESCont[0].innerHTML = `₹ ${Person.salary}`;
        BMESCont[1].innerHTML = `₹${0}`;
        BMESCont[2].innerHTML = "₹0";
        BMESCont[3].innerHTML = `₹ ${Person.salary}`;
    }
    else {
        const calcExpense = calcIncomeExpense(Person);
        updateBMES(calcExpense);
    }
    return;
}
// Function when page reloads
(function reload() {
    Person = getUserData();
    getBMES(Person); // Calling getBMES
    transactionList(Person); //Calling to add transaction list
    userProfileName[0].innerHTML = Person.name;
    userProfileName[1].innerHTML = Person.email;
    userProfileName[2].innerHTML = `Welcome, ${(Person.name).split(" ")[0]}!`;
    return;
})();
//Function when user click logout
logoutBtn[1].addEventListener('click', () => {
    sessionStorage.clear();
    window.location.replace("index.html");
    return;
});
//Function when user wants to add transaction by clicking transaction button
transactionBtn.addEventListener("click", () => {
    const AID = document.querySelectorAll(".add-Transaction");
    const tBody = document.querySelector("#table-body");
    let amount;
    if (Number(AID[0].value) > 0 && AID[1].value !== "Income / Expense" && AID[2].value !== "") {
        amount = Number(AID[0].value);
        // This is the area that adds the desired transaction added in list -->
        const transType = AID[1].value;
        let trow = document.createElement("tr");
        let tdes0 = document.createElement("td");
        let tdes1 = document.createElement("td");
        let tdes2 = document.createElement("td");
        let tdes3 = document.createElement("td");
        let tdes4 = document.createElement("td");
        let delbtn = document.createElement("button");
        tdes0.innerHTML = `${AID[2].value}`;
        tdes1.innerHTML = `₹ ${AID[0].value}`;
        tdes2.innerHTML = `Grocies`;
        tdes3.innerHTML = `${transType}`;
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
        const newTransaction = {
            date: tdes0.innerHTML,
            amount: Number(AID[0].value),
            type: tdes3.innerHTML,
        };
        Person.transactions.push(newTransaction);
        // ---------< Area Completed
        getBMES(Person);
        // Local updation to Local Storage --->
        const usersDetails = JSON.parse(localStorage.getItem("usersDetails"));
        for (const user of usersDetails) {
            if (user.email === Person.email) {
                user.transactions = Person.transactions;
                break;
            }
        }
        localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
        // ---------< Area completed
        AID[0].value = "";
        AID[1].value = "Income / Expense";
        AID[2].value = "";
        // ------< Area completed
    }
    return;
});
function calcIncomeExpense(Person) {
    let totalIncome = 0;
    let totalExpense = 0;
    for (let tns of Person.transactions) {
        if (tns.type === "Expense") {
            totalExpense += tns.amount;
            continue;
        }
        totalIncome += tns.amount;
    }
    const totalBalance = totalIncome - totalExpense;
    return { totalBalance, totalIncome, totalExpense };
}
function updateBMES(data) {
    const totalBalance = data.totalBalance;
    const totalIncome = data.totalIncome;
    const totalExpense = data.totalExpense;
    BMESCont[0].innerHTML = `₹ ${(Person.salary + totalBalance < 0) ? 0 : Person.salary + totalBalance}`;
    BMESCont[1].innerHTML = `₹ ${data.totalIncome}`;
    BMESCont[2].innerHTML = `₹ ${totalExpense}`;
    BMESCont[3].innerHTML = `₹ ${Person.salary}`;
    return;
}
function transactionList(Person) {
    const tBody = document.querySelector("#table-body");
    for (let data of Person.transactions) {
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
}
;
// When User clicks delete button the DOM list deleted
body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const row = target.closest("tr");
        const date = row.children[0].textContent;
        const amount = row.children[1].textContent;
        // const category = row.children[2]!.textContent;
        const type = row.children[3].textContent;
        const tempTransaction = {
            date: date,
            amount: Number(amount.replace("₹", "")),
            type: type,
        };
        // re-evaluate the amount, savings etc
        reEvaluate(Person, tempTransaction);
        row.remove();
        return;
    }
    return;
});
// Deletion of transaction list when user clicks DELETE button and updation to local storage
function reEvaluate(Person, tempTransaction) {
    const arr = Person.transactions;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].amount === tempTransaction.amount && arr[i].date === tempTransaction.date && arr[i].type === tempTransaction.type) {
            arr.splice(i, 1);
        }
    }
    Person.transactions = arr;
    getBMES(Person);
    // Local updation to Local Storage --->
    const usersDetails = JSON.parse(localStorage.getItem("usersDetails"));
    for (const user of usersDetails) {
        if (user.email === Person.email) {
            user.transactions = Person.transactions;
            break;
        }
    }
    localStorage.setItem("usersDetails", JSON.stringify(usersDetails));
    // ---------< Area completed
    return;
}
