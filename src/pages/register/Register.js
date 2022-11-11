import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import "../../components/share/share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const AU = process.env.REACT_APP_URI;

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleClick = async (e) => {
  

    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }


      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        user.profilePicture = fileName;
        console.log(user);
        try {
          await axios.post("/upload", data);
        } catch (err) { }
      }
      try {
        await axios.post(`${AU}api/auth/register`, user);
        navigate('/login')
      } catch (err) { }
    }

  };


  return (
    <div className="register">

      {/* <div>
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div> */}




      <div className="loginWrapper">
        <div className="loginLeft registerleft">
          <div className="Rlogo">
            <img src={PF + 'Logo.png'} alt="" />
          </div>
          <h3 className="loginLogo">HangOut</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on HangOut.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Please Add Image</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <div className="space"></div>

              <div className="PreviewContainer">

                <img className="PreviewImg"
                  src={file ? URL.createObjectURL(file) : PF + "person/noAvatar.png"}
                  alt="" />
                {file && <Cancel className="CancelImg" onClick={() => setFile(null)} />}
              </div>






            </div>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Add a short description"
              className="loginInput"
            />
            <input
              placeholder="City"
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />

            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <div className="or" >
              OR
            </div>
            <button className="loginRegisterButton"
              onClick={() => navigate('/login')}
            >Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
