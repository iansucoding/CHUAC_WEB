import React from 'react';

const renderClassroom = (d) => {
    return (
        <div style={{position:'relative'}}>
            <div className="ian-classroom-bg-cover"></div>
            <div className="text-center">
                <i className={`data-state-snow data-state-snow-${d.isAcOn} fa fa-snowflake-o`}></i>
                <p className={`data-state-handy-${d.isAuto}`}>{d.name}</p>
            </div>
        </div>
    )
}

export default renderClassroom;