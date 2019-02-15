import React from 'react'
import Service from '../services/Service'
import List from './List'
import Popup from './Popup'
class Main extends React.Component {

    state = {
        newItem: '',
        alert: '',
        itemHandler:'',
        to_do_list: [
            {
                item: ''
            }
        ],
        showPopup: false
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

        this.setState({
            newItem:''
        })
    }

    deleteHandler = (i) =>{
        this.deletePopup(i);
        this.setState({
            itemHandler:i
        })
    }

    deleteItemHandler = () => {
        let i = this.state.itemHandler
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

        this.setState({
            showPopup:!this.state.showPopup
        })

    }

    deletePopup = () => {
        this.setState({
            showPopup:!this.state.showPopup
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
        const {to_do_list, showPopup} = this.state
        return (
            <div>
                <div>
                    {this.state.alert !== '' ? this.state.alert : null}
                </div>
                {
                    showPopup ?
                        <Popup
                            deleteItemHandler={this.deleteItemHandler}
                            deletePopup={this.deletePopup}/> : null
                }

                <List
                    newItem={this.state.newItem}
                    to_do_list={to_do_list}
                    inputChangeHandler={(e)=>this.inputChangeHandler(e)}
                    addItemHandler={()=>this.addItemHandler()}
                    deleteHandler={this.deleteHandler}
                />
                <button onClick={this.sendTextHandler}>Send Text</button>
            </div>

        )
    }

}

export default Main;