import React, { Component } from 'react'
import { Select, InputNumber, DatePicker, TimePicker, Input, Button, message } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.css'

const { TextArea } = Input;
const { Option } = Select;
const format = 'HH:mm';
export default class index extends Component {
    //初始化状态
    state = {
        userAccount: [],
        isPay: "",
        payCategory: "",
        billList: "",
        amountSpent: "",
        payHour: "",
        payDate: "",
        payMonth: "",
        payYear: "",
        remarks: ""
    };
    onChange1 = (value) => {
        // 账单支出还是收入
        //console.log(value.value);
        this.setState({ isPay: value.value })
    }
    onChange2 = (value) => {
        // 账单分类
        // console.log(value.label);
        this.setState({ payCategory: value.label})
    }
    onChange3 = (value) => {
        // 账户
        // console.log(value);
        this.setState({ billList: value.value })
    }
    onChange4 = (value) => {
        // 金额
        // console.log(value);
        this.setState({amountSpent: value })
    }
    onChange5 = (value) => {
        // 年月日
        var date = new Date(value._d)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        // console.log( year +"/"+month+"/"+day);
        this.setState({
            payYear: year,
            payMonth: month,
            payDate: day
        })
    }
    onChange6 = (value) => {
        // 时间
        var date = new Date(value._d)
        var hour = date.getHours();
        var minute = date.getMinutes();
        // console.log( hour+"/"+ minute);
        this.setState({
            payHour: hour + ":" + minute
        })
    }
    onChange7 = (value) => {
        // 备注
        // console.log(value.target.value);
        this.setState({ remarks: value.target.value })
    }
    submitForm = (event) => {
        event.preventDefault()
        const { isPay, payCategory, billList, amountSpent, payHour, payDate, payMonth, payYear, remarks } = this.state
        if (isPay === "") {
            message.warning('账单类型没有填哦！');
        }
        else if (payCategory === "") {
            message.warning('账单分类没有填哦！');
        }
        else if (billList === "") {
            message.warning('账单账户没有填哦！');
        }
        else if (amountSpent === "") {
            message.warning('账单金额没有填哦！');
        }
        else if (payYear === "") {
            message.warning('账单日期没有填哦！');
        }
        else if (payHour === "") {
            message.warning('账单时间没有填哦！');
        }
        else {
            axios.post("https://qcdfa6.fn.thelarkcloud.com/AddBill", {
                "userId":  this.props.match.params.userId,
                "isPay": isPay,
                "amountSpent": amountSpent,
                "remarks": remarks,
                "billList":  billList,
                "payCategory": payCategory,
                "payYear":  payYear,
                "payMonth": payMonth,
                "payDate": payDate,
                "payHour": payHour
            }).then(res => {
                message.success('提交成功！');
                console.log(res.data)
            },
            err => {
                message.error('提交失败！');
                console.log("错误："+err)
            })
        }
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
        const { userAccount } = this.state;
        return (
            <div className="addbill-list">
                <div>账单：
                    <Select labelInValue style={{ width: 120 }} onChange={this.onChange1}>
                        <Option value={true}>支出</Option>
                        <Option value={false}>收入</Option>
                    </Select>
                </div>
                <div>分类：
                    <Select labelInValue style={{ width: 120 }} onChange={this.onChange2}>
                        <Option value={0}>餐饮</Option>
                        <Option value={1}>交通</Option>
                        <Option value={2}>购物</Option>
                        <Option value={3}>居家</Option>
                        <Option value={4}>人情</Option>
                        <Option value={5}>医疗</Option>
                        <Option value={6}>娱乐</Option>
                        <Option value={7}>学习</Option>
                        <Option value={8}>工资</Option>
                        <Option value={9}>其他</Option>
                    </Select>
                </div>
                <div>账户：
                    <Select labelInValue style={{ width: 120 }} onChange={this.onChange3}>
                        {
                            userAccount.map(userAcc => {
                                return (
                                    <Option value={userAcc.id} key={userAcc._id}>{userAcc.accountname}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div >金额：（RMB）
                    <InputNumber min={0.01} max={10000000} defaultValue={0} onChange={this.onChange4} precision={2} size={'middle'} step={0.1} />
                </div>
                <div>日期：
                    <DatePicker onChange={this.onChange5} allowClear={false} inputReadOnly={true}/>
                </div>
                <div>时间：
                    <TimePicker format={format} onChange={this.onChange6} allowClear={false} inputReadOnly={true}/>
                </div>
                <div>备注：
                    <TextArea placeholder="备注（最大10字" onChange={this.onChange7} maxLength={10}  />
                </div>
                <div>
                    <Button type="primary" size={'large'} shape="round" icon={<TransactionOutlined />} onClick={this.submitForm}>
                        提 交 账单
                    </Button>
                </div>
            </div>
        )
    }
}
