import React, { Component } from 'react';
/* 
* Topo 编辑
*/
import Topo from '../../utils/topo'
class App extends Component {
    constructor() {
        super()
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="full">
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}

export default App;
