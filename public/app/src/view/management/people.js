import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal, Select, message } from 'antd';
import axios from '../../utils/axios';
const { Option } = Select;
const confirm = Modal.confirm;
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
                pageSize: 10,
                total: 10,
                size: "small"
            },
            visible: false,
            search: {
                user: "",
                phone: "",
                age: "",
                duties: ""
            },
            tableSelect: [],
            data: [],
            deps: [],
            selectDuites: "",
            s_duites: "",
            isEdit: false,
            selectId: null
        }

        this.getDeps().then(res => {
            this.getList(this.state.search)
        })
    }
    columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            width: 500
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '手机',
            dataIndex: 'phone'
        },
        {
            title: '职位',
            dataIndex: 'dutiesName'
        },
        {
            title: '添加时间',
            dataIndex: 'date'
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
    messages(msg, state) {
        if (state === 2) {
            message.success(msg);
        } else {
            message.success(msg);
        }
    }
    showEditConfirm = (text, row) => {
        this.state.search.user = row.username
        this.state.search.age = row.age
        this.state.search.phone = row.phone
        this.setState({
            visible: true,
            isEdit: true,
            selectDuites: +row.duties,
            search: this.state.search,
            selectId: row.Id
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
    componentDidUpdate() {

    }
    async getDeps() {
        await axios("/api/member/getDeps").then(async (res) => {
            if (res.code === 200) {
                await this.setState({
                    deps: res.data
                })
            }
        })
    }
    getList(search) {
        const { current, pageSize } = this.state.pagination;
        const { user, age, phone, duties } = search;
        axios("/api/personnel/getList", {
            params: {
                current: current,
                size: pageSize,
                username: user,
                age, phone,
                duties
            }
        }).then(res => {
            if (res.code === 200) {
                let data = res.list.map((elem) => {
                    const duites = this.state.deps.filter(d => elem.duties === d.Id)[0]

                    const duitesName = duites ? duites.name : ""
                    return {
                        ...elem,
                        key: elem.Id,
                        dutiesName: duitesName
                    }
                })
                this.state.pagination.total = res.total;
                this.setState({
                    data: data,
                    pagination: this.state.pagination
                })
            }
        })
    }
    clearAddedContent = () => {
        /* clear added mode content value */
        for (let key in this.state.search) {
            this.state.search[key] = ""
        }
        this.setState({
            visible: false,
            search: this.state.search,
            selectDuites: "",
            isEdit: false
        })
    }
    handleOk = e => {
        const { isEdit } = this.state;
        const { user, age, phone } = this.state.search;
        if (!isEdit) {
            //added
            axios.post("/api/personnel/add", {
                username: user,
                age: age,
                phone: phone,
                duties: this.state.selectDuites
            }).then(res => {
                if (res.code === 200) {
                    this.clearAddedContent();
                    this.getList(this.state.search)
                    this.messages("添加成功")
                } else {
                    this.messages("添加失败", 2)
                }
            })
        } else {
            // edit 
            axios.post("/api/personnel/edit", {
                username: user,
                age: age,
                phone: phone,
                duties: this.state.selectDuites,
                id: this.state.selectId
            }).then(res => {
                if (res.code === 200) {
                    this.clearAddedContent();
                    this.getList(this.state.search)
                    this.messages("修改成功")
                } else {
                    this.messages(res.msg, 2)
                }
            })
        }


    }
    handleCancel = e => {
        // 关闭 
        this.clearAddedContent()

    }
    pageChange = e => {
        this.setState({
            pagination: e
        })
        setTimeout(() => {
            this.getList(this.state.search)
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
                tableSelect: selectedRows.map(elem => elem.Id).join()
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
        let duties = this.state.s_duites;
        let age = $("#search-age").value;
        let search = {
            user: user,
            phone: phone,
            age: age,
            duties: duties
        }
        this.getList(search)

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
    dutiesChange = (e) => {
        this.setState({
            selectDuites: e
        })
    }
    delete = (e) => {
        axios.post("/api/personnel/delete", {
            id: e
        }).then(res => {
            if (res.code === 200) {
                this.clearAddedContent();
                this.getList(this.state.search)
                this.messages(res.msg)
            } else {
                this.messages(res.msg, 2)
            }
        })
    }
    deleteUserBtn = () => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.delete(this.state.tableSelect)
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
                        <span >用户名：</span>
                        <Input id="search-user" />
                    </div>
                    <div>
                        <span >手机：</span>
                        <Input id="search-phone" />
                    </div>
                    <div>
                        <span >职位：</span>
                        <Select placeholder="duites" style={{ width: '100%' }} onChange={(e) => { this.state.s_duites = e }}>
                            {
                                this.state.deps.map(elem => {
                                    return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                                })
                            }
                        </Select>
                        {/* <Input id="search-duties" /> */}
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
                        <Button onClick={() => { this.deleteUserBtn() }}>删除</Button>
                    </div>
                    <Table onChange={this.pageChange} pagination={this.state.pagination} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} />
                </div>
                <Modal
                    title={this.state.isEdit ? '修改' : '新增'}
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
                    {/* <div>
                        <Input
                            prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="duties"
                            value={this.state.search.duties} onChange={this.addDuties}
                        /></div> */}
                    <div>
                        <Select allowClear={true} value={this.state.selectDuites} placeholder="duites" style={{ width: '100%' }} onChange={this.dutiesChange}>
                            {
                                this.state.deps.map(elem => {
                                    return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default people;