import React, { Component } from 'react';
import Left from '../../component/options/left'
import Scroll from '../../component/scroll'
// components
import Types from '../../component/options/type'
import Size from '../../component/options/size'
import Material from '../../component/options/material'
import Brand from '../../component/options/brand'
import Kind from '../../component/options/kind'

class options extends Component {
    constructor() {
        super()
        this.state = {
            component: null,
            status: 1
        }
    }
    componentDidMount() {
        this.cutover({ id: 1 })
    }
    cutover = (elem) => {
        let component = null;
        switch (elem.id) {
            case 1:
                component = <Types></Types>
                break;
            case 2:
                component = <Size></Size>
                break;
            case 3:
                component = <Material></Material>
                break;
            case 4:
                component = <Brand></Brand>
                break;
            case 5:
                component = <Kind></Kind>
                break;
        }
        if (component) {
            this.setState({
                component: component,
                status: elem.id
            })
            this.clickSwitch(elem.id)

        }
    }
    onRef = (ref) => {
        this.child = ref
    }
    clickSwitch = (id) => {
        if (this.child) {
            this.child.setState({
                status: id
            })
            setTimeout(() => {
                this.child.getList()
            })
        }
    }
    render() {
        return (
            <div className="c-box m-options">
                <div className="m-options-left">
                    <Scroll>
                        <Left cutover={this.cutover}></Left>
                    </Scroll>
                </div>
                <div className="m-options-right">
                    <Scroll>
                        <Types ref="child" onRef={this.onRef} state={this.state.status}></Types>
                    </Scroll>
                </div>
            </div>
        );
    }
}

export default options;