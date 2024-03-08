import { useState } from "react";
import csv from "csv-parser";
import csvParser from "csv-parser";

function UploadCSV() {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  //   const handleUpload = () => {
  //     if (csvFile) {
  //       // Perform CSV file processing here
  //     }
  //   };

  const handleUpload = async () => {
    console.log("hi");
    if (csvFile) {
      const reader = new FileReader();
      console.log("hi1");
      reader.onload = (e) => {
        const text = e.target.result;

        console.log("hi2");

        console.log(text);

        console.log(typeof text);

        const results = [];

        csvParser()
          .on("data", (row) => {
            console.log("hi3");
            results.push(row);
          })
          .on("end", () => {
            console.log("hi4");
            // `results` contains the parsed CSV data
            console.log(results);
          })

          .write(text);
        console.log("hi5");
        console.log(results);
      };
      console.log("hi6");
      reader.readAsText(csvFile);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default UploadCSV;
