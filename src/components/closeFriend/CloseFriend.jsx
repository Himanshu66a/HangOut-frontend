import "./closeFriend.css";
import {useNavigate} from  'react-router-dom';

export default function CloseFriend({user,showSidebar}) {
const naviagte = useNavigate()
  const handleclick = ()=>{
    console.log('hello');
    
    naviagte(`/profile/${user.username}`)
    showSidebar()
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend" onClick={handleclick} >
      <img className="sidebarFriendImg" 
      src={
        user.profilePicture
          ? PF + user.profilePicture
          : PF + "person/noAvatar.png"
      }
      alt=""
       />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}