import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

function App () {

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchField] = useState('');

  useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users))
  }, []) 

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  console.log(robots, searchfield);
  
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })
  if (!robots.length) {
    return (
      <div className="tc">
        <h1>Loading Data</h1>
      </div>
    );
  } else {
    return (
      <div className="tc">
        <h1 className="f2">Robo Friends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
    // console.log(filteredRobots);
  }


export default App;
