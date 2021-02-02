import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
} from "@material-ui/core";
import {
  Button,
  
} from '@material-ui/core'

import "./ResetPassword.css";

export default function ResetPassword() {
  const [fields, handleFieldChange] = useState({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEmailChange = (event) => {
     handleFieldChange({...fields,email:event.target.value})
  }
  const handleCodeChange = (event) => {
    handleFieldChange({...fields,code:event.target.value})
  }
  const handlePasswordChange = (event) => {
    handleFieldChange({...fields,password:event.target.value})
  }
  const handleConfirmPasswordChange = (event) => {
    handleFieldChange({...fields,confirmPassword:event.target.value})
  }
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      alert('line 47'+error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.password
      );
      setConfirmed(true);
    } catch (error) {
      alert('line65'+error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <form >
        <FormGroup bsSize="large" controlId="email">
          <FormLabel>Email</FormLabel>
          <TextField
            autoFocus
            variant='outlined'
            type="email"
            value={fields.email}
            onChange={(event)=>handleEmailChange(event)}
          />
        </FormGroup>
        <Button
          onClick={handleSendCodeClick}
          style={{marginTop:10}}
          bsSize="large"
          isLoading={isSendingCode}
          variant='contained'
          disabled={!validateCodeForm()}
        >
          Send Confirmation
        </Button>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form >
        <FormGroup bsSize="large" controlId="code">
          <FormLabel>Confirmation Code</FormLabel>
          <TextField
            autoFocus
            type="tel"
            value={fields.code}
            
            onChange={(event)=>handleCodeChange(event)}
          />
          <p>
            Please check your email ({fields.email}) for the confirmation code.
          </p>
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <FormLabel>New Password</FormLabel>
          <TextField
            type="password"
            value={fields.password}
            variant='outlined'
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup style={{marginTop:10,marginBottom:10}} bsSize="large" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <TextField
            type="password"
            value={fields.confirmPassword}
            onChange={handleConfirmPasswordChange}
            variant='outlined'
          />
        </FormGroup>
        <Button
          onClick={handleConfirmClick}
          bsSize="large"
          isLoading={isConfirming}
          variant='contained'
          disabled={!validateResetForm()}
        >
          Confirm
        </Button>
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="success">
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="ResetPassword">
      {!codeSent
        ? renderRequestCodeForm()
        : !confirmed
        ? renderConfirmationForm()
        : renderSuccessMessage()}
    </div>
  );
}