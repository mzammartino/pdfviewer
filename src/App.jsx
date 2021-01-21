import * as PDFjs from 'pdfjs-dist';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Page from './components/page';
import ProgressBar from './components/progressBar';
import Toolbar from './components/toolbar';
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
        dispatch(setPDF('A17_FlightPlan.pdf'));
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
        <div className="view">
          {Array.from(Array(app.document.numPages).keys())
            .map((val) => <Page key={val} pageNumber={val + 1} />) }
        </div>
      </div>
    </div>
  );
}

export default App;
