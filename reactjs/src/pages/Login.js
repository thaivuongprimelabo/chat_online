import React, { Component } from 'react'
import { Link, NavLink  } from 'react-router-dom'
import Main from '../layouts/Main';

/** Validation */
import Messages from '../constants/Messages';
import ErrorElement from '../components/ErrorElement';
import FormValidator from '../validation/FormValidator';
import validator from 'validator';

/** Redux */
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';

import LoginCss from '../assets/css/login.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : 'thai.vuong@primelabo.com.vn',
            password : '!23456Abc',
            validation : {
                isValid : true
            },
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        var { auth } = this.props;
        if(typeof auth.userInfo.id !== 'undefined') {
            nextProps.history.push('/room');
        }
    }

    _doLogin = () => {

        this.setState({loading: true});

        var rules = [
            {
                field: 'email',
                paramMessages: ['Email'],
                method: validator.isEmail,
                validWhen: true,
                message: Messages.MSG_VALID_EMAIL
            },
            {
                field : 'password',
                paramMessages : ['Password'],
                method : validator.isEmpty,
                validWhen : false,
                message : Messages.MSG_REQUIRED
            }
        ]

        var formValidator = new FormValidator(rules);

        var validation = formValidator.validate(this.state);

        if(validation.isValid) {
            this.props.doLogin(this.state);
        } else {
            this.setState({
                validation
            })
        }
    }

    doRegister = () => {
        this.props.history.push('/register');
    }

    render() {
        var errEmail;
        var errPassword;
        var spinner;
        var { validation, loading } = this.state;

        if(loading) {
            spinner = <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{position:'absolute', right: '10px', top: '10px'}}></i>;
        }

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
                            <input type="email" id="inputEmail" className="form-control" placeholder="Please input email" value={ this.state.email } onChange={(event) => this.setState({ email: event.target.value })} />
                            { errEmail }
                            <span className="ttl">Password</span>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Please input password" value={ this.state.password }  onChange={(event) => this.setState({ password: event.target.value })} />
                            { errPassword }
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this._doLogin }>Login{spinner}</button>
                            
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center margin-top">
                    <NavLink  className="btn btn-success btn_freeregistration" to="/register" >Create acount</NavLink >
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      doLogin : (form) => {
          dispatch(Actions.doLogin(form));
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);