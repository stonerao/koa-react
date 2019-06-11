import React, { Component } from 'react';

class left extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            state: 1
        }
    }
    cutover = (elem) => {
        this.props.cutover(elem)
        this.setState({
            state: elem.id
        })
        setTimeout(() => {
            this.renderComponents()
        })
    }
    componentDidMount() {
        this.renderComponents()
    }
    renderComponents() {
        let list = [
            {
                name: "类型",
                id: 1
            }, {
                name: "尺码",
                id: 2
            }, {
                name: "材质",
                id: 3
            }, {
                name: "品牌",
                id: 4
            }, {
                name: "种类",
                id: 5
            }
        ]
        let listComponent = list.map(elem => {
            return <li className={this.state.state === elem.id ? 'active' : ''} key={elem.id} onClick={() => { this.cutover(elem) }}>{elem.name}</li>
        })
        this.setState({
            list: listComponent
        })
    }
    render() {
        return (
            <ul className="options-list">
                {this.state.list}
            </ul>
        );
    }
}

export default left;