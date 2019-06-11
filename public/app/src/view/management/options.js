import React, { Component } from 'react';
import Left from '../../component/options/left'
import Types from '../../component/options/type'
import Scroll from '../../component/scroll'
class options extends Component {
    constructor() {
        super()
        this.state = {
            component: <Types></Types>
        }
    }
    cutover() {

    }
    render() {
        return (
            <div className="c-box m-options">
                <div className="m-options-left">
                    <Scroll>
                        <Left></Left>
                    </Scroll>
                </div>
                <div className="m-options-right">
                    <Scroll>
                        {
                            this.state.component
                        }
                    </Scroll>  
                </div>
            </div>
        );
    }
}

export default options;