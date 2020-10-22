import React, { Component } from 'react'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Hello World 2</h1>

                {/* <button onClick={() => {
                    this.addNewTransaction();
                }}>Add New Transaction</button>

                <button onClick={() => {
                    this.addNewPeer();
                }}>Add New Peer</button>

                <button onClick={() => {
                    this.getTransactions();
                }}>Check Pending Transactions</button>

                <button onClick={() => {
                    this.getChain();
                }}>Get Chain Info</button>

                <button onClick={() => {
                    this.mine();
                }}>Mine</button> */}
            </div>
        )
    }
}

export default MainPage