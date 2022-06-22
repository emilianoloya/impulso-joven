let bigWrapper = document.querySelector(".big-wrapper");
const menu = document.querySelector(".menu");

//menu bar display
menu.onclick = () => {
	bigWrapper.classList.toggle("active");
};


