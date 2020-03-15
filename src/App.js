import React, { Component } from 'react';
import Wrapper from './components/persentational/Wrapper';
// import Content from './components/persentational/Content';
import { Switch, Route, withRouter } from 'react-router-dom';
import Breadcrumblayout from './components/persentational/Breadcrumblayout';
import ShipperStatus from './components/ShipperStatus';
import logo from './logo.svg';
import './App.css';
import './css/c3.min.css'
import './css/chartist.min.css'
import './css/style.min.css'
import './css/jquery-jvectormap-2.0.2.css'
import './css/font-awesome.min.css'
import './App.css';
class App extends Component {
  componentWillMount() {
    console.log("this", this);
  }
  render() {
    return (
      <Switch>
        <Route exct path="/"
          render={() =>
            <Wrapper sidebartype={'full'} >
              <div className="page-wrapper them">
                <Breadcrumblayout
                />
                <div className="container-fluid">
                  <ShipperStatus />
                </div>

              </div>
            </Wrapper>
          }
        >
        </Route>

      </Switch>
    );
  }
}
export default withRouter (App) ;

// import React from 'react';
// import Wrapper from './components/persentational/Wrapper';
// // import Content from './components/persentational/Content';
// import { Switch, Route } from 'react-router-dom';
// import Breadcrumblayout from './components/persentational/Breadcrumblayout';
// import logo from './logo.svg';
// import './App.css';
// import './css/c3.min.css'
// import './css/chartist.min.css'
// import './css/style.min.css'
// import './css/jquery-jvectormap-2.0.2.css'
// import './css/font-awesome.min.css'
// import './App.css';
// // import moduleName from 'module';

// import ShipperStatus from './components/ShipperStatus';

// function App() {
  
//   return (

//     <Switch>   
//       <Route exact path="/"
//         render={() =>
//           <Wrapper sidebartype={'full'} >
//             <div className="page-wrapper them">
//               <Breadcrumblayout
//               />
//               <div className="container-fluid">
//                 <ShipperStatus 
                
//                  />
//               </div>

//             </div>
//           </Wrapper>
//         }
//       >
//       </Route>

//     </Switch>
//   );
// }

// export default App;
