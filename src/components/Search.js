import Input from "./Input";
import Button from "./Button";

const Search = ({props}) => {
    const {setItems, items, setAlert, search, setSearch, selectedDate} = props;

    const handleAddItem = function(e) {
        const isThere = items.some((a) => a.name.toLowerCase() === search.toLowerCase());
        if(search === '') {
            setAlert("Task can't be empty")
        } else if(search.length>30) {
            setAlert("Please make your task short and precise (upto 30 character)")
        } else if(isThere) {
            setAlert('Task already there');
        } else {
            const nitems = [...items];
            nitems.unshift({  // Add new task at the top
                name: search,
                done: false,
                createdAt: selectedDate // Use the selected date instead of today
            });
            setItems(nitems);
            setSearch(''); // Clear input after adding
        }
    }

    return (
        <div className="mb-8">
            <div className="flex gap-3">
                <Input 
                    value={search}
                    disabled={false}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onEnterKey={handleAddItem}
                    placeholder={"Add a new task..."}
                />
            </div>
        </div>
    )
}

export default Search;
