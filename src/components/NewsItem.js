import React from "react";

const NewsItem = (props) =>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="my-3">
          <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h5>
                <span className="badge text-bg-success my-2">{source}</span>
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Updated by {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a rel="noreferrer" href={newsUrl} target="blank" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default NewsItem;
