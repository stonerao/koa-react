import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: [
                {
                    name: "概况",
                    url: "/home/summary",
                    show: false
                }, {
                    name: "资源管理",
                    url: "/home/map1",
                    show: true,
                    children: [
                        {
                            name: "部门管理",
                            url: "/home/duties"
                        },
                        {
                            name: "人员管理",
                            url: "/home/people"
                        }
                    ]
                }, {
                    name: "文章管理",
                    url: "",
                    show: true,
                    children: [
                        {
                            name: "文章列表",
                            url: "/home/article"
                        },
                        {
                            name: "文章发布",
                            url: "/home/articleUp"
                        }
                    ]
                }, {
                    name: "数据展示",
                    url: "/home/map2",
                    show: false,
                    children: [
                        {
                            name: "可视化",
                            url: "/home/map3"
                        }
                    ]
                }
            ]
        }
    }

    renderChilder(node) {
        if (node.children && node.show) {
            return node.children.map((n, i) => {
                return <div key={i}>
                    <NavLink className="menu-level" to={n.url}>{n.name}</NavLink >
                </div>
            })
        }
    }
    clickRouter(node) {
        node.show = !node.show
        this.setState({
            menu: this.state.menu
        })
    }
    render() {
        return (
            <div className="menu">
                <div className="menu-title">STONE ADMIN</div>
                {
                    this.state.menu.map((node, index) => {
                        return (
                            <div key={index} className="menu-item" >
                                {
                                    !node.children ?
                                        <NavLink to={node.url}>{node.name}</NavLink> :
                                        <div className="menu-node" onClick={() => { this.clickRouter(node) }}>
                                            <span>{node.name}</span>
                                            <Icon type={node.show ? 'up' : 'down'} style={{ fontSize: '12px' }} />
                                        </div>
                                }
                                {node.show ? this.renderChilder(node) : ""}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
