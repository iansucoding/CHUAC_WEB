import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_URL, col } from '../constants/global-variables';

import TemporaryClassForm from './TemporaryClassForm';
import TemporaryClassList from './TemporaryClassList';

const mapStateToProps = state => ({
    isAuth : state.user.email ? true : false
});

class TemporaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'form',
            temporaryClasses:[]
        }
        this.handleAddTemporaryClasses = this.handleAddTemporaryClasses.bind(this);
        this.handleRemoveTemporaryClasses = this.handleRemoveTemporaryClasses.bind(this);
    }
    componentDidMount() {
        axios.get(`${API_URL}/temporaryclass`).then(response=>{
            this.setState({temporaryClasses: response.data});
        });
    }

    handleClicklTab(tab, event) {
        event.preventDefault();
        this.setState({selectedTab: tab});
    }

    handleAddTemporaryClasses(lists) {
        //console.log('handleAddTemporaryClasses', lists);
        const temporaryClasses = [...this.state.temporaryClasses, ...lists];
        this.setState({temporaryClasses})
    }
    handleRemoveTemporaryClasses(id){
        //console.log('handleRemoveTemporaryClasses', id);
        axios.delete(`${API_URL}/temporaryclass/${id}`).then(response=>{
            if(response.status === 200) {
                const temporaryClasses = this.state.temporaryClasses.filter(x=>x.id !== id);
                this.setState({temporaryClasses});
            } else {
                console.error('error');
            }
        });

    }

    render() {
        const { selectedTab, temporaryClasses } = this.state;
        return (
            <div className="row">
                <div className={col(12)}>
                    <h1 className="page-header">臨時課表預約</h1>
                    {
                        !this.props.isAuth 
                        ? (<div className="alert alert-warning">您沒有登入，請嘗試登入。</div>) 
                        : (
                            <div>
                                <ul className="nav nav-tabs">
                                    <li className={selectedTab==='form'? 'active':''}>
                                        <a href="#form" data-toggle="tab" onClick={this.handleClicklTab.bind(this, 'form')} aria-expanded={selectedTab==='form'}>預約</a>
                                    </li>
                                    <li className={selectedTab==='list'? 'active':''}>
                                        <a href="#list" data-toggle="tab" onClick={this.handleClicklTab.bind(this, 'list')} aria-expanded={selectedTab==='list'}>清單</a>
                                    </li>
                                </ul>
                                <div className="tab-content ian-mt-6">
                                    <div id="form" className={`tab-pane fade ${selectedTab==='form'? 'active in':''}`}>
                                        <TemporaryClassForm onAdd={this.handleAddTemporaryClasses}/>
                                    </div>
                                    <div id="list" className={`tab-pane fade ${selectedTab==='list'? 'active in':''}`}>
                                        <TemporaryClassList 
                                            temporaryClasses={temporaryClasses}
                                            onRemove={this.handleRemoveTemporaryClasses}
                                        />
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

export default connect(mapStateToProps)(TemporaryClass);