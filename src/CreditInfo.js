import React, { Component } from 'react';
import './CreditInfo.css';
import { ToggleButton, ListGroupItem } from 'react-bootstrap';


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
        return <tr>
            <td>{this.props.creditInfo.name}</td>
            <td class="dataColumn">{this.getDataString(this.props.creditInfo.data)}</td>
            <td>
                <input
                    type="checkbox"
                    value="active"
                    checked={this.props.active}
                    onChange={this.toggleCheckboxChange}
                />
            </td>
        </tr>
    }
}

export default CreditInfo
