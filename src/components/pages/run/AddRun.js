import React, { Component } from "react";
import { connect } from "react-redux";
import {addRun} from '../../../redux/action'; 

class AddRun extends Component {
    constructor(props){
        super(props);
        this.state = {currDist: '',currTime: ''};
        this.handleDistChange = this.handleDistChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleDistChange(event) {
        this.setState({currDist: event.target.value});
        console.log('Dist:');
        console.log(this.state.currDist);

    }
    handleTimeChange(event) {
        this.setState({currTime: event.target.value});
        console.log('Time:');
        console.log(this.state.currTime);

    }
    handleSubmit = (event) =>{
        event.preventDefault();
        console.log("handle submit test");
        this.props.addRun(this.state.currDist,this.state.currTime);
        
    }
    render() {
    return (
      <form>
        <div className="form-group">
          <input onChange={this.handleDistChange}
          type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Run Distance" 
            value={this.state.currDist}
          />
        </div>
        <div className="form-group">
          <input
            onChange={this.handleTimeChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Run Time"
            value={this.state.currTime}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

const mapActionsToProps = (dispatch) =>{
    return {
        addRun: (currDist, currTime) => {
            console.log("Arone");
            dispatch(addRun({runid: '99', distance: currDist, time: currTime, userid: 991}));
    }
}
}

export default connect(null,mapActionsToProps)(AddRun);
