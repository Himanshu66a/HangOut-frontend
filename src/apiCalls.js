import axios from "axios";
const AU = process.env.REACT_APP_URI;

export const loginCall = async (userCredential, dispatch) => {
  console.log(userCredential.email);
  console.log(userCredential.password);

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${AU}api/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }

  // await axios.get(`${AU}api/auth/login/${userCredential.email}/${userCredential.password}`)
  //   .catch((error) => {
  //     if (error.response) {
  //       if (error.response.status == 404) {
  //         console.log('email dosenty exist');

  //       }
  //       else if (error.response.status == 400) {
  //         console.log('wrong password');
  //       }
  //       else {

  //       }

  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //   });
};
