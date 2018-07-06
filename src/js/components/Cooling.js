import React from 'react';
import { connect } from 'react-redux';

import DataShow from './DataShow';

import { col } from '../constants/global-variables';

import '../../scss/ian-style.scss';

const mapStateToProps = state => {
    let data = [];
    state.equipments.forEach(item =>{
        if(item.equipmentGroupName === 'temperature'
        || item.equipmentGroupName === 'equipment_status'
        || item.equipmentGroupName === 'Flow_data'
        || item.equipmentGroupName === 'Flow_status') {
            data = [...data,...item.equipments];
        }
    });
    return { data };
}

class Cooling extends React.Component {
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
            drawing: {width:'860px', name:'cool-06.png'},
            dataHtmlMap: this.props.dataHtmlMap
        };

        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">冷卻水系統</h1>
                    <DataShow {...props}/>
                </div>
            </div>
        );
    }
}

Cooling.defaultProps = {
    dataHtmlMap: {
        //temperature
        't7':{
            left:'74%',
            top:'46%',
            renderContent: d => <span>{d.value}</span>
        },
        't8':{
            left:'74%',
            top:'85%',
            renderContent: d => <span>{d.value}</span>
        },
        't11':{
            left:'7%',
            top:'49%',
            renderContent: d => <span>{d.value}</span>
        },
        //Flow_status
        'F7': {
            left:'44.3%',
            top:'51.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F8': {
            left:'44.3%',
            top:'80.6%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        //equipment_status
        '冷卻泵浦(一)': {
            left:'28%',
            top:'60.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-round`}></span>
        },
        '冷卻泵浦SP': {
            left:'28%',
            top:'74.7%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-round`}></span>
        },
        '冷卻泵浦(二)': {
            left:'28%',
            top:'89.4%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-round`}></span>
        },
        '冷卻風扇(一)': {
            left:'49.3%',
            top:'22%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-round`}></span>
        },
        '冷卻風扇(二)': {
            left:'36.3%',
            top:'22%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-round`}></span>
        },
    }
}

export default connect(mapStateToProps)(Cooling);