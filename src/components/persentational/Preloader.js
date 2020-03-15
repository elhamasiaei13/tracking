import React from 'react';

function Preloader(props) {
    return (
        <div className=""
        //  style={{display: 'none'}}
          >
        <div className="lds-ripple">
          <div className="lds-pos"></div>
          <div className="lds-pos"></div>
        </div>
      </div>
    );
}

export default Preloader