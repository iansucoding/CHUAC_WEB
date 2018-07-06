import React from 'react';

import NavBarTopLinks from './NavBarTopLinks';
import SideBar from './SideBar';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    handleSignIn(email, password, isRememberMe) {
        this.props.onSignIn(email, password, isRememberMe);
    }
    handleSignOut() {
        this.props.onSignOut();
    }

    render() {
        const { toggle } = this.state;
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="navbar-header">
                    <button 
                        type="button"
                        onClick={this.handleToggle} 
                        className="navbar-toggle" 
                        data-toggle="collapse" 
                        data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">中華大學空調系統</a>
                </div>
                <NavBarTopLinks onSignIn={this.handleSignIn} onSignOut={this.handleSignOut}/>
                <SideBar toggle={toggle}/>
            </nav>
        );
    }
}

export default Navigation;