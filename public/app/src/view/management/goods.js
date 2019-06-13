import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal, Select, message } from 'antd';
import axios from '../../utils/axios';
const { Option } = Select;
const confirm = Modal.confirm;
let $ = (name) => {
    return document.querySelector(name);
}
class goods extends Component {
    constructor() {
        super()
        this.state = {
            typeVisible: false,
            typeInptAdd: "",
            pagination: {
                current: 1,
                pageSize: 10,
                total: 10,
                size: "small"
            },
            data: [],
            addOptions: {
                name: "",
                number: "",
                type: "",
                size: undefined,
                material: "",
                brand: "",
                kind: ""
            },
            searchOptions: {
                name: "",
                number: "",
                type: "",
                size: undefined,
                material: "",
                brand: "",
                kind: ""
            },
            type: [],
            size: [],
            marterilal: [],
            brand: [],
            kind: [],
            isEdit: false,
            editId: null
        }
        this.getTypeList()
        this.getOptionsAll()
    }
    async axiosOptions(type) {
        return await axios("/api/goods/optionsTypeGet", {
            params: {
                type: type
            }
        }).then(res => {
            const codeError = { code: 400 }
            if (res) {
                if (res.code === 200) {
                    return res.list;
                } else {
                    return codeError
                }
            } else {
                return codeError
            }
        })
    }

    getOptionsAll() {
        // get all options
        // type
        this.axiosOptions(1).then(res => {
            if (res.code !== 400) {
                this.setState({
                    type: res.map(elem => {
                        return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                    })
                })
            }
        })
        // size
        this.axiosOptions(2).then(res => {
            if (res.code !== 400) {
                this.setState({
                    size: res.map(elem => {
                        return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                    })
                })
            }
        })
        // marterilal
        this.axiosOptions(3).then(res => {
            if (res.code !== 400) {
                this.setState({
                    marterilal: res.map(elem => {
                        return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                    })
                })
            }
        })
        // barnd
        this.axiosOptions(4).then(res => {
            if (res.code !== 400) {
                this.setState({
                    brand: res.map(elem => {
                        return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                    })
                })
            }
        })
        // kind
        this.axiosOptions(5).then(res => {
            if (res.code !== 400) {
                let data = res.map(elem => {
                    return <Option key={elem.Id} value={elem.Id}>{elem.name}</Option>
                })
                this.setState({
                    kind: data
                })
            }
        })
    }
    getTypeList = (options) => {
        let params = {
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize
        }
        if (typeof options === 'object') {
            params = {
                ...params,
                ...options
            }
        }
        axios("/api/goods/goodsGet", {
            params: params
        }).then(res => {
            if (res.code === 200) {
                this.state.pagination.total = res.total;
                let data = res.list.map(elem => ({
                    ...elem,
                    key: elem.Id
                }))
                this.setState({
                    data: data,
                    pagination: this.state.pagination
                })
            }
        })
    }
    getAllType() {

    }
    addTypeCancel = () => {
        this.setState({
            typeVisible: false,
            typeInptAdd: "",
        })
    }
    optionTypeChange = (value) => {
        this.state.addOptions.type = value;
        this.setState({
            addOptions: this.state.addOptions
        })
    }
    optionSizeChange = (value) => {
        this.state.addOptions.size = value;
        this.setState({
            addOptions: this.state.addOptions
        })
    }
    optionMeChange = (value) => {
        this.state.addOptions.material = value;
        this.setState({
            addOptions: this.state.addOptions
        })
    }
    optionBrandChange = (value) => {
        this.state.addOptions.brand = value;
        this.setState({
            addOptions: this.state.addOptions
        })
    }
    optionKindChange = (value) => {
        this.state.addOptions.kind = value;
        this.setState({
            addOptions: this.state.addOptions
        })
    }


    searchTypeChange = (value) => {
        this.state.searchOptions.type = value;
        this.setState({
            searchOptions: this.state.searchOptions
        })
    }
    searchSizeChange = (value) => {
        this.state.searchOptions.size = value;
        this.setState({
            searchOptions: this.state.searchOptions
        })
    }
    searchMeChange = (value) => {
        this.state.searchOptions.material = value;
        this.setState({
            searchOptions: this.state.searchOptions
        })
    }
    searchBrandChange = (value) => {
        this.state.searchOptions.brand = value;
        this.setState({
            searchOptions: this.state.searchOptions
        })
    }
    searchKindChange = (value) => {
        this.state.searchOptions.kind = value;
        this.setState({
            searchOptions: this.state.searchOptions
        })
    }
    addTypeOk = () => {

        let name = $("#add-name")
        let number = $("#add-number")
        this.state.addOptions.name = name.value
        this.state.addOptions.number = number.value
        if (this.state.isEdit) {
            axios.post("/api/goods/goodsEdit", {
                ...this.state.addOptions,
                id: this.state.editId
            }).then(res => {
                if (res.code === 200) {
                    message.success("修改成功！");
                    this.state.addOptions = {
                        name: "",
                        number: "",
                        type: "",
                        size: undefined,
                        material: "",
                        brand: "",
                        kind: ""
                    }
                    this.setState({
                        addOptions: this.state.addOptions,
                        isEdit: false,
                        typeVisible: false,
                        editId: null
                    })
                    this.search()

                } else {
                    message.success("修改失败！")
                }
            })
        } else {
            axios.post("/api/goods/goodsAdd", this.state.addOptions).then(res => {
                if (res.code === 200) {
                    message.success("添加成功！");
                    this.state.addOptions = {
                        name: "",
                        number: "",
                        type: "",
                        size: undefined,
                        material: "",
                        brand: "",
                        kind: ""
                    }
                    this.setState({
                        addOptions: this.state.addOptions,
                        isEdit: false,
                        typeVisible: false,
                        editId: null
                    })
                    this.search()

                } else {
                    message.success("添加失败！")
                }
            })
        }
        /* this.setState({
        typeVisible: false
    }) */
    }
    addType = () => {
        this.setState({
            typeVisible: true
        })
    }
    typeInpChange = (event) => {
        this.setState({
            typeInptAdd: event.target.value,
        })
    }
    search = () => {
        let o = this.state.searchOptions
        const options = {
            type: o.type,
            brand: o.brand,
            material: o.material,
            kind: o.kind,
            size: o.size,
            name: $("#search-name").value
        }
        let _options = {};
        for (let key in options) {
            if (options[key]) {
                _options[key] = options[key];
            }
        }
        this.getTypeList(_options)

    }
    typeChange = (data) => {

    }
    pageChange = (e) => {
        this.setState({
            pagination: e
        })
        setTimeout(() => {
            this.search()
        })
    }
    getGoods() {

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
    }
    columns = [
        {
            title: '物品名',
            dataIndex: 'name',

        },
        {
            title: '数量',
            dataIndex: 'number',

        },
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '尺码',
            dataIndex: 'size',
        },
        {
            title: '材质',
            dataIndex: 'material',
        },
        {
            title: '品牌',
            dataIndex: 'brand',
        },
        {
            title: '种类',
            dataIndex: 'kind',
        },
        {
            title: '添加时间',
            dataIndex: 'date',
            width: 230,
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
    delete = (id) => {
        axios.post("/api/goods/goodsDelete", {
            id: id
        }).then(res => {
            if (res.code === 200) {
                message.success("删除成功！")
                this.search()

            } else {
                message.success("删除失败!")
            }
        })
    }
    deleteall = (id) => {
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
    showDeleteConfirm = (text, row) => {
        confirm({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.delete(row.Id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    showEditConfirm = (text, row) => {
        
        
        this.setState({
            addOptions: row
        })
        this.setState({
            isEdit: true,
            typeVisible: true,
            editId: row.Id
        })
        setTimeout(()=>{
            $("#add-name").value = row.name
            $("#add-number").value = row.number
        })
    }

    render() {
        return (
            <div className="c-box">
                <div className="m-goods">
                    <div>
                        <span >商品名：</span>
                        <Input id="search-name" className="flex-1" />
                    </div>
                    <div>
                        <span >类型：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.searchOptions.type}
                            onChange={this.searchTypeChange}
                        >
                            {this.state.type}
                        </Select>
                    </div>
                    <div>
                        <span >尺码：</span>
                        <Select
                            className="flex-1"
                            placeholder="Please select"
                            id="add-size"
                            value={this.state.searchOptions.size}
                            onChange={this.searchSizeChange} >
                            {this.state.size}
                        </Select>
                    </div>
                    <div>
                        <span>材质：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.searchOptions.material}
                            onChange={this.searchMeChange}
                        >
                            {this.state.marterilal}
                        </Select>
                    </div>
                    <div>
                        <span >品牌：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.searchOptions.brand}
                            onChange={this.searchBrandChange}
                        >
                            {this.state.brand}
                        </Select>
                    </div>
                    <div>
                        <span >种类：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.searchOptions.kind}
                            onChange={this.searchKindChange}
                        >
                            {this.state.kind}
                        </Select>
                    </div>

                    <div>
                        <Icon type="plus-circle" onClick={this.addType} className="cur" style={{ fontSize: "18px", lineHeight: "36px", marginRight: "30px" }} />
                        <Icon onClick={this.search} type="search" className="cur" style={{ fontSize: "18px", lineHeight: "36px", marginRight: "30px" }} />
                        <Icon onClick={this.deleteall} type="delete" className="cur" style={{ fontSize: "18px", lineHeight: "36px" }} />
                    </div>
                </div>
                <Table onChange={this.pageChange} pagination={this.state.pagination} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} />
                <Modal
                    title={this.state.isEdit ? '修改' : '添加'}
                    visible={this.state.typeVisible}
                    onOk={this.addTypeOk}
                    onCancel={this.addTypeCancel}
                >
                    <div className="modal-table-flex ">
                        <span className="inp-line">商品名：</span>
                        <Input id="add-name" className="flex-1" />
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">数量：</span>
                        <Input id="add-number" className="flex-1" />
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line ">类型：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            id="add-type"
                            value={this.state.addOptions.type}
                            onChange={this.optionTypeChange}
                        >
                            {this.state.type}
                        </Select>
                    </div>

                    <div className="modal-table-flex m-t">
                        <span className="inp-line">尺码：</span>
                        <Select
                            mode="multiple"
                            className="flex-1"
                            placeholder="Please select"
                            id="add-size"
                            value={this.state.addOptions.size}
                            onChange={this.optionSizeChange} >

                            {this.state.size}
                        </Select>
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">材质：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.addOptions.material}
                            onChange={this.optionMeChange}
                        >
                            {this.state.marterilal}
                        </Select>
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">品牌：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.addOptions.brand}
                            onChange={this.optionBrandChange}
                        >
                            {this.state.brand}
                        </Select>
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">种类：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={this.state.addOptions.kind}
                            onChange={this.optionKindChange}
                        >
                            {this.state.kind}
                        </Select>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default goods;