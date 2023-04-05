import React from "react";
import {Button, Form} from "react-bootstrap";
import {UserApi} from "../../service/UserApi";

function LoginPage() {
    function login() {
        console.log('login');
        UserApi.login({
            email: '',
            password: '',
        })
    }

    return (
        <div>
            <div style={{
                margin: '1rem'
            }}>
                <h2>用户登录</h2>
            </div>

            <div style={{
                // 背景颜色：灰色
                backgroundColor: '#f5f5f5',
                // 从上到下排列
                display: 'flex',
                // 水平居中，垂直居中
                margin: '0 auto',
                // 内边距
                padding: '1rem',
                justifyContent: 'center',
                // 宽度：自适应内容
                width: '25rem',
                // 左侧对齐
                textAlign: 'left',
                // 圆角
                borderRadius: '1rem',
            }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>邮箱地址</Form.Label>
                        <Form.Control type="email" placeholder="输入邮箱"/>
                        <Form.Text className="text-muted">
                            我们永远不会与任何人分享您的电子邮件。
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>密码</Form.Label>
                        <Form.Control type="password" placeholder="密码"/>
                    </Form.Group>
                    {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                    {/*    <Form.Check type="checkbox" label="Check me out"/>*/}
                    {/*</Form.Group>*/}
                    <Button variant="primary" onClick={login}>
                        登录
                    </Button>

                    <div style={{
                        marginTop: '1rem',
                    }}>
                        <a style={{
                            textDecoration: 'underline',
                        }}
                           href="/user/register"
                        >
                            前往注册
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;