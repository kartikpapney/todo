import Input from "./Input";
import Button from "./Button";

const Search = ({props}) => {
    const {setItems, items, setAlert, search, setSearch} = props;

    const handleAddItem = function(e) {
        const isThere = items.some((a) => a.name.toLowerCase() === search.toLowerCase());
        if(search === '') {
            setAlert("Task can't be empty")
        } else if(search.length>30) {
            setAlert("Please make your task short and precise (upto 30 character)")
        } else if(isThere) {
            setAlert('Task already there');
        } else {
            const nitems = [...items]
            nitems.push({
                name: search,
                done: false
            })
            setItems(nitems)
        }
    }

    return (
        <div className="flex p-2 justify-between w-full">
            <Input 
                value={search}
                disabled={false}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onEnterKey={handleAddItem}
                placeholder={"Your Task Here!!"}
            />
            <Button 
                value={"Add"}
                onClick={handleAddItem}/>
        </div>
    )
}

export default Search;