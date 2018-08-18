import React, { Component } from 'react';
import { connect } from 'react-redux'

const states = [
    'Open',
    'Funded',
    'Done',
    'Disputed',
    'Resolved',
    'Cancelled'
]

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

    const hashtagItems = Object.keys(itemsIndexed)
    .map((hashtag, i) => {
        const itemsOfHashtag = itemsIndexed[hashtag]
        return (
            <div key={i} className="mt-4">
                <h4 style={{opacity: 0.6}}>{hashtag}</h4>
                <div className="container">
                <div className="row">
                {
                    Object.keys(itemsOfHashtag)
                    .sort((a,b) => (itemsOfHashtag[a].dateTime < itemsOfHashtag[b].dateTime) 
                        ? 1 
                        : ((itemsOfHashtag[b].dateTime < itemsOfHashtag[a].dateTime) 
                            ? -1 
                            : 0)
                        )
                    .map((key, j) => {
                    const item = itemsOfHashtag[key]
                    const timestamp = parseInt(item.dateTime, 10)*1000
                    const itemShortHash = item.itemHash ? item.itemHash.substring(0,12) : item.itemHash
                    const logItem = () => {
                        console.log('REQUESTED ITEM '+itemShortHash, item)
                    }
                    const replies = item.numberOfReplies
                    const selectee = item.selectee ? 'Selectee: '+item.itemHash.substring(0,8) : null
                    const seeker = item.seeker ? item.seeker.username : ''
                    
                    return (
                        <div key={j} className="card" style={cardStyle} onClick={logItem}>
                        <div className="card-body">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{itemShortHash}...</h5>
                                <small>{(new Date(timestamp)).toLocaleString()}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <p>{seeker}</p>
                                <p>{(parseInt(item.value, 10)/(10**18)).toFixed(2)} SWT</p>
                            </div>
                            <hr></hr>
                            <p className="mb-1">{item.description}</p>
                            <hr></hr>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1"style={{color: item.status == 0 ? 'green' : 'red'}}>{states[item.status]}</p>
                                <p className="mb-1"> . </p>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <p className="mb-1" style={{opacity: replies ? 1 : 0.2}}>{replies+' replies'}</p>
                                <p className="mb-1" style={{opacity: selectee ? 1 : 0.2}}>{selectee || 'No selectee'}</p>
                            </div>
                            
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
        <div className="container">
        <div className="row">
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
            {hashtagItems}
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
