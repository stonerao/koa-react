import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'antd'; 
import Menus from '../component/menu'
import Historys from '../component/history'
class App extends Component {
     
    componentDidMount() {
        /* console.log(this.props)
        let ws = new WebSocket("ws://localhost:3002/test");
        ws.onopen = event => {
            ws.send("test")
        }
        ws.onmessage = event => {

        }
        ws.onclose = event => {

        } */
    }
    render() {
        return (
            <div className="full">
                <Menus props={this}></Menus>
                <div className="main">
                    <Historys></Historys>
                    <div className="main-box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
