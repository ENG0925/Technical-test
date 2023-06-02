import React, { useState, useRef } from 'react';

const FileUpload = ({ handleFiles }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [alert, setAlert] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const invalidFiles = selectedFiles.filter((file) => file.type !== 'text/plain');
    if (invalidFiles.length > 0) {
      setAlert('Warning: Only .txt files are allowed.');
      setFiles([]);
      return;
    }
  
    setAlert('');
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  
    const fileNames = selectedFiles.map((file) => file.name);
    setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, ...fileNames]);
  };
  

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadClick = (event) => {
    event.preventDefault();
    if (files.length === 0) {
      setAlert('No file selected. Please upload a file.');
      return;
    }
  
    setAlert('');
    handleFiles(files);
  
    setFiles([]);
  };
  

  return (
    <div>
      <h2>Upload a log file (.txt)</h2>
      <form onSubmit={handleUploadClick}>
        <div
          onClick={handleClick}
          onDrop={(event) => {
            event.preventDefault();
            setFiles(Array.from(event.dataTransfer.files));
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          style={{
            width: '400px',
            height: '200px',
            border: '2px dashed #000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontStyle: 'italic'
          }}
        >
          (Drag and drop your file here)
        </div>
        <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} style={{display: "none"}}/>

        {alert && <div>{alert}</div>}

        <button type="submit">Upload</button>
      </form>

      {uploadedFiles.length > 0 && (
        <div 
          style={{
            fontStyle: 'italic'
          }}
        >
          <ul>
            {uploadedFiles.map((fileName) => (
              <li key={fileName}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;