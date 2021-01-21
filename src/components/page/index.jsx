import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Page = ({ pageNumber }) => {
  const { document, zoom } = useSelector((state) => state.app);
  const ref = useRef();
  const canvasRef = useRef(pageNumber);
  const [rendered, setRendered] = useState(false);

  /**
   * Check if an element is in viewport
   *
   * @param {number} [offset]
   * @returns {boolean}
   */
  function isInViewport(offset = 0) {
    if (!ref) return false;
    const { top } = ref.current.getBoundingClientRect();
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
  }

  async function renderPage() {
    if (isInViewport() !== false && !rendered) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
      setRendered(true);
    }
  }

  useEffect(() => {
    console.log(rendered);
    renderPage();
    window.addEventListener('scroll', renderPage);
    return () => {
      window.removeEventListener('scroll', renderPage);
    };
  }, []);

  return (
    <div ref={ref}>
      <canvas ref={canvasRef} />
    </div>
  );
};

Page.propTypes = {
  pageNumber: PropTypes.number.isRequired,
};

export default Page;
