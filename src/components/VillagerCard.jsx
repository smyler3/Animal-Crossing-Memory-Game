import "../styles/VillagerCard.css";

// TODO: add full body images on larger screens?
const VillagerCard = ({ villager }) => {
    return (
        <button className="villager-card">
            <div className="villager-img">
                <img src={`${villager.nh_details.icon_url}`} alt={`Icon of ${villager.name}`} />
            </div>
            <div className="villager-title-card" style={{backgroundColor: villager.title_color}}>
                <p className="villager-title" style={{color: villager.text_color}}>{villager.name}</p>
            </div>
        </button>
    )
}

export default VillagerCard;