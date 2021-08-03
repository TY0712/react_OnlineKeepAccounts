import React, { Component } from 'react'
import { Input, Button, message} from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import axios from 'axios'
import 'antd/dist/antd.css'
import './index.css'
export default class index extends Component {
    state = {
        accountname: ""
    };
    onChange = (value) => {
        this.setState({accountname: value.target.value })
    }
    submitForm = (event) => {
        event.preventDefault()
        const { accountname } = this.state
        if (accountname === "") {
            message.warning('账户名字没有填哦！');
        }
        else {
            axios.post("https://qcdfa6.fn.thelarkcloud.com/AddUserAccount", {
                "userId":  this.props.match.params.userId,
                "accountname":accountname
            }).then(res => {
                if(res.data===2){
                    message.warning('该账户已经有了哦！');
                }
                if(res.data===1){
                    message.success('提交成功！');
                }
            },
            err => {
                message.error('提交失败！');
                console.log("错误："+err)
            })
        }
    }
    render() {
        return (
            <div className="add-account-center">
                
                <div className="account-center-input">
                <div className="center-input-title">名称：</div>
                    <Input placeholder="新账户名称(5字内)" size={'large'} maxLength={5} onChange={this.onChange} />
                </div>
                <div>
                    <Button type="primary" size={'large'} shape="round" icon={<UsergroupAddOutlined />} onClick={this.submitForm}>
                        保 存 账 户
                    </Button>
                </div>
            </div>
        )
    }
}
