import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom';

/** Validation */
import Messages from '../constants/Messages';
import ErrorElement from '../components/ErrorElement';
import FormValidator from '../validation/FormValidator';
import validator from 'validator';

/** Redux */
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : '',
            email : '',
            password : '',
            passwordConf : '',
            validation : {
                isValid : true
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        var { auth } = this.props;
        if(typeof auth.userInfo.id !== 'undefined') {
            nextProps.history.push('/room');
        }
    }

    _doRegister = () => {
        var rules = [
            {
                field: 'name',
                paramMessages: ['Name'],
                method: validator.isEmpty,
                validWhen: false,
                message: Messages.MSG_REQUIRED
            },
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
            },
            {
                field : 'passwordConf',
                paramMessages : ['Password confirm'],
                method : validator.isEmpty,
                validWhen : false,
                message : Messages.MSG_REQUIRED
            },
            {
                field : 'passwordConf',
                fieldCompare: 'password',
                paramMessages : ['Password confirm'],
                method : 'checkPasswordConf',
                message : Messages.MSG_PASSWORD_CONF
            }
        ]

        var formValidator = new FormValidator(rules);

        var validation = formValidator.validate(this.state);

        if(validation.isValid) {
            this.props.createAccount(this.state);
        } else {
            this.setState({
                validation
            })
        }
    }

    render() {
        var errName;
        var errEmail;
        var errPassword;
        var errPasswordConf;
        var { validation } = this.state;
        if(!validation.isValid) {
            errName = <ErrorElement message={validation.name.message} />
            errEmail = <ErrorElement message={validation.email.message} />
            errPassword = <ErrorElement message={validation.password.message} />
            errPasswordConf = <ErrorElement message={validation.passwordConf.message} />
        }

        return (
            <Main mainclassName={'container'}>
                <p className="text-center login_ttl"><b>Account Register</b></p>
                <div className="row login_card">
                    <div className="card col-md-6">
                        <span>Please input account information.</span>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <span className="ttl">Name</span>
                            <input type="email" id="inputName" className="form-control" placeholder="Please input email"  value={ this.state.name } onChange={(event) => this.setState({ name: event.target.value })} />
                            { errName }
                            <span className="ttl">E-mail</span>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Please input email"  value={ this.state.email } onChange={(event) => this.setState({ email: event.target.value })} />
                            { errEmail }
                            <span className="ttl">Password</span>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Please input password"  value={ this.state.password } onChange={(event) => this.setState({ password: event.target.value })} />
                            { errPassword }
                            <span className="ttl">Confirm Password</span>
                            <input type="password" id="inputPasswordConf" className="form-control" placeholder="Please input password confirmation"  value={ this.state.passwordConf } onChange={(event) => this.setState({ passwordConf: event.target.value })} />
                            { errPasswordConf }
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={ this._doRegister }>Submit</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center margin-top">
                    <Link className="btn btn-success btn_freeregistration" to="/" >Login</Link>
                </div>
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        auth : state.auth
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        createAccount : (form) => {
            dispatch(Actions.createAccount(form));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);