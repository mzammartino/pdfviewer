/* eslint-disable no-underscore-dangle */
import React, {
  useCallback, useRef, useState,
} from 'react';
import useRenderPage from '../../hooks/useRenderPage';
import Page from '../page';

const Viewer = () => {
  const viewRef = useRef();
  const [lastPageNumber, setLastPageNumber] = useState(1);

  const {
    pages,
    loading,
    error,
    hasMorePages,
  } = useRenderPage(lastPageNumber);

  const observer = useRef();
  const lastPageElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePages) {
        setLastPageNumber((oldLastPageNumber) => oldLastPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMorePages]);

  return (
    <div ref={viewRef} className="view">
      {
      pages.map((page, index) => {
        if (pages.length === index + 1) {
          return (
            <div ref={lastPageElementRef} key={`${page._pageIndex}`}>
              <Page
                page={page}
              />
            </div>
          );
        }

        return (
          <div key={page._pageIndex}>
            <Page page={page} key={`${page._pageIndex}`} />
          </div>
        );
      })
}
      {loading && <div id="loader" style={{ height: '20px' }}><h1>Loading</h1></div>}
      {error && <div>Error</div>}
    </div>
  );
};

export default Viewer;
