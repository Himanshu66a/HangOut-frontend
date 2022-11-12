import { useContext, useRef,useState } from "react";
import "../register/register.css";
import './login.css'
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const AU = process.env.REACT_APP_URI;

// import { CircularProgress } from '@mui/material' ;

export default function Login() {


  const [wrongemail, setwrongemail] = useState('');
  const [wrongPass, setwrongPass] = useState('')
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch,error} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault();
    const err= loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    await axios.get(`${AU}api/auth/login/${email.current.value}/${password.current.value}`).then(res => {
      localStorage.setItem("user", JSON.stringify(res))
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 404) {
          setwrongemail('Email does not exist')
          setwrongPass('')
          console.log('email dosenty exist');

        }
        else if (error.response.status == 400) {
          setwrongPass('Incorrect Password')
          setwrongemail('')
          console.log('wrong password');
        }
        else {

        }

        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });



  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
        <div className="loginlogoimg">
            <img src={PF + 'Logo.png'} alt="" />
          </div>
          <h3 className="loginLogo">HangOut</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on HangOut.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox1" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />{
              wrongemail && <div style={{'color':'red'}}>{wrongemail}</div>
            }
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            {
              wrongPass && <div style={{'color':'red'}}>{wrongPass}</div>
            }
            <button className="loginButton" type="submit" disabled={isFetching}>
              {/* {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )} */}
              Log In
            </button>
            <div className="or" >
              OR
            </div>
            <button className="loginRegisterButton" onClick={()=> navigate('/register')} >
              {/* {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )} */}
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
