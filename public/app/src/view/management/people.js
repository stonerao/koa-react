import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection

let $ = (name) => {
    return document.querySelector(name);
}
class people extends Component {
    constructor() {
        super()
        this.state = {
            pagination: {
                current: 1,
                pageSize: 20,
                size: "small"
            },
            visible: false,
            search: {
                user: "",
                phone: "",
                age: "",
                duties: ""
            },
            tableSelect: []
        }
    }
    componentDidUpdate() {

    }
    handleOk = e => {
        console.log(this.state.search)
        this.setState({
            visible: false
        })
    }
    handleCancel = e => {
        // 关闭 
        this.setState({
            visible: false
        })
    }
    pageChange = e => {
        this.setState({
            pagination: e
        })
    }
    componentWillMount() {
        // _this = null;
    }
    addUserBtn() {
        this.setState({
            visible: true
        })
    }
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                tableSelect: selectedRows
            })
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: false, // Column configuration not to be checked
            name: record.name,
        }),
    };
    search = () => {
        let user = $("#search-user").value;
        let phone = $("#search-phone").value;
        let duties = $("#search-duties").value;
        let age = $("#search-age").value;
        let search = {
            user: user,
            phone: phone,
            age: duties,
            duties: age
        }
        console.log(search)
    }
    addUser = event => {
        let search = {
            ...this.state.search,
            user: event.target.value
        }
        this.setState({
            search: search
        })
    }
    addAge = event => {
        let search = {
            ...this.state.search,
            age: event.target.value
        }
        this.setState({
            search: search
        })
    }
    addPhone = event => {
        let search = {
            ...this.state.search,
            phone: event.target.value
        }
        this.setState({
            search: search
        })
    }
    addDuties = event => {
        let search = {
            ...this.state.search,
            duties: event.target.value
        }
        this.setState({
            search: search
        })
    }
    render() {
        return (
            <div className="c-box">
                {/* 搜索 */}
                <div className="m-people">
                    <div>
                        <span >用户名：</span>
                        <Input id="search-user" />
                    </div>
                    <div>
                        <span >手机：</span>
                        <Input id="search-phone" />
                    </div>
                    <div>
                        <span >职位：</span>
                        <Input id="search-duties" />
                    </div>
                    <div>
                        <span>年龄：</span>
                        <Input id="search-age" />
                    </div>
                    <div>
                        <Icon onClick={this.search} type="search" className="cur" style={{ fontSize: "18px", lineHeight: "36px" }} />
                    </div>

                </div>
                {/* 列表 */}
                <div className="m-people-tale">
                    <div className="m-people--add">
                        <Button type="primary" className="m-r m-l" onClick={() => { this.addUserBtn() }}>添加</Button>
                        <Button>删除</Button>
                    </div>
                    <Table onChange={this.pageChange} pagination={this.state.pagination} rowSelection={this.rowSelection} columns={columns} dataSource={data} />
                </div>
                <Modal
                    title="新增人员"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="m-people-inp">
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            value={this.state.search.user} onChange={this.addUser}
                        />
                    </div>
                    <div className="m-people-inp">
                        <Input
                            prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="age"
                            value={this.state.search.age} onChange={this.addAge}
                        />
                    </div>
                    <div className="m-people-inp">
                        <Input
                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="phone"
                            value={this.state.search.phone} onChange={this.addPhone}
                        />
                    </div>
                    <div>
                        <Input
                            prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="duties"
                            value={this.state.search.duties} onChange={this.addDuties}
                        /></div>
                </Modal>
            </div>
        );
    }
}
export default people;