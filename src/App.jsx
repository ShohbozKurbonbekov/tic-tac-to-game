import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/WINNING__CONDITIONS.JS";
import GameOver from "./components/GameOver";

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const deriveGameboard = function (gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
};
const deriveWinner = function (gameBoard, playerNames) {
    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSqureSybol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSqureSybol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = playerNames[firstSquareSymbol];
        }
        return winner;
    }
};

const deriveActivePlayer = function (gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
};

export default function App() {
    const [playerNames, setPlayerNames] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameboard(gameTurns);

    const winner = deriveWinner(gameBoard, playerNames);

    const hasDraw = gameTurns.length === 9 && !winner;
    const handleSelectSquare = function (rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];

            return updatedTurns;
        });
    };
    const restartGame = function () {
        setGameTurns([]);
    };

    const handlePlayerNameChange = function (symbol, newName) {
        setPlayerNames((prev) => {
            return {
                ...prev,
                symbol: newName,
            };
        });
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialValue={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialValue={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={restartGame} />
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns}>LOGS</Log>
        </main>
    );
}
