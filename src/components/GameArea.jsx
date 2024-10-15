import { useState } from "react";
import "../styles/GameArea.css";
import CardGrid from "./CardGrid";
import GameEndModal from "./GameEndModal";
import Scoreboard from "./Scoreboard";
import VillagerCard from "./VillagerCard";

const mockVillagers = [
    {
        id: 1,
        name: "Raymond",
        nh_details: {
            icon_url: "https://example.com/raymond-icon.png",
        },
        title_color: "#FFD700", // Gold
        text_color: "#000000", // Black
    },
    {
        id: 2,
        name: "Marshall",
        nh_details: {
            icon_url: "https://example.com/marshall-icon.png",
        },
        title_color: "#C0C0C0", // Silver
        text_color: "#000000", // Black
    },
    {
        id: 3,
        name: "Sherb",
        nh_details: {
            icon_url: "https://example.com/sherb-icon.png",
        },
        title_color: "#ADD8E6", // Light Blue
        text_color: "#FFFFFF", // White
    },
    {
        id: 4,
        name: "Audie",
        nh_details: {
            icon_url: "https://example.com/audie-icon.png",
        },
        title_color: "#FF4500", // Orange Red
        text_color: "#FFFFFF", // White
    },
    {
        id: 5,
        name: "Coco",
        nh_details: {
            icon_url: "https://example.com/coco-icon.png",
        },
        title_color: "#D2B48C", // Tan
        text_color: "#000000", // Black
    },
    {
        id: 6,
        name: "Zucker",
        nh_details: {
            icon_url: "https://example.com/zucker-icon.png",
        },
        title_color: "#FF6347", // Tomato
        text_color: "#FFFFFF", // White
    },
    {
        id: 7,
        name: "Judy",
        nh_details: {
            icon_url: "https://example.com/judy-icon.png",
        },
        title_color: "#EE82EE", // Violet
        text_color: "#000000", // Black
    },
    {
        id: 8,
        name: "Ankha",
        nh_details: {
            icon_url: "https://example.com/ankha-icon.png",
        },
        title_color: "#FFD700", // Gold
        text_color: "#000000", // Black
    },
    {
        id: 9,
        name: "Cherry",
        nh_details: {
            icon_url: "https://example.com/cherry-icon.png",
        },
        title_color: "#DC143C", // Crimson
        text_color: "#FFFFFF", // White
    },
    {
        id: 10,
        name: "Beau",
        nh_details: {
            icon_url: "https://example.com/beau-icon.png",
        },
        title_color: "#DEB887", // Burly Wood
        text_color: "#000000", // Black
    },
    {
        id: 11,
        name: "Fang",
        nh_details: {
            icon_url: "https://example.com/fang-icon.png",
        },
        title_color: "#A9A9A9", // Dark Gray
        text_color: "#FFFFFF", // White
    },
    {
        id: 12,
        name: "Dom",
        nh_details: {
            icon_url: "https://example.com/dom-icon.png",
        },
        title_color: "#FFB6C1", // Light Pink
        text_color: "#000000", // Black
    }
];

// TODO: Add Promises for talking to API

// TODO: Add shuffle cards function

const GameArea = () => {
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [villagers, setVillagers] = useState(mockVillagers);

    const handleCardClick = () => {
        // // card unChecked
        // if () {
        //      // Make Card checked
        //      const newScore = score + 1;
        //      setScore(newScore);
        //      if (newScore === villagers.length) {
        //          setBest(newScore);
        //          setShowModal(true);
        //      }
        // }
        // // card checked
        // else {
        //     setBest(prev => max(prev, score));
        //     setShowModal(true);
        // }
    };

    const handlePlayAgainClick = () => {
        setScore(0);
        setShowModal(false);
    };

    return (
        <>
            {showModal && <GameEndModal score={score} best={best} onClick={handlePlayAgainClick} />}
            <main>
                <p className="game-description">
                    Click each Animal Crossing villager card in the grid without selecting the same card more than once.
                    <br />
                    <br />
                    Be careful though, as the cards will shuffle after every click to challenge your memory.
                </p>
                <Scoreboard score={score} best={best} />
                <CardGrid >
                    {villagers.map(villager => <VillagerCard key={villager.id} villager={villager} onClick={handleCardClick} />)}
                </CardGrid>
            </main>
        </>
    )
};

export default GameArea;