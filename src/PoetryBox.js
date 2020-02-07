import React, { Component } from 'react';
import './styles/PoetryBox.css';

export default class PoetryBox extends Component {
    render() {

        let { poems } = this.props;

        return (
            <div className="container">
                <div className="PoetryBox">
                    {poems.map(poem => (
                        <div
                            className="PoetryBox-poems"
                            key={poem[0]}
                        >
                            {poem[1]}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
