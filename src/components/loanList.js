import React, { Component } from 'react';
import api from '../api/fakeApi';
import moment from 'moment';
import swal from 'sweetalert';

class LoanList extends Component {

    constructor() {
        super()
        this.state = {
            loans: []
        }
    }

    componentDidMount() {
        this.updateLoans();
    }

    updateLoans() {
        api.get('loan')
        .then((res) => {
            this.setState({loans: res.data})
        })
        .catch((err) => {
            console.log(err);
            swal({title: "Connection error.", icon: "warning"});
        })
    }

    verifyFinalRepay(repay_amount, paid, amount) {
        if((amount-paid) < repay_amount) {
            return true;
        }
        return false;
    }

    handleRepay(id, repay_history, repay_amount, paid, amount) {
        if(this.verifyFinalRepay(repay_amount, paid, amount)) {
            repay_amount = amount - paid;
        }
        const repay_record = {repay_amount: repay_amount, created_at: moment().format()}
        const new_repay_history = repay_history.concat(repay_record);

        api.patch(`loan/${id}/`, {
            repay_history: new_repay_history,
            paid: paid + repay_amount
        })
        .then((res) => {
            swal({title: `Repaid $${repay_amount} successfully !`, icon: "success"});
            this.updateLoans();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    renderApprovedLoans(loan) {
        if(loan.status === 'approved') {
            return (<td>
                        <a href="javascript:void(0);" 
                            onClick={this.handleRepay.bind(this, loan.id, loan.repay_history, loan.repay_amount, loan.paid, loan.amount)}>
                            Repay </a>${this.verifyFinalRepay(loan.repay_amount, loan.paid, loan.amount) ? loan.amount-loan.paid : loan.repay_amount}
                    </td>)
        } else {
            return (<td>-</td>)
        }
    }

    render() {
        const { loans } = this.state;
        if(loans.length === 0) {
            return (<h4>There are no loans.</h4>)
        } 
        return (
            <div>
                <table className="highlight">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Loaned</th>
                        <th>Paid</th>
                        <th>Remaining</th>
                        <th>Date</th>
                        <th>Loan Term</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loans.map((loan) => {
                            return (
                                <tr key={loan.id}>
                                    <td>{loan.username}</td>
                                    <td>$ {loan.amount}</td>
                                    <td>$ {loan.paid}</td>
                                    <td>$ {(loan.amount - loan.paid).toFixed(2)}</td>
                                    <td>{moment(loan.created_at).format("Do MMM YY, h:mm a")}</td>
                                    <td>{loan.loan_term} years</td>
                                    <td>{loan.status}</td>
                                    {
                                        loan.amount === loan.paid ? <td>Fully Paid</td> : this.renderApprovedLoans(loan)
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

export default LoanList;