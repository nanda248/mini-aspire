import React, { Component } from 'react';
import M from 'materialize-css';
import swal from 'sweetalert';
import api from '../api/fakeApi';
import moment from 'moment';
import colors from '../constants/colors';

class LoanSubmissionForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            amount: '',
            term: '',
            repay_amount: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleLoanTermChange = this.handleLoanTermChange.bind(this);
        this.handleChangeRepayAmount = this.handleChangeRepayAmount.bind(this);
    }

    componentDidMount() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, []);
    }

    handleLoanTermChange(event) {
        this.setState({term: event.target.value})
    }

    handleChangeName(event) {
        this.setState({name: event.target.value})
    }

    handleChangeAmount(event) {
        const amount = this.convertToCurrency(event.target.value)
        this.setState({amount: amount})
    }

    handleChangeRepayAmount(event) {
        const amount = this.convertToCurrency(event.target.value)
        this.setState({repay_amount: amount})
    }

    convertToCurrency(value) {
        // replace multiple dots with a single dot
        value = value.replace(/\.+/g,'.');
        // only allow 2 digits after a dot
        value = value.replace(/(.*\.[0-9][0-9]?).*/g,'$1');
        // replace multiple zeros with a single one
        value = value.replace(/^0+(.*)$/,'0$1');
        // remove leading zero
        value = value.replace(/^0([^.].*)$/,'$1');
        return value;
      }

    handleSubmit(e) {
        e.preventDefault()
        let { name, amount, term, repay_amount } = this.state;
        amount = parseFloat(amount);
        repay_amount = parseFloat(repay_amount);
        if(name === '') {
            swal({title: "Username cannot be empty.", icon: "warning"});
            return
        } else if(amount <= 0) {
            swal({title: "Amount cannot be less than or equal to 0.", icon: "warning"});
            return
        } else if(term === '') {
            swal({title: "Loan term cannot be empty.", icon: "warning"});
            return
        } else if(amount > 10000) {
            swal({title: "Loan amount cannot be more than 10000", icon: "warning"});
            return
        } else if(repay_amount > amount) {
            swal({title: "Repay amount cannot be greater than loan amount.", icon: "warning"});
            return
        }
        api.post('loan', {
            amount: amount,
            username: name,
            loan_term: term,
            status: "pending",
            created_at: moment().format(),
            repay_amount: repay_amount,
            paid: 0,
            repaid: false,
            repay_history: []
        })
        .then((res) => {
            if(res.request.statusText === "Created") {
                swal({title: "Loan submitted successfully.", icon: "success"});
                this.setState({
                    name: '',
                    amount: '',
                    term: "0",
                    repay_amount: ''
                })
            }
        })
        .catch((err) => {
            console.log(err);
            swal({title: "Connection error.", icon: "warning"});
        })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" className="validate" value={this.state.name} onChange={this.handleChangeName} />
                    </div>
                <div className="input-field col s6">
                    <select defaultValue="0" onChange={this.handleLoanTermChange}>
                        <option value="0" disabled>Choose Loan Term </option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                        <option value="5">5 Years</option>
                        <option value="6">6 Years</option>
                        <option value="7">7 Years</option>
                        <option value="8">8 Years</option>
                        <option value="9">9 Years</option>
                        <option value="10">10 Years</option>
                    </select>
                    <label>Loan Terms (min 2 years - max 10 years)</label>
                </div>
                </div>

                <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="loan-amount">Loan Amount (Max. $10,000)</label>
                    <input id="loan-amount" type="number" className="validate" value={this.state.amount} onChange={this.handleChangeAmount} />   
                </div>
                </div>

                <div className="row">
                <div className="input-field col s6">
                    <label htmlFor="repay-amount">Repay Amount (Weekly)</label>
                    <input id="repay-amount" type="number" className="validate" value={this.state.repay_amount} onChange={this.handleChangeRepayAmount} />   
                </div>
                </div>

                <button className="btn col s2" style={{backgroundColor: colors.primaryColor}} type="submit">Submit
                    <i className="material-icons right">send</i>
                </button>
                </form>
            </div>
        )
    }
}

export default LoanSubmissionForm;