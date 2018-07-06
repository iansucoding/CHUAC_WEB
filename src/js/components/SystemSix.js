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


class SystemSix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {outTempSettings: []};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/out-temp-setting`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({outTempSettings: response.data});
        });
    }
    
    handleChange(outTempSettingId, event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const newOutTempSettingsState = this.state.outTempSettings.map(outTempSetting=>{
            if (outTempSetting.id === outTempSettingId) {
                return {...outTempSetting, [name]: value};
            }
            return {...outTempSetting};
        });
    
        this.setState({outTempSettings: newOutTempSettingsState});
    }

    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/out-temp-setting`, this.state.outTempSettings).then(response=>{
            console.log('put response', response);
            if(response.data.isSuccess===true) {
                this.props.stopLoading();
                alert('更新成功');
            }else {
                alert('更新失敗');
            }
        });
    }

    renderEndTempInput(outTempSetting){
        if(outTempSetting.end !== undefined) {
            return  (
                <input 
                    type="text" 
                    name="end" 
                    className="ian-input ian-w60" 
                    value={outTempSetting.end} 
                    onChange={this.handleChange.bind(this, outTempSetting.id)}
                />
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">儲冰桶設定</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>設備名稱</th>
                                    <th>開始</th>
                                    <th>結束</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.outTempSettings.map(outTempSetting => (
                                    <tr key={outTempSetting.id}>
                                        <td>{outTempSetting.name}</td>
                                        <td><input type="text" name="start" className="ian-input ian-w60" value={outTempSetting.start} onChange={this.handleChange.bind(this, outTempSetting.id)}/></td>
                                        <td>{this.renderEndTempInput(outTempSetting)}</td>
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

export default connect(null, mapDispatchToProps)(SystemSix);