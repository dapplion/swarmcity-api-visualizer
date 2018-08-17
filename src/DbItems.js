import React, { Component } from 'react';
import { connect } from 'react-redux'

class DbItemsView extends Component {
  render() {
    const db = this.props.db

    const itemsIndexed = {}
    Object.keys(db)
    .filter(key => key.startsWith('item-'))
    .forEach(key => {
        const hashtag = key.split('-')[1]
        const itemHash = key.split('-')[2]
        if (!itemsIndexed[hashtag]) itemsIndexed[hashtag] = {}
        itemsIndexed[hashtag][itemHash] = db[key]
    })

    const cardStyle = {
        width: "18rem", 
        margin: "10px"
    }

    const items = Object.keys(itemsIndexed)
    .map((hashtag, i) => {
        const itemsOfHashtag = itemsIndexed[hashtag]
        return (
            <div key={i} className="mt-4">
                <h4 style={{opacity: 0.6}}>{hashtag}</h4>
                <div class="container">
                <div class="row">
                {
                    Object.keys(itemsOfHashtag).map((key, j) => {
                    const item = itemsOfHashtag[key]
                    const timestamp = parseInt(item.dateTime, 10)*1000
                    return (
                        <div key={i} className="card" style={cardStyle}>
                        <div className="card-body">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{item.itemHash.substring(0,12)}...</h5>
                            <small>{(new Date(timestamp)).toLocaleString()}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                            <p>{item.seeker.username}</p>
                            <p>{(parseInt(item.value, 10)/(10**18)).toFixed(2)} SWT</p>
                            </div>
                            <p className="mb-1">{item.description}</p>
                        </div>
                        </div>
                        )
                    })
                }
                </div>
                </div>
            </div>
        )
    })

    const hashtags = (
        <div class="container">
        <div class="row">
        {
            Object.keys(db)
            .filter(key => key.startsWith('hashtag-'))
            .map((key, i) => {
                const hashtag = db[key]
                return (
                    <div key={i} className="card" style={cardStyle}>
                    <div className="card-body">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{hashtag.hashtagAddress.substring(0,12)}...</h5>
                        <small>{''}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                        <p>{hashtag.hashtagName}</p>
                        <p>{(parseInt(hashtag.hashtagFee, 10)/(10**18)).toFixed(2)} SWT</p>
                        </div>
                        <p className="mb-1">{hashtag.description}</p>
                    </div>
                    </div>
                )
            })
        }
        </div>
        </div>
    ) 
    
    return (
        <div>
            <h1 className="mt-4">Hashtag items</h1>
            {items}
            <h1 className="mt-4">Hashtags</h1>
            {hashtags}
        </div>
    );
  }
}

const mapStateToProps = state => ({
    db: state.db,
})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DbItemsView)
