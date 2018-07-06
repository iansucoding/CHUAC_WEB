import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_URL, col } from '../constants/global-variables';
import { setLoadingStart, setLoadingEnd } from '../actions';

import '../../scss/ian-style.scss';

const mapDispatchToProps = dispatch =>({
    startLoading: ()=>dispatch(setLoadingStart),
    stopLoading:  ()=>dispatch(setLoadingEnd)
});

class SystemOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {flowStatuses: []};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/flow-status`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({flowStatuses: response.data});
        });
    }
    
    handleChange(flowStatusId, event) {
        const target = event.target;
        const value = target.checked;
        const newFlowStatusesState = this.state.flowStatuses.map(flowStatus=>{
            if (flowStatus.id === flowStatusId) {
                return {...flowStatus, enable: value};
            }
            return {...flowStatus};
        });
    
        this.setState({flowStatuses: newFlowStatusesState});
    }

    
    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/flow-status`, this.state.flowStatuses).then(response=>{
            console.log('put response', response);
            if(response.data.isSuccess===true) {
                this.props.stopLoading();
                alert('更新成功');
            }else {
                alert('更新失敗');
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">水流開關強制導通</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>編號</th>
                                    <th>設備名稱</th>
                                    <th>強制導通狀態</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.flowStatuses.map(flowStatus => (
                                    <tr key={flowStatus.id}>
                                        <td>{flowStatus.seqNo}</td>
                                        <td>{flowStatus.name}</td>
                                        <td>
                                            <input 
                                                type="checkbox"
                                                checked={flowStatus.enable}
                                                onChange={this.handleChange.bind(this, flowStatus.id)}
                                                />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3">
                                        <button className="btn btn-default btn-sm" onClick={this.handleUpdate}>Save</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(SystemOne);