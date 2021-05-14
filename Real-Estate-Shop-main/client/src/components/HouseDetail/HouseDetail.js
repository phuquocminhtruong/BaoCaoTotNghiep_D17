import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GoogleMap from '../../utils/GoogleMap/GoogleMap';
import random from '../../utils/RandomNumber';
import './HouseDetail.css';
import { addSchedule, setNotification } from '../../actions/user_actions';

const HouseDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const dateRef = useRef(null);
    const houseList = useSelector((state) => state.user_reducer.houseList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const [house, setHouse] = useState(null);

    useEffect(() => {
        scrollToModal();
        if (houseList === undefined || houseList === null) {
            history.push('/house');
        } else {
            setHouse(houseList.find((house) => house.id === id));
        }
    },[houseList]);


    const onSubmitSchedule = (e) => {
        e.preventDefault();
        const date = new Date().toISOString().slice(0, 10);
        if (!currentUser) {
            dispatch(setNotification("Vui lòng đăng nhập để đặt lịch"));
            return;
        }
        if (dateRef.current.value < date) {
            dispatch(setNotification("Vui lòng chọn ngày từ hôm nay"));    
        } else {
            const schedule = {
                id: random(1,100000),
                house: house,
                date: dateRef.current.value,
                Creator_id:currentUser._id
            }
            dispatch(addSchedule(schedule));
            history.push('/schedule');
        }
    }
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    return(
        <div className="detail_page">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <div className="house_message shadow">
                {house?.message}            
            </div>
            <div className="house_detail">
                <div className="detail_image shadow">
                    <img className="image" alt="Loading..." src={house?.imgUrl}/>
                </div>
                <div className="detail_info">
                    <div style={{color: "yellow"}}>Người bán:&nbsp; {house?.houseSeller}</div>
                    <div> Loại nhà: &nbsp; 
                        {house?.category}
                    </div>
                    <div> Giá: &nbsp;
                        { house?.price + " Tỷ VND"}
                    </div>
                    <div> Diện tích:&nbsp;
                    { house?.area + " m2" }
                    </div>
                    <div> Mặt tiền:&nbsp;
                    { house?.front + " m2" }
                    </div>
                    <div> Hướng:&nbsp;
                    { house?.direction }
                    </div>
                    <div> Địa chỉ:&nbsp;
                            {house?.address}
                    </div>
                    <div> Toạ độ Lat:&nbsp;
                            {house?.lat}
                    </div>
                    <div> Toạ độ Lng:&nbsp;
                            {house?.lng}
                    </div>
                    <form className="add_schedule" onSubmit={(e) => onSubmitSchedule(e)}>
                        <div>Chọn lịch hẹn</div>
                        <input ref={dateRef} type="date" required></input>
                        <input type="submit" value="Đặt lịch hẹn"></input>
                    </form>
                </div>
            </div>
            <div className="map_container">
                <div className="house_message shadow">
                    Vị trí trên Google Map
                </div>
                <GoogleMap className="map" lat={house?.lat} lng={house?.lng}/>
            </div>
        </div>
    );
}
export default HouseDetail;