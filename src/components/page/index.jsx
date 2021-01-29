import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tesseract from 'tesseract.js';

const Page = ({ page }) => {
  const { zoom } = useSelector((state) => state.app);
  const canvasRef = useRef(page.pageIndex);

  function drawRect({
    x0, x1, y0, y1,
  }) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x0, y1);
    ctx.fill();
  }

  async function renderPage() {
    const viewport = page.getViewport({ scale: zoom });
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
    if (1 === '1') {
      Tesseract.recognize(canvas, 'eng', { logger: (m) => console.log(m) })
        .then((t) => {
          const { words } = t.data;
          words.filter((word) => word.text.toLowerCase().match(/(more)/gm) || word.text.toLowerCase().match(/(text)/gm)).forEach((word) => {
            drawRect(word.bbox);
            console.log(word);
          });
        })
        .catch((E) => console.error(E));
    }
  }

  useEffect(() => {
    renderPage();
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
};

Page.propTypes = {
  page: PropTypes.objectOf(Array).isRequired,
};

export default Page;
