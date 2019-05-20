import React, { Component } from 'react';

// 引入search 和 main 子组件
import Search from './search.jsx'
import Main from './main.jsx'

export default class App extends Component {
    state = {
        searchName: ''
    }
    setSearchName = (searchName) => {
        // 更新状态
        this.setState({
            searchName: searchName
        })
    }
    render() {
        return (
            <div className="container">
                <Search setSearchName={this.setSearchName} />
                <Main searchName={this.state.searchName} />

            </div>
        )
    }
}