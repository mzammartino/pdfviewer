import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Toolbar from './components/toolbar';
import { setPDF } from './store/app/app.actions';

function App() {
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  async function loadFile() {
    GlobalWorkerOptions.workerSrc = await import('../node_modules/pdfjs-dist/build/pdf.worker');
    const document = await getDocument(app.pdfUrl);
    return document;
  }

  useEffect(() => {
    if (app.pdfUrl !== null) {
      loadFile().then((d) => console.log(d));
    }
    setTimeout(() => {
      dispatch(setPDF('http://www.africau.edu/images/default/sample.pdf'));
      console.log('done');
    }, 4000);
  }, [app.pdfUrl]);

  return (
    <div className="App">
      <Toolbar />
      <div className="main">
        <div className="preview" />
        <div className="view" />
      </div>
    </div>
  );
}

export default App;
