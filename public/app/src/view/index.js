import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'antd';
import Menus from '../component/menu'
class App extends Component {
    render() {
        return (
            <div className="full">
                <Menus></Menus>
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default App;
