import React, { Component } from 'react';
import './styles/Cell.css';

export default class Cell extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.playerMove();
    }

    render() {
        let { isTaken } = this.props;

        let classes = "Cell";

        if (isTaken === 1) {
            classes = "Cell Cell-red"
        }

        else if (isTaken === 2) {
            classes = "Cell Cell-blue"
        }

        return (
            <td className={classes} onClick={this.handleClick}></td>
        )
    }
}
