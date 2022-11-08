import "./profile.css";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import FriendIcon from "../../components/friendicon/FriendIcon";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";



export default function Profile() {

    const navigate = useNavigate();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [friends, setFriends] = useState([]);
    const username = useParams().username;
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [flag, setflag] = useState()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
        };
        fetchUser();
    }, [username]);
    console.log(user)

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/users/friends/${user._id}`);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();

    }, [user]);

    useEffect(() => {

        const checkfollowing = async () => {
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
    }, [username])

    const logout = () => {
        localStorage.removeItem("user")
        navigate('/login')
        window.location.reload();

    }

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

    return (
        <>
            <Topbar />

            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.coverPicture
                                        ? PF + user.coverPicture
                                        : PF + "person/noCover.png"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>

                    <div className="profile-mid">

                        {
                            (currentUser.username == username) ?
                                <div className="logut-btn">
                                    <button onClick={logout}>
                                        Log Out
                                    </button>
                                </div> :
                                <button className="CenterFollowButton" onClick={handle}>
                                    {
                                        flag ? "unfollow" : "follow"
                                    }
                                </button>
                        }



                        {/* <div className="logut-btn">
              <button onClick={logout}>
                Log Out
              </button>
            </div> */}

                        <div className="your-friends">
                            <h3>Friends</h3>
                            <div className="friends-box">
                                {/* {
                  friends ? friends.map(
                    (friend) => (
                      <FriendIcon friend={friend} key={friend._id} />
                    )
                  ) : "<h2>No friends</h2>"
                } */}
                                {
                                    (!friends.length == 0) ? friends.map(
                                        (friend) => (
                                            <FriendIcon friend={friend} key={friend._id} />
                                        )
                                    ) :
                                        (
                                            <h2 className="no-friends">No Friends</h2>
                                        )
                                }

                            </div>
                        </div>
                        <div className="profileRightBottom">


                            <Feed username={username} />

                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}