import React from 'react';

import { col } from '../constants/global-variables';

class Power extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:'',
            endDate: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {target} = event;
        const {name, value} = target;
        this.setState({[name]: value});
    }

    handleSubmit() {
        console.log(this.state);
    }

    render() {
        const {startDate, endDate} = this.state;
         return (
            <div className="row">
                <h1 className="page-header">電錶即時圖</h1>
                <div className={col(12)}>
                    <div className="form-inline">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">起始日期</div>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="startDate" 
                                    name="startDate" 
                                    value={startDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ian-ml-2">
                            <div className="input-group">
                                <div className="input-group-addon">結束日期</div>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="endDate"  
                                    name="endDate" 
                                    value={endDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <button className="btn btn-default ian-ml-2" onClick={this.handleSubmit}>確定</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Power;