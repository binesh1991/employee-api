import './App.css';
import React, { useState } from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

function App() {
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // Store the path for the local CSV file
    }
  };

  // This function will recursively convert the JSON received from the server
  // to a format that the tree view component can process
  function transformHierarchy(obj) {
    return {
      id: obj.employeeId,
      label: `${obj.employeeId} - ${obj.name}`,
      children: obj.reports ? obj.reports.map(transformHierarchy) : []
    };
  }
  
  const handleUpload = async () => {
    let fileData = new FileReader();

    fileData.onload = function() {
      const httpOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: fileData.result }) // The CSV data is sent in the POST request body
      };
      fetch('http://localhost:5067/employeelist', httpOptions) // Perform the call to the endpoint
          .then(response => response.json())
          .then(data => {
            let jsonArray = data.map(transformHierarchy);
            setItems(() => jsonArray)
          })
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
      <RichTreeView items={items} />
    </div>
  );
}

export default App;
