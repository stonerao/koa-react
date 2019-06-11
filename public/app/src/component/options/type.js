import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';
import axios from '../../utils/axios';
class type extends Component {
    constructor() {
        super();
        this.state = {
            typeInpt: "",
            list: [],
            status: 1
        }
        this.getList()

    }
    ajaxName = () => {
        let options = null
        let type = this.state.status;
        console.log(type)
        switch (type) {
            case 2:
                options = {
                    add: "optionsSizeAdd",
                    del: "optionsSizeDelete",
                    get: "optionsSizeGet"
                }
                break;
            case 3:
                options = {
                    add: "optionsTypeAdd",
                    del: "optionsTypeDelete",
                    get: "optionsTypeGet"
                }
                break;
            case 4:
                options = {
                    add: "optionsTypeAdd",
                    del: "optionsTypeDelete",
                    get: "optionsTypeGet"
                }
                break;
            default:
                options = {
                    add: "optionsTypeAdd",
                    del: "optionsTypeDelete",
                    get: "optionsTypeGet"
                }

        }
        return options
    }
    componentDidMount() {
        this.ajaxName()
    }
    componentDidUpdate() {
        this.props.onRef(this)
    }
    inputChange = (event) => {
        this.setState({
            typeInpt: event.target.value
        })
    }
    submit = () => {
        let { add } = this.ajaxName()
        axios.post("/api/goods/" + add, {
            name: this.state.typeInpt,
            type: this.state.status
        }).then(res => {
            if (!res) { return }
            if (res.code === 200) {
                this.setState({
                    typeInpt: ""
                })
                message.success("添加成功！")
                this.getList()
            } else {
                message.error("添加失败!")
            }
        })
    }
    renderList(list) {
        let component = list.map(elem => {
            return <li className="modal-table-flex fenekai options-type--li" key={elem.Id}>
                <div>{elem.name}</div>
                <div>
                    <Icon type="delete" className="cur" onClick={() => { this.delete(elem.Id) }} />
                </div>
            </li>
        })
        setTimeout(() => {
            this.setState({
                list: component
            })
        })
    }
    getList = () => {
        let { get } = this.ajaxName()
        axios("/api/goods/" + get, {
            params: {
                type: this.state.status
            }
        }).then(res => {
            if (res.code === 200) {
                this.renderList(res.list)
            }
        })
    }
    delete = (id) => {
        let { del } = this.ajaxName()
        axios.post("/api/goods/" + del, {
            id: id,
            type: this.state.status
        }).then(res => {
            if (res.code === 200) {
                message.success("删除成功！")
                this.getList()
            } else {
                message.error("删除失败!")
            }
        })
    }
    keyDown = (event) => {
        if(event.keyCode===13){
            this.submit()
        }
    }
    render() {
        return (
            <div className="right options-types">
                <ul className="flex-2  m-r">
                    {this.state.list}
                </ul>
                <div className="flex-2 m-l">
                    <div>
                        <Input onKeyDown={this.keyDown} value={this.state.typeInpt} placeholder="请输入添加值" onChange={this.inputChange} />
                    </div>
                    <div className="m-t">
                        <Button onClick={this.submit}>确定</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default type;