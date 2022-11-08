import "./online.css";
import { useNavigate } from 'react-router-dom'

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate()
  return (
    <>
      <li className="rightbarFriend" onClick={() => navigate(`/profile/${user.username}`)}>
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"
            } alt="" />
          {/* <span className="rightbarOnline"></span> */}
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </>

  );
}