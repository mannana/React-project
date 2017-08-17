import React from 'react';
import HeaderUiComponent from './header_ui.js';
import {notification} from 'antd';
import {connect} from 'react-redux';
class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedKey: "",
            showModal: false
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModelToggle = this.handleModelToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegSubmit = this.handleRegSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
		notification.open({
		    message: '退出成功',
		    description: '欢迎再来',
		});

		this.props.handleLogout();
	}
    componentDidMount() {
        if (!this.props.categories.length) {
            fetch('/category.json')
            .then((response) => response.json())
            .then((json) => {
                let categories = json.data.categories;
                this.props.changeCategories(categories);
            })
            .catch((ex) => {
                console.log('parsing failed', ex)
            })
        }

    }
    handleSelect(params) {
        this.setState({
            selectedKey: params.key
        })
    }

    handleModelToggle(){
        this.setState({
            showModal: !this.state.showModal
        })
    }
    handleSubmit(){
        notification.open({
            message:'登录成功',
            description: '最近有***11折活动，欢迎大家积极参与'
        });
        this.setState({
            showModal: false
        })
        this.props.handleLogin();
    }
    handleRegSubmit(){
        notification.open({
            message:'注册成功',
            description: '马上登陆'
        });
        this.setState({
            showModal: false
        })
    }
    render(){
        return(
            <HeaderUiComponent {...this.state} categories={this.props.categories} login={this.props.login} handleLogout={this.handleLogout} handleSubmit={this.handleSubmit}  handleRegSubmit={this.handleRegSubmit} handleModelToggle={this.handleModelToggle} handleSelect={this.handleSelect}/>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)

//state 指的是store里面的state，实际上就是store里面的数据
// props指的就是组件的props
function mapStateToProps(state,ownProps){
    return {
        login: state.login,
        title: ownProps.title,
        categories: state.categories
    }
}
//把对store的操作函数，映射到props中
function mapDispatchToProps(dispatch){
    return{
        changeCategories:function(categories){
            let action = {
                type: "CHANGE_CATEGORIES",
                values: categories
            }
            dispatch(action);
        },
        handleLogout:function() {
            let action = {
                type: "LOGOUT"
            }
            dispatch(action);
        },
        handleLogin: function(){
            let action = {
                type: "LOGIN"
            }
            dispatch(action);
        }
    }
}
