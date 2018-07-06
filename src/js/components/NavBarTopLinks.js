import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    isAuth: state.user.email ? true : false
})

class NavBarTopLinks extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickUser = this.handleClickUser.bind(this);
        this.state = {
            isShowUserLink: false,
            user: {
                email:'admin@mail.com',
                password:'0000',
                isRememberMe: true,
            }
        }
        this.handleUserInputChange = this.handleUserInputChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleClickUser(e){
        e.preventDefault();
        this.setState({
            isShowUserLink: !this.state.isShowUserLink
        })
    }
    handleUserInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const user = { ... this.state.user, [name]: value};
        this.setState({user});
    }
    handleSignIn() {
        const {email, password, isRememberMe} = this.state.user;
        this.props.onSignIn(email, password, isRememberMe);
    }
    handleSignOut(event) {
        event.preventDefault();
        this.props.onSignOut();
    }

    renderSignBlock() {
        const { email, password, isRememberMe } = this.state.user;
        const { isAuth } = this.props;
        if(isAuth) {
            return (
                <li>
                    <a href="#" onClick={this.handleSignOut}>
                         <i className="fa fa-sign-out fa-fw"></i> Logout
                    </a>
                </li>
            );
        } else {
            return (
                <li>
                    <div className="form-group" style={{'margin':'2px'}}>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </div>
                            <input type="text" name="email" value={email} onChange={this.handleUserInputChange} className="form-control" id="email" placeholder="帳號" />
                        </div>
                    </div>
                    <div className="form-group" style={{'margin':'2px'}}>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <input type="text" name="password" value={password} onChange={this.handleUserInputChange} className="form-control" id="password" placeholder="密碼" />
                        </div>
                    </div>
                    <div className="form-group" style={{'margin':'2px'}}>
                        <label><input type="checkbox" name="isRememberMe" checked={isRememberMe} onChange={this.handleUserInputChange}/> Remember me</label>
                        <button type="submit" onClick={this.handleSignIn} className="btn btn-default btn-sm pull-right">Sign in</button>
                    </div>
                </li>
            );
        }
    }

    render() {
        var userLinkClasses = classNames({
            'dropdown-menu': true,
            'show': this.state.isShowUserLink
        });
        const userLinkStyle = {
            'minWidth': this.props.isAuth ? '160px': '300px'
        };
        return (
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={this.handleClickUser}>
                        <i className="fa fa-user"></i> 
                    </a>
                    <ul className={userLinkClasses} style={userLinkStyle}>
                        {this.renderSignBlock()}
                    </ul>
                </li>
            </ul>
        );
    }
}

export default connect(mapStateToProps)(NavBarTopLinks);