import React, { Component } from 'react';
import CreditInfo from "./CreditInfo";
import './App.css';

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


  updateScore = () => {
    var score = this.state.list
      .filter((i) => i.active)
      .map((i) => 1)
      .reduce((p, c) => p + c, 0)
    this.setState({ score })
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
        <header className="App-header">
          <h1 className="App-title">TrustMe</h1>
          <h2>{this.props.data.name}</h2>
          <h2>{this.state.score}</h2>
        </header>
        <div>
          {
            this.state.list.map(({ ci, active }, i) =>
              <CreditInfo key={i}
                creditInfo={ci}
                handleActivityChange={(ci, active) => this.setActive(ci, i, active)}
                active={active}
              />)
          }
        </div>
      </div>
    );
  }
}

export default App;
