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
      <h1>Working</h1>
      <form>
        <label htmlFor="sor">Location 1</label>
        <input
          type="text"
          id="sor"
          value={sor}
          onChange={(e) => setSor(e.target.value)}
        />
        <button type="button" onClick={submitHandler}>
          Submit
        </button>
      </form>
      {data &&
        data.map((loc, ind) => {
          return (
            <h4 key={ind}>
              {loc.location} = {loc.distance}
            </h4>
          );
        })}
    </div>
  );
}

export default App;
