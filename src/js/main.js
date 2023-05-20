const dropMenu = document.querySelector(".burgermenu");
const navigationList = document.querySelector(".navigation__list");
let menuActive = false;
dropMenu.addEventListener("click", function () {
  if (!menuActive) {
    menuActive = true;
    dropMenu.classList.add("active");
  } else {
    dropMenu.classList.remove("active");
    menuActive = false;
  }
  navigationList.classList.toggle("active");
}
); 
