import React, { Component } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css'
import { UserOutlined, CreditCardOutlined, PieChartOutlined, FileOutlined, AccountBookOutlined, SolutionOutlined } from '@ant-design/icons';
import './App.css'
import addBill from './components/addBill/index'
import addAccount from './components/addAccount/index'
import UserAccount from './components/UserAccount/index'
import ShowForm from './components/ShowForm/index'
import ShowYear from './components/ShowYear/index'
import Sign from './components/Sign/Sign'
import { Link, Route, Switch } from "react-router-dom"

const { SubMenu } = Menu;
const { Content, Footer, Header } = Layout;

export default class App extends Component {
    state = {
        userId: "",
    };

    componentDidMount() {
        //更新状态
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/QueryUserAccount',
            {
                "userId": "60ee9ddfdcda740009c07ac1"
            }
        ).then(
            res => {
                // console.log(res.data)
                this.setState({ userAccount: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )

    }
    getChildrenMsg = (result) => {
        this.setState({
            userId: result
        })
    }
    render() {
        const { userId} = this.state;
        return (
            <Layout >
                <Header>
                    <div className="logo">
                        <AccountBookOutlined className="logoIco" />在线记账网
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['addBill']} mode="horizontal" >
                        <Menu.Item key="addBill" icon={<FileOutlined />}>
                            <Link key="addBill1" to={`/addBill/${userId}`}>
                                增加账单
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='userAccount' icon={<UserOutlined />}>
                            <Link key="UserAccount1" to={`/userAccount/${userId}`}>个人账户</Link>
                        </Menu.Item>
                        <Menu.Item key="addAccount" icon={<CreditCardOutlined />}>
                            <Link key="addAccount1" to={`/addAccount/${userId}`}>
                                增加账户
                            </Link>
                        </Menu.Item>
                        <SubMenu key="form" icon={<PieChartOutlined />} title="报表">
                            <Menu.Item key="form1" >
                                <Link key="form11" to={`/ShowYear/${userId}`}>
                                    年报表
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="form2" >
                                <Link key="form21" to={`/ShowForm/${userId}`}>
                                    月报表
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="Signin" icon={<SolutionOutlined />}>
                            <Link key="Signin1" to={`/Sign`}>
                                登录
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Layout className="site-layout" >

                    <Content style={{ margin: '0 10px' }}>
                        <div className="site-layout-background" style={{ minHeight: 300 }}>
                            <Switch>
                                <Route path="/addBill/:userId" component={addBill}></Route>
                                <Route path="/addAccount/:userId" component={addAccount}></Route>
                                <Route path="/UserAccount/:userId" component={UserAccount}></Route>
                                <Route path="/ShowYear/:userId" component={ShowYear}></Route>
                                <Route path="/ShowForm/:userId" component={ShowForm}></Route>
                                <Route path="/Sign" render={() => {
                                    return (
                                        <Sign gechildrenmsg={this.getChildrenMsg.bind(this)} />)
                                }}>
                                </Route>
                            </Switch>
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>欢迎使用在线记账网站！！记得先登录哦！</Footer>
                </Layout>
            </Layout >
        );
    }
}
