import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_URL, col } from '../constants/global-variables';
import { setLoadingStart, setLoadingEnd } from '../actions';

import '../../scss/ian-style.scss';

const mapDispatchToProps = dispatch =>({
    startLoading: ()=>dispatch(setLoadingStart),
    stopLoading:  ()=>dispatch(setLoadingEnd)
})


class AirSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hostGroups:[]};
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleHostScheduleChange = this.handleHostScheduleChange.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/hostgroup`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({hostGroups: response.data});
        });
    }

    handleCheckboxChange(event) {
        const target = event.target;
        const checked =target.checked;
        const name = target.name; // property name
        const id = parseInt(target.dataset.id, 10); // host id
        const newHostGroupsState = this.state.hostGroups.map(hg=>{
            return {
                ...hg,
                hosts: hg.hosts.map(h=>{
                    const newHostState = {...h};
                    if (h.hostId === id) {
                        newHostState[name] = checked;
                    }
                    return newHostState;
                }),
                hostSchedules: [...hg.hostSchedules]
            }
        });

        this.setState({
            hostGroups: newHostGroupsState
        });
    }

    handleHostScheduleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name; // property name
        const id = parseInt(target.dataset.id, 10);
        const kind = target.dataset.kind; // start hours or end minutes
        const newHostGroupsState = this.state.hostGroups.map(hg=>{
            return {
                ...hg,
                hosts: [...hg.hosts],
                hostSchedules: hg.hostSchedules.map(hs=> {
                    const newHostScheduleState = {...hs};
                    if (hs.hostScheduleId === id) {
                        let newValue = '00000000';
                        switch (kind){
                            case 'sh': // start hour
                                newValue = value + newHostScheduleState[name].substring(2,8);
                                break;
                            case 'sm': // start mintue
                                newValue = 
                                    newHostScheduleState[name].substring(0,2) + 
                                    value + 
                                    newHostScheduleState[name].substring(4,8);
                                break;
                            case 'eh': // end hour
                                newValue = 
                                    newHostScheduleState[name].substring(0,4) + 
                                    value + 
                                    newHostScheduleState[name].substring(6,8);
                                break;  
                            case 'em': // end mintue
                                newValue = newHostScheduleState[name].substring(0,6) + value;
                                break;
                        }
                        newHostScheduleState[name] = newValue;
                    }
                    return newHostScheduleState;
                })
            }
        });
        this.setState({
            hostGroups: newHostGroupsState
        });
    }

    handleUpdate(hostGroupId) {
        this.props.startLoading();
        const putData = this.state.hostGroups.filter(hg=>hg.hostGroupId === hostGroupId)[0];
        axios.put(`${API_URL}/hostgroup/${hostGroupId}`, putData).then(response=>{
            console.log('put response', response);
            if(response.data.isSuccess===true) {
                this.props.stopLoading();
                alert('更新成功');
            }else {
                alert('更新失敗');
            }
        });
    }
    
    renderSchedules() {
        const { hostGroups } = this.state;
        return hostGroups.map(hg=> (
            <div className={col(12)} key={`hg-${hg.hostGroupId}`}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {hg.hosts.map(h=>(
                            <label className="checkbox-inline" key={`h-${h.hostId}`}>
                                <input 
                                    type="checkbox" 
                                    name="enable"
                                    data-id={h.hostId}
                                    checked={h.enable}
                                    onChange={this.handleCheckboxChange}
                                    />
                                    {h.hostName}使用
                            </label>
                        ))}
                        <button className="btn btn-default btn-sm ian-ml-2" onClick={this.handleUpdate.bind(this, hg.hostGroupId)}>更新</button>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {hg.hosts.map(h => (
                                        <th key={h.hostHeaderName || 'x'}>{h.hostHeaderName}</th>
                                    ))}
                                    {hg.hostSchedules.map(s => (
                                        <th key={s.hostScheduleName}>{s.hostScheduleName}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                [...Array(7).keys()].map(day => {
                                    return (
                                        <tr key={day}>
                                            <td>{this.props.dayTitle[day]}</td>
                                            {hg.hosts.map(h=>(
                                                <td key={`w${day}-${h.hostName}`}>
                                                    <input 
                                                        type="checkbox" 
                                                        name={`week${day}`}
                                                        data-id={h.hostId}
                                                        checked={h[`week${day}`]}
                                                        onChange={this.handleCheckboxChange}
                                                        />
                                                </td>
                                            ))}
                                            {hg.hostSchedules.map(s => this.renderTimeInputBlock(day, s))}
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ));
    }

    renderTimeInputBlock(day, hostSchedule){
        const timeRange = hostSchedule[`week${day}`];
        const sh = timeRange.substring(0,2); // start hour
        const sm = timeRange.substring(2,4); // start mintue
        const eh = timeRange.substring(4,6); // end hour
        const em = timeRange.substring(6,8); // end mintue
        return (
            <td key={`w${day}-${hostSchedule.hostScheduleName}`}>
                <div>
                    <span className="start-time">
                        <select 
                            className="ian-input ian-w40" 
                            value={sh} 
                            name={`week${day}`} 
                            data-kind="sh" 
                            data-id={hostSchedule.hostScheduleId}
                            onChange={this.handleHostScheduleChange}
                            >
                            {[...Array(24).keys()].map(h=>(<option key={h}>{(h >= 10 ? h : '0' + h)}</option>))}
                        </select>
                        <span>:</span>
                        <select 
                            className="ian-input ian-w40" 
                            value={sm} 
                            name={`week${day}`} 
                            data-kind="sm" 
                            data-id={hostSchedule.hostScheduleId}
                            onChange={this.handleHostScheduleChange}
                            >
                            {[...Array(60).keys()].map(m=>(<option key={m}>{(m >= 10 ? m : '0' + m)}</option>))}
                        </select>
                    </span>
                    <span> ~ </span>
                    <span className="end-time">
                        <select 
                            className="ian-input ian-w40" 
                            value={eh} 
                            name={`week${day}`} 
                            data-kind="eh" 
                            data-id={hostSchedule.hostScheduleId}
                            onChange={this.handleHostScheduleChange}
                            >
                            {[...Array(24).keys()].map(h=>(<option key={h}>{(h >= 10 ? h : '0' + h)}</option>))}
                        </select>
                        <span>:</span>
                        <select 
                            className="ian-input ian-w40" 
                            value={em} 
                            name={`week${day}`} 
                            data-kind="em" 
                            data-id={hostSchedule.hostScheduleId}
                            onChange={this.handleHostScheduleChange}
                            >
                            {[...Array(60).keys()].map(m=>(<option key={m}>{(m >= 10 ? m : '0' + m)}</option>))}
                        </select>
                    </span>
                </div>  
            </td>
        );
    }

    render() {
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">時序排程</h1>
                </div>
                {this.renderSchedules()}
            </div>
        );
    }
}

AirSchedule.defaultProps = {
    dayTitle : {
        0:'週日',
        1:'週一',
        2:'週二',
        3:'週三',
        4:'週四',
        5:'週五',
        6:'週六',
    }
}


export default connect(null, mapDispatchToProps)(AirSchedule);
