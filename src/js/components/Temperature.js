import React from 'react';
import axios from 'axios';

import { Line } from 'react-chartjs-2';

import TemperatureDropdown from './TemperatureDropdown';

import { API_URL, col } from '../constants/global-variables';

class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            info:'',
            options:{ legend: { display: false }}
        }
        this.handleTemperatureDropdownChange = this.handleTemperatureDropdownChange.bind(this);
    }

    handleTemperatureDropdownChange(key) {
        console.log('handleTemperatureDropdownChange', key);
        axios.get(`${API_URL}/temperaturehistory/${key}`).then(response=>{
            //console.log(response.data);
            const results = response.data;
            if(results.length > 0) {
                const labels = []; // x軸
                const dt0 = results[0].addedOn.substring(0,16).replace('T',' ').replace('-','/');
                const dt1 = results[results.length-1].addedOn.substring(0,16).replace('T',' ').replace('-','/');
    
                const dataset = {
                    borderColor: '#3e95cd',
                    fill: false, // 下面填滿?
                    lineTension: 0, // Bezier curve tension of the line
                    data:[],
                };
                results.forEach(item => {
                    labels.push(item.addedOn.substring(11,16));
                    dataset.data.push(item.value);
                });
                this.setState({
                    data : {labels, datasets:[dataset]},
                    info: `${dt0} ~ ${dt1}`
                });
            }
        });
    }
    renderChart() {
        const { data, info, options } = this.state;
        if(info){
            return (
                <div className="ian-mt-6">
                    <Line data={data} options={options}/>
                    <div className="alert alert-info text-center" role="alert">{info}</div>
                </div>
            );
        }

    }

    render() {
        return (
            <div className="row">
                <h1 className="page-header">溫度即時圖</h1>
                <div className={col(12)}>
                    <TemperatureDropdown onChange={this.handleTemperatureDropdownChange}/>
                    {this.renderChart()}
                </div>
            </div>
        );
    }
}

export default Temperature;
