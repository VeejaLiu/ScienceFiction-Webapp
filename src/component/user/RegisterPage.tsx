import React from "react";
import {Button, Form} from "react-bootstrap";

function LoginPage() {
    return (
        <div>
            <div style={{
                margin: '1rem'
            }}>
                <h2>用户注册</h2>
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
                    {/* 邮箱地址 */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>
                            <b>
                                邮箱地址 (*)
                            </b>
                        </Form.Label>
                        <Form.Control type="email" placeholder="输入邮箱"/>
                        <Form.Text className="text-muted">
                            我们永远不会与任何人分享您的电子邮件。
                        </Form.Text>
                    </Form.Group>

                    {/* 登录用户名 */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>登录用户名</Form.Label>
                        <Form.Control type="email" placeholder="输入登录用户名，不填写将自动生成"/>
                    </Form.Group>

                    {/* 昵称 */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>昵称</Form.Label>
                        <Form.Control type="email" placeholder="输入昵称，不填写将自动生成"/>
                    </Form.Group>

                    {/* 密码 */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            <b>
                                密码 (*)
                            </b>
                        </Form.Label>
                        <Form.Control type="password" placeholder="密码"/>
                    </Form.Group>
                    {/* 重复密码 */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            <b>
                                重复密码 (*)
                            </b>
                        </Form.Label>
                        <Form.Control type="password" placeholder="重复密码"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        注册
                    </Button>

                    <div style={{
                        marginTop: '1rem',
                    }}>
                        <a style={{
                            // 下划线
                            textDecoration: 'underline',
                        }}
                           href="/user/login"
                        >
                            前往登录
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default LoginPage;