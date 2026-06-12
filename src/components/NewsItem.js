import React from "react";

const NewsItem = (props) =>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <>
        <div className="news-card-wrap h-100 w-100">
          <div className="card news-card h-100">
            <img src={imageUrl} className="card-img-top news-card-img" alt={title} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title news-card-title">{title}</h5>
              <h5>
                <span className="badge text-bg-success my-2">{source}</span>
              </h5>
              <p className="card-text news-card-description">{description}</p>
              <p className="card-text news-card-meta">
                <small className="text-body-secondary">
                  Updated by {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a rel="noreferrer" href={newsUrl} target="blank" className="btn btn-primary mt-auto align-self-start">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default NewsItem;
