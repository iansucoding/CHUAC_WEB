import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_URL, col } from '../constants/global-variables';
import { setLoadingStart, setLoadingEnd } from '../actions';

const mapStateToProps = state => ({
    floors: state.classrooms,
});

const mapDispatchToProps = dispatch =>({
    startLoading: ()=>dispatch(setLoadingStart),
    stopLoading:  ()=>dispatch(setLoadingEnd)
});

class TemporaryClassForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '',
            repeatTimes: 0,
            selectFloor: '',
            checkedClassrooms: [],
            checkedSectionRanges: [],
            remark:'',
            errorMap: {
                'selectedDate':'請選擇日期',
                'selectFloor':'請選擇層樓',
                'checkedClassrooms': '至少選擇一個教室',
                'checkedSectionRanges':'至少選擇一個節次'
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckListChange = this.handleCheckListChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    hasError(prop){
        const { errorMap } = this.state;
        return errorMap[prop] !== undefined;
    }

    updateInputErrorMap(name, value) {
        const { errorMap } = this.state;
        if(name === 'selectedDate') {
            if(value === '') {
                errorMap['selectedDate'] = '請選擇日期';
            } else {
                delete errorMap['selectedDate'];
            }
        }
        if(name === 'repeatTimes') {
            const times = parseInt(value, 10);
            if(isNaN(times)) {
                errorMap['repeatTimes'] = '必須為 number';
            }
            else if(times < 0) {
                errorMap['repeatTimes'] = '不可小於 0';
            } else {
                delete errorMap['repeatTimes'];
            }
        }
        if(name === 'selectFloor') {
            if(value === '') {
                errorMap['selectFloor'] = '請選擇層樓';
            } else {
                delete errorMap['selectFloor'];
            }
        }
        if (name === 'checkedClassrooms') {
            if(value.length === 0) {
                errorMap['checkedClassrooms'] = '至少選擇一個教室';
            }else {
                delete errorMap['checkedClassrooms'];
            }
        }
        if (name === 'checkedSectionRanges') {
            if(value.length === 0) {
                errorMap['checkedSectionRanges'] = '至少選擇一個節次';
            }else {
                delete errorMap['checkedSectionRanges'];
            }
        }
        return errorMap;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const errorMap  = this.updateInputErrorMap(name, value);
        this.setState({ [name]: value, errorMap });
    }

    handleCheckListChange(event) {
        const target = event.target;
        const kind = target.dataset.king;
        const name = target.name;
        const checked = target.checked;
        const oldState = [...this.state[kind]];
        
        const selectedName = oldState.filter(x => x === name)[0];
        if (checked && selectedName === undefined) { // add
            const newState = [...oldState, name];
            const errorMap = this.updateInputErrorMap(kind, newState);
            this.setState({ [kind]: newState, errorMap });
            
        } else if (!checked && selectedName === name) { // remove
            const newState = oldState.filter(x => x !== name );
            const errorMap = this.updateInputErrorMap(kind, newState);
            this.setState({ [kind]: newState, errorMap });
        }
    }

    handleRemoveCheckedClassroom(room, event) {
        event.preventDefault();
        const newState = this.state.checkedClassrooms.filter( r => r !== room );
        if(this.state.checkedClassrooms !== newState){
            const errorMap = this.updateInputErrorMap('checkedClassrooms', newState)
            this.setState({ checkedClassrooms: newState });
        }
    }

    handleSave() {
        this.props.startLoading();
        //console.log('save', this.state);
        const { errorMap } = this.state;
        const errorKeys = Object.keys(errorMap);
        if(errorKeys.length === 0) {
            // 這裡處理"節次"，主要是為了排序
            const {sectionRanges} = this.props;
            const {checkedSectionRanges} = this.state;
            let sections = '';
            sectionRanges.forEach(x=>{
                if(checkedSectionRanges.indexOf(x.text) !== -1){
                    sections += `${x.text},`;
                }
            });
            sections = sections.slice(0, -1); // chop/slice/trim off last character in string
            // 
            const now = new Date();
            let mm = now.getMonth()+1;
            if(mm < 10){
                mm = '0' + mm;
            }
            const time = now.toTimeString().substring(0,8);
            const addedOn = `${now.getFullYear()}-${mm}-${now.getDate()} ${time}`;
    
            const data = this.state.checkedClassrooms.map(classroom=>({
                date: this.state.selectedDate,
                times: this.state.repeatTimes,
                classroom,
                sections,
                remark: this.state.remark,
                addedOn
            }));
            //console.log(data);
            axios.post(`${API_URL}/temporaryclass`, data).then(response=>{
                console.log('post response', response);
                if(response.status===200) {
                    this.props.stopLoading();
                    alert('更新成功');
                    this.props.onAdd(response.data);
                }else {
                    alert('更新失敗');
                }
            });
        }
    }

    handleReset() {
        this.setState({
            selectedDate: '',
            repeatTimes: 0,
            selectFloor: '',
            checkedClassrooms: [],
            checkedSectionRanges: [],
            remark:'',
            errorMap: {
                'selectedDate':'請選擇日期',
                'selectFloor':'請選擇層樓',
                'checkedClassrooms': '至少選擇一個教室',
                'checkedSectionRanges':'至少選擇一個節次'
            }
        });
    }

    canSave() {
        const { errorMap } = this.state;
        return  Object.keys(errorMap).length === 0;
    }

    // 列出已經被選取的教室
    renderCheckedClassroomList() {
        const { checkedClassrooms, selectFloor, errorMap } = this.state;
        //console.log(checkedClassrooms);
        if (checkedClassrooms && checkedClassrooms.length > 0 && errorMap[checkedClassrooms] === undefined) {
            return (
                <div className="help-block">
                    <span>已經被選取的教室: </span>
                    {
                        checkedClassrooms.map(r => (
                            <span key={r} className="badge badge-secondary">
                                {r} 
                                <a href="#" 
                                    onClick={this.handleRemoveCheckedClassroom.bind(this, r)} 
                                    className="text-danger ian-ml-2">
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        ))
                    }
                </div>
            );
        } else {
            return <span className="help-block text-danger">請選取教室 {selectFloor===''?'(請先選取層樓)':''}</span>;
        }
    }

    // render 被選取的層樓的教室
    renderSelectedFloor() {
        const { selectFloor } = this.state;
        if (selectFloor && selectFloor !== '') {
            const selectObj = this.props.floors.filter(classroomGroup => {
                return classroomGroup.classroomGroupName === this.state.selectFloor;
            })[0];
            //console.log(selectObj);
            if (selectObj && selectObj.classroomGroupName) {
                if (selectObj.classrooms && selectObj.classrooms.length > 0) {
                    const { classrooms } = selectObj;
                    const { checkedClassrooms } = this.state;
                    return (
                        <div className="ian-checkboxpool">
                            {classrooms.map(classroom => (
                                <label key={classroom.classroomName}>
                                    <input 
                                        type="checkbox" 
                                        name={classroom.classroomName}
                                        data-king="checkedClassrooms"
                                        checked={checkedClassrooms.indexOf(classroom.classroomName)!==-1}
                                        onChange={this.handleCheckListChange}/>
                                    <span>{classroom.classroomName}</span>
                                </label>
                            ))}
                        </div>
                    );
                } else {
                    return (
                        <p className="help-block">
                            該層樓({selectFloor})沒有教室
                        </p>
                    );
                }
            } else {
                return <p className="help-block">無指定樓層資料</p>;
            }
        }
    }
    // render 節次 checkboxes
    renderTimeCheckboxes() {
        const { sectionRanges } = this.props;
        const { checkedSectionRanges } = this.state;
        return (
            <ul className="list-group">
            {
                sectionRanges.map(sr => (
                    <li className="list-group-item row" key={`${sr.text}`}>
                        <span className={col(4)}>{sr.text}</span>
                        <span className={col(4)}>{sr.range}</span>
                        <span className={col(2)}>
                            <input 
                                type="checkbox" 
                                name={sr.text}
                                data-king="checkedSectionRanges"
                                checked={checkedSectionRanges.indexOf(sr.text)!==-1}
                                onChange={this.handleCheckListChange}/>
                        </span>
                    </li>
                ))
            }
            </ul>
        );
    }

    render() {
        const { floors } = this.props;
        const { selectedDate, repeatTimes, selectFloor, remark, errorMap, checkedClassrooms } = this.state;
        return (
            <div className="row">
                <div className={col(12)}>
                    <div role="form">
                        <div className={`form-group ${col(6)} ${this.hasError('selectedDate') ? 'has-error':''}`}>
                            <label>日期</label>
                            <input
                                className="form-control"
                                type="date"
                                name="selectedDate"
                                value={selectedDate}
                                onChange={this.handleChange}
                            />
                            <p className="help-block text-danger">{errorMap['selectedDate']}</p>
                        </div>
                        <div className={`form-group ${col(6)} ${this.hasError('repeatTimes') ? 'has-error':''}`}>
                            <label>重複次數</label>
                            <input
                                className="form-control ian-w80"
                                type="number"
                                min="0"
                                name="repeatTimes"
                                value={repeatTimes}
                                onChange={this.handleChange}
                            />
                            <p className="text-primary">
                                重複 0 次 = 單次(本周) <br />
                                重複 1 次 = 本周 + 下周
                            </p>
                            <p className="help-block text-danger">{errorMap['repeatTimes']}</p>
                        </div>
                        <div className={`form-group ${col(6)} ${this.hasError('selectFloor') ? 'has-error':''}`}>
                            <label>層樓</label>
                            <select
                                className="form-control ian-w120"
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
                            <p className="help-block text-danger">{errorMap['selectFloor']}</p>
                        </div>
                        <div className={`form-group ${col(12)}  ${checkedClassrooms.length === 0 ? 'has-error':''}`}>
                            <label>教室</label>
                            {this.renderCheckedClassroomList()}
                            {this.renderSelectedFloor()}
                        </div>
                        <div className={`form-group ${col(12)}`}>
                            <label>請選擇節次</label>
                            {this.renderTimeCheckboxes()}
                            <p className="text-danger">{errorMap['checkedSectionRanges']}</p>
                        </div>
                        <div className={`form-group ${col(12)}`}>
                            <label>備註事項</label>
                            <textarea 
                                type="text" 
                                className="form-control"
                                name="remark" 
                                value={remark} 
                                onChange={this.handleChange}/>
                        </div>
                        <div className={`form-group ${col(12)}`}>
                            <button className="btn btn-success" onClick={this.handleSave} disabled={!this.canSave()}>新增</button>
                            <button className="btn btn-warning ian-ml-2" onClick={this.handleReset}>清空</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TemporaryClassForm.defaultProps = {
    sectionRanges : [{
        text:'預一',
        range:'0:0~0:0',
    },{
        text:'預二',
        range:'0:0~0:0',
    },{
        text:'一',
        range:'8:20~9:20',
    },{
        text:'二',
        range:'9:5~10:15',
    },{
        text:'三',
        range:'10:15~11:15',
    },{
        text:'四',
        range:'11:10~12:10',
    },{
        text:'午',
        range:'12:10~13:0',
    },{
        text:'五',
        range:'13:0~14:0',
    },{
        text:'六',
        range:'14:0~15:0',
    },{
        text:'七',
        range:'15:0~16:0',
    },{
        text:'八',
        range:'16:0~17:0',
    },{
        text:'九',
        range:'16:55~17:55',
    },{
        text:'A',
        range:'17:50~18:45',
    },{
        text:'B',
        range:'18:35~19:30',
    },{
        text:'C',
        range:'19:30~20:25',
    },{
        text:'D',
        range:'20:15~21:20',
    },{
        text:'E',
        range:'0:0~0:0',
    },{
        text:'預三',
        range:'0:0~0:0',
    },{
        text:'預四',
        range:'0:0~0:0',
    }]
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryClassForm);