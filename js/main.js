setTimeout(() => {
  let letters = document.querySelectorAll(".letter");
  let bangerLogo = document.querySelector(".banger-logo");

  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  // Get Letter Sizes

  let lettersStyles = [];

  let scaleRatioX;

  let lastX;

  letters.forEach(item => {
    let letterStyle = {
      initialWidth: 0,
      initialHeight: 0,
      initialX: 0,
      initialY: 0,
      aspectRatio: 0,
      scale: 1,
      newWidth: 0,
      newX: 0,
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
      totalWidth = 0;
      return;
    }

    letters[index].style.left = `${totalWidth +
      lettersStyles[index - 1].initialWidth}px`;

    lettersStyles[index].initialX =
      totalWidth + lettersStyles[index - 1].initialWidth;

    lettersStyles[index].newX =
      totalWidth + lettersStyles[index - 1].initialWidth;

    totalWidth = totalWidth + lettersStyles[index - 1].initialWidth + 10;
  });

  //Set Logo Width

  bangerLogo.style.width = `${totalWidth}px`;

  //Stretch Ratio
  let scaleRatio = Math.round(Math.random() * 2);

  // Random Letter Index

  let randomLetterIndex = Math.round(Math.random() * 6);

  setInterval(() => {
    //Remove Mouse Move Listener
    window.removeEventListener("mousemove", mousemove);

    // New Width
    // lettersStyles[randomLetterIndex].newWidth =
    //   lettersStyles[randomLetterIndex].newWidth +
    //   lettersStyles[randomLetterIndex].newX * scaleRatioX * 2;

    //New X
    // lettersStyles.forEach((letter, index) => {
    //   if (index < randomLetterIndex) {
    //     lettersStyles[index].newX = lettersStyles[index].initialX - lastX;
    //   } else {
    //     lettersStyles[index].newX = lettersStyles[index].initialX + lastX;
    //   }
    // });

    // Set Has Stretched

    lettersStyles[randomLetterIndex].hasStretched = true;

    lettersStyles.forEach((letter, index) => {
      TweenMax.to(letters[index], 1, {
        x: 0,
        ease: Elastic.easeOut
      });

      TweenMax.to(letters[randomLetterIndex], 1, {
        scaleX: 1,
        ease: Elastic.easeOut,
        force3D: false
      });
    });

    randomLetterIndex = Math.round(Math.random() * 6);

    //Add Mouse Move Listener
    setTimeout(() => {
      window.addEventListener("mousemove", mousemove);
    }, 1000);
  }, 2000);

  let moveLetter = (randomLetterIndex, scaleRatioX) => {
    lettersStyles.forEach((letter, index) => {
      if (index === randomLetterIndex) {
        return;
      }

      if (index < randomLetterIndex) {
        TweenMax.to(letters[index], 0.2, {
          x: -lettersStyles[randomLetterIndex].newX * scaleRatioX
          // ease: Power3.easeInOut
        });
        lastX = -lettersStyles[randomLetterIndex].newX * scaleRatioX;
      } else {
        TweenMax.to(letters[index], 0.2, {
          x: lettersStyles[randomLetterIndex].newX * scaleRatioX

          // ease: Power3.easeInOut
        });
        lastX = lettersStyles[randomLetterIndex].newX * scaleRatioX;
      }
    });

    TweenMax.to(letters[randomLetterIndex], 0.2, {
      scaleX:
        (lettersStyles[randomLetterIndex].newWidth +
          lettersStyles[randomLetterIndex].newX * scaleRatioX * 2) /
        lettersStyles[randomLetterIndex].newWidth,
      scaleY: 1,
      force3D: false
    });
  };

  let mousemove = e => {
    //Mouse Position
    let x = e.clientX;
    let y = e.clientY;

    //Mouse Position Ratio (in relation to viewport size)
    let xRatio = x / windowWidth;
    let yRatio = y / windowHeight;

    //Mouse Position
    scaleRatioX = xRatio * scaleRatio;

    moveLetter(randomLetterIndex, scaleRatioX);
  };

  window.addEventListener("mousemove", mousemove);
}, 0);
