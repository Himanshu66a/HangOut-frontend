import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Group,
  WorkOutline,
  Event
} from "@mui/icons-material";
import{useState,useEffect, useSyncExternalStore} from 'react';
import axios from 'axios'
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [users, setuser] = useState([]);



  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/users/all');
      setuser(res.data);
    };
    fetchUser();
  }, [])
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        
        
        <div className="recommend">
        <Group className="sidebarIcon" />
        Recommended Users
        
        </div>
        <hr className="sidebarHr" />
       
        <ul className="sidebarFriendList">
          {users.map((user) => (
            <CloseFriend key={user._id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}