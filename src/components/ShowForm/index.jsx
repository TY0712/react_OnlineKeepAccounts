import React, { Component } from 'react'
import { Tooltip, Progress, DatePicker, Select, Divider } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.css'
const { Option } = Select;
export default class index extends Component {
    state = {
        userAccount: [],
        billList: 99,
        chooseYear: 2021,
        chooseMonth: 0,
        payNum: 0,
        payMoney: 0,
        paySorts: [],
        notpayNum: 0,
        notpayMoney: 0,
        notpaySorts: [],
    }
    onChange1 = (value) => {
        // 账户
        // console.log(value);
        this.setState({ billList: value.value })
        axios.post("https://qcdfa6.fn.thelarkcloud.com/ShowMonthForm", {
            "userId": this.props.match.params.userId,
            "billList": value.value,
            "payYear": this.state.chooseYear,
            "payMonth": this.state.chooseMonth
        }).then(
            res => {
                // console.log(res.data)
                this.setState({
                    payNum: res.data.payBillNum,
                    payMoney: res.data.payBillMoney,
                    paySorts: res.data.sorts
                })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post("https://qcdfa6.fn.thelarkcloud.com/ShowMonthForm2", {
            "userId": this.props.match.params.userId,
            "billList": value.value,
            "payYear": this.state.chooseYear,
            "payMonth": this.state.chooseMonth
        }).then(
            res => {
                // console.log(res.data)
                this.setState({
                    notpayNum: res.data.notpayBillNum,
                    notpayMoney: res.data.notpayBillMoney,
                    notpaySorts: res.data.sorts
                })
            },
            err => {
                console.log("失败", err)
            }
        )
    }

    onChange2 = (date, dateString) => {
        var ChooseTime = dateString
        this.setState({ chooseYear: Number(ChooseTime.substring(0, 4)) })
        this.setState({ chooseMonth: Number(ChooseTime.substring(5, 7)) })
        axios.post("https://qcdfa6.fn.thelarkcloud.com/ShowMonthForm", {
            "userId": this.props.match.params.userId,
            "billList": this.state.billList,
            "payYear": Number(ChooseTime.substring(0, 4)),
            "payMonth": Number(ChooseTime.substring(5, 7))
        }).then(
            res => {
                // console.log(res.data)
                this.setState({
                    payNum: res.data.payBillNum,
                    payMoney: res.data.payBillMoney,
                    paySorts: res.data.sorts
                })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post("https://qcdfa6.fn.thelarkcloud.com/ShowMonthForm2", {
            "userId": this.props.match.params.userId,
            "billList": this.state.billList,
            "payYear": Number(ChooseTime.substring(0, 4)),
            "payMonth": Number(ChooseTime.substring(5, 7))
        }).then(
            res => {
                // console.log(res.data)
                this.setState({
                    notpayNum: res.data.notpayBillNum,
                    notpayMoney: res.data.notpayBillMoney,
                    notpaySorts: res.data.sorts
                })
            },
            err => {
                console.log("失败", err)
            }
        )
    }
    UNSAFE_componentWillMount() {
        //更新状态
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/QueryUserAccount',
            {
                "userId": this.props.match.params.userId
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

    render() {
        const { userAccount, payNum, payMoney, paySorts, notpayNum, notpayMoney, notpaySorts } = this.state;
        return (
            <div>
                <div className="select-title">
                    <div>筛选：</div>
                    <Select labelInValue style={{ width: 120 }} onChange={this.onChange1} placeholder="选择账户">
                        <Option value={99} key={99}>全部账户</Option>
                        {
                            userAccount.map(userAcc => {
                                return (
                                    <Option value={userAcc.id} key={userAcc._id}>{userAcc.accountname}</Option>
                                )
                            })
                        }
                    </Select>
                    <div style={{ width: "10px" }}></div>
                    <DatePicker onChange={this.onChange2} picker="month" allowClear={false} placeholder="选择月份" />
                </div>

                <div className="expenditure">
                    <h2 style={{ marginLeft: "30px", marginTop: "10px" }}>我支出的：</h2>
                    <h3 style={{ color: '#A9A9A9', marginTop: "10px" }}>共计{payNum}笔 ，合计</h3>
                </div>
                <div className="expenditure-money">
                    ￥{payMoney}
                </div>
                <Divider orientation="left" plain>
                    支出分类
                </Divider>

                {paySorts.map(Sorts => {
                    return (
                        <div className="expenditure-category" key={Sorts.key}>
                            <div className="category-icon">
                                <div style={{ fontSize: 30 }}>{Sorts.key + 1}</div>
                            </div>
                            <div className="category-list">
                                <div className="category-list-title">
                                    <div>{Sorts.payCategory}</div>
                                    <div className="list-title-money">￥{Sorts.Sum}</div>
                                </div>
                                <div>
                                    <Tooltip >
                                        <Progress percent={Number(Sorts.Sum / payMoney * 100).toFixed(1)} status={'normal'} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="expenditure">
                    <h2 style={{ marginLeft: "30px", marginTop: "10px" }}>我收入的：</h2>
                    <h3 style={{ color: '#A9A9A9', marginTop: "10px" }}>共计{notpayNum}笔 ，合计</h3>
                </div>
                <div className="expenditure-money">
                    ￥{notpayMoney}
                </div>
                <Divider orientation="left" plain>
                    收入分类
                </Divider>
                <div className="income-list">
                    {notpaySorts.map(incomeSorts => {
                        return (

                            <div className="income-box" key={incomeSorts.key}>
                                <div><Progress type="circle" percent={Number(incomeSorts.Sum / notpayMoney * 100).toFixed(1)} status={'normal'} /></div>
                                <div>{incomeSorts.payCategory}</div>
                                <div>￥{incomeSorts.Sum}</div>
                            </div>

                        )
                    })}
                </div>
                <div className="list-bottom" />
            </div>
        )
    }
}
