import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal, message } from 'antd';
import axios from '../../utils/axios';
const confirm = Modal.confirm;

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
                pageSize: 10,
                total: 20,
                size: "small"
            },
            visible: false,
            depName: "",
            tableSelect: [],
            data: [],
            searchValue: "",
            isEdit: false,
            editId: null
        }
        this.getList()
    }
    columns = [
        {
            title: '部门名',
            dataIndex: 'name'
        },
        {
            title: '操作',
            dataIndex: 'set',
            render: (text, record) => (
                <div>
                    <Button shape="circle" icon="delete" onClick={(e, r) => { this.showDeleteConfirm(text, record) }} />
                    <Button shape="circle" className="m-l" icon="edit" onClick={(e, r) => { this.showEditConfirm(text, record) }} />
                </div>
            ),
            width: 130,
        },
    ]
    async getList() {
        await axios.get("/api/member/getDep", {
            params: {
                current: this.state.pagination.current,
                size: this.state.pagination.pageSize,
                search: this.state.searchValue
            }
        }).then(res => {
            if (res.code === 200) {
                this.state.pagination.total = res.total;
                let data = res.list.map(node => ({
                    ...node,
                    key: node.Id
                }))
                this.setState({
                    pagination: this.state.pagination,
                    data: data
                })
            } else {

            }
        })
    }
    deleteDep() {

    }
    componentDidUpdate() {

    }
    handleOk = e => {
        const { isEdit } = this.state;
        if (!isEdit) {
            //添加部门
            axios.post("/api/member/addDep", {
                name: this.state.depName
            }).then(res => {
                if (res.code === 200) {
                    message.success("添加成功")
                    this.getList().then(() => {
                        this.setState({
                            visible: false,
                            depName: ""
                        })
                    })

                } else {
                    message.error(res.msg)
                }
            })
        } else {
            //修改部门
            const { editId } = this.state;
            axios.post("/api/member/editDep", {
                name: this.state.depName,
                id: editId
            }).then(res => {
                if (res.code === 200) {
                    message.success("修改成功")
                    this.getList().then(() => {
                        this.setState({
                            visible: false,
                            editId: null,
                            depName: ""
                        })
                    })

                } else {
                    message.error(res.msg)
                }
            })
        }


    }
    handleCancel = e => {
        // 关闭 
        this.setState({
            visible: false,
            depName:""
        })
    }
    pageChange = e => {
        this.setState({
            pagination: e
        })
        setTimeout(() => {
            this.getList()
        })
    }
    componentWillMount() {
        // _this = null;
    }
    addUserBtn() {
        this.setState({
            visible: true,
            isEdit: false
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
    searchChange = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }
    search = (event) => {
        this.getList()
    }
    addUser = event => {
        this.setState({
            depName: event.target.value
        })
    }
    delete = (e) => {
        axios.post("/api/member/deleteDep", {
            id: e
        }).then(res => {
            if (res.code === 200) {
                this.getList()
            }
        })
    }
    showDeleteConfirm = (text, record) => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.delete(record.Id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    showEditConfirm = (text, record) => {
        this.setState({
            isEdit: true,
            visible: true,
            editId: record.Id,
            depName:record.name
        })
    }
    deleteBtn = () => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.delete(this.state.tableSelect.map(n => n.Id).join())
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    render() {
        return (
            <div className="c-box">
                {/* 搜索 */}
                <div className="m-people">
                    <div>
                        <span>部门名：</span>
                        <Input id="search-user" onChange={this.searchChange} />
                    </div>

                    <div>
                        <Icon onClick={this.search} value={this.state.searchValue} type="search" className="cur" style={{ fontSize: "18px", lineHeight: "36px" }} />
                    </div>
                </div>
                {/* 列表 */}
                <div className="m-people-tale">
                    <div className="m-people--add">
                        <Button type="primary" className="m-r m-l" onClick={() => { this.addUserBtn() }}>添加</Button>
                        <Button onClick={this.deleteBtn}>删除</Button>
                    </div>
                    <Table onChange={this.pageChange} pagination={this.state.pagination} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} />
                </div>
                <Modal
                    title={this.state.isEdit ? '修改部门' : '添加部门'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="m-people-inp">
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            value={this.state.depName} onChange={this.addUser}
                        />
                    </div>

                </Modal>
            </div>
        );
    }
}
export default duties;