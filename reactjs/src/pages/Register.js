import React, { Component } from 'react'
import Main from '../layouts/Main';
import { Link } from 'react-router-dom';

export default class Register extends Component {

    render() {
        return (
            <Main mainclassName={'container'}>
                <p className="text-center login_ttl"><b>Account Register</b></p>
                <div className="row login_card">
                    <div className="card col-md-6">
                        <span>Please input account information.</span>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"></span>
                            <span className="ttl">E-mail</span>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Please input email" required />
                            <span className="ttl">Password</span>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Please input password" required />
                            <span className="ttl">Confirm Password</span>
                            <input type="password" id="inputPasswordConf" className="form-control" placeholder="Please input password confirmation" required />
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Submit</button>
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