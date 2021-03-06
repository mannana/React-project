import React, {Component} from "react"
import {Row, Col, Menu, Icon, Button, Modal, Tabs, Form, Input} from 'antd'
import {Link} from "react-router";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

// view组件，一般只负责显示，不负责逻辑
class HeaderUiComponent extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRegSubmit = this.handleRegSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleSubmit();
			}
	    });
	}
	handleRegSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleRegSubmit();
			}
		});
	}

	render(){

		const { getFieldDecorator } = this.props.form;

		return (
			<div>
				<Row>
			    	<Col span={4}>
			    		<img className="header-img" src={require("../../../images/newlogo.png")} />
			    	</Col>
			    	<Col span={16}>
			    		<Menu mode="horizontal" onSelect={this.props.handleSelect} className="header-menu" selectedKeys={[this.props.selectedKey]}>
			    			{
			    				this.props.categories.map((value, key)=>{
			    					return (

				    						<Menu.Item key={value.id}>
											    <a href={"/cateList/"+value.cateName}>
						          				{value.name}
												</a>
						        			</Menu.Item>

					        		)
			    				})
			    			}

					    </Menu>
			    	</Col>
			    	<Col span={4}>
			    		{
			    			!this.props.login ?
			    				<Button type="primary" onClick={this.props.handleModelToggle}>登陆 / 注册</Button> :
			    				<Button type="primary" onClick={this.props.handleLogout}>退出</Button>
			    		}
			    	</Col>
			    </Row>

			    <Modal onCancel={this.props.handleModelToggle} footer={null} title="登陆 ／ 注册" visible={this.props.showModal}>
			       <Tabs type="card">
						<TabPane tab="登陆" key="1">
							<Form onSubmit={this.handleSubmit} className="login-form">
								  	<FormItem>
							        	{getFieldDecorator('username', {
							        		rules: [{ required: true, message: '用户名不得为空' }],
							        	})(
							        		<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请填写用户名" />
							        	)}
							        </FormItem>
							        <FormItem>
							        	{getFieldDecorator('password', {
							        		rules: [{ required: true, message: '请输入您的密码!' }],
							        	})(
							        		<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
							        	)}
							        </FormItem>
							        <FormItem>
							        	<Button type="primary" htmlType="submit" className="login-form-button">
							        		登陆
							        	</Button>
							        </FormItem>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form onSubmit={this.handleRegSubmit} className="reg-form">
									<FormItem>
										{getFieldDecorator('username', {
											rules: [{ required: true, message: '用户名不得为空' }],
										})(
											<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请填写用户名" />
										)}
									</FormItem>
									<FormItem>
										{getFieldDecorator('password', {
											rules: [{ required: true, message: '请输入您的密码!' }],
										})(
											<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
										)}
									</FormItem>
									<FormItem>
							          {getFieldDecorator('confirm', {
							            rules: [{required: true, message: '请确认您的密码',}],
							          })(
										  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认密码" />
   							   			)}
							        </FormItem>
									<FormItem>
										<Button type="primary" htmlType="submit" className="reg-form-button">
											注册
										</Button>
									</FormItem>
							</Form>
						</TabPane>
					</Tabs>
			    </Modal>
			</div>
		)
	}

}

export default Form.create()(HeaderUiComponent);
