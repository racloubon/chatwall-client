import React from 'react';
import './Intro.css';
import CreateChannelButton from './CreateChannelButton';
import GoToChatWall from './GoToChatWall';

const Intro = () => {
  return (
    <div>
      <p>Welcome to the ChatWall website</p>
      <div className="introContainer">
        <div className="createChannelButtonContainer">
          <CreateChannelButton/>
        </div>
        <div  className="goToChatWallContainer">
          <GoToChatWall/>
        </div>
      </div>
    </div>
  );
};

export default Intro;
