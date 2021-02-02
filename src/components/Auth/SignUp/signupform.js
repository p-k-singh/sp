
// import React,{useState} from 'react';
// import {Input} from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import './signupform.css';
// import { Link } from "react-router-dom";
// import { Auth } from 'aws-amplify';
// import { useAppContext } from '../../../libs/contextLibs'

// const SignUp = (props) => {
    
//     const [firstName,setFirstName] = useState('');
//     const [lastName,setLastName] = useState('');
//     const [email,setEmail] = useState('');
//     const [phone,setPhone] = useState('');
//     const [password,setPassword] = useState('');
//     const [confirmPassword,setConfirmPassword] = useState('');
//     const { userHasAuthenticated } = useAppContext();

//     const onFirstNameChangeController = (event) => {
//         setFirstName(event.target.value);
//     }
//     const onLastNameChangeController = (event) => {
//         setLastName(event.target.value);
//     }
//     const onEmailChangeController = (event) => {
//         setEmail(event.target.value);
//     }
//     const onPhoneChangeController = (event) => {
//         setPhone(event.target.value);
//     }
//     const onPasswordChangeController = (event) => {
//         setPassword(event.target.value);
//     }
//     const onConfirmPasswordChangeController = (event) => {
//         setConfirmPassword(event.target.value);
//     }


//     async function onSubmitController(){
//         if(password!==confirmPassword)
//         {
//             alert('Password and Confirm password not same!')
//             return
//         }
//        var username = email;
//        if(email==='')
//             username='+91'+phone;
//         try {
//             await  Auth.signUp({
//                 username,
//                 password,
//                 attributes: {
//                     name: `${firstName} ${lastName}`
//                   }
               
//             })
//             .catch("error occured");

//             try {
//                 await Auth.signIn(username, password);
//                 //alert("Logged in");
//                 userHasAuthenticated(true)
//                 // props.setLogged(true)
//               } catch (e) {
//                 alert(e.message);
//               }
            
//         } catch (error) {
//             alert('error signing up:'+ JSON.stringify(error));
//         }
//     }

//     const facebookSignup = async () => {
//        try
//         {
//             await Auth.federatedSignIn({provider: 'Facebook'})
//             // userHasAuthenticated(true)
//         }
//         catch(e){
//             alert(e)
//         }
//     }

//     return (
//         <React.Fragment>
//             <header className="header">
//             <nav className="navbar navbar-expand-lg navbar-light py-3">
//             <div className="container">
           
//             {/* <a href="#" className="navbar-brand">
//                 <img src="https://res.cloudinary.com/mhmd/image/upload/v1571398888/Group_1514_tjekh3_zkts1c.svg" alt="logo" width="150" />
//             </a> */}
//             <a href="#" className="navbar-brand">
//                 GoFlexe
//             </a>
//             </div>
//         </nav>
//             </header>


//     <div className="container">
//                 <div className="row mt-4 align-items-center">
      
//         <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
//             <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
//             <h1>Create an Account</h1>
//         </div>

       
//         <div className="col-md-7 col-lg-6 ml-auto">
//             <form action="#">
//                 <div className="row">


//                     <div className="input-group col-lg-6 mb-4">
//                         {/* <div className="input-group-prepend">
//                             <span className="input-group-text bg-white px-4 border-md border-right-0">
//                                 <i className="fa fa-user text-muted"></i>
//                             </span>
//                         </div> */}
//                         <Input 
//                         value={firstName}
//                         onChange={(event)=>onFirstNameChangeController(event)}
//                         disableUnderline='true' id="firstName" type="text" 
//                         name="firstname" placeholder="First Name" 
//                         className="form-control bg-white  border-md" />
//                         {/* <input id="firstName" type="text" name="firstname" placeholder="First Name" className="form-control bg-white border-left-0 border-md" /> */}
//                     </div>

                   
//                     <div className="input-group col-lg-6 mb-4">
//                         {/* <div className="input-group-prepend">
//                             <span className="input-group-text bg-white px-4 border-md border-right-0">
//                                 <i className="fa fa-user text-muted"></i>
//                             </span>
//                         </div> */}
//                         <Input
//                         value={lastName}
//                         onChange={(event) =>onLastNameChangeController(event)}
//                         disableUnderline='true' id="lastName" type="text" 
//                         name="lastname" placeholder="Last Name" 
//                         className="form-control bg-white  border-md" />
//                         {/* <input id="lastName" type="text" name="lastname" placeholder="Last Name" className="form-control bg-white border-left-0 border-md" /> */}
//                     </div>

                    
//                     <div className="input-group col-lg-6 mb-4">
//                         <Input 
//                         value={email} onChange={(event) => onEmailChangeController(event)}
//                         disableUnderline='true' id="email" type="email" name="email" 
//                         placeholder="Email Address" 
//                         className="form-control bg-white  border-md"  />
//                         {/* <input id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" /> */}
//                     </div>

                   
//                     <div className="col-lg-1 " style={{marginTop:'10px'}}>
//                             OR
//                     </div>
                    
//                     <div className="input-group col-lg-5 mb-4">
//                         {/* <select id="countryCode" name="countryCode" style={{maxWidth: '80px'}} className="custom-select form-control bg-white  border-md h-100 font-weight-bold text-muted">
//                             <option value="">+91</option>
                            
//                         </select> */}
//                         <Input 
//                         value={phone} onChange={(event) => onPhoneChangeController(event)}
//                         disableUnderline='true' id="phoneNumber" type="tel" 
//                         name="phone" placeholder="Phone Number" 
//                         className="form-control bg-white border-md pl-3" />
//                         {/* <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3" /> */}
//                     </div>


                   
//                     {/* <div className="input-group col-lg-12 mb-4">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text bg-white px-4 border-md border-right-0">
//                                 <i className="fa fa-black-tie text-muted"></i>
//                             </span>
//                         </div>
                       
//                     </div> */}
                  
                   
//                     <div className="input-group col-lg-12 mb-4">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text bg-white px-4 border-md border-right-0">
//                                 <i className="fa fa-lock text-muted"></i>
//                             </span>
//                         </div>
//                         <Input 
//                         value={password} onChange={(event) => onPasswordChangeController(event)}
//                         disableUnderline='true' id="password" type="password" name="password" 
//                         placeholder="Password" 
//                         className="form-control bg-white border-left-0 border-md" />
//                         {/* <input id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" /> */}
//                     </div>

                    
//                     <div className="input-group col-lg-12 mb-4">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text bg-white px-4 border-md border-right-0">
//                                 <i className="fa fa-lock text-muted"></i>
//                             </span>
//                         </div>
//                         <Input 
//                         value={confirmPassword} onChange={(event) => onConfirmPasswordChangeController(event)}
//                         disableUnderline='true' id="passwordConfirmation" type="password" 
//                         name="passwordConfirmation" placeholder="Confirm Password" 
//                         className="form-control bg-white border-left-0 border-md" />
//                         {/* <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" /> */}
//                     </div>

                    
//                     <div className="form-group col-lg-12 mx-auto mb-0">
//                         <Button 
//                         onClick={onSubmitController}
//                         fullWidth='true' variant='contained' color='primary'
//                         >Create your account</Button>
//                         {/* <a href="#" className="btn btn-primary btn-block py-2">
//                             <span className="font-weight-bold">Create your account</span>
//                         </a> */}
//                     </div>

                   
//                     <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
//                         <div className="border-bottom w-100 ml-5"></div>
//                         <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
//                         <div className="border-bottom w-100 mr-5"></div>
//                     </div>

                    
//                     <div className="form-group col-lg-12 mx-auto">
//                         <Button
//                             onClick={facebookSignup}
//                             className="btn btn-primary btn-block py-2 btn-facebook"
//                             color='primary'
//                             variant='contained'
//                         >
//                             Continue with Facebook
//                         </Button>
//                         {/* <a href="#" className="btn btn-primary btn-block py-2 btn-facebook">
//                             <i className="fa fa-facebook-f mr-2"></i>
//                             <span className="font-weight-bold">Continue with Facebook</span>
//                         </a> */}
//                         <a href="#" className="btn btn-primary btn-block py-2 btn-twitter">
//                             <i className="fa fa-twitter mr-2"></i>
//                             <span className="font-weight-bold">Continue with Twitter</span>
//                         </a>
//                     </div>

                    
//                     <div className="text-center w-100">
//                         <p className="text-muted font-weight-bold">Already Registered?
//                          {/* <a href="#" className="text-primary ml-2">Login</a> */}
//                          <Link to='/login'>   Login</Link>
//                          </p>
//                     </div>

//                 </div>
//             </form>
//         </div>
//     </div>
// </div>


//         </React.Fragment>
//     );
// }

// export default SignUp;
import React,{useState} from 'react';
import {Input,FormControl} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './signupform.css';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useAppContext } from '../../../libs/contextLibs'
import Spinner from '../../UI/Spinner'
const SignUp = (props) => {
    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isDisable,setIsDisable] = useState(false)
    const { userHasAuthenticated } = useAppContext();

    const onFirstNameChangeController = (event) => {
        setFirstName(event.target.value);
    }
    const onLastNameChangeController = (event) => {
        setLastName(event.target.value);
    }
    const onEmailChangeController = (event) => {
        setEmail(event.target.value);
    }
    const onPhoneChangeController = (event) => {
        setPhone(event.target.value);
    }
    const onPasswordChangeController = (event) => {
        setPassword(event.target.value);
    }
    const onConfirmPasswordChangeController = (event) => {
        setConfirmPassword(event.target.value);
    }


    async function onSubmitController(){
        setIsDisable(true)
        if(password!==confirmPassword)
        {
            alert('Password and Confirm password not same!')
            return
        }
       // alert(firstName+','+lastName+','+email+','+phone+','+password);
       var username = email;
       if(email==='')
            username='+91'+phone;
        //alert(username)
        try {
            await  Auth.signUp({
                username,
                password,
                attributes: {
                    name: `${firstName} ${lastName}`
                  }
               
            })
            .catch("error occured");

            try {
                await Auth.signIn(username, password);
                //alert("Logged in");
                userHasAuthenticated(true)
                // props.setLogged(true)
              } catch (e) {
                alert(e.message);
              }
            
        } catch (error) {
            alert('error signing up:'+ JSON.stringify(error));
        }
        setIsDisable(false)
    }

    const facebookSignup = async () => {
       try
        {
            await Auth.federatedSignIn({provider: 'Facebook'})
            // userHasAuthenticated(true)
        }
        catch(e){
            alert(e)
        }
    }
    if(isDisable===true){
        return (
            <React.Fragment>
                <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light py-3">
                <div className="container">
               
                {/* <a href="#" className="navbar-brand">
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1571398888/Group_1514_tjekh3_zkts1c.svg" alt="logo" width="150" />
                </a> */}
                <a href="#" className="navbar-brand">
                    GoFlexe
                </a>
                </div>
            </nav>
                </header>
    
    
        <div className="container">
                    <div className="row mt-4 align-items-center">
          
            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                <h1>Authenticating...</h1>
            </div>
    
           
            <div className="col-md-7 col-lg-6 ml-auto">
                <Spinner />
            </div>
        </div>
    </div>
    
    
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light py-3">
            <div className="container">
           
            {/* <a href="#" className="navbar-brand">
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1571398888/Group_1514_tjekh3_zkts1c.svg" alt="logo" width="150" />
            </a> */}
            <a href="#" className="navbar-brand">
                GoFlexe
            </a>
            </div>
        </nav>
            </header>


    <div className="container">
                <div className="row mt-4 align-items-center">
      
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
            <h1>Create an Account</h1>
        </div>

       
        <div className="col-md-7 col-lg-6 ml-auto">
            <FormControl >
                <div className="row">


                    <div className="input-group col-lg-6 mb-4">
                        {/* <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div> */}
                        <Input 
                        value={firstName}
                        onChange={(event)=>onFirstNameChangeController(event)}
                        disableUnderline='true' id="firstName" type="text" 
                        name="firstname" placeholder="First Name" 
                        className="form-control bg-white  border-md" />
                        {/* <input id="firstName" type="text" name="firstname" placeholder="First Name" className="form-control bg-white border-left-0 border-md" /> */}
                    </div>

                   
                    <div className="input-group col-lg-6 mb-4">
                        {/* <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div> */}
                        <Input
                        value={lastName}
                        onChange={(event) =>onLastNameChangeController(event)}
                        disableUnderline='true' id="lastName" type="text" 
                        name="lastname" placeholder="Last Name" 
                        className="form-control bg-white  border-md" />
                        {/* <input id="lastName" type="text" name="lastname" placeholder="Last Name" className="form-control bg-white border-left-0 border-md" /> */}
                    </div>

                    
                    <div className="input-group col-lg-6 mb-4">
                        <Input 
                        value={email} onChange={(event) => onEmailChangeController(event)}
                        disableUnderline='true' id="email" type="email" name="email" 
                        placeholder="Email Address" 
                        className="form-control bg-white  border-md"  />
                        {/* <input id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" /> */}
                    </div>

                   
                    <div className="col-lg-1 " style={{marginTop:'10px'}}>
                            OR
                    </div>
                    
                    <div className="input-group col-lg-5 mb-4">
                        {/* <select id="countryCode" name="countryCode" style={{maxWidth: '80px'}} className="custom-select form-control bg-white  border-md h-100 font-weight-bold text-muted">
                            <option value="">+91</option>
                            
                        </select> */}
                        <Input 
                        value={phone} onChange={(event) => onPhoneChangeController(event)}
                        disableUnderline='true' id="phoneNumber" type="tel" 
                        name="phone" placeholder="Phone Number" 
                        className="form-control bg-white border-md pl-3" />
                        {/* <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3" /> */}
                    </div>


                   
                    {/* <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-black-tie text-muted"></i>
                            </span>
                        </div>
                       
                    </div> */}
                  
                   
                    <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <Input 
                        value={password} onChange={(event) => onPasswordChangeController(event)}
                        disableUnderline='true' id="password" type="password" name="password" 
                        placeholder="Password" 
                        className="form-control bg-white border-left-0 border-md" />
                        {/* <input id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" /> */}
                    </div>

                    
                    <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <Input 
                        value={confirmPassword} onChange={(event) => onConfirmPasswordChangeController(event)}
                        disableUnderline='true' id="passwordConfirmation" type="password" 
                        name="passwordConfirmation" placeholder="Confirm Password" 
                        className="form-control bg-white border-left-0 border-md" />
                        {/* <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" /> */}
                    </div>

                    
                    <div className="form-group col-lg-12 mx-auto mb-0">
                        <Button 
                        disabled={isDisable}
                        onClick={onSubmitController}
                        fullWidth='true' variant='contained' color='primary'
                        >Create your account</Button>
                        {/* <a href="#" className="btn btn-primary btn-block py-2">
                            <span className="font-weight-bold">Create your account</span>
                        </a> */}
                    </div>

                   
                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                        <div className="border-bottom w-100 ml-5"></div>
                        <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                        <div className="border-bottom w-100 mr-5"></div>
                    </div>

                    
                    <div className="form-group col-lg-12 mx-auto">
                        <Button
                            onClick={facebookSignup}
                            className="btn btn-primary btn-block py-2 btn-facebook"
                            color='primary'
                            variant='contained'
                        >
                            Continue with Facebook
                        </Button>
                        {/* <a href="#" className="btn btn-primary btn-block py-2 btn-facebook">
                            <i className="fa fa-facebook-f mr-2"></i>
                            <span className="font-weight-bold">Continue with Facebook</span>
                        </a> */}
                        <a href="#" className="btn btn-primary btn-block py-2 btn-twitter">
                            <i className="fa fa-twitter mr-2"></i>
                            <span className="font-weight-bold">Continue with Twitter</span>
                        </a>
                    </div>

                    
                    <div className="text-center w-100">
                        <p className="text-muted font-weight-bold">Already Registered?
                         {/* <a href="#" className="text-primary ml-2">Login</a> */}
                         <Link to='/login'>   Login</Link>
                         </p>
                    </div>

                </div>
            </FormControl>
        </div>
    </div>
</div>


        </React.Fragment>
    );
}


export default SignUp;
