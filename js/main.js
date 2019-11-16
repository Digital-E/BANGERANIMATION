let letters = document.querySelectorAll(".letter");
let bangerLogo = document.querySelectorAll(".banger-logo");

let lettersStyles = [];

letters.forEach(item => {
  let letterStyle = {
    initialWidth: "",
    scale: "1"
  };

  letterStyle.initialWidth = item.getBoundingClientRect().width;

  lettersStyles.push(letterStyle);
});

setInterval(() => {
  let scaleRatio = Math.round(Math.random() * 4);
  let randomLetterIndex = Math.round(Math.random() * 6);

  TweenMax.to(letters[randomLetterIndex], 0.5, {
    width: scaleRatio * lettersStyles[randomLetterIndex].initialWidth,
    scaleX: scaleRatio,
    ease: Power3.easeInOut,
    onComplete: () => {
      TweenMax.to(letters[randomLetterIndex], 0.5, {
        width: lettersStyles[randomLetterIndex].initialWidth,
        scaleX: 1,
        ease: Power3.easeInOut
      });
    }
  });
  //   letters[randomLetterIndex].style.width = `${scaleRatio *
  //     lettersStyles[randomLetterIndex].initialWidth}px`;
  //   letters[randomLetterIndex].style.transform = `scaleX(${scaleRatio})`;
}, 1000);
