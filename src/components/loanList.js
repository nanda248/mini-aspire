import React, { Component } from 'react';
import api from '../api/fakeApi';
import moment from 'moment';

class LoanList extends Component {

    constructor() {
        super()
        this.state = {
            loans: []
        }
    }

    componentDidMount() {
        api.get('loan')
        .then((res) => {
            this.setState({loans: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { loans } = this.state;
        if(loans.length === 0) {
            return (<h4>There are no loans.</h4>)
        } 
        return (
            <div>
                <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Amount</th>
                        <th>Date</th>
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
                                    <td>{moment(loan.created_at).format("Do MMM YY, h:mm a")}</td>
                                    <td>{loan.status}</td>
                                    {
                                        loan.status === 'approved' ?
                                        <td><a href="#">Repay</a></td> : <td>-</td>
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