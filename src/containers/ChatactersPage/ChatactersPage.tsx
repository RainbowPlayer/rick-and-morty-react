import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadCharacters } from '../../redux/slices/characterSlice';
import Character from '../../components/Character/Character';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch'
import { RootState } from '../../redux/store';
import Button from '../../components/Button/Button';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ROUTING } from '../../constants/ROUTING';

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
}

const CharactersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useAppDispatch();
    const { data, error } = useSelector((state: RootState) => state.characters);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCharacters(currentPage));
        if (data?.info?.pages) setTotalPages(data.info.pages);
    }, [dispatch, currentPage, data?.info?.pages]);

    const renderPagination = () => {
        const pagination = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);
        const delta = totalPages - currentPage;
    
        if (currentPage > 3) {
            pagination.push(<Button className="button" key={1} content="1" onClick={() => setCurrentPage(1)} />);
            pagination.push(<Button className="button" key={2} content="2" onClick={() => setCurrentPage(2)} />);
            pagination.push(<span key="left-ellipsis">...</span>);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            pagination.push(<Button key={i} content={String(i)} onClick={() => setCurrentPage(i)} className={currentPage === i ? 'active' : 'button'} />);
        }
    
        if (delta > 3) {
            pagination.push(<span key="right-ellipsis">...</span>);
            pagination.push(<Button className="button" key={totalPages-1} content={String(totalPages-1)} onClick={() => setCurrentPage(totalPages-1)} />);
            pagination.push(<Button className="button" key={totalPages} content={String(totalPages)} onClick={() => setCurrentPage(totalPages)} />);
        }
    
        return pagination;
    };

    const handleCharacterClick = (id: number) => {
        navigate(`${ROUTING.CHARACTERS}/${id}`);
    };

    return (
        <div>
            <h1>Персонажі Ріка і Морті</h1>
            <div>
                {data?.results.map((character: Character) => (
                    <div onClick={() => handleCharacterClick(character.id)} key={character.id}>
                        <Character
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            status={character.status}
                            species={character.species}
                            image={character.image}
                        />
                    </div>     
                ))}
            </div>
            <div className="pagination">
                <Button className='button' content="Попередня" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} />
                {renderPagination()}
                <Button className='button' content="Наступна" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} />
            </div>
        </div>
    );
};


export default CharactersPage;

