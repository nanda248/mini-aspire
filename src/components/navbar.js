import React, {Component} from 'react';
import colors from '../constants/colors';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav style={{background: '#193F50'}}>
                    <div className="nav-wrapper">
                        <a  style={{marginLeft: '15px', float: 'left'}} href="/">
                            <img 
                                src="loan_logo.png" 
                                alt="loan-logo" 
                                className="img-responsive" 
                                style={{width: '50px'}} /> 
                            <span style={{color: colors.tealLighten, fontWeight: '150', fontSize: '40px'}}>Aspire</span>
                            <span style={{color: colors.darkBlueLighten ,fontFamily: 'cursive', fontSize: '30px'}}>  Mini Loan Application</span>
                        </a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;