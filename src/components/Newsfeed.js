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
         <div className="card border border-light-subtle" data-bs-theme="dark" style={{width: '20rem', height: '28rem'}}>
        <img src={imageUrl} className="card-img-top" alt="..." width="320px" height="180px"/>
        <div className="card-body">
          <p  className="text-secondary"><small>{timeAgo.format(new Date(datime))}</small></p>
            <h6 className="card-title-light text-justify">{title}...</h6>
            <p className="card-text-justify text-light">{description}...</p>
            <p className="card-text-justify font-weight-bold"><small className="text-muted">By <b>{!author?"Unknown":author}</b></small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-outline-secondary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default Newsfeed