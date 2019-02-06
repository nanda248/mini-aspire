import React, {Component} from 'react';
import LoanSubmissionForm from './loanSubmissionForm';
import LoanApprovalForm from './loanApprovalForm';
import LoanList from './loanList';
import Navbar from './navbar';
import './mainLayout.css';
import colors from '../constants/colors';

class MainLayout extends Component {
    constructor() {
        super();
        this.state = {
            showComponent: 'loanSubmissionForm'
        }
    }

    renderComponent() {
        switch(this.state.showComponent) {
            case 'loanSubmissionForm': 
                return (<LoanSubmissionForm />)
            case 'loanApprovalForm':
                return (<LoanApprovalForm />)
            case 'loanList':
                return (<LoanList />)
            default: return
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="row container" style={{marginTop: '10px'}}>
                    <div className="col s4">
                        <div className="card card-btn hoverable" 
                            onClick={() => this.setState({showComponent: 'loanSubmissionForm'})}
                            style={{backgroundColor: this.state.showComponent === 'loanSubmissionForm' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Submit Loans</div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card card-btn hoverable"
                            onClick={() => this.setState({showComponent: 'loanApprovalForm'})}
                            style={{backgroundColor: this.state.showComponent === 'loanApprovalForm' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Approve or Reject Loans</div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card card-btn hoverable"
                            onClick={() => this.setState({showComponent: 'loanList'})}
                            style={{backgroundColor: this.state.showComponent === 'loanList' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Loan Lists</div>
                        </div>
                    </div>
                    {this.renderComponent()}
                </div>

                <br />
            </div>
        )
    }
}

export default MainLayout;