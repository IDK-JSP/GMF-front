import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import "../../../styles/nav.css";

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    toggleFilter: () => void;
    checkedCount: number;
}

export const SearchBar = ({ search, setSearch, toggleFilter, checkedCount }: SearchBarProps) => {
    return (
        <div className='search-container'>
            <input id='text-input' onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search...' />
            <button id='filter-button' onClick={toggleFilter}>
                <FilterAltIcon /> <span>({checkedCount})</span>
            </button>
            <button id='validate-button'><SearchIcon /></button>
        </div>
    );
};

export default SearchBar;