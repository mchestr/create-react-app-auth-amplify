import React, { Component } from 'react';
import logo from './aws_logo.png';
import './App.css';
import { Authenticator, SignIn } from 'aws-amplify-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class CustomSignIn extends SignIn {
  redirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state');
    const tokenType = "Basic";
    const accessToken = "mytoken";
    const redirectUri = urlParams.get('redirect_uri');
    window.location.replace(redirectUri + "?access_token=" + accessToken + "&state=" + state + "&token_type=" + tokenType);
  }

  showComponent() {
    return (
      <div>
        <img src={logo} alt="logo" style={{height: "50px", width: "84px", paddingBottom: "30px"}}/>
        <div className="aws-signin-general-label-box">
          <div className="aws-signin-general-link-box-no-margin main-table">
            <div className="aws-signin-float-left" style={{width: "40%"}}><b>Email</b></div>
          </div>
        </div>
        <div className="aws-signin-general-input-box">
          <input onChange={this.handleInputChange} id="username" key="username" name="username" className="aws-signin-textfield" autocorrect="off" autocapitalize="off" />
          <div id="password_input_alert" className="signin-input-warning" style={{display: "none"}}>
            <span id="password_input_alert_content" className="awsui-text-small aws-signin-color-red"></span>
          </div>
        </div>
        <div className="aws-signin-general-label-box">
            <div className="aws-signin-general-link-box-no-margin main-table">
                <div className="aws-signin-float-left" style={{width: "40%"}}><b>Password</b></div>
                <div className="aws-signin-float-right" style={{textAlign: "right; width:58%;"}}>
                    <span id="root_forgot_password_link">Forgot password?</span>
                </div>
            </div>
        </div>
        <div className="aws-signin-general-input-box">
            <input onChange={this.handleInputChange} id="password" key="password" name="password" type="password" className="aws-signin-textfield" autocorrect="off" autocapitalize="off" />
            <div id="password_input_alert" className="signin-input-warning" style={{display: "none"}}>
                <span id="password_input_alert_content" className="awsui-text-small aws-signin-color-red"></span>
            </div>
        </div>
        <div className="aws-signin-general-button-box">
            <button onClick={() => this.redirect()} id="signin_button" type="button" className="aws-signin-button aws-signin-button-size-normal aws-signin-button-variant-primary" style={{width: "100%"}}><span id="signin_button_text" style={{color: "white; font-weight: bold;"}}>Sign in</span></button>
        </div>
      </div>
    );
  }
}

class Root extends Component {
  render() {
    return (
      <Authenticator hide={[SignIn]} amplifyConfig={aws_exports}>
        <CustomSignIn />
      </Authenticator>
    );
  }
}

export default Root;
