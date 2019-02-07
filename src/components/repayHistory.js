import React, { Component } from 'react';
import api from '../api/fakeApi';
import moment from 'moment';
import swal from 'sweetalert';

class RepayHistory extends Component {

    constructor() {
        super()
        this.state = {
            loans: []
        }
    }

    componentDidMount() {
        api.get('loan')
        .then((res) => {
            const loans = res.data;
            const approvedLoans = loans.filter((loan) => loan.status === "approved")
            this.setState({loans: approvedLoans})
        })
        .catch((err) => {
            console.log(err);
            swal({title: "Connection error.", icon: "warning"});
        })
    }

    renderRepayHistory(loans) {
        return loans.map((loan) => {
            return (
                <div className="col s12">
                    <ul style={{textAlign: 'left'}}>
                        <li><h4>{loan.username}</h4></li>
                        {
                            loan.repay_history.map((repay_history) => {
                                return (
                                    <li>Repaid ${repay_history.repay_amount} on {moment(repay_history.created_at).format("Do MMM YY, h:mm a")}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="divider" style={{backgroundColor: 'grey'}}></div>
                </div>
            )
        })
    }

    render() {
        const { loans } = this.state;
        if(loans.length === 0) {
            return (<h4>There are no loans.</h4>)
        } 
        return (
            <div>
                {this.renderRepayHistory(loans)}
            </div>
        )
    }
}

export default RepayHistory;