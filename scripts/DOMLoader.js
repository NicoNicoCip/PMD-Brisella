//@ts-check
import { inprint } from "./inprinter.js";
import { burgerMenu } from "./burger.js";

document.addEventListener("DOMContentLoaded", () => {
  async () => {
    let ls = document.getElementById("loadingScreen")
    if(ls) ls.remove()
    
    inprint()
    burgerMenu()
  }
})

