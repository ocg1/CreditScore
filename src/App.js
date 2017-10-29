import React, { Component } from 'react';
import CreditInfo from "./CreditInfo";
import './App.css';
import { PageHeader, ListGroup, Panel, Table, Nav, NavItem, Navbar } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.data.creditInfos.map((ci) => ({ ci: ci, active: true }))
    }
  }

  componentDidMount() {
    this.updateScore()
  }

  calculateKindContribution = ({ kind, data }) => {
    switch (kind) {
      case "PAYSLIP":
        return data.pay
      case "ACCOUNT":
        return 0
      default:
        console.log("unknown data kind " + kind)
        return 0
    }
  }

  tryGetActiveData = (kind) => {
    var d = this.state.list.find((c) => c.ci.kind === kind && c.active)
    return d ? d.ci : undefined
  }

  tryGetAge = () => {
    var birthCert = this.tryGetActiveData("BIRTH_CERTIFICATE")
    if (birthCert) {
      var birth_date = birthCert.data.birth_date
      return 2017 - birth_date.getUTCFullYear()
    }
  }

  pensionScore = () => {
    var age = this.tryGetAge()
    const SAVING_START_AGE = 25
    const RETIREMENT_AGE = 67
    const RETIREMENT_SAVINGS_GOAL = 2000000
    var pension = this.tryGetActiveData("PENSION")
    if (age && pension && age > SAVING_START_AGE) {
      var savingYears = age - SAVING_START_AGE
      var target = savingYears * (RETIREMENT_SAVINGS_GOAL / (RETIREMENT_AGE - SAVING_START_AGE))

      var diff = pension.data.total - target
      return diff
    }
    return 0
  }

  monthlySavings = () => {
    var accountMonthlySavings = this.tryGetActiveData("ACCOUNT")
    return accountMonthlySavings ? accountMonthlySavings.data.monthlySavings : 0
  }

  payPreTax = () => {
    var pay = this.tryGetActiveData("PAYSLIP")
    return pay ? pay.data.pay : 0
  }

  assets = () => {
    var assets = this.tryGetActiveData("ASSETS")
    return assets ? assets.data.total : 0
  }

  debt = () => {
    var assets = this.tryGetActiveData("DEBT")
    return assets ? assets.data.total : 0
  }

  daysSinceLastMissed = () => {
    var days = this.tryGetActiveData("DAYS_SINCE_LAST_MISSED")
    return days ? days.data.daysSinceLastMissed : 100
  }

  updateScore = () => {
    const DEBT_FACTOR = -1
    const DAYS_SINCE_LAST_MISSED_CUTOFF = 90
    const DAYS_SINCE_LAST_MISSED_PENALTY = -100000

    var list = this.state.list
    var age = this.tryGetAge()
    // var score = this.state.list
    //   .filter((i) => i.active)
    //   .map((k) => this.calculateKindContribution(k.ci))
    //   .reduce((p, c) => p + c, 0)
    var score = 0
    score += this.pensionScore()
    score += this.monthlySavings()
    score += this.payPreTax()
    score += DEBT_FACTOR * this.debt()
    score += this.assets()
    console.log("this.daysSinceLastMissed()", this.daysSinceLastMissed())
    score += this.daysSinceLastMissed() < DAYS_SINCE_LAST_MISSED_CUTOFF ? DAYS_SINCE_LAST_MISSED_PENALTY : 0

    score = Math.round(score)
    var completeness = list.filter((i) => i.active).length / list.length;
    this.setState({ score, age, completeness })
  }

  setActive = (creditInfo, i, active) => {
    var list = [...this.state.list]
    list[i].active = active
    this.setState({ list })
    this.updateScore()
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              TrustMe
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav>
            <NavItem>Add data source</NavItem>
          </Nav>
          <Nav pullRight>
            <Navbar.Text>Score {this.state.score}</Navbar.Text>
            <Navbar.Text>Completeness {Math.round(this.state.completeness * 100)}%<meter value={this.state.completeness} min="0" max="1">{Math.round(this.state.completeness * 100)}</meter></Navbar.Text>
            <Navbar.Text>{this.props.data.name}{this.state.age ? `(${this.state.age})` : ""}</Navbar.Text>
          </Nav>
        </Navbar>
        <Table striped bordered condensed hover>
          <thead><tr><th>Data</th>
            <th>Value</th>
            <th>Revealed</th></tr></thead>
          <tbody>
            {
              this.state.list.map(({ ci, active }, i) =>
                <CreditInfo key={i}
                  creditInfo={ci}
                  handleActivityChange={(ci, active) => this.setActive(ci, i, active)}
                  active={active}
                />)
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
