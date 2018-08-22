import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Main from '../layouts/Main';
import Messages from '../constants/Messages';

import ErrorElement from '../components/ErrorElement';
import FormValidator from '../validation/FormValidator';
import validator from 'validator';

import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';

import LoginCss from '../assets/css/login.css'


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : '',
            validation : {
                isValid : true
            }
        }
    }

    doLogin = () => {
        this.props.doLogin(this.state);
        // var rules = [
        //     {
        //         field: 'email',
        //         paramMessages: ['Email'],
        //         method: validator.isEmail,
        //         validWhen: true,
        //         message: Messages.MSG_VALID_EMAIL
        //     },
        //     {
        //         field : 'password',
        //         paramMessages : ['Password'],
        //         method : validator.isEmpty,
        //         validWhen : false,
        //         message : Messages.MSG_REQUIRED
        //     }
        // ]

        // var formValidator = new FormValidator(rules);

        // var validation = formValidator.validate(this.state);

        // if(validation.isValid) {
        //     this.props.history.push('/room');
        // } else {
        //     this.setState({
        //         validation
        //     })
        // }
    }

    doRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        var errEmail;
        var errPassword;
        var { validation } = this.state;
        if(!validation.isValid) {
            errEmail = <ErrorElement message={validation.email.message} />
            errPassword = <ErrorElement message={validation.password.message} />
        }
        return (
            <Main mainclass={'container'}>
                <p className="text-center login_ttl"><b>Login</b></p>
                <div className="row login_card">
                    <div className="card col-md-6">
                        <span>Please input account information.</span>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <span className="ttl">E-mail</span>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Please input email" onChange={(event) => this.setState({ email: event.target.value })} />
                            { errEmail }
                            <span className="ttl">Password</span>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Please input password" onChange={(event) => this.setState({ password: event.target.value })} />
                            { errPassword }
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this.doLogin }>Login</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center margin-top">
                    <Link className="btn btn-success btn_freeregistration" to="/register" >Create acount</Link>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      doLogin : (form) => {
          dispatch(Actions.doLogin(form));
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);