import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal } from 'antd';
import axios from '../../utils/axios';

const confirm = Modal.confirm;
/* let $ = (name) => {
    return document.querySelector(name);
} */
class duties extends Component {
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
            search: "",
            tableSelect: [],
            data: [],
            row: null
        }
        this.getList()
    }
    columns = [
        {
            title: '角色',
            dataIndex: 'title'
        },
        {
            title: '时间',
            dataIndex: 'date',
            width: 200,
        },
        {
            title: '操作',
            dataIndex: 'set',
            render: (text, record) => (
                <Button shape="circle" icon="delete" onClick={(e, r) => { this.showDeleteConfirm(text, record) }} />
            ),
            width: 100,
        },
    ];
    showDeleteConfirm = (text, record) => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                console.log(record)
                this.delete(record.Id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    componentDidUpdate() {

    }
    delete = (e) => {
        axios.post("/api/management/delete", {
            id: e
        }).then(res => {
            if (res.code === 200) {
                this.getList()
            }
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
    getList = () => {
        // 查询
        axios("/api/management/getList", {
            params: {
                current: this.state.pagination.current,
                size: this.state.pagination.pageSize,
                search: this.state.search
            }
        }).then(res => {
            if (res.code === 200) {
                const { count, list } = res;
                let pagination = {
                    ...this.state.pagination,
                    total: count
                }
                let data = list.map((elem, index) => ({
                    ...elem,
                    key: index
                }))
                this.setState({
                    pagination: pagination,
                    data: data
                })
            }
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
        this.getList()
    }
    searchInpt = (event) => {
        this.setState({
            search: event.target.value
        })
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
                        <span>文章名：</span>
                        <Input id="search-user" onChange={this.searchInpt} />
                    </div>

                    <div>
                        <Icon onClick={this.search} type="search" className="cur" style={{ fontSize: "18px", lineHeight: "36px" }} />
                    </div>

                </div>
                {/* 列表 */}
                <div className="m-people-tale">
                    <div className="m-people--add">
                        <Button className="m-l" onClick={this.deleteBtn}>删除</Button>
                    </div>
                    <Table onChange={this.pageChange}
                        pagination={this.state.pagination}
                        rowSelection={this.rowSelection}
                        columns={this.columns}
                        dataSource={this.state.data}
                    />
                </div>
            </div>
        );
    }
}
export default duties;