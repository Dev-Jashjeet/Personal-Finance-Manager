let Details = document.querySelectorAll("input")! ;
let Button = document.querySelector("button")! as HTMLButtonElement;
let showPassImg = document.querySelectorAll("i")!;
let show1: boolean = true;
let show2: boolean = true;
interface userData {
    name: string,
    email: string,
    password: string,
    transactions: Array<object|[]>
}

Button.addEventListener("click" , (): void => {
    let count=0, passCount=0;
    for(let i=0; i<Details.length; i++) {                       //Count value 5 if all have values
        if((Details[i]! as HTMLInputElement).value !== "") {
            count++;                                            
        }
    }
    if((Details[2]! as HTMLInputElement).value === (Details[3]! as HTMLInputElement).value) {   //passCount value 1 if condition satisfied
        passCount++;
    }
    if(count === 5 && passCount === 1) {
        // Logic begins....
    }
});

(showPassImg[0]! as HTMLIFrameElement).addEventListener('click', (): void => {
    if(show1) {
        (Details[2]! as HTMLInputElement).type = "text";
        show1 = false;
    }
    else {
        (Details[2]! as HTMLInputElement).type = "password";
        show1 = true;
    }
    return;
});

(showPassImg[1]! as HTMLIFrameElement).addEventListener("click", (): void => {
    if(show2) {
        (Details[3]! as HTMLInputElement).type = "text";
        show2 = false;
    }
    else {
        (Details[3]! as HTMLInputElement).type = "password";
        show2 = true;
    }
    return;
})