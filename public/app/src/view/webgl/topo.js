import React, { Component } from 'react';
/* 
* Topo 编辑
*/
class App extends Component {
    constructor() {
        super()

    }
    componentDidMount() {
        // var host = location.origin.replace(/^http/, 'ws')
        var ws = new WebSocket("ws://127.0.0.1:3002/test");
        ws.onopen = function (e) {
            console.log(e)
        }
        ws.onmessage = function (event) {
            // let data = JSON.parse(event.data)
            var num=0
            setInterval(()=>{
                ws.send(JSON.stringify({"a":num++}))
            },1000)
        };

    }
    render() {
        return (
            <div className="full">

            </div>
        );
    }
}

export default App;
