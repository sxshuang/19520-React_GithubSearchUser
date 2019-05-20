import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Main extends React.Component {

    static propTypes = {
        searchName: PropTypes.string.isRequired
    }
    state = {
        initView: true,
        loading: false,
        users: null,
        errorMsg: null
    }
    // 当组件接收新的属性时回调
    componentWillReceiveProps(newProps) {//指定了新的searchName，需要发请求
        const { searchName } = newProps
        // 发送请求前，先更新状态(请求中)
        this.setState({
            initView: false,
            loading: true
        })
        // 发送请求   https://api.github.com/search/users?q=
        const url = `https://api.github.com/search/users?q=${searchName}`
        axios.get(url).then(response => {
            // 得到相应数据
            const result = response.data
            // console.log(result)
            const users = result.items.map(item => {
                // map遍历方法，是遍历一个数组，返回一个新数组，因为在组件中，用的对象属性名
                // 跟得到的数据的属性名，不一样，又不想去组件中改，所以用map函数，用自己的定义的名字当做新数组中每一个对象的属性名
                return {
                    name: item.login,
                    url: item.html_url,
                    avatarUrl: item.avatar_url
                }
            })
            // 更新状态（成功）
            this.setState({
                loading: false,
                users: users
            })

        })
            .catch(error => {
                // 更新状态（失败）
                this.setState({
                    loading: false,
                    errorMsg: error.message
                })

            })

    }
    render() {
        const { initView, loading, users, errorMsg } = this.state;
        const { searchName } = this.props
        if (initView) {
            return <h2>请输入关键字搜索:{searchName}</h2>
        } else if (loading) {
            return <h2>正在请求中...</h2>
        } else if (errorMsg) {
            return <h2>{{ errorMsg }}</h2>
        } else {
            return (
                <div className="row">
                    {
                        users.map((user, index) => {
                            return (
                                <div className="card" key={index}>
                                    <a href={user.url} target="_blank">
                                        <img src={user.avatarUrl} style={{ width: '100px' }} />
                                    </a>
                                    <p className="card-text">{user.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}