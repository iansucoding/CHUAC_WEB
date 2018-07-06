import React from 'react';
import { connect } from 'react-redux';

import { col } from '../constants/global-variables';


const mapStateToProps = state => ({
    floors: state.classrooms,
    isAuth : state.user.email ? true : false
});

class AllSupply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'm',
            checkedClassrooms: [],
        }
        this.handleCheckListChange = this.handleCheckListChange.bind(this);
    }

    handleClicklTab(tab, event) {
        event.preventDefault();
        this.setState({selectedTab: tab});
    }

    handleCheckListChange(event) {
        const target = event.target;
        const name = target.name;
        const checked = target.checked;
        const oldState = [...this.state.checkedClassrooms];
        
        const selectedName = oldState.filter(x => x === name)[0];
        if (checked && selectedName === undefined) { // add
            const newState = [...oldState, name];
            this.setState({ checkedClassrooms: newState });
            
        } else if (!checked && selectedName === name) { // remove
            const newState = oldState.filter(x => x !== name );
            this.setState({ checkedClassrooms: newState });
        }
    }

    handleSave(buildName) {
        const { checkedClassrooms } = this.state;
        const selectedClassrooms =  
            checkedClassrooms.filter(classroom => classroom[0] === buildName);
        console.log(buildName, selectedClassrooms);
    }

    renderClasses(floor){
        const { checkedClassrooms } = this.state;
        return floor.classrooms.map(classroom=>{
            <label key={classroom.classroomName}>
                <input 
                    type="checkbox" 
                    name={classroom.classroomName}
                    checked={checkedClassrooms.indexOf(classroom.classroomName)!==-1}
                    onChange={this.handleCheckListChange}/>
                <span>{classroom.classroomName}</span>
            </label>
        })
    }

    rendergFloors(buildName) {
        const { floors } = this.props;
        const selectedFloors =  floors.filter(floor => floor.classroomGroupName[0] === buildName);
        const { checkedClassrooms } = this.state;
        //console.log(selectedFloors);
        return(
            <div>
            {
                selectedFloors.map(floor => (
                    <div className="panel panel-primary" key={floor.classroomGroupName}>
                        <div className="panel-heading">
                            <h3 className="panel-title">{floor.classroomGroupName}</h3>
                        </div>
                        <div className="panel-body">
                            <div className="ian-checkboxpool">
                            {floor.classrooms.map(classroom=>(
                                <label key={classroom.classroomName}>
                                    <input 
                                    type="checkbox" 
                                    name={classroom.classroomName}
                                    checked={checkedClassrooms.indexOf(classroom.classroomName)!==-1}
                                    onChange={this.handleCheckListChange}/>
                                    <span>{classroom.classroomName}</span>
                                </label>
                            ))}
                            </div>
                        </div>
                    </div> 
                ))
            }
            </div>
        )
    }

    render() {
        const { selectedTab, checkedClassrooms } = this.state;
        const mCount = checkedClassrooms.filter(x=>x[0]==='M').length;
        const aCount = checkedClassrooms.filter(x=>x[0]==='A').length;
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">全天供電</h1>
                    {
                        !this.props.isAuth 
                        ? (<div className="alert alert-warning">您沒有登入，請嘗試登入。</div>) 
                        : (
                            <div>
                                <ul className="nav nav-tabs">
                                    <li className={selectedTab==='m'? 'active':''}>
                                        <a href="#form" data-toggle="tab" onClick={this.handleClicklTab.bind(this, 'm')} aria-expanded={selectedTab==='m'}>管理一館</a>
                                    </li>
                                    <li className={selectedTab==='a'? 'active':''}>
                                        <a href="#list" data-toggle="tab" onClick={this.handleClicklTab.bind(this, 'a')} aria-expanded={selectedTab==='a'}>建築一館</a>
                                    </li>
                                </ul>
                                <div className="tab-content ian-mt-6">
                                    <div id="form" className={`tab-pane fade ${selectedTab==='m'? 'active in':''}`}>
                                        <button 
                                            className="btn btn-default btn-sm ian-mb-12" 
                                            onClick={this.handleSave.bind(this, 'M')}>
                                            送出 {mCount} 筆
                                        </button>
                                        {this.rendergFloors('M')}
                                    </div>
                                    <div id="list" className={`tab-pane fade ${selectedTab==='a'? 'active in':''}`}>
                                        <button 
                                            className="btn btn-default btn-sm ian-mb-12" 
                                            onClick={this.handleSave.bind(this, 'A')}>
                                            送出 {aCount} 筆
                                        </button>
                                        {this.rendergFloors('A')}
                                    </div>
                                </div>              
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllSupply);