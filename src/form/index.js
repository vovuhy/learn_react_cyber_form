import React, { useEffect, useMemo, useState } from 'react'
import { Button, Input, Col, Row, Divider, Table, Space, Popconfirm, message } from 'antd';
import { connect } from "react-redux";
import { actDeleteSV, actSubmitSV, actEditSV } from "./../store/actions"



function Form(props) {
    console.log(1);

    const [masv, setMasv] = useState(props.svEdit.masv || '')
    const [validMasv, setValidMasv] = useState('error')
    const [name, setName] = useState(props.svEdit.name || '')
    const [sdt, setSdt] = useState(props.svEdit.sdt || '')
    const [email, setEmail] = useState(props.svEdit.email || '')
    const [search, setSearch] = useState('')


    useEffect(() => {
        setMasv(props.svEdit.masv)
        setName(props.svEdit.name)
        setSdt(props.svEdit.sdt)
        setEmail(props.svEdit.email)
    }, [props.svEdit])


    const handleSubmit = () => {
        let sv = { masv, name, sdt, email }
        props.actSubmitSV(sv)
    }

    const handleChangeMasv = (masv) => {
        if (props.listSV.find(sv => sv.masv === masv || masv.length === 0)) {
            setValidMasv('error')
            setMasv(masv)
        } else {
            setValidMasv(null)
            setMasv(masv)
        }
    }


    const columns = useMemo(() => {
        return [
            {
                title: 'Mã SV',
                dataIndex: 'masv',
                key: 'masv',
            },
            {
                title: 'Họ Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'sdt',
                key: 'sdt',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button type="primary" size='small' onClick={() => { props.actEditSV(record.masv) }}>Sửa</Button>
                        <Popconfirm
                            title="Xóa sinh viên"
                            description={`Bạn thật sự muốn xóa sinh viên tên '${record.name}' này?`}
                            onConfirm={()=>{
                                props.actDeleteSV(record.masv)
                                message.success(`Đã xóa sinh viên ${record.name}`);
                        }}
                            onCancel={()=>{message.error('Hủy tác vụ xóa');}}
                            okText="Xóa"
                            cancelText="Không"
                        >
                            <Button size='small' danger>Xóa</Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
    }, [])
    const dataList = useMemo(() => {
        return props.listSV.map((x) => { return { ...x, key: x.masv } }).filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    }, [search,props.listSV])

    return (
        <>
            <Row gutter={[16, 10]}>
                <Col span={12}>
                    <p><b>Mã sinh viên</b></p>
                    <Input placeholder='Mã sinh viên' status={validMasv} value={masv}
                        onChange={(e) => { handleChangeMasv(e.target.value) }}
                        disabled={props.svEdit.masv ? true : false} />
                    <p><b>Số điện thoại</b></p>
                    <Input placeholder='Số điện thoại' value={sdt} onChange={(e) => { setSdt(e.target.value) }} />
                </Col>

                <Col span={12}>
                    <p><b>Họ và tên</b></p>
                    <Input placeholder='Họ và tên' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <p><b>Email</b></p>
                    <Input placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Col>

                <Col span={24}>
                    {props.svEdit.masv ? <Button type='primary' onClick={handleSubmit} >Sửa sinh viên</Button> : <Button type='primary' disabled={validMasv ? true : false} style={{ backgroundColor: '#389e0d' }} onClick={handleSubmit} >Thêm sinh viên</Button>}
                </Col>
            </Row>
            <Divider orientation="left" >
                Danh sách sinh viên
            </Divider>
            <Row gutter={[16, 10]}>
                <Col span={6}>
                    <Button type='primary' style={{ backgroundColor: '#389e0d' }} onClick={() => { props.actEditSV(null) }}>Thêm</Button>
                </Col>
                <Col span={12}>
                </Col>
                <Col span={6}>
                    <Input.Search placeholder='Tìm theo họ tên' onChange={(e) => { setSearch(e.target.value) }} />
                </Col>
                <Col span={24}>
                    <Table columns={columns} size='small' dataSource={dataList} />
                </Col>
            </Row>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        listSV: state.svReducer.listSV,
        svEdit: state.svReducer.svEdit,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        actDeleteSV: (masv) => {
            dispatch(actDeleteSV(masv))
        },
        actSubmitSV: (sv) => {
            dispatch(actSubmitSV(sv))
        },
        actEditSV: (masv) => {
            dispatch(actEditSV(masv))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form)