import { useState } from "react";

export default function Player({
    initialValue,
    symbol,
    isActive,
    onChangeName,
}) {
    const [playerName, setPlayerName] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);

    // "Edit" button
    const handleEditClick = function () {
        setIsEditing((prev) => !prev);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    // Listenning changes in the "input" TAG
    const handleChange = function (event) {
        setPlayerName(event.target.value);
    };

    return (
        <li className={isActive ? "active" : null}>
            <span className="player">
                {isEditing && (
                    <input
                        onChange={handleChange}
                        type="text"
                        value={playerName}
                        required
                    />
                )}
                {!isEditing && (
                    <span className="player-name">{playerName}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
