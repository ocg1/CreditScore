import React, { Component } from 'react';
import './CreditInfo.css';

class CreditInfo extends Component {
    toggleCheckboxChange = () => {
        this.props.handleActivityChange(this.props.creditInfo, !this.props.active)
    }

    getDataString = (data) => {
        if(data.total) return data.total
        if(data.pay) return data.pay
        if(data.monthlySavings) return data.monthlySavings
        if(data.birth_date) return "year:" + data.birth_date.getUTCFullYear()
        if(data.daysSinceLastMissed){

            if(data.daysSinceLastMissed == Infinity)
                return  "never missed a payment"
            return data.daysSinceLastMissed + " days since last missed payment"
        }
    }

    render() {
        return <div className="CreditInfoRow">
            <p>{this.props.creditInfo.name}</p>
            <p>{this.getDataString(this.props.creditInfo.data)}</p>
            <input
                type="checkbox"
                value="active"
                checked={this.props.active}
                onChange={this.toggleCheckboxChange}
            />
        </div>
    }
}

export default CreditInfo
