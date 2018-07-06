import React from 'react';
import { connect } from 'react-redux';

import '../../scss/loading-mask.scss';


const mapStateToProps = state => ({
    isLoading: state.isLoading
})

const LoadingMask = props => {
    if (props.isLoading) {
        return <div className="lmask" />;
    }
    return null;
};

export default connect(mapStateToProps)(LoadingMask);
