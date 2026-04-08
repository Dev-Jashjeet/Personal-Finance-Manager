let Details = document.querySelectorAll("input")!;
let Button = document.querySelector("button")! as HTMLButtonElement;
let showPassImg = document.querySelectorAll("i")!;
let loader = document.querySelector(".loader-cont")! as HTMLDivElement;
let sgninBtn = document.querySelector("a")! as HTMLAnchorElement;
let spanError = document.querySelectorAll(".spanErr")!;
let show1: boolean = true;
let show2: boolean = true;
let tickCheck: boolean = false;
interface userData {
  name: string;
  email: string;
  password: string;
  transactions: Array<object>;
}

Details[4]!.addEventListener("change", () => {
  if ((Details[4]! as HTMLInputElement).checked) {
    tickCheck = true;
  } else {
    tickCheck = false;
  }
});

// CREATE ACCOUNT FUNCTION
Button.addEventListener("click", (): void => {
  let count = 0,
    passCount = 0,
    checkBox = 0;
  for (let i = 0; i < Details.length - 1; i++) {
    //Count value 4 if all have values
    if ((Details[i]! as HTMLInputElement).value !== "") {
      count++;
    }
  }
  if (
    (Details[2]! as HTMLInputElement).value.trim() ===
    (Details[3]! as HTMLInputElement).value.trim()
  ) {
    //passCount value 1 if condition satisfied
    passCount++;
  }
  if (tickCheck) {
    if (count === 4 && passCount === 1) {
      loader.style.display = "flex";
      setTimeout((): void => {
        for (let i = 0; i < spanError.length; i++) {
          (spanError[i]! as HTMLSpanElement).style.display = "none";
        }
        if (localStorage.getItem("usersDetails") === null) {
          const usersData: userData[] = [];
          let user: Required<userData> = {
            name: (Details[0]! as HTMLInputElement).value,
            email: (Details[1]! as HTMLInputElement).value.trim(),
            password: (Details[2]! as HTMLInputElement).value.trim(),
            transactions: [],
          };
          usersData.push(user);
          let strUserData = JSON.stringify(usersData);
          localStorage.setItem(`usersDetails`, strUserData);
          window.location.replace("dashboard.html");
        } else {
          let check = 0;
          let strUserData: string =
            localStorage.getItem("usersDetails") || "[]";
          let userArray: userData[] = JSON.parse(strUserData);
          for (let user in userArray) {
            if (
              (Details[1]! as HTMLInputElement).value.trim() ===
              userArray[user]!.email
            ) {
              alert("EMAIL ID ALREADY PRESENT PLEASE SIGN IN");
              check++;
              break;
            }
          }
          if (check === 0) {
            let user: Required<userData> = {
              name: (Details[0]! as HTMLInputElement).value,
              email: (Details[1]! as HTMLInputElement).value.trim(),
              password: (Details[2]! as HTMLInputElement).value.trim(),
              transactions: [],
            };
            userArray.push(user);
            let strUserData = JSON.stringify(userArray);
            localStorage.setItem(`usersDetails`, strUserData);
            window.location.replace("dashboard.html");
          }
        }
        loader.style.display = "none";
      }, 2000);
    } 
    else {
      for (let i = 0; i < spanError.length; i++) {
        (spanError[i]! as HTMLSpanElement).style.display = "block";
      }
    }
  } 
  else {
    (spanError[4]! as HTMLSpanElement).style.display = "block";
  }
  return;
});
// CREATE ACCOUNT ENDED

// VIEW PASSWORD FUNCTION
(showPassImg[0]! as HTMLElement).addEventListener("click", (): void => {
  if (show1) {
    (Details[2]! as HTMLInputElement).type = "text";
    show1 = false;
  } else {
    (Details[2]! as HTMLInputElement).type = "password";
    show1 = true;
  }
  return;
});

(showPassImg[1]! as HTMLElement).addEventListener("click", (): void => {
  if (show2) {
    (Details[3]! as HTMLInputElement).type = "text";
    show2 = false;
  } else {
    (Details[3]! as HTMLInputElement).type = "password";
    show2 = true;
  }
  return;
});
// VIEW PASSWORD FUNCTION ENDED

// SIGN-IN FUNCTION
sgninBtn.addEventListener("click", (): void => {
  setTimeout((): void => {
    window.location.replace("index.html");
    return;
  }, 1000);
  return;
});
// SIGN-IN ENDED
