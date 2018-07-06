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

class SystemTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {equipConns: []};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.props.startLoading();
        axios.get(`${API_URL}/equip-conn`).then(response=>{
            console.log(response);
            this.props.stopLoading();
            this.setState({equipConns: response.data});
        });
    }
    
    handleChange(equipConnId, event) {
        const target = event.target;
        const value = target.checked;
        const newEquipConnsState = this.state.equipConns.map(equipConn =>{
            if (equipConn.id === equipConnId) {
                return {...equipConn, enable: value};
            }
            return {...equipConn};
        });
    
        this.setState({equipConns: newEquipConnsState});
    }

    handleUpdate() {
        this.props.startLoading();
        axios.put(`${API_URL}/equip-conn`, this.state.equipConns).then(response=>{
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
                    <h1 className="page-header">備用泵浦取代</h1>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <tbody>
                                {this.state.equipConns.map(equipConn => (
                                    <tr key={equipConn.id}>
                                        <td>{equipConn.name}</td>
                                        <td>
                                            <input 
                                                type="checkbox"
                                                checked={equipConn.enable}
                                                onChange={this.handleChange.bind(this, equipConn.id)}
                                                />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2">
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

export default connect(null, mapDispatchToProps)(SystemTwo);