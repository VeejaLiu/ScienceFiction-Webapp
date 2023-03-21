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


function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Routes>
                <Route path='/book' element={<BookPage/>}/>
                <Route path='/author' element={<AuthorPage/>}/>
                <Route path='/category' element={<CategoryPage/>}/>
                <Route path='/file' element={<FilePage/>}/>
                <Route path='/user/profile' element={<UserProfilePage/>}/>
                <Route path='/user/myUpload' element={<UserProfilePage/>}/>
                <Route path='/user/myFavorite' element={<UserProfilePage/>}/>
                <Route path='/user/message' element={<UserProfilePage/>}/>
                <Route path='/user/reward' element={<UserProfilePage/>}/>
                <Route path='/user/logout' element={<UserProfilePage/>}/>
                <Route path='*' element={<h1>404 Not Found</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
