//for local
// const API = 'http://localhost:8080'
//for prod
const API = 'http://18.209.63.46'




export default {

    loadList(){
        return fetch(API +'/items')
            .then(response => response.json())
    },

    postItem(item){
        return fetch(API +'/item', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(item)
        }
    )},

    deleteItem(item){
        return fetch(API+'/items/delete/',{
            method: "DELETE",
            headers: {
                "Content-Type":'application/json'
            },
            body: item
        })
        .then(res => res.text())
    },

    sendText(){
        return fetch(API+'/text')
            .then(res => res.text())
    }
}