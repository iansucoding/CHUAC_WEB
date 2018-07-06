import React from 'react';
import axios from 'axios';

import { API_URL, col, lableDt } from '../constants/global-variables';

class EventLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventLogs: []
        }
    }

    handleDelete(id) {
        axios.delete(`${API_URL}/eventlog/${id}`).then(response => {
            if(response.status === 200) {
                const newState = this.state.eventLogs.filter(item=>item.id !== id);
                this.setState({
                    eventLogs : newState
                });
            }
        })
    }

    componentDidMount() {
        axios.get(`${API_URL}/eventlog`).then(response => {
            if(response.status === 200 && response.data.length > 0) {
                this.setState({eventLogs: response.data});
            }
        });
    }
    
    render() {
        return (
            <div className="row">
                <h1 className="page-header">事件記錄清單</h1>
                <div className={col(12)}>
                    <table  className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>系統</th>
                                <th>類型</th>
                                <th>更新時間</th>
                                <th>內容</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.eventLogs.map(item=>(
                                    <tr key={item.id}>
                                        <td>{item.systemName}</td>
                                        <td>{item.eventType}</td>
                                        <td>{lableDt(item.addedOn)}</td>
                                        <td>{item.content}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={this.handleDelete.bind(this, item.id)}>
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EventLog;