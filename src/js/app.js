import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MainPage from './MainPage'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Entire DOM mounted");
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <MainPage></MainPage>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('content')
);