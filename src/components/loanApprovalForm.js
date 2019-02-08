import React, { Component } from 'react';
import api from '../api/fakeApi';
import moment from 'moment';
import swal from 'sweetalert';
import './mainLayout.css';

class LoanApprovalForm extends Component {

    constructor() {
        super()
        this.state = {
            pendingLoans: []
        }
    }

    componentDidMount() {
        this.updateLoans();
    }

    updateLoans() {
        api.get('loan')
        .then((res) => {
            const loans = res.data;
            const pendingLoans = loans.filter((loan) => loan.status === "pending")
            this.setState({pendingLoans})
        })
        .catch((err) => {
            console.log(err);
            swal({title: "Connection error.", icon: "warning"});
        })
    }

    handleApprove(id) {
        api.patch(`loan/${id}/`, {
            status: "approved"
        })
        .then((res) => {
            this.updateLoans();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleDeny(id) {
        api.patch(`loan/${id}/`, {
            status: "denied"
        })
        .then((res) => {
            this.updateLoans();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { pendingLoans } = this.state;
        if(pendingLoans.length === 0) {
            return (<h4>There are no pending loans.</h4>)
        } 
        return (
            <div>
                {
                    pendingLoans.map((loan) => {
                        return (
                            <div className="col s12 m6" key={loan.id}>
                                <div className="card blue-grey">
                                    <div className="card-content no-padding white-text">
                                        <span className="card-title">{loan.username}</span>
                                        <ul>
                                            <li>Amount: $ {loan.amount}</li>
                                            <li>Date: {moment(loan.created_at).format("Do MMM YY, h:mm a")}</li>
                                            <li>Weekly repay amount: $ {loan.repay_amount}</li>
                                        </ul>
                                    </div>
                                    <div className="card-action">
                                        <div className="btn-small green" onClick={this.handleApprove.bind(this,loan.id)}>Approve</div> &nbsp;
                                        <div className="btn-small red lighten-1" onClick={this.handleDeny.bind(this,loan.id)}>Deny</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default LoanApprovalForm;