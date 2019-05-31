import React, { Component } from 'react';
import API from '../../utils/API';
import './Data.css';
import ListItem from '../ListItem/ListItem';

class Data extends Component {

    state = {
        temp: "",
        door: "",
        switchArr: []
    }

    getSwitches(){
        API.getData().then((result) => {

            let switchArr = result.data;

            this.setState({
                switchArr
            })
        })
    }

    getData(){
        API.getData().then((result) => {

            let temp = result.data[0].temp;
            let door = result.data[0].door;

            this.setState({
                temp,
                door,
            })
        })
    }

    componentDidMount(){
        this.getSwitches();
        this.getData();
        
        setInterval(() => {
            this.getData();
        },1000)
    }

    render() {
        return (
            <div className="data-container">
                <h1>My House</h1>
                <div className="data-wrapper">
                        <ListItem title="Temperature:" idName={parseInt(this.state.temp) > 85 ? "red" : "green"} temp={this.state.temp}/>

                        <ListItem title="Door Status:" idName={this.state.door === "Closed" ? "green" : "red"} door={this.state.door}/>

                        {this.state.switchArr.map((switches,index)=> (
                            <ListItem key={index} id={switches.id} title={"Switch " + switches.id +  ":"} position={switches.position === 1 ? "On" : "Off"} type="Button"/>
                        ))
                        }
                </div>
            </div>
        );
    }
}

export default Data;