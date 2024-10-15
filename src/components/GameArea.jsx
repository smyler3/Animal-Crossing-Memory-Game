import { useState, useEffect } from "react";
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
        clicked: false,
    },
    {
        id: 2,
        name: "Marshall",
        nh_details: {
            icon_url: "https://example.com/marshall-icon.png",
        },
        title_color: "#C0C0C0", // Silver
        text_color: "#000000", // Black
        clicked: false,
    },
    {
        id: 3,
        name: "Sherb",
        nh_details: {
            icon_url: "https://example.com/sherb-icon.png",
        },
        title_color: "#ADD8E6", // Light Blue
        text_color: "#FFFFFF", // White
        clicked: false,
    },
    {
        id: 4,
        name: "Audie",
        nh_details: {
            icon_url: "https://example.com/audie-icon.png",
        },
        title_color: "#FF4500", // Orange Red
        text_color: "#FFFFFF", // White
        clicked: false,
    },
    {
        id: 5,
        name: "Coco",
        nh_details: {
            icon_url: "https://example.com/coco-icon.png",
        },
        title_color: "#D2B48C", // Tan
        text_color: "#000000", // Black
        clicked: false,
    },
    {
        id: 6,
        name: "Zucker",
        nh_details: {
            icon_url: "https://example.com/zucker-icon.png",
        },
        title_color: "#FF6347", // Tomato
        text_color: "#FFFFFF", // White
        clicked: false,
    },
    {
        id: 7,
        name: "Judy",
        nh_details: {
            icon_url: "https://example.com/judy-icon.png",
        },
        title_color: "#EE82EE", // Violet
        text_color: "#000000", // Black
        clicked: false,
    },
    {
        id: 8,
        name: "Ankha",
        nh_details: {
            icon_url: "https://example.com/ankha-icon.png",
        },
        title_color: "#FFD700", // Gold
        text_color: "#000000", // Black
        clicked: false,
    },
    {
        id: 9,
        name: "Cherry",
        nh_details: {
            icon_url: "https://example.com/cherry-icon.png",
        },
        title_color: "#DC143C", // Crimson
        text_color: "#FFFFFF", // White
        clicked: false,
    },
    {
        id: 10,
        name: "Beau",
        nh_details: {
            icon_url: "https://example.com/beau-icon.png",
        },
        title_color: "#DEB887", // Burly Wood
        text_color: "#000000", // Black
        clicked: false,
    },
    {
        id: 11,
        name: "Fang",
        nh_details: {
            icon_url: "https://example.com/fang-icon.png",
        },
        title_color: "#A9A9A9", // Dark Gray
        text_color: "#FFFFFF", // White
        clicked: false,
    },
    {
        id: 12,
        name: "Dom",
        nh_details: {
            icon_url: "https://example.com/dom-icon.png",
        },
        title_color: "#FFB6C1", // Light Pink
        text_color: "#000000", // Black
        clicked: false,
    }
];

const villagerNames = [
    'Diva',
    'Lopez',
    'Lucky',
    'Octavian',
    'Raddle',
    'Raymond',
    'Roswell',
    'Ruby',
    'Scoot',
    'Stitches',
    'Sylvana',
    'Yuka',
];

// Use a given list of villager names to fetch data from Nookipedia and return an array of promises that resolve with their data
const getData = async (names) => {
    try {
        const villagersData = await Promise.all(names.map(async (name) => {
            const res = await fetch(
                `https://api.nookipedia.com/villagers?name=${name}&nhdetails=true&thumbsize=200&api_key=${env.API_KEY}&version=1.0.0`, 
                {mode: 'cors'}
            );
            const data = await res.json();
            // TODO: remove
            console.log("data", data);
            return {
                id: data[0].id,
                name: data[0].name,
                title_colour: data[0].title_color,
                text_colour: data[0].text_color,
                icon_url: data[0].nh_details.icon_url,
                // image_url: data[0].nh_details.image_url,
                clicked: false,    
            }
        }));

        console.log("retrieved data", villagersData);

        return villagersData;
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Durstfield Shuffle implementation (https://gist.github.com/webbower/8d19b714ded3ec53d1d7ed32b79fdbac)
const shuffle = (originalArray) => {
    let array = originalArray.slice();

    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };

    return array;
};

const GameArea = () => {
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [villagers, setVillagers] = useState(mockVillagers);

    // Collect villager data on loading
    useEffect(() => {
        const fetchVillagerData = async () => {
            const villagerData = await getData(villagerNames);
            setVillagers(villagerData);
        };

        fetchVillagerData();
    }, []);

    const handleCardClick = (id) => {
        const villager = villagers.find(v => v.id === id);

        // Card not previously clicked
        if (!villager.clicked) {
            // Add to score
             const newScore = score + 1;
             setScore(newScore);

            //  Game won
             if (newScore === villagers.length) {
                 setBest(newScore);
                 setShowModal(true);
             }
            // Game continues
             else {
                // Make card clicked and shuffle
                const newVillagers = [...villagers.filter(v => v.id !== id), {...villager, clicked: true}];
                setVillagers(shuffle(newVillagers));
             }
        }
        // Card previously clicked
        else {
            setBest(prev => Math.max(prev, score));
            setShowModal(true);
        }
    };

    const handlePlayAgainClick = () => {
        setScore(0);
        setShowModal(false);

        // Make all cards unclicked and shuffle
        const newVillagers = villagers.map(v => { return {...v, clicked: false } });
        setVillagers(shuffle(newVillagers));
    };

    return (
        <>
            {showModal && <GameEndModal score={score} best={best} handleClick={handlePlayAgainClick} />}
            <main>
                <p className="game-description">
                    Click each Animal Crossing villager card in the grid without selecting the same card more than once.
                    <br />
                    <br />
                    Be careful though, as the cards will shuffle after every click to challenge your memory.
                </p>
                <Scoreboard score={score} best={best} />
                <CardGrid >
                    {villagers.map(villager => <VillagerCard key={villager.id} villager={villager} handleClick={handleCardClick} />)}
                </CardGrid>
            </main>
        </>
    )
};

export default GameArea;