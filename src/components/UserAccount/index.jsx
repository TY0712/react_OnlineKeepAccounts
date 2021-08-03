import React, { Component } from 'react'
import axios from 'axios'
import { Select, Table, Button, message, Statistic, Descriptions, Modal, InputNumber, Row, PageHeader, Progress } from 'antd';
import 'antd/dist/antd.css'
import './index.css'
const { Option } = Select;
const columns = [
    {
        title: '分类',
        width: 70,
        dataIndex: 'payCategory'
    },
    {
        title: '金额',
        dataIndex: 'amountSpent',
        sorter: {
            compare: (a, b) => a.amountSpent - b.amountSpent,
            multiple: 5,
        },
    },
    {
        title: '年',
        dataIndex: 'payYear',
        sorter: {
            compare: (a, b) => a.payYear - b.payYear,
            multiple: 4,
        },
    },
    {
        title: '月',
        dataIndex: 'payMonth',
        sorter: {
            compare: (a, b) => a.payMonth - b.payMonth,
            multiple: 3,
        },
    },
    {
        title: '日',
        dataIndex: 'payDate',
        sorter: {
            compare: (a, b) => a.payDate - b.payDate,
            multiple: 2,
        },
    },
    {
        title: '时间',
        dataIndex: 'payHour',
    },
    {
        title: '备注',
        dataIndex: 'remarks'
    },
    // {
    //     title: 'operation',
    //     dataIndex: 'operation',
    //     render: (_, record) => {
    //         const editable = isEditing(record);
    //         return editable ? (
    //             <span>
    //                 <a href="javascript:;" onClick={() => save(record.key)} 
    //                 style={{marginRight: 8,}}>
    //                     保存
    //                 </a>
    //                 <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //                     <a>取消</a>
    //                 </Popconfirm>
    //             </span>
    //         ) : (
    //             <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
    //                 编辑
    //             </Typography.Link>
    //         );
    //     },
    // }

];

export default class index extends Component {
    state = {
        userAccount: [],
        billList: [],
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        AccountNotPay: 0,
        AccountPay: 0,
        values: { value: 0 },
        setVisible: false,
        setConfirmLoading: false,
        planMoney: 0,
        setplan: 0,
        showElem:false
    }

    componentDidMount() {
        //更新状态
        var that = this
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
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowAccount',
            {
                "userId": this.props.match.params.userId,
                "billList": 0
            }
        ).then(
            res => {
                // console.log(res.data)
                that.setState({ billList: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowCalAccountNotPay',
            {
                "userId": this.props.match.params.userId,
                "billList": 0
            }
        ).then(
            res => {
                // console.log(res.data)
                that.setState({ AccountNotPay: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowCalAccountPay',
            {
                "userId": this.props.match.params.userId,
                "billList": 0
            }
        ).then(
            res => {
                // console.log(res.data)
                that.setState({ AccountPay: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/CheckPlan',
            {
                "userId": this.props.match.params.userId,
            }
        ).then(
            res => {
                // console.log(res.data.planmoney)
                that.setState({ planMoney: res.data.planmoney })
                if(res.data.planmoney!==0){
                    this.setState({showElem:true})
                }
                else{
                    this.setState({showElem:false})
                }
                
            },
            err => {
                console.log("失败", err)
            }
        )

    };
    onChangeAcc = (value) => {
        // 账户
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowAccount',
            {
                "userId": this.props.match.params.userId,
                "billList": value.value
            }
        ).then(
            res => {
                // console.log(res.data)
                this.setState({ billList: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowCalAccountNotPay',
            {
                "userId": this.props.match.params.userId,
                "billList": value.value
            }
        ).then(
            res => {
                // console.log(res.data)
                this.setState({ AccountNotPay: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/ShowCalAccountPay',
            {
                "userId": this.props.match.params.userId,
                "billList": value.value
            }
        ).then(
            res => {
                // console.log(res.data)
                this.setState({ AccountPay: res.data })
            },
            err => {
                console.log("失败", err)
            }
        )
    }
    start = () => {
        this.setState({ loading: true });
        console.log(this.state.selectedRowKeys[0])
        for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
            var key = this.state.selectedRowKeys[i]
            axios.post("https://qcdfa6.fn.thelarkcloud.com/DeleteBill", {
                "userId": this.props.match.params.userId,
                "key": key
            })
        }
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });

            message.success('删除成功！');
            this.onChangeAcc(this.state.values)

        }, 1000);
    };


    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    showModal = () => {
        this.setState({ setVisible: true })
    };
    handleOk = () => {
        this.setState({ setConfirmLoading: true })
        axios.post(
            'https://qcdfa6.fn.thelarkcloud.com/AddPlanMoney',
            {
                "userId": this.props.match.params.userId,
                "planMoney": Number(this.state.setplan)
              }
        ).then(
            res => {
                console.log(res.data.planmoney)
                this.setState({ planMoney: res.data.planmoney})
            },
            err => {
                console.log("失败", err)
            }
        )
        setTimeout(() => {
            this.setState({ setVisible: false })
            this.setState({ setConfirmLoading: false })
            if(this.state.planMoney!==0){
                this.setState({showElem:true})
            }
            else{
                this.setState({showElem:false})
            }
        }, 1000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({ setVisible: false })
    };
    onChangePlan = (value) => {
        // 账户
        // console.log(value);
        this.setState({ setplan: value })
    }
    render() {
        const { loading, selectedRowKeys, billList, AccountNotPay, AccountPay, userAccount
            , setConfirmLoading, setVisible, planMoney,showElem
        } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div className="user-account">
                    <Descriptions bordered column={{ xs: 1, sm: 4, md: 7 }} >
                        <Descriptions.Item label="账户" className="Statistic-style">
                            <Select labelInValue style={{ width: 120 }} onChange={this.onChangeAcc}>
                                {
                                    userAccount.map(userAcc => {
                                        return (
                                            <Option value={userAcc.id} key={userAcc._id}>{userAcc.accountname}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Descriptions.Item>
                        <Descriptions.Item label="余额" className="Statistic-style">
                            <Statistic value={AccountNotPay + AccountPay} precision={2} valueStyle={{ color: '#11aaff', fontSize: "1rem" }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="支出" className="Statistic-style">
                            <Statistic value={-AccountPay} precision={2} valueStyle={{ color: '#cf1322', fontSize: "1rem" }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="收入" className="Statistic-style">
                            <Statistic value={AccountNotPay} precision={2} valueStyle={{ color: '#3f8600', fontSize: "1rem" }} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                {showElem ? 
                    (<PageHeader >
                        <Row className="site-layout-head">
                            <div className='plan-title'>
                                <div>
                                    预算已用：{-Number(AccountPay/ planMoney * 100).toFixed(0)} %
                                </div>
                                <div>
                                    剩余：￥：{planMoney + AccountPay}
                                </div>
                            </div>
                            <div style={{ width: '90%', marginLeft: '5% ' }}>
                                <Progress percent={-Number(AccountPay/ planMoney * 100).toFixed(0)} status={'normal'} showInfo={false} strokeColor={{ '0%': '#FFD700', '100%': '#FFD700' }} />
                            </div>
                        </Row>
                    </PageHeader>):''
                }

                <div className="list-button">
                    <div >
                        <Button type="primary" onClick={this.showModal} >
                            设置预算
                        </Button>
                        <Modal
                            title="设置预算"
                            visible={setVisible}
                            onOk={this.handleOk}
                            confirmLoading={setConfirmLoading}
                            onCancel={this.handleCancel}
                        >
                            <div >金额：（RMB）
                                <InputNumber min={0} max={10000000} defaultValue={0} onChange={this.onChangePlan} precision={2} size={'middle'} step={1} />
                            </div>
                        </Modal>
                        <Button type="primary" style={{ marginLeft: 10 }} onClick={this.start} disabled={!hasSelected} loading={loading}>
                            删除
                        </Button>
                    </div>
                </div>

                <Table columns={columns} dataSource={billList} bordered={true}
                    rowSelection={rowSelection}
                    scroll={{ x: 550 }}
                >
                </Table>

            </div>
        )
    }
}
