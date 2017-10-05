System.import('index').then(
  ({
    GradientImage,
  }) => {
    const canvas = document.querySelector('#playground');
    if (canvas instanceof HTMLCanvasElement) {
      const drawOnDocument = () => {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);
        const ctx = canvas.getContext('2d');
        const gradientImage = new GradientImage(ctx);
        gradientImage.draw(
          GradientImage.multiHorizontalFn(
            [
              [255, 0, 0, 255],
              [255, 127, 0, 255],
              [255, 255, 0, 255],
              [0, 255, 0, 255],
              [0, 255, 255, 255],
              [0, 0, 255, 255],
              [255, 0, 255, 255],
            ],
            [255, 255, 255, 255],
          ),
        );
      }
      drawOnDocument();
      window.addEventListener('resize', event => {
        drawOnDocument();
      });
    }
  }
);
