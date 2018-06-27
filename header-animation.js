//@ts-check
(() => {
  const rows = 15;
  const cols = 80;
  const p = 0.01;
  const r = 2;

  document.querySelectorAll('header').forEach(header => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.classList.add('header-canvas');
      header.appendChild(canvas);
      animate(ctx);
    }
  });

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} [state]
   */
  function animate(ctx, state) {
    const w = innerWidth < 672 ? 2 : innerWidth < 1024 ? 1.6 : 1;

    state =
      state ||
      Array(rows * cols)
        .fill(null)
        .map(() => randomDigit());

    const width = (ctx.canvas.width = ctx.canvas.clientWidth);
    const height = (ctx.canvas.height = ctx.canvas.clientHeight);

    ctx.clearRect(0, 0, width, height);

    ctx.font = `${height / rows / 1.2}px 'Roboto Mono'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#cce';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.fillText(
          state[x + y * cols],
          (x + 0.5) * width / cols * w,
          (y + 0.5) * height / rows
        );
      }
    }

    const nextState = state.map(
      digit => (Math.random() < p ? randomDigit() : digit)
    );

    requestAnimationFrame(() => animate(ctx, nextState));
  }

  function randomDigit() {
    return Math.floor(Math.random() * r).toString(r);
  }
})();
