import confetti from "canvas-confetti";
import { useCallback, useLayoutEffect } from "react";

const Confetti = () => {
  const fireConfetti = useCallback(() => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    const randomInRange = useCallback((min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }, []);

    useLayoutEffect(() => {
      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 200 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
            colors: [
              "#b50202",
              "#38b502",
              "#04bcd9",
              "#7502c7",
              "#f7fa2f",
              "#f28b05",
            ],
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.5, 0.9), y: Math.random() - 0.2 },
            colors: [
              "#b50202",
              "#38b502",
              "#04bcd9",
              "#7502c7",
              "#f7fa2f",
              "#f28b05",
            ],
          })
        );
      }, 250);
    }, []);
  }, []);

  fireConfetti();

  // var end = Date.now() + 2 * 1000;

  // // go Buckeyes!
  // var colors = ["#bb0000", "#ffffff"];

  // (function frame() {
  //   confetti({
  //     particleCount: 2,
  //     angle: 60,
  //     spread: 155,
  //     origin: { x: 0 },
  //     colors: colors,
  //   });
  //   confetti({
  //     particleCount: 2,
  //     angle: 120,
  //     spread: 155,
  //     origin: { x: 1 },
  //     colors: colors,
  //   });

  //   if (Date.now() < end) {
  //     requestAnimationFrame(frame);
  //   }
  // })();

  return <></>;
};

export default Confetti;
