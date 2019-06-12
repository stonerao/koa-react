import React, { Component } from 'react';
import { Input, Icon, Table, Button, Modal, Select, message } from 'antd';
import axios from '../../utils/axios';
const { Option } = Select;
let $ = (name) => {
    return document.querySelector(name);
}
class goods extends Component {
    constructor() {
        super()
        this.state = {
            typeVisible: false,
            typeInptAdd: "",
            types: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 10,
                size: "small"
            },
            data: [
                {
                    name: "2019爆款T恤",
                    date: "2019-6-10 17:23:27",
                    number: 13,
                    type: "上衣",
                    size: "S,L,XL",
                    material: "棉布",
                    kind: "男装",
                    brand: "山寨",
                    key: "12"
                }
            ],
            addOptions: {
                name: "",
                number: "",
                type: "",
                size: "",
                material: "",
                brand: "",
                kind: ""
            }
        }
        this.getTypeList()
    }
    getOptionsAll(){
        // get all options
        
    }
    getTypeList() {
        axios("/api/goods/typeGet").then(res => {
            if (!res) {
                return
            }
            let arr = res.list.map(elem => {
                return <Option key={elem.Id}>{elem.type}</Option>
            })
            this.setState({
                types: arr
            })
        })
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
    addTypeOk = () => {
        let name = $("#add-name")
        let number = $("#add-number")  
         
        this.state.addOptions.name = name.value
        this.state.addOptions.number = number.value
        
        
        
        /*  axios.post("/api/goods/typeAdd", {
             name: this.state.typeInptAdd
         }).then(res => {
             if (res.code == 200) {
 
             }
         }) */
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
    search() {

    }
    typeChange = (data) => {

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
    showDeleteConfirm = (text, row) => {

    }
    showEditConfirm = (text, row) => {

    }

    render() {
        return (
            <div className="c-box">
                <div className="m-people">
                    <div>
                        <span >类型：</span>
                        <Select mode="tags" style={{ width: '100%' }} onChange={this.typeChange} tokenSeparators={[',']}>
                            {this.state.types}
                        </Select>
                    </div>
                    <div>
                        <Icon type="plus-circle" onClick={this.addType} className="cur" style={{ fontSize: "18px", lineHeight: "36px", marginRight: "30px" }} />
                        <Icon onClick={this.search} type="search" className="cur" style={{ fontSize: "18px", lineHeight: "36px" }} />
                    </div>
                </div>
                <Table onChange={this.pageChange} pagination={this.state.pagination} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} />
                <Modal
                    title="添加类型"
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
                        <Input id="add-number"  className="flex-1"  />
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line ">类型：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            id="add-type"
                            // value={this.state.addOptions.type}
                            onChange={this.optionTypeChange}
                        >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>

                    <div className="modal-table-flex m-t">
                        <span className="inp-line">尺码：</span>
                        <Select
                            mode="multiple"
                            className="flex-1"
                            placeholder="Please select"
                            id="add-size"
                            onChange={this.optionSizeChange} >
                            <Option value="jack">Jack</Option>
                        </Select>,
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">材质：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.optionMeChange}
                        >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">品牌：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.optionBrandChange}
                        >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>
                    <div className="modal-table-flex m-t">
                        <span className="inp-line">种类：</span>
                        <Select
                            className="flex-1"
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.optionKindChange}
                        >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default goods;