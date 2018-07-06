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


class SystemFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings:[]};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/equip-temp-setting`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({settings: response.data});
        });
    }

    handleChange(settingId, event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const newSettingsState = this.state.settings.map(setting=>{
            if (setting.id === settingId) {
                return {...setting, [name]: value};
            }
            return {...setting};
        });
    
        this.setState({settings: newSettingsState});
    }

    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/equip-temp-setting`, this.state.settings).then(response=>{
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
                    <h1 className="page-header">溫度啟停設定</h1>
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
                                {this.state.settings.map(setting => (
                                    <tr key={setting.id}>
                                        <td>  {setting.name}</td>
                                        <td><input type="text" name="start" className="ian-input ian-w60" value={setting.start} onChange={this.handleChange.bind(this, setting.id)}/></td>
                                        <td><input type="text" name="end"  className="ian-input ian-w60" value={setting.end} onChange={this.handleChange.bind(this, setting.id)}/></td>
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

export default connect(null, mapDispatchToProps)(SystemFour);