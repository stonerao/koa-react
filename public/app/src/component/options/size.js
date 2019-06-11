import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';
import axios from '../../utils/axios';
class type extends Component {
    constructor() {
        super();
        this.state = {
            typeInpt: "",
            list: []
        }
        this.getList()
    }
    inputChange = (event) => {
        this.setState({
            typeInpt: event.target.value
        })
    }
    submit = () => {
        axios.post("/api/goods/optionsSizeAdd", {
            name: this.state.typeInpt
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
                    <Icon type="delete" className="cur" onClick={()=>{this.delete(elem.Id)}}/>
                </div>
            </li>
        })
        setTimeout(() => {
            this.setState({
                list: component
            })
        })
    }
    getList() {
        axios("/api/goods/optionsSizeGet").then(res => {
            if (res.code === 200) {
                this.renderList(res.list)
            }
        })
    }
    delete(id) {
        axios.post("/api/goods/optionsSizeDelete",{
            id:id
        }).then(res => {
            if (res.code === 200) {
                message.success("删除成功！")
                this.getList()
            } else {
                message.error("删除失败!")
            }
        })
    }
    render() {
        return (
            <div className="right options-types">
                <ul className="flex-2  m-r">
                    {this.state.list}
                </ul>
                <div className="flex-2 m-l">
                    <div>
                        <Input value={this.state.typeInpt} placeholder="请输入添加值" onChange={this.inputChange} />
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