import Button from './Button';
import Input from './Input';

function Items({ props }) {
    const { update, setUpdate, items, setItems, setAlert, citems, setCitems } = props;
    return (
        <div>
            {
                citems.map((item, idx) => {
                    return (
                        <div key={idx} className='flex p-2 justify-between w-full'>
                            <Input
                                disabled={update !== idx}
                                value={item.name}
                                onChange={
                                    (e) => {
                                        const updatedCitems = JSON.parse(JSON.stringify(citems));
                                        updatedCitems[idx].name = e.target.value;
                                        setCitems(updatedCitems);
                                    }
                                } />
                            <Button
                                onClick={(e) => {
                                    if (idx !== update) setUpdate(idx)
                                    else {
                                        if (citems[idx].name === '') {
                                            setAlert("Task can't be empty 2");
                                        } else {
                                            setItems(JSON.parse(JSON.stringify(citems)));
                                            setUpdate(-1);
                                        }
                                    }
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
                                                return idx != cidx;
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