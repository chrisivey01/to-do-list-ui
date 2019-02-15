import React from 'react'

const List = (props) => {
    return (
        <div>
            <input value={props.newItem} onChange={props.inputChangeHandler}/>
            <button onClick={props.addItemHandler}>Add Item</button>
            <div>
                <ul>
                    {
                        props.to_do_list.map((item, i) => {
                            return (
                                <li onClick={() => props.deleteHandler(i)}
                                    style={{listStyle: 'none'}}>{item.item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default List;