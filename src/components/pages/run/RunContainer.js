import React, { Component } from 'react';
import { connect } from 'react-redux';
import RunLineItem from './RunLineItem';
import AddRun from './AddRun';

class RunContainer extends Component {
    render() {
        const runs = this.props.runs.map(function(run){
            return <RunLineItem run={run}/>
          });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-6 ">
                        {runs}
                        <AddRun/>
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
    runs: state.runs
});

export default connect(mapStateToProps)(RunContainer);
