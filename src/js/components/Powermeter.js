import React from 'react';
import { connect } from 'react-redux';

import { col } from '../constants/global-variables';

const mapStateToProps = state => {
    return {meters: state.meters};
}

const Powermeter = (props) => (
    <div className="row">
        <div className={col(12)}>
            <h1 className="page-header">電錶清單</h1>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ACMP1</th>
                            <th>數值</th>
                            <th>更新時間</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {props.meters.map(d => (
                            <tr key={d.name}>
                                <td>{d.name}</td>
                                <td>{d.value}</td>
                                <td>{d.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default connect(mapStateToProps)(Powermeter);
