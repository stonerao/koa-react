import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, message, Icon } from 'antd';
import "../../styles/member.scss"
import LoginImg from '../../assets/images/login-text.png'
import axios from '../../utils/axios'
import ScrollPlan from '../../component/scroll'
class App extends Component {
    constructor() {
        super()
        this.state = {
            username: "raoyan1994",
            password: "123456a",
            subPassword: "123456a"
        }
        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.subPasswordChange = this.subPasswordChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    userChange(event) {
        this.setState({ username: event.target.value });
    }
    passChange(event) {
        this.setState({ password: event.target.value });
    }
    subPasswordChange(event) {
        this.setState({ subPassword: event.target.value });
    }
    submit() {
        //验证

        const { username, password, subPassword } = this.state;
        const match = /^\w\w{5,15}$/;//为6-16为字母或数字
        if (subPassword !== password) {
            message.info("密码错误！");
            return
        }
        if (!match.test(username) || !match.test(password)) {
            message.info('账号或者密码格式错误');
            return
        }
        axios.post("/api/member/reg", {
            username: username,
            password: password
        }).then(res => {
            if (res.code === 200) {
                message.success('注册成功！');
            } else {
                message.error(res.msg);
            }
        })

    }
    render() {
        return (
            <ScrollPlan>
                <div className="m-login">
                    <div className="m-login--img">

                    </div>
                    <div className="m-login-box">
                        <div className="m-login-title">
                            STONE ADMIN
                    </div>
                        <div className="m-login-inp">
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" size="large" value={this.state.username} onChange={this.userChange} />
                        </div>
                        <div className="m-login-inp">
                            <Input.Password prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" size="large" value={this.state.password} onChange={this.passChange} />
                        </div>
                        <div className="m-login-inp">
                            <Input.Password prefix={<Icon type="eye-invisible" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认密码" size="large" value={this.state.subPassword} onChange={this.subPasswordChange} />
                        </div>

                        <div className="m-login-inp">
                            <Button type="primary" block onClick={this.submit} size="large">
                                注册
                            </Button>
                        </div>
                        <div className="m-not-pass">
                            <Link to="/login">登陆</Link>
                        </div>
                    </div>
                </div>
            </ScrollPlan>
        );
    }
}

export default App;
