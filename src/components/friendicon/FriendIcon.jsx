import React from 'react'
import './friendicon.css'
import { useNavigate } from 'react-router-dom'

export default function FriendIcon({friend}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    console.log(friend.profilePicture);

    return (
        <div className="single-friend" onClick={()=> navigate(`/profile/${friend.username}`)} >
            <img src={
                friend.profilePicture? PF + friend.profilePicture : PF + "person/noAvatar.png"
            } 
            alt="" />
            {/* <p>{friend.username}</p> */}
            <div>{friend.username}</div>
        </div>
    )
}
