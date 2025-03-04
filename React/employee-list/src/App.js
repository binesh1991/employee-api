import './App.css';
import React, { useState } from 'react';
import ReactJsonView from '@microlink/react-json-view'

function App() {
  const [file, setFile] = useState(null);
  const [json, setJson] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    let fileData = new FileReader();

    fileData.onload = function() {
      const httpOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: fileData.result })
      };
      fetch('http://localhost:5067/employeelist', httpOptions)
          .then(response => response.json())
          .then(data => setJson(() => data))
          .catch(error => console.error("Error occured:", error));
    }

    fileData.readAsText(file);
  };

  return (
    <div className="App">
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
        <button 
          onClick={handleUpload}
          className="submit"
        >Upload</button>
      </div>
      {json != null && <ReactJsonView src={json} displayDataTypes="false" />}
    </div>
  );
}

export default App;
