import React,{useState, useEffect, useRef} from 'react';
import '../assets/styles/containers/login.scss';
import lightBulb from '../assets/images/light_bulb.png';
import desktopImage from '../assets/images/image-desktop.png';
import motto from '../assets/images/motto.png';
import line from '../assets/images/line.png';
import InputField from '../components/InputField';
import Button from '../components/Btn';
import Text from '../components/Text';
import {connect} from 'react-redux';
import {login} from '../redux/actions/authActions';
import { Spinner } from 'react-bootstrap';
import AlertComponent from '../components/Alert';
import {Redirect} from 'react-router-dom';

const Login =(props) => {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const isInitialMount = useRef(true);

    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
             if(props.authError) {setErrorMsg(`${props.authError.message} Or invalid SUN`);};
             if(props.authResponse && props.authResponse.message === 'success') {setSuccessMsg('Successfully logged in!');}
         }
    },[props.authError,props.authResponse]);
    const handleChange = (target) => {
        setErrorMsg('');
        setSuccessMsg('');
        target.name === 'email' ? setEmail(target.value)
        : target.name === 'password' ? setPassword(target.value)
        : void(0);
    }
    const handleClick = (target) => {
        setErrorMsg('');
        setSuccessMsg('');
        setIsLoading(true);
        if(email && password){
            props.login({email,password});
            if(!props.authError)setErrorMsg(null); 
        }
        else {setErrorMsg('Fill in all the required fields');};
    }
    if(!errorMsg && props.authError) {setErrorMsg(props.authError.message)};
    const redirectTo = (location) => {
        return (<Redirect to={location} />)
    }

    if(isLoading && errorMsg) setIsLoading(false);
    return(
        <div>
            <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
            />
            {successMsg && !props.loading ? redirectTo('/dashboard') : ''}
            <div className="signup--container">
                
                <div className="signup--section">
                    <div><Text label="RWANDA EDUCATION MANAGEMENT SYSTEM (REMS)" className="txt txt--fontSize__medium txt--logo signup--logo" /></div>
                    <div><img src={desktopImage} alt="" className="signup__img--desktopImage"/></div>
                    <div><img src={motto} alt="" className="signup__img--motto"/></div>         
                </div>
                <div className="signup--light">
                    <img src={line} alt="" className="signup__img--line__top"/>
                    <img src={lightBulb} alt="" className="signup__img--bulb"/>
                    <img src={line} alt="" className="signup__img--line__bottom"/>
                </div>
                <div className="signup--form login--form">
                    <AlertComponent isError={errorMsg ? true : false} message={errorMsg} />
                    <AlertComponent isSuccess={successMsg ? true : false } message={successMsg}/>
                    <div className="signup--form--title login--form--title">
                        <Text label="Login" className="txt txt--fontSize__large" />
                    </div>
                    <div className="signup--form--rows">
                        <div className="signup--form--row">
                            <InputField type="text" id="email" name="email" placeholder="Email" className="input__large" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--row">
                            <InputField type="password" id="password" name="password" placeholder="password" className="input__large" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--btn login--form--btn"> 
                            <Button name="login" label="Login" handleClick={handleClick}/>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      auth: state.firebase.auth,
      authError: state.auth.authError,
      authResponse: state.auth.authResponse
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      login: (user) => dispatch(login(user))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)