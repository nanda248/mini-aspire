import React, {Component} from 'react';
import LoanSubmissionForm from './loanSubmissionForm';
import LoanApprovalForm from './loanApprovalForm';
import LoanList from './loanList';
import Navbar from './navbar';
import RepayHistory from './repayHistory';
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
            case 'repayHistory':
                return (<RepayHistory />)
            default: return
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="row container" style={{marginTop: '10px'}}>
                    <div className="col s3">
                        <div className="card card-btn hoverable" 
                            onClick={() => this.setState({showComponent: 'loanSubmissionForm'})}
                            style={{backgroundColor: this.state.showComponent === 'loanSubmissionForm' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Submit Loan</div>
                        </div>
                    </div>
                    <div className="col s3">
                        <div className="card card-btn hoverable"
                            onClick={() => this.setState({showComponent: 'loanApprovalForm'})}
                            style={{backgroundColor: this.state.showComponent === 'loanApprovalForm' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Approve or Deny</div>
                        </div>
                    </div>
                    <div className="col s3">
                        <div className="card card-btn hoverable"
                            onClick={() => this.setState({showComponent: 'loanList'})}
                            style={{backgroundColor: this.state.showComponent === 'loanList' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">All Loans</div>
                        </div>
                    </div>
                    <div className="col s3">
                        <div className="card card-btn hoverable"
                            onClick={() => this.setState({showComponent: 'repayHistory'})}
                            style={{backgroundColor: this.state.showComponent === 'repayHistory' ?  colors.secondaryColor: '#F5F5F5'}}>
                            <div className="card-title">Repay History</div>
                        </div>
                    </div>
                    {this.renderComponent()}
                </div>
            </div>
        )
    }
}

export default MainLayout;