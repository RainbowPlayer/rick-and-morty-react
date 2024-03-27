import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadCharacterDetails } from '../../redux/slices/characterSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch';
import './style.css';

const CharacterDetail = () => {
    let { id: characterId } = useParams();
    const dispatch = useAppDispatch();
    const { details, status, error } = useSelector((state: RootState) => state.characters);

    useEffect(() => {
        if (characterId) {
            dispatch(loadCharacterDetails(Number(characterId)));
        }
    }, [dispatch, characterId]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="character-detail">
            {details && (
                <>
                    <img src={details.image} alt={`Character ${details.name}`} className="character-detail-image" />
                    <h2 className="character-detail-name">{details.name}</h2>
                    <p className="character-detail-info">Status: {details.status}</p>
                    <p className="character-detail-info">Species: {details.species}</p>
                    <p className="character-detail-info">Gender: {details.gender}</p>
                    {details.type && <p className="character-detail-info">Type: {details.type}</p>}
                    <p className="character-detail-info">Origin: {details.origin.name}</p>
                    <p className="character-detail-info">Current Location: {details.location.name}</p>
                </>
            )}
        </div>
    );
};

export default CharacterDetail;

