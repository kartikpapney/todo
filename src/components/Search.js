import Input from "./Input";
import Button from "./Button";

const Search = ({props}) => {
    const {setItems, items, setAlert, search, setSearch} = props;

    return (
        <div className="flex p-2 justify-between w-full">
            <Input 
                value={search}
                disabled={false}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder={"Your Task Here!!"}
            />
            <Button 
                value={"Add Task"}
                onClick={() => {
                    const isThere = items.some((a) => a.name.toLowerCase() === search.toLowerCase());
                    if(search === '') {
                        setAlert("Task can't be empty")
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
                }}/>
        </div>
    )
}

export default Search;