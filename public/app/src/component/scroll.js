import React, { Component } from 'react';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
let scroll = null;
class App extends Component {
    constructor() {
        super()
        this.my_ref = React.createRef()
    }
    componentDidMount() {
        let current = this.my_ref.current;
        scroll = new PerfectScrollbar(current, {
            wheelSpeed: 0.4,
            wheelPropagation: true,
            minScrollbarLength: 1
        });
        window.addEventListener("resize", this.update);
    }
    update() {
        scroll.update()
    }
    top() {
        let current = this.my_ref.current;
        current.scrollTop = 0;
    }
    componentWillMount() {
        window.removeEventListener("resize", this.update)
    }
    render() {
        return (
            <div className={`${this.props.setClass || ""} full scroll`} ref={this.my_ref}>
                {this.props.children}
            </div>
        );
    }
}

export default App;
