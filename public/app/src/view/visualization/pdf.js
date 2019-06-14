import React, { Component } from 'react';
import axios from '../../utils/axios';

class pdf extends Component {
    path = ""
    componentDidMount=()=> {
        axios.post("/api/visualization/pdf").then(res => {
            console.log(res.path)
            this.path = res.path
        })

    }
    down=()=>{ 
        if(this.path){

            window.open("http://localhost:3000"+this.path)
        }
    }
    render() {
        return (
            <div className="full ov">
                <button className="fill-down" onClick={this.down}>下载</button>
                <iframe className="pdfiframe" src="http://localhost:3000/api/visualization/index" ></iframe>
            </div>
        );
    }
}

export default pdf;