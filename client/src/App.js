import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [sor, setSor] = useState("");
  const [data, setData] = useState([]);

  const submitHandler = () => {
    axios
      .post("http://localhost:3001/api/location", {
        sor,
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log("Error:", error.message);
      });
  };

  return (
    <div className="App">
      <h1 className="title">Practo Working</h1>
      <form>
        <label htmlFor="sor" className="label">
          Location 1
        </label>
        <input
          type="text"
          id="sor"
          className="input"
          value={sor}
          onChange={(e) => setSor(e.target.value)}
        />
        <button type="button" className="btn" onClick={submitHandler}>
          Submit
        </button>
      </form>
      <div className="values">
        {data &&
          data.map((loc, ind) => {
            return (
              <div key={ind} className="result">
                {loc.location} = {loc.distance}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
