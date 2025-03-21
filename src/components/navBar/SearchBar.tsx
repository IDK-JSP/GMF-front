import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import "../../styles/nav.css";
import { useNavigate } from 'react-router';

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    toggleFilter: () => void;
    checkedCount: number;
    handleForceClose: () => void;
    handleClickInside?: () => void;
}

export const SearchBar = ({ search, setSearch, toggleFilter, checkedCount, handleForceClose, handleClickInside }: SearchBarProps) => {

    const handleNavigateToSearchPage = () => {
        handleForceClose();
        navigate('/Research');
    };

    const navigate = useNavigate();
    return (
        <div className='search-container'
        >
            <input id='text-input'
                onChange={(e) => setSearch(e.target.value)}
                onClick={handleClickInside}
                // event si touche entrée
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleNavigateToSearchPage();
                    }
                }}
                type='text'
                placeholder='Rercherche un plat...' />
            <button id='filter-button' onClick={toggleFilter}>
                <FilterAltIcon /> <span>({checkedCount})</span>
            </button>
            <button id='validate-button' onClick={handleNavigateToSearchPage}><SearchIcon /></button>
        </div>
    );
};

export default SearchBar;