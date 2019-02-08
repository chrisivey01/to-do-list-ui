import React from 'react'
import Service from '../services/Service'

class Main extends React.Component {

    state = {
        newItem: '',
        alert: '',
        to_do_list: [
            {
                item: ''
            }
        ]
    }

    inputChangeHandler = (e) => {
        this.setState({
            newItem: e.currentTarget.value
        })
    }

    addItemHandler = () => {
        let to_do_list = this.state.to_do_list

        if (to_do_list.length > 0) {
            let updatedObj = {}
            updatedObj.item = this.state.newItem
            to_do_list.push(updatedObj)

            this.setState({
                to_do_list: to_do_list
            })
            Service.postItem(this.state.newItem)
                .then(console.log('posted'))
        }
    }

    deleteItemHandler = (i) => {
        let removedSlot = this.state.to_do_list;
        let removedItem = removedSlot.splice(i, 1)

        this.setState({
            to_do_list: removedSlot
        })
        Service.deleteItem(removedItem[0].item)
            .then(response => {
                this.setState({
                    alert: response
                })
            })
    }

    sendTextHandler = () => {
        Service.sendText()
            .then(response => {
                this.setState({
                    alert:response
                })
            })
    }


    componentWillMount() {
        Service.loadList()
            .then(response => {
                this.setState({
                    to_do_list: response
                })
            })
    }

    render() {
        const {to_do_list} = this.state
        return (
            <div>
                <div>
                    {this.state.alert !== '' ? this.state.alert : null}
                </div>
                <input value={this.state.newItem} onChange={(e) => this.inputChangeHandler(e)}/>
                <button onClick={() => this.addItemHandler()}>Add Item</button>
                <div>
                    <ul>
                        {
                            to_do_list.map((item, i) => {
                                return (
                                    <li onClick={() => this.deleteItemHandler(i)}
                                        style={{listStyle: 'none'}}>{item.item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    <button onClick={this.sendTextHandler}>Send Text</button>
                </div>
            </div>

        )
    }

}

export default Main;