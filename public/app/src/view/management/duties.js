import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal } from 'antd';
const columns = [
    {
        title: '角色',
        dataIndex: 'name'
    },
    {
        title: '操作',
        dataIndex: 'set',
        render: tags => (
            <Button shape="circle" icon="delete" />
        ),
        width: 100,
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        address: "123"
    },
    {
        key: '2',
        name: 'Jim Green',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        set: 'Sidney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection

let $ = (name) => {
    return document.querySelector(name);
}
class duties extends Component {
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
                user: ""
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
        let search = {
            user: user
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
     
    render() {
        return (
            <div className="c-box">
                {/* 搜索 */}
                <div className="m-people">
                    <div>
                        <span>权限名：</span>
                        <Input id="search-user" />
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
                     
                </Modal>
            </div>
        );
    }
}
export default duties;