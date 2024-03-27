import './style.css'

type CharacterProps = {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    onClick: (id: number) => void;
};

const Character = ({ id, name, status, species, image, onClick }: CharacterProps) => {
    return (
        <div className="character-container">
            <img src={image} alt={`Персонаж ${name}`} className="character-image" />
            <h2 className="character-name">{name}</h2>
            <p className="character-info">{species} - {status}</p>
        </div>
    );
};


export default Character;

