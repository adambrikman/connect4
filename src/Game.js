import React, { Component } from 'react';
import Board from './Board';
import PoetryBox from './PoetryBox';
import axios from 'axios';
import uuid from 'uuid/v4';
import './styles/Game.css';

export default class Game extends Component {

    static defaultProps = {
        numRows: 5,
        numColumns: 6
    }

    constructor(props) {
        super(props);

        this.state = {
            currPlayerNumber: 1,
            gameOver: false,
            history: [{
                trays: this.createBoard()
            }],
            poems: []
        }

        this.addChip = this.addChip.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    alternatePlayer(playerNumber) {
        return (playerNumber === 1) ? 2 : 1;
    }

    addChip(row, column) {

        let chipCoordinate, nextPlayerNumber, isBoardFull;
        let { numRows } = this.props;
        let { currPlayerNumber, history } = this.state;

        // Make copy of the board for immutability (to use Undo feature)
        let current = history[history.length - 1];

        // let currBoard = [...current.trays.slice()];
        let currBoard = JSON.parse(JSON.stringify(current.trays))

        // If top row of the specific column has an open spot, place a chip.
        if (currBoard[0][column] === 0) {
            for (let i = numRows - 1; i >= row; i--) {

                // Add player chip at lowest empty spot within row
                if (currBoard[i][column] === 0) {

                    currBoard[i][column] = currPlayerNumber;
                    chipCoordinate = [i, column];

                    nextPlayerNumber = this.alternatePlayer(currPlayerNumber);

                    this.getPoem();

                    isBoardFull = currBoard.every(row => row.every(cell => cell !== 0));

                    this.setState({
                        currPlayerNumber: nextPlayerNumber,
                        history: history.concat([{
                            trays: currBoard
                        }]),
                        gameOver: isBoardFull
                    })
                    break;
                }
            }
            return chipCoordinate;
        }

    }

    // Create the game board stored in state
    createBoard() {
        let board = new Array(this.props.numRows)
            .fill()
            .map(() => new Array(this.props.numColumns).fill(0))

        return board;
    }

    undoMove() {
        let { history, poems } = this.state;

        if (history.length > 1) {
            let reducedHistoryByOne = history.slice(0, history.length - 1);
            let prevPlayer = this.alternatePlayer(this.state.currPlayerNumber);

            this.setState({
                history: reducedHistoryByOne,
                currPlayerNumber: prevPlayer
            })
        }

        if (poems.length > 0) {
            let reducedPoemsByOne = poems.slice(0, poems.length - 1);

            this.setState({
                poems: reducedPoemsByOne
            })
        }
    }

    resetGame() {
        this.setState({
            currPlayerNumber: 1,
            gameOver: false,
            history: [{
                trays: this.createBoard()
            }],
            poems: []
        })
    }

    async getPoem() {
        try {
            let selectedPoem;

            let res = await axios.get('http://poetrydb.org/author/Shakespeare');
            let poems = res.data;

            // Randomly select a poem
            let randomPoem = Math.floor(Math.random() * poems.length);

            let poemLinesLength = Math.floor(Math.random() * poems[randomPoem].lines.length)

            for (let i = 0; i < poemLinesLength; i++) {
                if (poems[randomPoem].lines[i].length > 0) {
                    selectedPoem = poems[randomPoem].lines[i];
                    break;
                }
            }

            let poemNameAndLine = `${poems[randomPoem].title}: ${selectedPoem}`

            this.setState({
                poems: [...this.state.poems, [uuid(), poemNameAndLine]]
            })

            return poemNameAndLine;
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {

        let { currPlayerNumber, gameOver, history, poems } = this.state;
        let { numRows, numColumns } = this.props;
        let current = history[history.length - 1]

        return (
            <div className="Game">
                <div className="Game-title">
                    <h1> Connect 4 & Poetry </h1>
                </div>
                <Board
                    currPlayerNumber={currPlayerNumber}
                    board={current.trays}
                    gameOver={gameOver}
                    numRows={numRows}
                    numColumns={numColumns}
                    addChip={this.addChip}
                />
                <PoetryBox poems={poems} />
                <div className="btn-container">
                    <button className="btn" onClick={this.undoMove}>Undo Move</button>
                </div>
                {this.state.gameOver ? (
                    <div className="Game-over">
                        <h1> Game over! </h1>
                        <button className="btn" onClick={this.resetGame}>Play Again?</button>
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        )
    }
}
