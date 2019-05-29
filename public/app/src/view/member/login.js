import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, message, Icon } from 'antd';
import "../../styles/member.scss" 
import axios from '../../utils/axios'
import ScrollPlan from '../../component/scroll'
class App extends Component {
    constructor() {
        super()
        this.state = {
            username: "raoyan1994",
            password: "123456a",
            class: "",
            size: "large"
        }
        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.submit = this.submit.bind(this);
       
    }
    userChange(event) {
        this.setState({ username: event.target.value });
    }
    passChange(event) {
        this.setState({ password: event.target.value });
    }
    
    submit() {
        //验证
        const { username, password } = this.state;
        const match = /^\w\w{5,15}$/;//为6-16为字母或数字
        if (!match.test(username) || !match.test(password)) {
            message.info('账号或者密码格式错误');
            return false
        }
        axios.post("/api/member/login", {
            username: username,
            password: password
        }).then(res => {
            if (res.code === 200) {
                message.success('登录成功');
                this.props.history.push("/home")
            } else {
                message.error(res.msg);
            }
        })
    }
    render() {
        return (
            <ScrollPlan setClass={this.state.class}>
                <div className="m-login">
                    {/* <img src={LoginImg} alt="一览众山小" className="m-login--img" /> */}
                    <div className="m-login--img">

                    </div>
                    <div className="m-login-box">
                        <div className="m-login-title">
                            STONE ADMIN
                        </div>
                        <div className="m-login-inp">
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="账户" value={this.state.username} onChange={this.userChange} />
                        </div>
                        <div className="m-login-inp">
                            <Input.Password prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="密码" value={this.state.password} onChange={this.passChange} />
                        </div>

                        <div className="m-login-inp">
                            <Button type="primary" block onClick={this.submit} size={this.state.size}>
                                登录
                            </Button>
                        </div>
                        <div className="m-not-pass">
                            <Link to="/reg">注册</Link>
                        </div>
                    </div>
                </div>
            </ScrollPlan>
        );
    }
}

export default App;
