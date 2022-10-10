import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, url, author, date } = this.props;
    return (
      <>
        <div className="card mb-3">
          <span
            className="badge rounded-pill bg-danger"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            {author}
          </span>
          <img
            src={imageUrl}
            className="card-img-top"
            style={{ height: "200px" }}
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
