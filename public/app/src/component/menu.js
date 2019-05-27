import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            menu: [
                {
                    name: "3D Topo",
                    url: "/home/topo"
                },
                {
                    name: "3D Topo Edit",
                    url: "/home/topoEdit"
                },
                {
                    name: "2D Topo",
                    url: "/home/topo_two"
                }, {
                    name: "3D Graph",
                    url: "/home/graph"
                },
                {
                    name: "3D Graph Edit",
                    url: "/home/graph_edit"
                },
                {
                    name: "2D Graph",
                    url: "/home/graph_two"
                }
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
