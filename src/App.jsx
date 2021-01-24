import * as PDFjs from 'pdfjs-dist';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import ProgressBar from './components/progressBar';
import Toolbar from './components/toolbar';
import Viewer from './components/viewer';
import {
  setDocument,
  setLoaded, setLoadedSize, setPDF, setTotalSize,
} from './store/app/app.actions';

PDFjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFjs.version}/pdf.worker.js`;

function App() {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  async function loadFile() {
    const loadingTask = PDFjs.getDocument(app.pdfUrl);
    loadingTask.onProgress = ({ loaded, total }) => {
      dispatch(setTotalSize(total));
      dispatch(setLoadedSize(loaded));
    };

    const document = await loadingTask.promise;
    dispatch(setDocument(document));
    dispatch(setLoaded());
    return document;
  }

  useEffect(() => {
    if (app.pdfUrl !== null) {
      loadFile();
    } else {
      setTimeout(() => {
        dispatch(setPDF('14.pdf'));
      }, 2000);
    }
  }, [app.pdfUrl]);

  if (app.loading) {
    return <ProgressBar />;
  }

  return (
    <div className="App">
      <Toolbar />
      <div className="main">
        <div className="preview" />
        <Viewer />
      </div>
    </div>
  );
}

export default App;
