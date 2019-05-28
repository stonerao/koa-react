import React, { Component } from 'react';
import Geo from '../../assets/json/shenzhen.json'

import RenderCanvas from "../../utils/map"
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            canvas: null,
            isDraw: true,
            name: ""
        }
    }
    componentDidMount() {
        let parent = document.getElementById("canvas-parent")
        let canvas = this.canvas = new RenderCanvas({
            width: parent.clientWidth,
            height: parent.clientHeight - 4,
            geo: Geo,
            click: (data) => { 
                this.setState({
                    name: data.properties.name + "区"
                })
            }
        })
        let _this = this;
        const draw = () => {
            canvas.draw()
            if (_this.state.isDraw) {
                requestAnimationFrame(draw)
            }
        }
        draw()
    }
    componentWillUnmount() {
        //销毁组件
        // console.log(this)
        this.state.isDraw = false;
        this.canvas.removeWindowEvent()
        this.canvas = null;
    }
    render() {
        return (
            <div className="full" id="canvas-parent">
                <canvas id="canvas"></canvas>
                <span className="canvas-click-name">{this.state.name}</span>
            </div>
        );
    }
}
export default App;
