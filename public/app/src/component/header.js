import React, { Component } from 'react';
import Logo from '../assets/images/logo.png'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            msg: "测试系统",
            btns: [
                {
                    icon: "icon-baomuleixing"
                }
            ]
        }
    }
    render() {
        return (
            <div className="header">
                <div className="header-logo" >
                    <img src={Logo} alt="" />
                </div>
                <div className="header-minisiter">
                    <h1 className="header-title">{this.state.msg}</h1>
                </div>
                <div className="header-items">
                    <div className="header-item">
                        {
                            this.state.btns.forEach(btn => {
                                return (
                                    <i className={`${btn.icon} iconfont`}></i>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
