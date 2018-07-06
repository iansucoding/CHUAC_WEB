import React from 'react';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../constants/global-variables';

import '../../scss/ian-style.scss';

class DataShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowDrawing: false,
        }

        this.handleToggleShowDrawing = this.handleToggleShowDrawing.bind(this);
    }

    handleToggleShowDrawing() {
        this.setState({isShowDrawing: !this.state.isShowDrawing});
    }

    renderDataTable(){
        const { nameHeaderText, valueHeaderText } = this.props;
        const { isShowDrawing } = this.state;
        if(!isShowDrawing) {
            return (
                <table className="table table-striped table-bordered table-hover ian-mb-12">
                    <thead>
                        <tr>
                            <th>{nameHeaderText}</th>
                            <th>{valueHeaderText}</th>
                            <th>更新時間</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(d => (
                            <tr key={d.name}>
                                <td>{d.name}</td>
                                <td>{d.value}</td>
                                <td>{d.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }

    renderDataDrawing() {
        const headerStyle = {
            position: 'fixed',
            marginTop: '4px',
            marginLeft: '4px',
            zIndex: 1,
        };
        const drawingStyle = {
            display: this.state.isShowDrawing ? 'block' : 'none'
        }
        const imgStyle = {
            width: this.props.drawing.width,
            marginLeft: this.props.drawing.marginLeft
        }
        return (
            <div style={drawingStyle}>
                <div className="ian-zoom-bg-cover"></div>
                <div className="ian-zoom">
                    <div style={headerStyle}>
                        <button className="btn btn-default" onClick={this.handleToggleShowDrawing}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div style={{ backgroundColor: 'white' }}>
                        {this.renderDataHtml()}
                        <img src={`${IMAGE_URL}/${this.props.drawing.name}`} style={imgStyle}/>
                    </div>
                </div>
            </div>
        );
    }

    renderDataHtml(){
        const { dataHtmlMap } = this.props;
        return this.props.data.map(d=>{
            const dataProps = dataHtmlMap[d.name];
            if(dataProps){
                const spanStyle = {
                    left: dataProps.left,
                    top: dataProps.top
                }
                return (
                    <span 
                        className="data-info-view"
                        key={d.name} 
                        style={spanStyle}>
                        {dataProps.renderContent(d)}       
                    </span>
                )
            }else {
                console.info(`沒有${d.name}的屬性預設值`);
            }
           
        });
    }
    
    render() {
        const btnToggleDrawingStyle = {
            position: 'absolute',
            right: '15px',
            marginTop: '-50px'
        }
        return (
            <div>
                <button 
                    className="btn btn-default" 
                    style={btnToggleDrawingStyle}
                    onClick={this.handleToggleShowDrawing}>
                    <i className="fa fa-map-o"></i>
                </button>
                {this.renderDataTable()}
                {this.renderDataDrawing()}
            </div>
        );
    }
}

DataShow.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    drawing: PropTypes.object.isRequired,
    dataHtmlMap: PropTypes.object.isRequired,
    nameHeaderText: PropTypes.string,
    valueHeaderText: PropTypes.string,
}

DataShow.defaultProps = {
    nameHeaderText: '設備',
    valueHeaderText: '數值'
};

export default DataShow;