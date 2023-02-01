import React, { Component } from 'react'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export class Newsfeed extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, datime} = this.props;
    return (
      <div>
         <div className="card" style={{width: '20rem', height: '25rem'}}>
        <img src={imageUrl} className="card-img-top" alt="..." width="320px" height="180px"/>
        <div className="card-body">
            <h6 className="card-title text-justify">{title}...</h6>
            <p className="card-text-justify">{description}...</p>
            <p className="card-text-justify font-weight-bold"><small className="text-muted">By {!author?"Unknown":author} on {timeAgo.format(new Date(datime))}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sn btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default Newsfeed