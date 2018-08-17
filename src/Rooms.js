import React, { Component } from 'react';
import { connect } from 'react-redux'

class RoomsView extends Component {
  render() {
    const rooms = this.props.rooms

    // const itemsIndexed = {}
    // Object.keys(db)
    // .filter(key => key.startsWith('item-'))
    // .forEach(key => {
    //     const hashtag = key.split('-')[1]
    //     const itemHash = key.split('-')[2]
    //     if (!itemsIndexed[hashtag]) itemsIndexed[hashtag] = {}
    //     itemsIndexed[hashtag][itemHash] = db[key]
    // })

    const cardStyle = {
        width: "18rem", 
        margin: "10px"
    }

    const roomsItems = rooms.map((room, i) => {
        return (
            <div key={i} className="card" style={cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    {
                        room.sockets.map((socket, j) => {
                        const state = socket.on ? null : ' (off)'
                        return (
                            <p key={j} className="card-text">{socket.name}{state}</p>
                            )
                        })
                    }
                </div>
            </div>
        )
    })
    
    return (
        <div>
            <h1 className="mt-4">Rooms</h1>
            <div class="container">
                <div class="row">
                    {roomsItems}
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    rooms: state.rooms,
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RoomsView)
