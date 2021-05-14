import React from 'react';
import { Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import EditHouseCategory from '../EditHouseCategory/EditHouseCategory';
import EditHouseList from '../EditHouseList/EditHouseList';
import Footer from '../Footer/Footer';
import './AdminPage.css';
import EditUser from '../EditUser/EditUser';
import EditSchedule from '../EditSchedule/EditSchedule';

const AdminPage = ({userName}) => {
    return(
        <div>
            <main>
                <Switch>
                    <Route exact path="/">
                        <HeadingTitle title="Admin Page" subtitle="Trang quản lý database"/>
                        <NavBar userName={userName} userMode="admin"/>
                        <EditHouseList/>
                        <Footer/>
                    </Route>
                    <Route path="/edit_category">
                        <HeadingTitle title="Quản Lý Danh Mục Nhà" subtitle="Trang thêm, xóa, sửa danh mục"/>
                        <NavBar userName={userName} userMode="admin"/>
                        <EditHouseCategory/>
                        <Footer/>
                    </Route>
                    <Route path="/edit_house">
                        <HeadingTitle title="Quản Lý Nhà Bán" subtitle="Trang thêm, xóa, sửa thông tin nhà"/>
                        <NavBar userName={userName} userMode="admin"/>
                        <EditHouseList/>
                        <Footer/>
                    </Route>
                    <Route path="/edit_user">
                        <HeadingTitle title="Quản Lý Người Dùng" subtitle="Trang thêm, xóa, sửa người dùng"/>
                        <NavBar userName={userName} userMode="admin"/>
                        <EditUser/>
                        <Footer/>
                    </Route>
                    <Route path="/edit_schedule">
                        <HeadingTitle title="Quản Lý Lịch Hẹn" subtitle="Trang duyệt lịch hẹn"/>
                        <NavBar userName={userName} userMode="admin"/>
                        <EditSchedule/>
                        <Footer/>
                    </Route>
                </Switch>
                
            </main>
        </div>
    );
}
export default AdminPage;