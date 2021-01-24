import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const { size, loadedSize } = useSelector((state) => state.app);
  return (
    <div>
      {loadedSize}
      /
      {size}
    </div>
  );
};

export default ProgressBar;
