import React, { Component } from 'react';

class CreditInfo extends Component {
    toggleCheckboxChange = () => {
        var active = !this.props.active
        this.props.handleActivityChange(this.props.creditInfo, active)
    }

    render() {
//        console.log(this.props)
        return <div>
            <p>{this.props.creditInfo.name}</p>
            <input
                type="checkbox"
                value={""}
                checked={this.props.active}
                onChange={this.toggleCheckboxChange}
            />
        </div>
    }
}

export default CreditInfo
