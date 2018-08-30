import React, { Component } from 'react'
import { Link, NavLink  } from 'react-router-dom'
import Main from '../layouts/Main';

/** Validation */
import Messages from '../constants/Messages';
import ErrorElement from '../components/ErrorElement';
import FormValidator from '../validation/FormValidator';
import Loading from '../components/Loading';
import validator from 'validator';

/** Redux */
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import * as constants from '../constants/Commons';
import LoginCss from '../assets/css/login.css'

import socketIOClient from 'socket.io-client';

const socket = socketIOClient(constants.SOCKET_HOST);

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : 'thai.vuong@primelabo.com.vn',
            password : '!23456Abc',
            validation : {
                isValid : true
            },
            loading: false,
            roomId : localStorage.getItem('roomId')
        }
    }

    componentDidMount() {
        socket.emit('get-user-online-list',{roomId : this.state.roomId});
    }

    componentWillReceiveProps(nextProps) {
        var { auth, showLoading } = nextProps;

        console.log(showLoading);

        if(!showLoading) {
            if(auth.userInfo !== null) {
                nextProps.history.push('/room');
            } else {
                alert('Email or password invalid');
                this.setState({loading: false});
            }
        }

        this.setState({loading : showLoading});
    }
    

    _doLogin = () => {
        
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
            this.setState({loading:true});
            this._checkExists();
        } else {
            this.setState({
                validation
            })
        }
    }

    _checkExists = () => {
        
        socket.emit('check-exists', {
            email : this.state.email, 
            password: this.state.password, 
            roomId : this.state.roomId
        });
    }

    doRegister = () => {
        this.props.history.push('/register');
    }

    render() {

        socket.on('set-user-online-list', (res) => {
            if(res.code === constants.CODE_OK) {
                console.log(res.data);
            }
        });
        
        var errEmail;
        var errPassword;
        var spinner;
        var { validation, loading } = this.state;

        if(loading) {
            spinner = <Loading />;
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
        auth : state.auth,
        showLoading : state.showLoading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
      doLogin : (form) => {
          dispatch(Actions.doLogin(form));
      },
      addUserOnline: (user) => {
        dispatch(Actions.addUserOnlineToList(user));
      },
      handleLoginLoading: (status) => {
        dispatch(Actions.updateLoadingStatus(status))
    }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);