import { React, useRef, useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Notification from './Notification/Notification';
import UserInfo from '../UserPage/UserInfo/UserInfo';
import { FacebookProvider, ShareButton } from 'react-facebook';

import {logout, setNotification} from '../../actions/user_actions';
import './NavBar.css';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';

const NavBar = ({userMode, userName}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modal = useRef(null);
    const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
    const [isRegisterPageOpen, setIsRegisterPageOpen] = useState(false);
    const currentUserInfo = useSelector ((state) => state.user_reducer.loggedInUser);
    const currentNotif = useSelector((state) => state.user_reducer.notif);
    const isLoading = useSelector((state) => state.user_reducer.isLoading);
    // const [linkshare, setlinkshare] = useState('')


    // useEffect(() => {
    //     setlinkshare(location.href)
    //     console.log(linkshare)
    // }, [location])
    
    
    return(
        <header className="shadow">

             {/* <FacebookProvider appId="253712923211674">
        <ShareButton href={`https://real-estate-shop.herokuapp.com/${linkshare}`}>
          Share
        </ShareButton>
         </FacebookProvider> */}
            {isLoading && <LoadingContainer style="spinner"/>}
            {isLoading === true ? null : <h1>Real <br></br>Estate<br></br> Service</h1>}
            
            <nav>
                {
                    userMode === "admin" || userMode === "user" 
                    ? null 
                    : <div>
                        <a className="home_nav" onClick={() => history.push('/')}>Trang chủ</a>
                        <a className="news_nav" onClick={() => history.push('/news')}>Tin tức</a>
                    </div>
                    
                }
                
                {
                    userMode === "user" 
                    ? <>
                        <a className="user_nav neon">| {userName} |</a>
                        <a className="home_nav" onClick={() => history.push('/')}>Trang chủ</a>
                        <a className="news_nav" onClick={() => history.push('/news')}>Tin tức</a>
                        <a className="schedule_nav" onClick={() => history.push('/schedule')}>Lịch Hẹn</a>
                        <a className="edit_house_nav" onClick={() => history.push('/house')}>Nhà Bán</a>
                        
                    </>
                    : null
                }
                {
                    userMode === "admin" 
                    ? <>
                        <a className="user_nav neon">| {userName} |</a>
                        <a className="edit_category_nav" onClick={() => history.push('/edit_category')}>Loại Nhà</a>
                        <a className="edit_house_nav" onClick={()=> history.push('/edit_house')}>Nhà</a>
                        <a className="schedule_nav" onClick={()=> history.push('/edit_schedule')}>Lịch Hẹn</a>
                        <a className="edit_user_nav" onClick={()=> history.push('/edit_user')}>Người Dùng</a>

                    </>
                    : null
                }
                {
                    userMode != "admin" && userMode != "user"
                    ? <a className="register_nav" onClick={() => {
                        setIsRegisterPageOpen(true);
                        setIsLoginPageOpen(false);
                        modal.current.open();
                    }}>
                        Đăng Ký
                        </a>
                    : null 
                }
                {
                    userMode === "admin" || userMode === "user" 
                    ? <a className="logout_nav" onClick={() => {
                        
                        dispatch(logout(currentUserInfo))
                        .then(() => dispatch(setNotification("Đăng xuất thành công")));
                        modal.current.close();
                        history.push('/');
                        }}>
                        Đăng Xuất
                        </a> 
                    : <a className="login_nav" onClick={() => {
                        setIsLoginPageOpen(true);
                        setIsRegisterPageOpen(false);
                        modal.current.open();
                    }}>
                        Đăng Nhập
                        </a> 
                }
            </nav>
            <Modal ref={modal}>
                { isLoginPageOpen ? (<LoginPage close={() => modal.current.close()}/>) : null}
                { isRegisterPageOpen ? (<RegisterPage close={() => modal.current.close()}/>) : null}
            </Modal>
            {currentNotif ? <Notification message={currentNotif}/> : null}
            { userMode ? <UserInfo user={currentUserInfo}/> : null}
        </header>
    );
}
export default NavBar;