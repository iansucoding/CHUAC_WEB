import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_URL, col } from '../constants/global-variables';
import { setLoadingStart, setLoadingEnd } from '../actions';

import '../../scss/ian-style.scss';

const mapStateToProps = state => {
    let temperature = {};
    const reportTemps = state.equipments.temperature;
    if(reportTemps && reportTemps.length > 0) {
        reportTemps.forEach(t=>{
            temperature[t.name] = t.value;
        });
    }
    console.log(temperature);
    return {temperature};
}

const mapDispatchToProps = dispatch =>({
    startLoading: ()=>dispatch(setLoadingStart),
    stopLoading:  ()=>dispatch(setLoadingEnd)
});

class SystemThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tempSettings: []};
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/temp-setting`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({tempSettings: response.data});
        });
    }
    
    handleChange(tempSettingId, event) {
        const target = event.target;
        const value = target.value;
        const newTempSettingState = this.state.tempSettings.map(tempSetting=>{
            if (tempSetting.id === tempSettingId) {
                return {...tempSetting, adjust: value};
            }
            return {...tempSetting};
        });
    
        this.setState({tempSettings: newTempSettingState});
    }

    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/temp-setting`, this.state.tempSettings).then(response=>{
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
        const {temperature} = this.props;
        return (
            <div className="row">
                <div className={col(col)}>
                    <h1 className="page-header">溫度偏差修正</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>編號</th>
                                    <th>管線名稱</th>
                                    <th>溫度</th>
                                    <th>溫度校正(℃)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tempSettings.map(tempSetting => (
                                    <tr key={tempSetting.id}>
                                        <td>{tempSetting.seqNo}</td>
                                        <td>{tempSetting.name}</td>
                                        <td>{temperature[tempSetting.seqNo]}</td>
                                        <td>
                                            <input 
                                                type="text" 
                                                className="ian-input ian-w60" 
                                                value={tempSetting.adjust} 
                                                onChange={this.handleChange.bind(this, tempSetting.id)}
                                                />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4">
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemThree);