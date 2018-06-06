import React from 'react';
import './Intro.css';

const Intro = () => {
  return (
    <div>
      <p>Welcome to the ChatWall website</p>
      <div className="introContainer">
        <div className="createNewWallContainer">
          <button>Create a new WallChat</button>
        </div>
        <div className="goToAChatWallContainer">
          <p>Go to a ChatWall</p>
          <input placeholder="ChatWall id"></input>
        </div>
      </div>
    </div>
  );
};

export default Intro;
