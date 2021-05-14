import React, { Suspense, useRef, useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import HouseCategory from '../HouseCategory/HouseCategory';
import HouseList from '../HouseList/HouseList';
import SellHousePage from '../SellHousePage/SellHousePage';
import HouseDetail from '../HouseDetail/HouseDetail';
import SchedulePage from '../SchedulePage/SchedulePage';
import Footer from '../Footer/Footer';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import InvitationPage from '../InvitationPage/InvitationPage';
import GetNews from '../NewsPage/News';

const UserPage = ({user}) => {
    const modalRef = useRef(null);

    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
      useEffect(() => {
        scrollToModal();
    },[]);

    
      
    return(

        
        <div>
            <div ref={modalRef} className="scroll_position_holder"></div>
            <main>
                <Suspense fallback={<LoadingContainer/>}>
                    <Switch>
                        <Route exact path="/">
                            <HeadingTitle title="Sàn giao dịch bất động sản" subtitle="Trang giao dịch mua bán nhà đất"/>
                            <NavBar userName={user.userName} userMode="user"/>
                            <HouseCategory/>
                            <HouseList/>
                            <Footer/>
                        </Route>
                        <Route exact path="/schedule">
                            <HeadingTitle title="Chi tiết lịch hẹn" subtitle="Vui lòng xét duyệt lịch hẹn"/>
                            <NavBar userName={user.userName} userMode="user"/>
                            <SchedulePage/>
                            <InvitationPage/>
                            <Footer/>
                        </Route>
                        <Route exact path="/house">
                            <HeadingTitle title="Danh sách nhà bán" subtitle="Chọn đặt lịch hẹn để liên hệ người bán"/>
                            <NavBar userName={user.userName} userMode="user"/>
                            <HouseList/>
                            <SellHousePage/>
                            <Footer/>
                        </Route>
                        <Route exact path="/news">
                            <HeadingTitle title="Danh sách tin tức" subtitle="Xem thêm tin tức bất động sản mới"/>
                            <NavBar userName={user.userName} userMode="user"/>
                            <GetNews/>
                            <Footer/>
                        </Route>
                        <Route exact path="/house/:id">
                            <HeadingTitle title="Thông tin chi tiết" subtitle="Vui lòng chọn ngày hẹn"/>
                            <NavBar userName={user.userName} userMode="user"/>
                            <HouseDetail/>
                            <Footer/>
                        </Route>
                    </Switch>
                </Suspense>
            </main>
        </div>
    );
}
export default UserPage;