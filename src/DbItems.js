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

    const items = Object.keys(itemsIndexed)
    .map((hashtag, i) => {
        const itemsOfHashtag = itemsIndexed[hashtag]
        return (
            <div key={i} className="mt-4">
                <h4 style={{opacity: 0.6}}>{hashtag}</h4>
                <div className="list-group">
                {
                    Object.keys(itemsOfHashtag).map((key, j) => {
                    const item = itemsOfHashtag[key]
                    return (
                        <div key={j} className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{item.itemHash.substring(0,12)}...</h5>
                            <small>{(new Date(item.dateTime)).toLocaleString()}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                            <p>{item.seeker.username}</p>
                            <p>{(parseInt(item.value)/(10**18)).toFixed(2)} SWT</p>
                            </div>
                            <p className="mb-1">{item.description}</p>
                        </div>
                        )
                    })
                }
                </div>
            </div>
        )
    })

    const hashtags = (
        <div className="list-group">
        {
            Object.keys(db)
            .filter(key => key.startsWith('hashtag-'))
            .map((key, i) => {
                const hashtag = db[key]
                return (
                    <div key={i} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{hashtag.hashtagAddress.substring(0,12)}...</h5>
                        <small>{''}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                        <p>{hashtag.hashtagName}</p>
                        <p>{(parseInt(hashtag.hashtagFee)/(10**18)).toFixed(2)} SWT</p>
                        </div>
                        <p className="mb-1">{hashtag.description}</p>
                    </div>
                )
            })
        }
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
