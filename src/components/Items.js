import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
function Items({ props }) {
    const { update, setUpdate, items, setItems, setAlert, citems, setCitems } = props;
    const handleUpdate = (idx) => {
        if (idx !== update) setUpdate(idx)
        else {
            if (citems[idx].name === '') {
                setAlert("Task can't be empty 2");
            } else {
                setItems(JSON.parse(JSON.stringify(citems)));
                setUpdate(-1);
            }
        }
    }
    return (
        <div>
            {
                citems.map((item, idx) => {
                    return (
                        <div key={idx} className='flex p-2 w-full'>
                            <div className="flex items-center justify-between w-full">
                                {
                                
                                    update === idx ?
                                        <Checkbox
                                            props={{
                                                done: item.done,
                                                setCitems,
                                                idx,
                                                citems
                                            }}
                                        />
                                    :
                                    <></>
                                
                                }
                                <Input
                                    disabled={update !== idx}
                                    value={item.name}
                                    onChange={
                                        (e) => {
                                            const updatedCitems = JSON.parse(JSON.stringify(citems));
                                            updatedCitems[idx].name = e.target.value;
                                            setCitems(updatedCitems);
                                        }
                                    }
                                    onEnterKey={() => {
                                        handleUpdate(idx)
                                    }}
                                    color={item.done?"bg-green-300":"bg-red-300"}
                                     />
                            </div>

                            <Button
                                onClick={() => {
                                    handleUpdate(idx)
                                }}
                                value={
                                    update === idx ? 'Update' : 'Edit'
                                }>
                            </Button>
                            {
                                update === idx
                                    ?
                                    <Button
                                        onClick={(e) => {
                                            setCitems(JSON.parse(JSON.stringify(items)))
                                            setUpdate(-1);
                                        }}
                                        value={"Cancel"}
                                    ></Button>
                                    :
                                    <></>
                            }
                            {
                                update !== idx
                                    ?
                                    <Button
                                        onClick={(e) => {
                                            const newList = items.filter((val, cidx) => {
                                                return idx !== cidx;
                                            })
                                            setItems(newList);
                                        }}
                                        value={"Delete"}
                                    ></Button>
                                    : <></>
                            }
                        </div>


                    )
                })
            }
        </div>
    )
}

export default Items