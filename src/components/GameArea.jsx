import { useState, useEffect } from "react";
import "../styles/GameArea.css";
import CardGrid from "./CardGrid";
import GameEndModal from "./GameEndModal";
import Scoreboard from "./Scoreboard";
import VillagerCard from "./VillagerCard";
import Loader from "./Loader";
import mockVillagerData from "../data/mockVillagerData";

const MAX_VILLAGERS = 12;

const fetchData = async () => {
    // Handles timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    
    try {
        const res = await fetch(
            "https://animal-crossing-proxy-server.mylertalym01.workers.dev/api/villagers", 
            {
                mode: 'cors',
                signal: controller.signal,
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data from proxy server");
        }

        const data = await res.json();

        const villagerData = chooseRandomVillagers(data);

        return villagerData;
    }
    catch (err) {
        console.error("Error fetching data", err);

        return mockVillagerData;
    }
    finally {
        clearTimeout(timeoutId);
    };
};

const chooseRandomVillagers = (villagersData) => {
    const chosenVillagers = [];
    const offset = Math.floor(Math.random() * ((villagersData.length - 1) - MAX_VILLAGERS));

    for (let i = 0; i < MAX_VILLAGERS; i += 1) {
        chosenVillagers.push({
            id: villagersData[offset + i].id,
            name: villagersData[offset + i].name,
            title_colour: villagersData[offset + i].title_color,
            text_colour: villagersData[offset + i].text_color,
            icon_url: villagersData[offset + i].image_url,
            clicked: false,
        })
    };

    return chosenVillagers;
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
    const [villagers, setVillagers] = useState(mockVillagerData);
    const [loading, setLoading] = useState(false);

    // Collect villager data on loading
    useEffect(() => {
        const fetchVillagerData = async () => {
            // Begin loader
            setLoading(true);

            // Fetch Data
            const villagerData = await fetchData();
            setVillagers(villagerData);

            // Show off loader for a second lol
            await new Promise(resolve => setTimeout(resolve, 500));

            // End loader
            setLoading(false);
        };

        fetchVillagerData();
    }, []);

    // Progress game as cards are clicked
    const handleCardClick = (id) => {
        const villager = villagers.find(v => v.id === id);

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
        else {
            setBest(prev => Math.max(prev, score));
            setShowModal(true);
        }
    };

    // Restart game
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
                {loading ? (
                    <Loader/>
                ): (
                    <CardGrid >
                        {villagers.map(villager => <VillagerCard key={villager.id} villager={villager} handleClick={handleCardClick} />)}
                    </CardGrid>
                )}
            </main>
        </>
    )
};

export default GameArea;