import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Page = ({ page }) => {
  const { zoom } = useSelector((state) => state.app);
  const canvasRef = useRef(page.pageIndex);

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
