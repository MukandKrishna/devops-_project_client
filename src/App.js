import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";

function App() {
  const [Tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/get").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, []);

  return (
    <>
      <div class="header z-depth">
        <img id="gyu" src={logo} alt="Logo" />
      </div>

      <div class="container">
        {Tasks.map((task) => (
          <div class="card">
            <div class="row">
              <div class="col-4">
                <img src="https://via.placeholder.com/300" alt=""></img>
              </div>
              <div class="col-8">
                <div class="card-body">
                  <div class="card-title">
                    <h1>{task.title}</h1>
                  </div>
                  <div id="auth" class="card-subtitle">
                    <b>short</b> by {task.author} / {task.timestamp}
                  </div>
                  <div id="desc" class="card-body-content">
                    {task.description}
                  </div>
                  <a id="this" href={task.link}>
                    read more at <b>twitter</b>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
