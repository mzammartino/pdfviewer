import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useRenderPage = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const { document } = useSelector((state) => state.app);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const promises = [];

    promises.push(document.getPage(pageNumber));

    Promise.all(promises).then((t) => {
      setPages((prevPages) => [...prevPages, ...t]);
      setHasMorePages(pageNumber < document.numPages);
      setLoading(false);
    }).catch(() => {
      setError(true);
    });
  }, [pageNumber]);

  return {
    pages,
    hasMorePages,
    loading,
    error,
  };
};

export default useRenderPage;
