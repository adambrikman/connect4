import React, { Component } from 'react'
import Cell from './Cell';
import './styles/Board.css';

export default class Board extends Component {

    // Draw the visual representation of the game board
    drawBoard() {

        let gameBoard = [];
        let { numRows, numColumns, board, addChip } = this.props;

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for (let j = 0; j < numColumns; j++) {
                let coord = `${i} - ${j}`;

                row.push(<Cell
                    key={coord}
                    className="Cell"
                    isTaken={board[i][j]}
                    playerMove={() => addChip(i, j)}
                ></Cell>)
            }

            gameBoard.push(<tr key={i}>{row}</tr>)
        }

        return gameBoard;
    }

    render() {
        return (
            <table className="Board">
                <tbody>{this.drawBoard()}</tbody>
            </table>
        )
    }
}
