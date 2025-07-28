// import React, { useEffect, useState } from "react";
// import NewsItem from "./NewsItem";
// import { Spinner } from "./Spinner";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// const News  =(props) => {
//   const [articles, setarticles] = useState([])
//   const [loading, setloading] = useState(true)
//   const [page, setpage] = useState(1)
//   const [totalResults, settotalResults] = useState(0)
  
  
//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   const updateNews =  async ()=> {
//     props.setProgress(10)
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=86585d5b28534b4fb8edd78a826a2d4b&page=${page}&pageSize=${props.pageSize}`;
//     setloading(true)
//     props.setProgress(30)
//     let data = await fetch(url);
//     props.setProgress(70)
//     let parsedData = await data.json();
//     setarticles(parsedData.articles)
//     settotalResults(parsedData.totalResults)
//     setloading(false)
//     props.setProgress(100)
//   }

//   useEffect(() => {
//      document.title = `NewsWave - ${capitalizeFirstLetter(props.category)}`;
//     updateNews();
//     // eslint-disable-next-line
//   },[])
  
//   const fetchMoreData = async() => {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=86585d5b28534b4fb8edd78a826a2d4b&page=${page +1}&pageSize=${props.pageSize}`;
//     setpage(page+1)
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setarticles(articles.concat(parsedData.articles))
//     settotalResults(parsedData.totalResults)
//   };
//     return (
//       <>
//         <h2 className="text-center" style={{margin: "80px 0px 20px 0px"}}>NewsWave - Top Headlines</h2>
//         {loading && <Spinner/>}
//         <InfiniteScroll
//           dataLength={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
                         
//                          <div className="row">
//                              {articles.map((element) => {
//                                  return <div className="col-md-4" key={element.url}>
//                                      <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                                  </div>
//                              })}
//                          </div>
//                          </div> 
//             </InfiniteScroll>
//       </>
//   );
// }
//   News.defaultProps = {
//     country: 'in',
//       pageSize: 8,
//       category: 'general',
//     }

//     News.propTypes = {
//       country: PropTypes.string,
//       pageSize: PropTypes.number,
//       category: PropTypes.string,
//     };
    
//     export default News;


import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [apiError, setapiError] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${props.country}&topic=${props.category}&token=89a8e347dd2eb3636542f51eb19c3bad&max=${props.pageSize}&page=${page}`;
    setloading(true);
    props.setProgress(30);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.errors) {
        setapiError(true);
      } else {
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalArticles);
      }
    } catch (error) {
      setapiError(true);
    }
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsWave - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${props.country}&topic=${props.category}&token=89a8e347dd2eb3636542f51eb19c3bad&max=${props.pageSize}&page=${nextPage}`;
    setpage(nextPage);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.errors) {
        setapiError(true);
      } else {
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalArticles);
      }
    } catch (error) {
      setapiError(true);
    }
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "80px" }}>
        <h2 className="text-center mb-4">NewsWave - Top Headlines</h2>
        {apiError && (
          <div className="alert alert-danger text-center fw-bold fs-5">
            🚨 API Limit Exhausted or Error! Please try again later.
          </div>
        )}
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.image}
                  newsUrl={element.url}
                  author={element.source?.name}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "pk",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
