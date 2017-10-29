import React, { Component } from 'react';
import './CreditInfo.css';
import { ToggleButton, ListGroupItem, Modal, Button, Table } from 'react-bootstrap';


class CreditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            accountData: [{ amount: 1200, category: "Computers", date: "2017-12-3" }]
        }
    }
    toggleCheckboxChange = () => {
        this.props.handleActivityChange(this.props.creditInfo, !this.props.active)
    }

    getDataString = (data) => {
        var formatAmount = (amount) => amount.formatMoney(2)+ "DKK"
        
        if (data.total) return formatAmount(data.total)
        if (data.pay) return formatAmount(data.pay)
        if (data.monthlySavings) return formatAmount(data.monthlySavings)
        if (data.birth_date) return data.birth_date.getUTCFullYear()
        if (data.daysSinceLastMissed) {
            if (data.daysSinceLastMissed == Infinity)
                return "never missed a payment"
            return data.daysSinceLastMissed + " days since last missed payment"
        }
    }

    close = () => {
        this.setState({ showModal: false })
    }

    setAccountData = (data) => {
        function mapper(o){
            return {amount: o.FIELD4, category: o.FIELD5, date: o.FIELD7}
        }
        data.then((v) => {
            v.shift()
            v = v.filter((o) => o.FIELD7)
            this.setState({showModal: true, accountData: v.map(mapper)})
        })
    }

    showUrlInModal = (url) => {
        fetch(url).then((response) => this.setAccountData(response.json()))
    }

    render() {
        return <tr>
            <td>{this.props.creditInfo.name}</td>
            <td className="dataColumn">

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payroll Account Transactions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered condensed hover>
                            <thead><tr><th>Amount</th><th>Category</th><th>Date</th></tr></thead>
                            <tbody>
                                {
                                    this.state.accountData.map((transaction) =>
                                        <tr><td className="dataColumn">{transaction.amount}</td><td>{transaction.category}</td><td>{transaction.date}</td></tr>
                                    )}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {this.props.creditInfo.data.url ? <a onClick={() => this.showUrlInModal(this.props.creditInfo.data.url)}>{this.getDataString(this.props.creditInfo.data)}</a> : this.getDataString(this.props.creditInfo.data)}
            </td>
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
