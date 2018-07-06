import React from 'react';
import { connect } from 'react-redux';

import DataShow from './DataShow';

import { col } from '../constants/global-variables';
import { getClassroomHtmlMap } from '../constants/classrooms/';

import '../../scss/ian-style.scss';

const mapStateToProps = state => ({
    floors: state.classrooms.filter(cg => cg.classroomGroupImage !== undefined)
});

class ClassImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFloor: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    renderDataShow() {
        const { floors } = this.props;
        const { selectFloor } = this.state;

        const selectedClassroomGroup = floors.filter(f=>f.classroomGroupName === selectFloor)[0];
        console.log(selectedClassroomGroup);

        if(selectedClassroomGroup && selectedClassroomGroup.classrooms){
            const data = selectedClassroomGroup.classrooms.map(c => {
                const autoState = c.isAuto === true ? '自動' : (c.isAuto === false ? '手動' : '關閉');
                return {
                    name: c.classroomName,
                    value: `[${autoState}] ${c.isAcOn ? 'V' : ''}`,
                    createdAt: (c.modifiedOn || '').substring(0,19).replace('T',' ').replace(/-/g,'/'),
                    isAcOn: c.isAcOn,
                    isAuto: c.isAuto
                }
            });

            const props = {
                data: data,
                drawing: {width:'1200px',marginLeft:'34px', name: selectedClassroomGroup.classroomGroupImage},
                dataHtmlMap: getClassroomHtmlMap(selectedClassroomGroup.classroomGroupName),
                nameHeaderText: '教室',
                valueHeaderText: '冷氣啟用',
            };
            return <DataShow {...props}/>
        }

    }

    render() {
        const { floors } = this.props;
        const { selectFloor } = this.state;

        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">教室平面圖</h1>
                    <div className={col(12)} style={{'marginBottom':'4px'}}>
                        <div className="form-inline">
                            <label>層樓</label>
                            <select
                                className="form-control ian-w120 ian-ml-2"
                                name="selectFloor"
                                value={selectFloor}
                                onChange={this.handleChange}
                                >
                                    <option value="">-- 請選取 --</option>
                                    {floors.map(floor => (
                                        <option
                                            key={floor.classroomGroupId}
                                            value={floor.classroomName}
                                            >
                                                {floor.classroomGroupName}
                                            </option>
                                    ))}
                            </select>
                            <button className="btn btn-default ian-ml-12">重新匯入課表</button>
                            <button className="btn btn-default">清空課表</button>
                            <button className="btn btn-default">節次設定</button>
                        </div>
                    </div>
                    {this.renderDataShow()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClassImg);