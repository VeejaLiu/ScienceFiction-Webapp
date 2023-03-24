import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button, Form} from "react-bootstrap";

function NavHeader() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Science Fiction Webapp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/book">书籍</Nav.Link>
                            <Nav.Link href="/author">作者</Nav.Link>
                            <Nav.Link href="/category">分类</Nav.Link>
                            <Nav.Link href="/file">文件</Nav.Link>
                            <NavDropdown title="用户" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/user/profile">
                                    个人中心
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/user/myUpload">
                                    我的资源
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/user/myFavorite">
                                    我的收藏
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/user/message">
                                    消息中心
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/user/reward">
                                    签到抽奖
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/user/logout">
                                    登出
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="搜索任意内容"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavHeader;
