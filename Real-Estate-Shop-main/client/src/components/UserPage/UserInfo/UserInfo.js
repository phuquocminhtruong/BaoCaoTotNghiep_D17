import React, {useEffect, useRef, useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser, createHouse, setNotification } from '../../../actions/user_actions';
import FileBase from 'react-file-base64';
import random from '../../../utils/RandomNumber';

import './UserInfo.css';

const UserInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentImg, setCurrentImg] = useState(null);
    const currentCategory = useSelector((state) => state.user_reducer.categoryList);
    const storeState = useSelector ((state) => state.user_reducer);
    const houseInputRef = 
    {
        categoryRef: useRef(null),
        message: useRef(null),
        priceRef: useRef(null),
        area: useRef(null),
        front: useRef(null),
        direction: useRef(null),
        address: useRef(null),
        lat: useRef(null),
        lng: useRef(null)
    };
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    const user = useSelector((state) => state.user_reducer.currentUser);
    
    useEffect(()=> {
        if (currentLoginUser) {
            dispatch(getUser(currentLoginUser.userName));
        }
    },[currentLoginUser]);

    const onHouseUpload = (e) => {
        e.preventDefault();
        const uploadHouse = 
        {
            id: random(1,10000),  
            price: houseInputRef.priceRef.current.value || null,
            category: houseInputRef.categoryRef.current.value || null,
            message: houseInputRef.message.current.value || null,
            imgUrl:  currentImg ? currentImg : null,
            houseSeller:  user ? user.userName : null,
            area: houseInputRef.area.current.value || null,
            front: houseInputRef.front.current.value || null,
            direction: houseInputRef.direction.current.value || null,
            address: houseInputRef.address.current.value || null,
            lat: parseFloat(houseInputRef.lat.current.value) || null,
            lng: parseFloat(houseInputRef.lng.current.value) || null
        };
        if (currentImg) {
            dispatch(createHouse(uploadHouse))
            .then(()=> history.push('/house'));
        } else {
            dispatch(setNotification("Vui l??ng ch???n ???nh"));
        }
        
    }

    const refresh = () => {
        dispatch(getUser(currentLoginUser.userName))
        .then(() => dispatch(setNotification("L??m m???i th??nh c??ng")));
    }

    return(
        <div className="user_info_container shadow">
            <h2 className="icon"> {"||"} </h2>
            <h2 className="title"> Th??ng Tin Ng?????i D??ng { user ? user.userName : null} </h2>
            <div className="info_panel">
                <div> 
                    <button type="button" className="shadow refresh_button" onClick={refresh}></button>
                </div>
                
                {
                currentLoginUser && currentLoginUser.isAdmin === true ?
                <> 
                <div> T???ng S??? Nh??:</div> 
                <span>{storeState.houseList?.length}</span>
                <div> T???ng S??? Danh M???c Nh??:</div> 
                <span>{storeState.categoryList?.length}</span>
                <div> T???ng S??? Ng?????i D??ng:</div> 
                <span>{storeState.userList?.length}</span>
                <div> T???ng S??? L???ch H???n:</div> 
                <span>{storeState.scheduleList?.length}</span>
                </>
                
                : null
                }
                
                {currentLoginUser && currentLoginUser.isAdmin === false ?
                    <> 
                        <div> H??? v?? T??n: { user ? user.fullName : null}</div>
                        <div> Gi???i T??nh: { user ? user.gender : null}</div>
                        <div> Email: { user ? user.email : null}</div>
                        <div style={{backgroundColor: "black", paddingLeft: "15vh"}}> ????ng tin b??n nh?? </div>
                        <form onSubmit={(e) => onHouseUpload(e)}>
                            <div> Th??ng ??i???p: &nbsp;
                                <input ref={houseInputRef.message} required minLength={1} type="text" placeholder="C???n b??n ..."></input>
                            </div>
                            <div> Lo???i Nh??: &nbsp; 
                                <select required ref={houseInputRef.categoryRef}>
                                    { currentCategory != null 
                                    ? currentCategory.map((ele, key) => (<option value={ele.name} key={key}>{ele.name}</option>))
                                    : null
                                    }
                                </select>
                            </div>
                            <div> Gi??: &nbsp;
                                <input ref={houseInputRef.priceRef} required minLength={1} min={0} type="number" placeholder="T??? VND" step=".01"></input>
                            </div>
                            <div> Di???n T??ch:&nbsp;
                                <input ref={houseInputRef.area} required minLength={1} type="text" placeholder="... m2"></input>
                            </div>
                            <div> M???t Ti???n:&nbsp;
                                <input ref={houseInputRef.front} required minLength={1} type="text" placeholder="... m"></input>
                            </div>
                            <div> H?????ng:&nbsp;
                                <input ref={houseInputRef.direction} required minLength={1} type="text" placeholder="H?????ng l???/bi???n/..."></input>
                            </div>
                            <div> ?????a Ch???:&nbsp;
                                <input ref={houseInputRef.address} required minLength={1} type="text" placeholder="..."></input>
                            </div>
                            <div> To??? ????? Lat:&nbsp;
                                <input ref={houseInputRef.lat} required minLength={1}  type="number" placeholder="<=-90 ho???c >= 90" step=".00001" ></input>
                            </div>
                            <div> To??? ????? Lng:&nbsp;
                                <input ref={houseInputRef.lng} required minLength={1}  type="number" placeholder="<=-180 ho???c >= 180" step=".00001"></input>
                            </div>
                            <div>
                                <FileBase className="base64" type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                            </div>
                            <div>
                                <img className="image" alt="Ch???n Anh ????? Upload" src={currentImg}/>
                            </div>
                            <div> 
                                <button type="submit" className="shadow upload_button"></button>
                            </div>
                        </form>
                    </>
                    : null
                }
            </div>
        </div>
    );
}
export default UserInfo;