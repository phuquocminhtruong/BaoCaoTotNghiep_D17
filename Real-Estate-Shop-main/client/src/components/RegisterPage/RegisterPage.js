import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {register, setNotification} from '../../actions/user_actions';
import './RegisterPage.css';

const RegisterPage = ({close}) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: '',
        fullName: '',
        gender: '',
        email: '',
        phone_number: ''
    });
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord && userInfo.email && userInfo.gender) {
            dispatch(register(userInfo));
        } 
    },[userInfo, setUserInfo]);

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
        <div className="register_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>Đăng Ký</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();

                    if (userInfo.gender === '' || e.target.password.value != e.target.re_password.value ) {
                        dispatch(setNotification("Thông tin không hợp lệ!"));
                    } else {
                        setUserInfo({...userInfo, userName: e.target.username.value, passWord:e.target.password.value, fullName: e.target.full_name.value, email: e.target.email.value, phone_number: e.target.phone_number.value});
                    }
                }}>
                <div>
                    <label>Tên Đăng Ký:</label>
                    <input type="text" autoFocus={true} required minLength={1} maxLength={90} name="username" placeholder="user name"></input>
                </div>
                <div>
                    <label>Tên Đầy Đủ:</label>
                    <input type="text" autoFocus={true} required minLength={1} name="full_name"></input>
                </div>
                <div>
                    <label>Nam: </label>
                    <input 
                        type="radio" 
                        checked={userInfo.gender === 'Nam'} 
                        onChange={() => setUserInfo({...userInfo, gender: 'Nam'})}
                        value="male" 
                         
                        name="male">
                    </input>
                    <label>Nữ: </label>
                    <input 
                        type="radio" 
                        checked={userInfo.gender === 'Nữ'} 
                        onChange={() => setUserInfo({...userInfo, gender: 'Nữ'})}
                        value="female" 
                         
                        name="female">
                    </input>
                </div>
                <div>
                    <label>Mật Khẩu </label>
                     <input type="password" name="password" required minLength={1} maxLength={90} placeholder=">8 ký tự"></input>
                </div>
                <div>
                    <label>Nhập Lại Mật Khẩu </label>
                    <input type="password" name="re_password" required minLength={1} maxLength={90} placeholder=">8 ký tự"></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" required pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" placeholder="abc@gmail.com" name="email"></input>
                </div>
                <div>
                    <label>Số điện thoại:</label>
                    <input type="text" required placeholder="0XXXXXXXXX" name="phone_number"></input>
                </div>
                <div className="button_container">
                    <input type="submit" className="shadow" value="OK"></input>
                    <input type="button" className="shadow" value="Thoát" onClick={close}></input>
                </div>
            </form>
        </div>
    );
}
export default RegisterPage;