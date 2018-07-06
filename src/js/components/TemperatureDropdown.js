import React from 'react';
import PropTypes from 'prop-types';

class TemperatureDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seletcedKey:''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.props.onChange(value);
        this.setState({seletcedKey: value});
    }

    render() {
        const { seletcedKey } = this.state;
        const { temperatures } = this.props;
        return (
            <select className="form-control ian-wauto" value={seletcedKey} onChange={this.handleChange}>
                <option>--請選擇--</option>
                {
                    temperatures.map(t=>(<option key={t.key} value={t.key}>{t.text}</option>))
                }
            </select>
      )
    }
}
TemperatureDropdown.defaultProps = {
    temperatures : [
        {'key':'t0', 'text':'T0-外氣溫度'},
        {'key':'t1', 'text':'T1-冰水主機(一)出口溫度'},
        {'key':'t2', 'text':'T2-冰水主機(二)出口溫度'},
        {'key':'t3', 'text':'T3-冷熱交換器冰水出口溫度'},
        {'key':'t4', 'text':'T4-冷熱交換器滷水出口溫度'},
        {'key':'t5', 'text':'T5-滷水(一)出口溫度'},
        {'key':'t6', 'text':'T6-滷水(二)出口溫度'},
        {'key':'t7', 'text':'T7-主機(一)冷卻水出口溫度'},
        {'key':'t8', 'text':'T8-主機(二)冷卻水出口溫度'},
        {'key':'t9', 'text':'T9-區域泵回流端(二)綜合'},
        {'key':'t10', 'text':'T10-區域泵回流端(一)建築'},
        {'key':'t11', 'text':'T11-主機(一)(二)冷卻水出口溫度'},
        {'key':'t12', 'text':'T12-入儲冰桶溫度'},
        {'key':'t13', 'text':'T13-出儲冰桶溫度'},
        {'key':'t14', 'text':'T14-區域水泵回水及水管溫度'},
        {'key':'t15', 'text':'T15-冰水泵回水及水管溫度'},
        {'key':'t16', 'text':'T16-區域水泵回水及水管溫度'},
        {'key':'t17', 'text':'T17-冰水泵回水及水管溫度'},
    ],
    onChange: (key) => { console.log(`default function get value : ${key}`)}
}

TemperatureDropdown.propTypes  = {
    onChange: PropTypes.func
}

export default TemperatureDropdown;