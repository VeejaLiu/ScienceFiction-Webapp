import React from 'react';
import './App.css';
import NavigationBar from "./component/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import CategoryPage from "./component/pages/CategoryPage";
import BookPage from "./component/pages/BookPage";
import AuthorPage from "./component/pages/AuthorPage";
import FilePage from "./component/pages/FilePage";
import UserProfilePage from "./component/user/UserProfilePage";
import BookDetailPage from "./component/pages/BookDetailPage";
import AuthorDetailPage from "./component/pages/AuthorDetailPage";
import LoginPage from "./component/user/LoginPage";
import RegisterPage from "./component/user/RegisterPage";


function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Routes>
                {/* 默认路径 */}
                <Route path='/' element={<BookPage/>} />

                {/* 书籍路径 */}
                <Route path='/book' element={<BookPage/>}/>
                <Route path='/book/:id' element={<BookDetailPage/>}/>

                {/* 作者路径 */}
                <Route path='/author' element={<AuthorPage/>}/>
                <Route path='/author/:id' element={<AuthorDetailPage/>}/>

                {/* 分类路径 */}
                <Route path='/category' element={<CategoryPage/>}/>

                {/* 文件路径 */}
                <Route path='/file' element={<FilePage/>}/>

                {/* 用户路径 */}
                <Route path='/user/login' element={<LoginPage/>}/>
                <Route path='/user/register' element={<RegisterPage/>}/>
                <Route path='/user/profile' element={<UserProfilePage/>}/>
                <Route path='/user/myUpload' element={<UserProfilePage/>}/>
                <Route path='/user/myFavorite' element={<UserProfilePage/>}/>
                <Route path='/user/message' element={<UserProfilePage/>}/>
                <Route path='/user/reward' element={<UserProfilePage/>}/>
                <Route path='/user/logout' element={<UserProfilePage/>}/>

                {/* 404 */}
                <Route path='*' element={<h1>404 Not Found</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
