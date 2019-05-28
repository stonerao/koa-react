import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: [
                {
                    name: "Map",
                    url: "/home/map"
                },
                {
                    name: "Topo",
                    url: "/home/topo"
                },
                {
                    name: "Topo Edit",
                    url: "/home/topoEdit"
                },
                {
                    name: "Graph",
                    url: "/home/graph_two"
                },
                 
            ]
        }
    }
    render() {
        return (
            <div className="menu">
                {
                    this.state.menu.map(node => {
                        return (
                            <div key={node.url} className="menu-item">
                                <Link to={node.url}>{node.name}</Link>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
