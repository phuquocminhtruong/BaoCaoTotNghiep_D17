import React from 'react';
import './Footer.css';

const Footer = () => {
    const date = new Date();
    return(
        <footer>
            <div className="content-wrapper">
                <h1>Bản quyền &copy; { date.getFullYear() }, Phù Quốc Minh Trường
                <p>Sinh viên Trường đại học Thủ Dầu Một </p>
                <a href='https://www.facebook.com/profile.php?id=100021796686584'>Facebook</a>
                <p>Email: 1724801030168@student.tdmu.edu.vn  - Số điện thoại: 0346129236</p>
                </h1>
                

            </div>
        </footer>
    );
}
export default Footer;