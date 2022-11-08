import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import {Link} from "react-router-dom";
import {useState,useRef,useEffect} from 'react'


 function Home() {
  const home = useRef();
  const [blur, setblur] = useState(false);

  useEffect(() => {
    if(blur){
      home.current.style.opacity = '0.5';
    }else
    home.current.style.opacity = '1';
  }, [blur])
  

 

  return (
    <>
      <Topbar setblur={setblur} />
      <div className="homeContainer" ref={home} >
        <Sidebar />
        <Feed/>
        <Rightbar/>
        {/* <Link to="/register" >Log out</Link>
        <button>Log out</button> */}
      </div>
    </>
  );
}
export default Home;