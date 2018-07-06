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

class SystemSeven extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.handleChange =this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/other-setting/pump-delay-time`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState(response.data);
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({value});
    }

    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/other-setting/${this.state.id}`, this.state).then(response=>{
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
        const { value } = this.state;
        return (
            <div className="row">
                <div className={col(12)}>
                    <div className="panel panel-default">
                        <div className="panel-heading">區域泵浦延遲停止時間</div>
                        <div className="panel-body">
                            <input 
                                type="text" 
                                value={value}
                                onChange={this.handleChange}
                                className="ian-input ian-w60"
                                /> 秒
                        </div>
                        <div className="panel-footer">
                            <button className="btn btn-default btn-sm" onClick={this.handleUpdate}>Save</button>
                        </div>
                    </div>
                </div>
            </div>   
        );
    }

}

export default connect(null, mapDispatchToProps)(SystemSeven);