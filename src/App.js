import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Results from './Results';

const App = () => {
  const [fileDataArray, setFileDataArray] = useState([]);

  const handleFiles = (selectedFiles) => {
    const filePromises = Array.from(selectedFiles).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          resolve({ name: file.name, content });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(filePromises).then((fileData) => {
      setFileDataArray((prevFileDataArray) => [...prevFileDataArray, ...fileData]);
    });
  };

  return (
    <div className='main'>
      <div className='upload'>
        <FileUpload handleFiles={handleFiles} />
      </div>
      <div className='results'>
        <Results fileDataArray={fileDataArray} />
      </div>
      
    </div>
  );
};

export default App;