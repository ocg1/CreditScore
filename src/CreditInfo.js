import React, { Component } from 'react';
import './CreditInfo.css';

class CreditInfo extends Component {
    toggleCheckboxChange = () => {
        this.props.handleActivityChange(this.props.creditInfo, !this.props.active)
    }

    render() {
        return <div class="CreditInfoRow">
            <p>{this.props.creditInfo.name}</p>
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
