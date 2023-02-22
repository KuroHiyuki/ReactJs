import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
// import { userService } from '../../services/userService';
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "hello",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("loging success");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log("error message", e.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    console.log(this.state.showPassword);
  };

  render() {
    return (
    <div className="container">
        <div className="row px-3">
          <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
            <div className="img-left d-none d-md-flex"></div>
            <div className="card-body">
              <h4 className="title text-center mt-4">Login into account</h4>
              <div className="form-box px-3">
                <div className="form-input">
                  <span>
                    <i className="fa-solid fa-user"></i>
              
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email Address"
                    required
                    value={this.state.username}
                    onChange={(e) => this.handleOnChangeUserName(e)}
                  />
                </div>
                <div className="form-input">
                  <span>
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={(e) => this.handleOnChangePassword(e)}
                  />
                  <span className="eye">
                    <i className={this.state.showPassword ? 'fas fa-eye':'fas fa-eye-slash'} onClick={() => {this.handleShowHidePassword()}}></i>
                  </span>
                </div>
                <div className="col-12 error-message" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="cb1"
                      name=""
                    />
                    <label className="custom-control-label" for="cb1">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-block text-uppercase"
                    onClick={() => this.handleLogin()}
                  >
                    Login
                  </button>
                </div>

                <div className="text-right">
                  <a href="#" className="forget-link">
                    Forget Password?
                  </a>
                </div>
                <div className="text-center mb-3">or login with</div>
                <div className="row mb-3">
                  <div className="col-4">
                    <a
                      href="#"
                      className="btn btn-block btn-social btn-facebook"
                    >
                      facebook
                    </a>
                  </div>
                  <div className="col-4">
                    <a href="#" className="btn btn-block btn-social btn-google">
                      google
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      href="#"
                      className="btn btn-block btn-social btn-twitter"
                    >
                      twitter
                    </a>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="text-center mb-2">
                  Don't have an account?
                  <a href="#" className="register-link">
                    Register here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
