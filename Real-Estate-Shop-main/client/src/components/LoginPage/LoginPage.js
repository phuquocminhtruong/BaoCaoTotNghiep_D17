import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {login, setNewPassword, setNotification} from '../../actions/user_actions';
import './LoginPage.css';

const LoginPage = ({close}) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: '',
    });
    const [newUserInfo, setNewUserInfo] = useState({
        userName: '',
        passWord: '',
        phone_number:''
    });
    const [isForget, setIsForget] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord) {
            dispatch(login(userInfo));
        }
    },[userInfo, setUserInfo]);

    useEffect(() => {
        if (newUserInfo.userName && newUserInfo.passWord && newUserInfo.question_1) {
            dispatch(setNewPassword(newUserInfo.userName, newUserInfo));
        }
    },[newUserInfo, setNewUserInfo]);

    useEffect(() => {
        scrollToModal();
    });
    
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    return(
        <div className="login_container drop_shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>{isForget ? "Quên Mật Khẩu" : "Đăng Nhập"}</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    if (isForget === false) {
                        setUserInfo({userName: e.target.username.value, passWord:e.target.password.value});
                    } else {
                        setNewUserInfo({userName: e.target.username.value, passWord:e.target.new_password.value, phone_number:e.target.phone_number.value});
                        setIsForget(false);
                        dispatch(setNotification("Đặt lại mật khẩu thành công"));
                    }
                }}>
                <div>
                    <label>Tên Đăng Nhập:</label>
                    <input type="text" autoFocus={true} required minLength={1} maxLength={90} placeholder="username" name="username"></input>
                </div>
                { isForget === false ? 
                <>
                    <div>
                        <label>Mật Khẩu:</label>
                        <input type="password" required minLength={1} maxLength={90} placeholder=">8 ký tự" name="password"></input>
                    </div>
                    <div>
                        <label>Nhớ Tài Khoản:</label>
                        <input type="checkbox" name="remember_acc" onClick={() => setIsRemember(true)}></input>
                        <a onClick={() => setIsForget(true)}>Quên Mật Khẩu</a>
                    </div>
                </> 
                : 
                <>
                    <div>
                        <label>Số điện thoại:</label>
                        <input type="text" require placeholder="0XXXXXXXXX" name="phone_number"></input>
                    </div>
                    <div>
                        <label>Nhập Mật Khẩu Mới:</label>
                        <input type="password" required minLength={1} maxLength={90} placeholder=">8 ký tự" name="new_password"></input>
                    </div>
                    <div>
                        <a onClick={() => setIsForget(false)}> || Trở Về ||</a>
                    </div>
                </>
                }
                <div className="button_container">
                    <input type="submit" className="drop_shadow" value="OK"></input>
                    <input type="button" className="drop_shadow" value="Thoát" onClick={close}></input>
                </div>
            </form>
        </div>
    );
}
export default LoginPage;