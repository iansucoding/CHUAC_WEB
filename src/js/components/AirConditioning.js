import React from 'react';
import { connect } from 'react-redux';

import { col } from '../constants/global-variables';

const mapStateToProps = state => ({
    equipments: state.equipments
});

class AirConditioning extends React.Component {
    constructor(props) {
        super(props)
    }

    getTableHeader(groupName){
        switch (groupName) {
            case 'equipment_status':
            case 'Alarm':
                return ( 
                    <thead>
                        {groupName === 'Alarm' ? <tr className="info"><th colSpan="3"><h1>異常警報清單</h1></th></tr> : null}
                        <tr><th>設備名稱</th><th>狀態</th><th>更新時間</th></tr>
                    </thead>);
            case 'temperature':
                return (
                    <thead>
                        <tr className="info"><th colSpan="4"><h1>管線溫度清單</h1></th></tr>
                        <tr><th>編號</th><th>管線名稱</th><th>溫度</th><th>更新時間</th></tr>
                    </thead>);
            case 'Flow_data':
                return (
                    <thead>
                        <tr className="info"><th colSpan="3"><h1>流量資料清單</h1></th></tr>
                        <tr><th>設備名稱</th><th>數值</th><th>更新時間</th></tr>
                    </thead>);
            case 'Flow_status':
                return (
                    <thead>
                        <tr className="info"><th colSpan="4"><h1>水流開關狀態清單</h1></th></tr>
                        <tr><th>編號</th><th>設備名稱</th><th>狀態</th><th>更新時間</th></tr>
                    </thead>);
        }
    }

    render() {
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">設備狀態清單</h1>
                    {
                        this.props.equipments.map(equipGrpup=>(
                            <table key={equipGrpup.equipmentGroupName} className="table table-striped table-bordered table-hover ian-mb-12">
                                {this.getTableHeader(equipGrpup.equipmentGroupName)}
                                <tbody>
                                    {equipGrpup.equipments.map(equip => (
                                        <tr key={equip.equipmentName}>
                                            <td>{equip.equipmentName}</td>
                                            {equip.desc ? <td>{equip.desc}</td> : null}
                                            <td>{equip.value}</td>
                                            <td>{equip.modifiedOn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>))
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AirConditioning);