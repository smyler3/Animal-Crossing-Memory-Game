import "../styles/VillagerCard.css";

const backupTitleColour = "#EEA0A9";
const backupTextColour = "#FFFFFF";

const VillagerCard = ({ villager, handleClick }) => {
    return (
        <div className="villager-card" onClick={() => {handleClick(villager.id)}}>
            <div className="villager-img">
                <img src={`${villager.icon_url}`} alt={`Icon of ${villager.name}`} />
            </div>
            <div className="villager-title-card" style={{backgroundColor: villager.title_colour ? `#${villager.title_colour}` : backupTitleColour}}>
                <p className="villager-title" style={{color: villager.text_colour ? `#${villager.text_colour}` : backupTextColour}}>{villager.name}</p>
            </div>
        </div>
    )
};

export default VillagerCard;