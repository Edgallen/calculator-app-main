/*=============== CHEK IF PAGE LOADED ===============*/ 
const body = document.getElementsByTagName('body');

// Rome 'transition - none' when page is loaded
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    body[0].classList.remove('preload');
  }
};