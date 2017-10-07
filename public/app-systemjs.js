System.import('color-picker').then(
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
        width: '150px',
        height: '55px',
        position: 'absolute',
        left: '20px',
        top: '20px',
        backgroundColor: 'white',
        cursor: 'move',
        boxShadow: 'rgb(100, 100, 100) 1px 1px 4px',
        fontSize: '10px',
        fontFamily: 'monospace',
        textAlign: 'center',
        color: 'black',
      });
      el.innerHTML = `
        ${new CssRgba([255, 255, 255, 255])}<br />
        this thing is draggable<br />
        and<br />
        shows picked color`
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
        const onPick = event => {
          const {clientX, clientY} = event;
          const colorData = gradientImage.getColorByCoords(clientX, clientY);
          console.info(colorData);
          const color = new CssRgba(colorData);
          el.style.backgroundColor = color;
          el.innerText = color;
          el.style.color = colorData.slice(0, -1).reduce((acc, slot) => acc + slot, 0) > 255*3/2 ? 'black' : 'white';
        };
        canvas.addEventListener('click', onPick);
        return () => {canvas.removeEventListener('click', onPick)};
      }
      let removePickListener = drawOnDocument();
      window.addEventListener('resize', event => {
        removePickListener();
        removePickListener = drawOnDocument();
      });
    }
  }
);
