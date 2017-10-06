System.import('index').then(
  ({
    CssRgba,
    Draggable,
    MultiHorizontalGradientImage,
    MultiVerticalGradientImage,
  }) => {
    const canvas = document.querySelector('#playground');
    if (canvas instanceof HTMLCanvasElement) {
      const el = document.createElement('div');
      Object.assign(el.style, {
        width: '70px',
        height: '30px',
        position: 'absolute',
        left: '20px',
        top: '20px',
        backgroundColor: 'white',
        cursor: 'move',
      });
      const dragEl = new Draggable(el);
      dragEl.start();
      const drawOnDocument = () => {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);
        const ctx = canvas.getContext('2d');
        const gradientImage = new MultiHorizontalGradientImage(ctx);
        gradientImage.draw(
          [
            [255, 0, 0, 255],
            [255, 127, 0, 255],
            [255, 255, 0, 255],
            [0, 255, 0, 255],
            [0, 255, 255, 255],
            [0, 0, 255, 255],
            [255, 0, 255, 255],
          ],
          [
            [255, 255, 255, 255],
          ],
        );
        canvas.addEventListener('click', event => {
          const colorData = gradientImage.getColorByCoords(event.clientX, event.clientY);
          console.info(colorData);
          const color = new CssRgba(colorData);
          el.style.backgroundColor = color;
        });
      }
      drawOnDocument();
      window.addEventListener('resize', event => {
        drawOnDocument();
      });
    }
  }
);
