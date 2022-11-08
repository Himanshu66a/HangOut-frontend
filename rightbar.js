import "./rightbar.css";
import React from 'react'
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import '../../pages/profile/profile.css'
import { Group } from "@mui/icons-material";


export default function Rightbar({ user }) {
    console.log(user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [owner, setowner] = useState(false)
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?.id)
    );


    const [flag, setflag] = useState()

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/users/friends/${currentUser._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();

    }, [user]);



    const HomeRightbar = () => {
        return (
            <>
                <div className="HomeRightbar">
                    <div className="birthdayContainer">
                        <img className="birthdayImg" src="assets/gift.png" alt="" />
                        <span className="birthdayText">
                            <b>Himanshu</b> and <b>3 other friends</b> have a birhday today.
                        </span>
                    </div>
                    <img className="rightbarAd" src="assets/dummy.jpg" alt="" />
                    <div className="friend-title">
                        <Group />
                        <span >Friends</span>
                    </div>

                    <ul className="rightbarFriendList">
                        {friends.map((u) => (
                            <Online key={u.id} user={u} />
                        ))}
                    </ul>
                </div>



            </>
        );
    };






    // const handleClick = async () => {
    //   try {
    //     if (followed) {
    //       await axios.put(`/users/${user._id}/unfollow`, {
    //         userId: currentUser._id,
    //       });
    //       dispatch({ type: "UNFOLLOW", payload: user._id });
    //     } else {
    //       await axios.put(`/users/${user._id}/follow`, {
    //         userId: currentUser._id,
    //       });
    //       dispatch({ type: "FOLLOW", payload: user._id });
    //     }
    //     setFollowed(!followed);
    //     console.log('function called')
    //   } catch (err) {
    //     console.log(err)
    //   }

    //   if (flag) {
    //     await axios.put(`users/${user._id}/unfollow`, { "_id": currentUser._id })
    //     setflag(false)

    //   }
    //   else {
    //     await axios.put(`users/${user._id}/follow`, { "_id": currentUser._id })
    //     setflag(true)


    //   }
    // };



    const ProfileRightbar = () => {

        useEffect(() => {
            console.log(user)
            const checkfollowing = async() => {
                if (user.followers.includes(currentUser._id)) {
                    console.log('you already follow')
                    setflag(true)
                }
                else {
                    console.log('you dont follow')
                    setflag(false)
                }
            }
            checkfollowing();
            if (user._id == currentUser._id) {
                setowner(true)
            }
            else
                setowner(false)

        }, [user])

        const handle = async () => {
            console.log('funvtion caleed');
            if (flag) {
                await axios.put(`http://localhost:3000/users/${user._id}/unfollow`, { "_id": currentUser._id })
                setflag(false)
                console.log('unfollowed');
            }
            else {
                await axios.put(`http://localhost:3000/users/${user._id}/follow`, { "_id": currentUser._id })
                setflag(true)
                console.log('followed');
                await axios.post(`/conversations`, {
                    "senderId": currentUser._id,
                    "receiverId": user._id
                })
            }
        }

        const logout = () => {
            localStorage.removeItem("user")
            navigate('/login')
            window.location.reload();

        }


        const navigate = useNavigate()
        return (

            <>

                {
                    owner ? (<div className="rightbarlogut-btn">
                        <button onClick={logout}>
                            Log Out
                        </button>
                    </div>) :
                        <button className="rightbarFollowButton" onClick={handle}>
                            {
                                (flag) ? "unfollow" : "follow"
                            }
                        </button>

                }


                {/* <button onClick={logout}>
        Log out
      </button>

        <button className="rightbarFollowButton" onClick={handle}>
          {
            flag ? "unfollow" : "follow"
          }
        </button> */}


                <h4 className="rightbarTitle">User information</h4>
                {/* <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
        
        </div> */}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link
                            to={"/profile/" + friend.username}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}