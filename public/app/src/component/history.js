import React, { Component } from 'react';
import { Icon } from 'antd'
class App extends Component {
    constructor() {
        super()
        this.state = {
            historys: [{
                name: "概述"
            }]
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="menu-history">
                {
                    this.state.historys.map((elem, index) => {
                        return (
                            <div key={index} className="menu-history-item">
                                <span>{elem.name}</span>
                                <Icon type="close" style={{ fontSize: "10px" }} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
