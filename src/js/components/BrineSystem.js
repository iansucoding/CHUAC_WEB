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

class BrineSystem extends React.Component {
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
            drawing: {width:'890px', name:'brine-26.png'},
            dataHtmlMap: this.props.dataHtmlMap
        };

        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">儲冰系統</h1>
                    <DataShow {...props}/>
                </div>
            </div>
        );
    }
}

BrineSystem.defaultProps = {
    dataHtmlMap: {
        //Flow_data
        '儲冰量': {
            left:'1%',
            top:'81%',
            renderContent: d => {
                const boxStyle = {
                    position: 'relative',
                    width: '40px',
                    height: '69px',
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
        't4':{
            left:'71%',
            top:'26%',
            renderContent: d => <span>{d.value}</span>
        },        
        't5':{
            left:'76%',
            top:'39%',
            renderContent: d => <span>{d.value}</span>
        },
        't6':{
            left:'73%',
            top:'55%',
            renderContent: d => <span>{d.value}</span>
        },
        't12':{
            left:'80%',
            top:'74%',
            renderContent: d => <span>{d.value}</span>
        },
        't13':{
            left:'8%',
            top:'62%',
            renderContent: d => <span>{d.value}</span>
        },
        //Flow_status
        'F4': {
            left:'45.5%',
            top:'21%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F5': {
            left:'45.5%',
            top:'44.5%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
        'F6': {
            left:'45.5%',
            top:'60.7%',
            renderContent: d => <span className={`data-state data-state-${d.value} data-state-box`}></span>
        },
    }
}

export default connect(mapStateToProps)(BrineSystem);