import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {} from '../../';
import { handleLoginApi } from "../../services/UserService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Hidden: false
    };
  }
  handleOnchangeinput = (event) => {
    const value = event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  };
  handleLogin = async() => {
    console.log(`username: ${this.state.username}`);
    console.log(`Password: ${this.state.password}`);
    console.log('All state:',this.state)
    await handleLoginApi(this.state.username,this.state.password);
  };
  handleHidden = () => {
    this.setState({
      Hidden: !this.state.Hidden
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row px-3">
          <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
            <div className="img-left d-none d-md-flex"></div>
            <div className="card-body">
              <h4 className="title text-center mt-4">Login into account</h4>
              <form className="form-box px-3">
                <div className="form-input">
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email Address"
                    required
                    value={this.state.username}
                    onChange={(event) => this.handleOnchangeinput(event)}
                  />
                </div>
                <div className="form-input">
                  <span>
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type={this.state.Hidden ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangeinput(event)}
                  />
                  <span className="eye">
                    <i className={this.state.Hidden ? 'fas fa-eye':'fas fa-eye-slash'} onClick={() => {this.handleHidden()}}></i>
                  </span>
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
                    onClick={() => {
                      this.handleLogin();
                    }}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
