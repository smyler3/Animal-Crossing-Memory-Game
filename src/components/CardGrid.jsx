import "../styles/CardGrid.css";
import VillagerCard from "./VillagerCard";

const CardGrid = ({ villagers }) => {
    return (
        <div className="card-grid">
            {villagers.map(villager => <VillagerCard key={villager.id} villager={villager} />)}
        </div>
    )
};

export default CardGrid