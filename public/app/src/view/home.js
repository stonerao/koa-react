import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import HeaderComponent from '../component/header'
class App extends Component { 
    render() {
        return (
            <div className="App">
                {/* <HeaderComponent> </HeaderComponent>  */}
                <div className="App-main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
