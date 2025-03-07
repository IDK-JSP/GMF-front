import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import "../../../styles/nav.css";
import { useNavigate } from 'react-router';

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    toggleFilter: () => void;
    checkedCount: number;
    toggleResultsVisibility: (value:boolean) => void;
}

export const SearchBar = ({ search, setSearch, toggleFilter, checkedCount, toggleResultsVisibility }: SearchBarProps) => {
    const navigate = useNavigate();
    return (
        <div className='search-container'

        onMouseEnter={() => toggleResultsVisibility(true)}
        >
            <input id='text-input'
            onChange={(e) => setSearch(e.target.value)}
            // event sir touche entrée
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    navigate('/Research');
                }
            }}
            
             type='text'
             placeholder='Search...' />
            <button id='filter-button' onClick={toggleFilter}>
                <FilterAltIcon /> <span>({checkedCount})</span>
            </button>
            <button id='validate-button' onClick={() => navigate('/Research')}><SearchIcon /></button>
        </div>
    );
};

export default SearchBar;