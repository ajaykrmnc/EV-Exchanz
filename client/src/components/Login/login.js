import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth,provider } from "fireboss";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "context/AuthContext"
import { Google } from "react-bootstrap-icons";
import "./style.css"

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup,setIsSignup]= useState(false);
  const switchMode=()=>
  {
     setIsSignup(!isSignup);
  }

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)


  const handleLogin = (e) => {
    e.preventDefault();
    if(!isSignup)
    {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          dispatch({type:"LOGIN", payload:user})
          navigate(-1)
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        });

    }
    else
    {

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch({type:"LOGIN", payload:user})
          console.log(user);
          navigate(-1)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(true);
          console.log(error);
          alert(errorCode+errorMessage);
        });
      
    }
  };
  const googleLogin=()=>
  {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        dispatch({type:"LOGIN", payload:user})
        navigate(-1)
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }


  return (
    <>
    <div className="body">
      <div id="box_background1"></div>
      <div
        className="shadow-lg bg-white rounded"
        style={{
          width: "70vw",
          height: "80vh",
          display: "flex",
          position: "fixed",
        }}
      >
        <img src="signup.png" alt="#" style={{ width: "40vw" }} id="img" />
        <div
          className="container mx-4"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
           <h2 className=" font-weight-bolder">{isSignup? 'Signup': 'Login' }</h2>
          {error&& !isSignup && <span className="text-danger text-center pb-2 ">Wrong email or password!</span>}
          <form onSubmit={handleLogin}>
            <br />
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address*
              </label>
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <label
              for="exampleInputEmail1"
              className="form-label"
              type="password"
              placeholder="Password"
            >
              Password*
            </label>
            <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
            </span>
            <input
                className="form-control"
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="my-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Remember me
              </label>
            </div>
            <button
              className="btn btn-primary d-grid gap-2 col-6 my-1"
              type="submit"
            >
              { isSignup ? 'SignUp' : 'Login'}
            </button>
            <div className="py-2">
            <button className="mt-3 p-0 btn btn-light" onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "New to Battex? Sign Up" }
            </button>
            </div>
          </form>
          {
            (!isSignup)&&

              <div>
                <p classNmae = "text-center">-- Or Sign in With --</p>
                <button className="btn btn-primary p-2 text-white mt-2 d-flex align-items-center" onClick={googleLogin}>
                  <Google />&nbsp;Google 

                </button>
              </div>
          }
        </div>
      </div>
      <div id="box_background2"></div>
    </div>
    </>
  );
};

export default Login;
