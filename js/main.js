let letters = document.querySelectorAll(".letter");
let bangerLogo = document.querySelector(".banger-logo");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

// Get Letter Sizes

let lettersStyles = [];

let scaleRatioX;

let hasToggled = false;

let previousLetter;

let init = false;

let currentX;
let currentY;

let previousX;
let previousY;

letters.forEach(item => {
  let letterStyle = {
    initialWidth: 0,
    initialHeight: 0,
    initialX: 0,
    initialY: 0,
    aspectRatio: 0,
    scale: 1,
    newWidth: 0,
    currentX: 0,
    newY: 0,
    hasStretched: false
  };

  letterStyle.initialWidth = item.getBoundingClientRect().width;
  letterStyle.newWidth = item.getBoundingClientRect().width;

  letterStyle.aspectRatio =
    letterStyle.initialHeight / letterStyle.initialWidth;

  lettersStyles.push(letterStyle);
});

let totalWidth = 0;

lettersStyles.forEach((item, index) => {
  if (index === 0) {
    letters[0].style.left = "0px";
    lettersStyles[index].initialX = 0;
    lettersStyles[index].currentX = 0;
    totalWidth = 0;
    return;
  }

  letters[index].style.left = `${totalWidth +
    lettersStyles[index - 1].initialWidth}px`;

  lettersStyles[index].initialX =
    totalWidth + lettersStyles[index - 1].initialWidth;

  lettersStyles[index].currentX =
    totalWidth + lettersStyles[index - 1].initialWidth;

  totalWidth = totalWidth + lettersStyles[index - 1].initialWidth + 10;
});

//Set Logo Width

bangerLogo.style.width = `${totalWidth}px`;

//Stretch Ratio
let scaleRatio = Math.round(1 + Math.random() * 3);

// Random Letter Index

let randomLetterIndex = Math.round(Math.random() * 5);

previousLetter = randomLetterIndex;

let moveLetter = (randomLetterIndex, scaleRatioX) => {
  lettersStyles.forEach((letter, index) => {
    if (index === randomLetterIndex) {
      return;
    }

    if (index < randomLetterIndex) {
      TweenMax.to(letters[index], 0.3, {
        x: -100 * scaleRatioX

        // ease: Power3.easeInOut
      });
    } else {
      TweenMax.to(letters[index], 0.3, {
        x: 100 * scaleRatioX

        // ease: Power3.easeInOut
      });
    }
  });

  TweenMax.to(letters[randomLetterIndex], 0.3, {
    scaleX:
      (lettersStyles[randomLetterIndex].newWidth + 100 * scaleRatioX * 2) /
      lettersStyles[randomLetterIndex].newWidth,

    scaleY: 1,
    force3D: false
  });
};

let changeLetter = () => {
  previousX = currentX;
  previousY = currentY;

  hasClicked = true;

  lettersStyles.forEach((letter, index) => {
    TweenMax.to(letters[index], 0.2, {
      x: 0
      // ease: Power3.easeInOut
    });
  });

  TweenMax.to(letters[randomLetterIndex], 0.2, {
    scaleX: 1,
    scaleY: 1,
    force3D: false
  });

  scaleRatio = Math.round(1 + Math.random() * 3);

  while (randomLetterIndex === previousLetter) {
    randomLetterIndex = Math.round(Math.random() * 5);

    if (randomLetterIndex !== previousLetter) {
      previousLetter = randomLetterIndex;
      break;
    }
  }
};

let changeBackground = () => {
  if (!hasToggled) {
    document.querySelector(".background-cover").style.display = "block";
    document.querySelectorAll(".letter").forEach(letter => {
      letter.children[0].classList.add("white");
    });
    hasToggled = true;
  } else {
    document.querySelector(".background-cover").style.display = "none";
    document.querySelectorAll(".letter").forEach(letter => {
      letter.children[0].classList.remove("white");
    });
    hasToggled = false;
  }
};

let moveGradientBackground = (scaleRatioX, scaleRatioY) => {
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(${90}deg, rgba(246, 154, 62, 1) ${scaleRatioX *
    0.15 *
    100}%, rgba(233, 79, 45, 1) 100%)`;

  document.querySelector(
    ".circle-gradient"
  ).style.background = `linear-gradient(${-90 +
    scaleRatioY *
      20}deg, rgba(246, 154, 62, 1) ${0}%, rgba(233, 79, 45, 1) 100%)`;
};

let mousemove = e => {
  if (!init) {
    previousX = e.clientX;
    init = true;
  }
  //Mouse Position
  let x = e.clientX;
  let y = e.clientY;

  currentX = e.clientX;
  currentY = e.clientY;

  let deltaX = currentX - previousX;

  console.log(deltaX);

  //Mouse Position Ratio (in relation to viewport size)
  let xRatio = x / windowWidth;
  let yRatio = y / windowHeight;

  //Mouse Position
  scaleRatioX = xRatio * scaleRatio;
  scaleRatioY = yRatio * scaleRatio;

  moveGradientBackground(scaleRatioX, scaleRatioY);
  if (deltaX * 0.001 < 0) return;
  moveLetter(randomLetterIndex, deltaX * 0.005);
};

let clickedScreen = () => {
  changeBackground();
  changeLetter();
};

window.addEventListener("mousemove", mousemove);
window.addEventListener("click", clickedScreen);
