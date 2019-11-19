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

let crazyRatio = 100;

let previousLetterToScale = 0;
let letterToScale = null;

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

let moveLetter = (letterToScale, scaleRatioX, scaleRatioY) => {
  lettersStyles.forEach((letter, index) => {
    if (index === letterToScale) {
      return;
    }

    if (index < letterToScale) {
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

  TweenMax.to(letters[letterToScale], 0.3, {
    scaleX:
      (lettersStyles[letterToScale].newWidth + crazyRatio * scaleRatioX * 2) /
      lettersStyles[letterToScale].newWidth,

    scaleY: 1 + scaleRatioY * 0.5,
    force3D: false
  });
};

let changeBackground = () => {
  if (!hasToggled) {
    document.querySelector(".background-cover").style.display = "block";
    document.querySelectorAll(".letter").forEach(letter => {
      letter.children[0].classList.add("white");
    });
    hasToggled = true;
    crazyRatio = 300;
  } else {
    document.querySelector(".background-cover").style.display = "none";
    document.querySelectorAll(".letter").forEach(letter => {
      letter.children[0].classList.remove("white");
    });
    hasToggled = false;
    crazyRatio = 100;
  }
};

let moveGradientBackground = (scaleRatioX, scaleRatioY) => {
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(${scaleRatioX *
    180}deg, rgba(246, 154, 62, 1) ${scaleRatioX *
    0.2 *
    100}%, rgba(233, 79, 45, 1) 100%)`;

  document.querySelector(
    ".circle-gradient"
  ).style.background = `linear-gradient(${-90 *
    scaleRatioX}deg, rgba(246, 154, 62, 1) ${0}%, rgba(233, 79, 45, 1) 100%)`;
};

let mousemove = e => {
  if (!init) {
    previousX = e.clientX;
    previousY = e.clientY;
    init = true;
  }

  //Mouse Position
  let x = e.clientX;
  let y = e.clientY;

  currentX = e.clientX;
  currentY = e.clientY;

  let deltaX = Math.abs(currentX - previousX);
  let deltaY = Math.abs(currentY - previousY);

  //Mouse Position Ratio (in relation to viewport size)
  let xRatio = x / windowWidth;
  let yRatio = y / windowHeight;

  //Mouse Position
  scaleRatioX = xRatio * scaleRatio;
  scaleRatioY = yRatio * scaleRatio;

  moveGradientBackground(scaleRatioX, scaleRatioY);
  if (deltaX * 0.001 < 0) return;
  if (deltaY * 0.001 < 0) return;
  if (letterToScale === null) {
    return;
  }

  moveLetter(letterToScale, deltaX * 0.005, deltaY * 0.005);
};

let clickedScreen = () => {
  changeBackground();
};

window.addEventListener("mousemove", mousemove);
window.addEventListener("click", clickedScreen);

letters.forEach((letter, index) => {
  letter.addEventListener("mouseenter", e => {
    previousX = e.clientX;
    letterToScale = parseInt(letter.getAttribute("id"));
    previousLetterToScale = parseInt(letter.getAttribute("id"));
  });
  letter.addEventListener("mouseleave", e => {
    previousX = e.clientX;
    lettersStyles.forEach((letter, index) => {
      TweenMax.to(letters[index], 0.3, {
        x: 0
        // ease: Power3.easeInOut
      });
    });

    TweenMax.to(letters[previousLetterToScale], 0.3, {
      scaleX: 1,
      scaleY: 1,
      force3D: false
    });

    letterToScale = null;
  });
});
