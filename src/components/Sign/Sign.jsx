import React, { Component } from 'react'
import './Sign.css'
import { message } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'
import icons from './Webicon.png'
export default class Sign extends Component {
    state = {
        SigninUsername:'', SigninPassword: '', SignupUsername: '', SignupPassword1: '', SignupPassword2: '',
        msg: '60ee9ddfdcda740009c07ac1'
    };
    onChange1 = (value) => {
        //  console.log(value.target.value);
        this.setState({ SigninUsername: value.target.value })
    }
    onChange2 = (value) => {
        this.setState({ SigninPassword: value.target.value })
        // console.log(value.target.value)
    }
    onChange3 = (value) => {
        this.setState({ SignupUsername: value.target.value })
    }
    onChange4 = (value) => {
        this.setState({ SignupPassword1: value.target.value })
    }
    onChange5 = (value) => {
        this.setState({ SignupPassword2: value.target.value })
    }
    Signin = () => {
       
        if (this.state.SigninUsername === "") {
            message.warning('用户名不能为空！');
        }
        else if (this.state.SigninPassword === "") {
            message.warning('密码不能为空！');
        }
        else {
            axios.post(
                'https://qcdfa6.fn.thelarkcloud.com/SigninUser',
                {
                    "username": this.state.SigninUsername,
                    "password": this.state.SigninPassword,
                })
            .then(res => {
                
                // console.log(res)
                if (res.data === 0) {
                    message.warning('没有该用户！');
                }
                else if (res.data === 2) {
                    console.log(res.data)
                    message.warning('密码错误！！');
                }
                else {
                    message.success('登录成功！');
                    console.log(res.data)
                    this.props.gechildrenmsg(res.data);
                }
            },
            err => {
                message.error('提交失败！');
                console.log("错误："+err)
            });
        }

    }
    AddUser = () => {
        if (this.state.SignupUsername === "") {
            message.warning('用户名不能为空！');
        }
        else if (this.state.SignupPassword1 === "") {
            message.warning('密码不能为空！');
        }
        else if (this.state.SignupPassword2 === "") {
            message.warning('确认密码不能为空！');
        }
        else if (this.state.SignupPassword1 !== this.state.SignupPassword2) {
            message.warning('两次密码不相同！');
        }
        else {
            axios.post(
                'https://qcdfa6.fn.thelarkcloud.com/AddUser',
                {
                    "username": this.state.SignupUsername,
                    "userpassword": this.state.SignupPassword1,
                }
            ).then(function (res) {
                // 处理正常结果
                if (res.data === 0) {
                    message.warning('该用户名已注册！');
                }
                else if (res.data === 1) {
                    message.success('注册成功！');
                }
                else {
                    message.warning('注册失败！');
                }
            }).catch(function (error) {
                // 处理异常结果
                message.warning('注册失败！');
            });
        }

    }
    signUpBtn = () => {
        var addc = document.getElementById('container');
        addc.classList.add("sign-up-mode");
    };
    signInBtn = () => {
        var addc = document.getElementById('container');
        addc.classList.remove("sign-up-mode");
    };
    render() {
       
        return (
            <div>
                <div className='container' id="container">
                    <div className="title-box">
                        <img className="title-img" src={icons} alt="icon" />
                        <p className="title-text">在线记账</p>
                    </div>
                    <div className="forms-container">
                        <div className="signin-signup">
                            <form action="" className="sign-in-form">
                                <h2 className="title">登录</h2>
                                <div className="input-field">
                                    <p >账号：</p>
                                    <input type="text" placeholder="Username" onChange={this.onChange1} className='inputs' />
                                </div>
                                <div className="input-field">
                                    <p >密码：</p>
                                    <input type="password" placeholder="Password" onChange={this.onChange2} className='inputs' />
                                </div>

                                <input className="btn solid" onClick={this.Signin}  value="登录" type='button'></input>


                                <p className="social-text">欢迎使用 在线记账网站</p>
                            </form>

                            <form action="" className="sign-up-form">
                                <h2 className="title">注册</h2>
                                <div className="input-field">
                                    <p >账号：</p>
                                    <input type="text" placeholder="Username" onChange={this.onChange3} className='inputs' />
                                </div>
                                <div className="input-field">
                                    <p >密码：</p>
                                    <input type="password" placeholder="Password" onChange={this.onChange4} className='inputs' />
                                </div>
                                <div className="input-field">
                                    <p >重复:</p>
                                    <input type="password" placeholder="Password" onChange={this.onChange5} className='inputs' />
                                </div>
                                <input type='button' className="btn solid" onClick={this.AddUser} value="注册"></input>

                                <p className="social-text"> 欢迎使用 在线记账网站</p>
                            </form>
                        </div>
                    </div>
                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>没有账号？</h3>
                                <p>那么赶紧注册一个吧！立刻在线使用记账！</p>
                                <button className="btn transparent" onClick={this.signUpBtn} >
                                    注册
                                </button>
                            </div>
                        </div>
                        <div className="panel right-panel">
                            <div className="content">
                                <h3>有账号了？</h3>
                                <p>那么赶紧登录账号吧！立刻在线使用记账！</p>
                                <button className="btn transparent" onClick={this.signInBtn} >
                                    登录
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}
