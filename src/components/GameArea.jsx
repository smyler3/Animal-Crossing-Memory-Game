import { useState, useEffect } from "react";
import "../styles/GameArea.css";
import CardGrid from "./CardGrid";
import GameEndModal from "./GameEndModal";
import Scoreboard from "./Scoreboard";
import VillagerCard from "./VillagerCard";
import Loader from "./Loader";

// Fallback data if api calls fail
const mockVillagers = [
    {
        id: "flg18",
        name: "Diva",
        icon_url: "https://dodo.ac/np/images/5/5b/Diva_NH_Villager_Icon.png",
        title_colour: "a06fce",
        text_colour: "fffce9",
        clicked: false,
    },
    {
        id: "der05",
        name: "Lopez",
        icon_url: "https://dodo.ac/np/images/5/54/Lopez_NH_Villager_Icon.png",
        title_colour: "e8b010",
        text_colour: "fffce9",
        clicked: false,
    },
    {
        id: "dog02",
        name: "Lucky",
        icon_url: "https://dodo.ac/np/images/1/13/Lucky_NH_Villager_Icon.png",
        title_colour: "ffffff",
        text_colour: "848484",
        clicked: false,
    },
    {
        id: "ocp00",
        name: "Octavian",
        icon_url: "https://dodo.ac/np/images/a/a0/Octavian_NH_Villager_Icon.png",
        title_colour: "ff4040",
        text_colour: "fffad4",
        clicked: false,
    },
    {
        id: "flg15",
        name: "Raddle",
        icon_url: "https://dodo.ac/np/images/0/04/Raddle_NH_Villager_Icon.png",
        title_colour: "515151",
        text_colour: "fffce9",
        clicked: false,
    },
    {
        id: "cat23",
        name: "Raymond",
        icon_url: "https://dodo.ac/np/images/f/f2/Raymond_NH_Villager_Icon.png",
        title_colour: "acc8cf",
        text_colour: "498992",
        clicked: false,
    },
    {
        id: "crd05",
        name: "Roswell",
        icon_url: "https://dodo.ac/np/images/7/77/Roswell_NH_Villager_Icon.png",
        title_colour: "4c3317",
        text_colour: "fffce9",
        clicked: false,
    },
    {
        id: "rbt09",
        name: "Ruby",
        icon_url: "https://dodo.ac/np/images/3/3a/Ruby_NH_Villager_Icon.png",
        title_colour: "ffffff",
        text_colour: "848484",
        clicked: false,
    },
    {
        id: "duk10",
        name: "Scoot",
        icon_url: "https://dodo.ac/np/images/3/37/Scoot_NH_Villager_Icon.png",
        title_colour: "78dd62",
        text_colour: "28665a",
        clicked: false,
    },
    {
        id: "cbr05",
        name: "Stitches",
        icon_url: "https://dodo.ac/np/images/d/dd/Stitches_NH_Villager_Icon.png",
        title_colour: "ffaa3b",
        text_colour: "874c25",
        clicked: false,
    },
    {
        id: "squ14",
        name: "Sylvana",
        icon_url: "https://dodo.ac/np/images/b/b3/Sylvana_NH_Villager_Icon.png",
        title_colour: "c0ab72",
        text_colour: "fffce9",
        clicked: false,
    },
    {
        id: "kal00",
        name: "Yuka",
        icon_url: "https://dodo.ac/np/images/7/7c/Yuka_NH_Villager_Icon.png",
        title_colour: "194c89",
        text_colour: "fffad4",
        clicked: false,
    }
];

// Villagers to make cards from
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

const fetchData = async (names) => {
    // Handles timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 5 seconds timeout
    
    try {
        // Map the names array to an array of promises, where each promise fetches the data for a specific villager
        const promises = names.map(async (name) => {
            const res = await fetch(
                `https://api.nookipedia.com/villagers?name=${name}&nhdetails=true&thumbsize=200&api_key=63184bf1-8678-49bc-82c1-fa7ebb22043a&version=1.0.0`, 
                {
                    mode: 'cors',
                    signal: controller.signal,
                }
            );

            if (!res.ok) {
                throw new Error(`Failed to fetch data for ${name}`);
            }

            const data = await res.json();

            return {
                id: data[0].id,
                name: data[0].name,
                title_colour: data[0].title_color,
                text_colour: data[0].text_color,
                icon_url: data[0].nh_details.icon_url,
                clicked: false,
            };
        });

        const villagersData = await Promise.all(promises);
        
        clearTimeout(timeoutId);

        return villagersData;
    } catch (err) {
        console.error(`Error fetching data`, err);
        clearTimeout(timeoutId);

        return mockVillagers;
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
    const [loading, setLoading] = useState(false);

    // Collect villager data on loading
    useEffect(() => {
        const fetchVillagerData = async () => {
            // Begin loader
            setLoading(true);

            // Fetch Data
            const villagerData = await fetchData(villagerNames);
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