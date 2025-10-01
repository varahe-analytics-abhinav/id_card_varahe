import React from 'react'
import Header from '../../components/Header/Header';
import Sidenav from '../../components/Sidenav/Sidenav';
import WhatIndia from '../../components/wit/What_india';

function Wit() {


  return (
    <div>
      {" "}
      <Header />
      <Sidenav />
      <div className="content-wrapper">
     

        <WhatIndia/>
      </div>
    </div>
  );
}

export default Wit