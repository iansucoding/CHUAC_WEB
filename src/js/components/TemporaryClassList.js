import React from 'react';
import { col } from '../constants/global-variables';

class TemporaryClassList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRemove(id) {
        this.props.onRemove(id);
    }

    renderDataRow() {
        //console.log('this.props', this.props);
        const { temporaryClasses } = this.props;
        if(temporaryClasses) {
            return (
                <tbody>
                    {
                        temporaryClasses.map(tc=>(
                            <tr key={tc.id}>
                                <td>{tc.id}</td>
                                <td>{tc.date.substring(0,10)}</td>
                                <td>{tc.classroom}</td>
                                <td>{tc.sections}</td>
                                <td>{tc.addedOn.substring(0,19).replace('T',' ')}</td>
                                <td>{tc.remark}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={this.handleRemove.bind(this, tc.id)}
                                        >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className={col(12)}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>項次</th>
                                <th>調課日期</th>
                                <th>教室</th>
                                <th>節次</th>
                                <th>創建日期</th>
                                <th>備註</th>
                                <th>刪除</th>
                            </tr>
                        </thead>
                        {this.renderDataRow()}
                    </table>
                </div>
            </div>
        );
    }
}

export default TemporaryClassList;