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

class AllSystem extends React.Component {
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
            drawing: {width:'1600px', name:'chi-17.png'},
            dataHtmlMap: this.props.dataHtmlMap
        };
        //console.log(props.data);
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">全系統 </h1>
                    <DataShow {...props}/>
                </div>
            </div>
        );
    }
}

AllSystem.defaultProps = {
    dataHtmlMap: {
        //Flow_data
        '儲冰量': {
            left:'48%',
            top:'87%',
            renderContent: d => {
                const boxStyle = {
                    position: 'relative',
                    width: '51px',
                    height: '94px',
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
            left:'80%',
            top:'16%',
            renderContent: d => <span>{d.value}</span>
        },        
        't2':{
            left:'79%',
            top:'22%',
            renderContent: d => <span>{d.value}</span>
        },
        't3':{
            left:'77.8%',
            top:'35.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't4': {
            left:'84%',
            top:'62.6%',
            renderContent: d => <span>{d.value}</span>
        },   
        't5': {
            left:'86.5%',
            top:'79%',
            renderContent: d => <span>{d.value}</span>
        },        
        't6': {
            left:'85%',
            top:'86.7%',
            renderContent: d => <span>{d.value}</span>
        },
        't7': {
            left:'36.5%',
            top:'74.2%',
            renderContent: d => <span>{d.value}</span>
        },
        't8': {
            left:'36.2%',
            top:'94%',
            renderContent: d => <span>{d.value}</span>
        },
        't9': {
            left:'69.3%',
            top:'8.8%',
            renderContent: d => <span>{d.value}</span>
        },
        't10': {
            left:'69.3%',
            top:'2.8%',
            renderContent: d => <span>{d.value}</span>
        },
        't11': {
            left:'2.5%',
            top:'75.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't12': {
            left:'88%',
            top:'64.4%',
            renderContent: d => <span>{d.value}</span>
        },
        't13': {
            left:'53.2%',
            top:'73.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't14': {
            left:'80.8%',
            top:'42.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't15': {
            left:'54%',
            top:'14.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't16': {
            left:'80.8%',
            top:'35.6%',
            renderContent: d => <span>{d.value}</span>
        },
        't17': {
            left:'54%',
            top:'11%',
            renderContent: d => <span>{d.value}</span>
        },
        //Flow_status
        'F1': {
            left:'66.25%',
            top:'18.85%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F2': {
            left:'66.25%',
            top:'25.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F3': {
            left:'66.3%',
            top:'38.25%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F4': {
            left:'68.7%',
            top:'68.7%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F5': {
            left:'71.8%',
            top:'81.7%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F6': {
            left:'71.8%',
            top:'89.6%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F7': {
            left:'21.5%',
            top:'77%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F8': {
            left:'21.5%',
            top:'91.8%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F9': {
            left:'92%',
            top:'30.2%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F10': {
            left:'92%',
            top:'37.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        }  
    }
}

export default connect(mapStateToProps)(AllSystem);