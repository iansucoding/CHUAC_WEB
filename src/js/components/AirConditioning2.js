import React from 'react';
import { connect } from 'react-redux';

import DataShow from './DataShow';

import { col } from '../constants/global-variables';

import '../../scss/ian-style.scss';

const mapStateToProps = state => {
    let data = [];
    state.equipments.forEach(item =>{
        if(item.equipmentGroupName === 'temperature'
        || item.equipmentGroupName === 'Flow_data'
        || item.equipmentGroupName === 'Flow_status') {
            data = [...data,...item.equipments];
        }
    });
    return { data };
}

class AirConditioning2 extends React.Component {
    constructor(props) {
        super(props);
    }

    getSpecifiedData(data) {
        const filteredData = data.filter(d => {
            return this.props.dataHtmlMap[d.equipmentName] !== undefined;
        });
        return filteredData.map(item => {
            return {
                name: item.equipmentName,
                value: item.value,
                createdAt: item.modifiedOn,
            }
        });
    }

    render() {
        const props = {
            data: this.getSpecifiedData(this.props.data),
            drawing: {width:'890px', name:'aircon-22.png'},
            dataHtmlMap: this.props.dataHtmlMap
        };

        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">空調系統</h1>
                    <DataShow {...props}/>
                </div>
            </div>
        );
    }
}

AirConditioning2.defaultProps = {
    dataHtmlMap: {
        //Flow_data
        '儲冰量': {
            left:'1%',
            top:'80%',
            renderContent: d => {
                const boxStyle = {
                    position: 'relative',
                    width: '47px',
                    height: '67px',
                    marginLeft: '16px',
                    marginBottom: '8px',
                    
                }; 
                const valueStyle = {
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'blue',
                    width: '100%',
                    height: `${d.value}%`,
                }; 
                return (
                    <span>
                        <div style={boxStyle}><div style={valueStyle}></div></div>
                        <p>{`${d.name}:${d.value}%`}</p>
                    </span>
                )
            }
        },
        //temperature
        't1':{
            left:'60%',
            top:'32%',
            renderContent: d => <span>{d.value}</span>
        },        
        't2':{
            left:'58%',
            top:'44%',
            renderContent: d => <span>{d.value}</span>
        },
        't3':{
            left:'56%',
            top:'71%',
            renderContent: d => <span>{d.value}</span>
        },
        't14': {
            left:'62%',
            top:'85%',
            renderContent: d => <span>{d.value}</span>
        },
        't15': {
            left:'8%',
            top:'29%',
            renderContent: d => <span>{d.value}</span>
        },
        't16': {
            left:'62%',
            top:'71%',
            renderContent: d => <span>{d.value}</span>
        },
        't17': {
            left:'8%',
            top:'22%',
            renderContent: d => <span>{d.value}</span>
        },
        //Flow_status
        'F1': {
            left:'32.8%',
            top:'37.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F2': {
            left:'32.8%',
            top:'50.5%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F3': {
            left:'33%',
            top:'76%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F9': {
            left:'84%',
            top:'60%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F10': {
            left:'84%',
            top:'74.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        }
    }
}

export default connect(mapStateToProps)(AirConditioning2);