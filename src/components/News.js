import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import fallbackNews from "../data/newsFallback.json";

const API_KEY = process.env.REACT_APP_GNEWS_API_KEY;
const NEWS_API_BASE_URL = process.env.REACT_APP_NEWS_API_BASE_URL;
const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const useDirectGNews = isLocalHost && API_KEY;
const MAX_API_PAGES = 2;
const CACHE_PREFIX = "newswave:gnews:";
const CACHE_TTL = 10 * 60 * 1000;
const pendingRequests = new Map();

const getFallbackArticles = (pageSize) =>
  fallbackNews.articles.slice(0, pageSize).map((article) => ({
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    url: article.url,
    publishedAt: article.publishedAt,
    source: article.source,
  }));

const getApiErrorMessage = (parsedData, response) => {
  if (parsedData?.errors) {
    return Array.isArray(parsedData.errors)
      ? parsedData.errors.join(" ")
      : Object.values(parsedData.errors).flat().join(" ");
  }

  if (parsedData?.message) {
    return parsedData.message;
  }

  if (!response.ok) {
    return `News API request failed with status ${response.status}.`;
  }

  return "";
};

const readCachedResponse = (cacheKey) => {
  const cached = sessionStorage.getItem(cacheKey);

  if (!cached) {
    return null;
  }

  const cachedResponse = JSON.parse(cached);
  if (Date.now() - cachedResponse.savedAt > CACHE_TTL) {
    sessionStorage.removeItem(cacheKey);
    return null;
  }

  return cachedResponse.data;
};

const fetchNewsPage = async (url) => {
  const cacheKey = `${CACHE_PREFIX}${url}`;
  const cachedResponse = readCachedResponse(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  const request = fetch(url)
    .then(async (response) => {
      const parsedData = await response.json();
      const result = {
        parsedData,
        errorMessage: getApiErrorMessage(parsedData, response),
      };

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: result, savedAt: Date.now() })
      );

      return result;
    })
    .finally(() => {
      pendingRequests.delete(url);
    });

  pendingRequests.set(url, request);
  return request;
};

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [apiError, setApiError] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const buildUrl = (pageNumber) => {
    const params = new URLSearchParams({
      lang: "en",
      country: props.country,
      topic: props.category,
      max: props.pageSize,
      page: pageNumber,
    });

    if (useDirectGNews) {
      params.set("token", API_KEY);
      return `https://gnews.io/api/v4/top-headlines?${params.toString()}`;
    }

    const baseUrl = NEWS_API_BASE_URL || "/.netlify/functions/news";
    return `${baseUrl}?${params.toString()}`;
  };

  const showFallbackNews = (message) => {
    setApiError(message);
    setArticles(getFallbackArticles(props.pageSize));
    setHasMore(false);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    if (isLocalHost && !API_KEY && !NEWS_API_BASE_URL) {
      showFallbackNews("GNews API key is missing. Showing saved headlines instead.");
      setLoading(false);
      props.setProgress(100);
      return;
    }

    props.setProgress(30);

    try {
      const { parsedData, errorMessage } = await fetchNewsPage(buildUrl(1));

      if (errorMessage) {
        showFallbackNews(errorMessage);
      } else {
        const nextArticles = parsedData.articles || [];
        setApiError("");
        setPage(1);
        setArticles(nextArticles);
        setHasMore(
          nextArticles.length < (parsedData.totalArticles || 0) &&
            MAX_API_PAGES > 1
        );
      }
    } catch (error) {
      showFallbackNews("Could not reach the news API. Showing saved headlines instead.");
    }

    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsWave - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    if ((isLocalHost && !API_KEY && !NEWS_API_BASE_URL) || loadingMore || nextPage > MAX_API_PAGES) {
      setHasMore(false);
      return;
    }

    setLoadingMore(true);

    try {
      const { parsedData, errorMessage } = await fetchNewsPage(buildUrl(nextPage));

      if (errorMessage) {
        setApiError(errorMessage);
        setHasMore(false);
      } else {
        const updatedArticles = articles.concat(parsedData.articles || []);
        setApiError("");
        setPage(nextPage);
        setArticles(updatedArticles);
        setHasMore(
          updatedArticles.length < (parsedData.totalArticles || 0) &&
            nextPage < MAX_API_PAGES
        );
      }
    } catch (error) {
      setApiError("Could not load more headlines from the news API.");
      setHasMore(false);
    }

    setLoadingMore(false);
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "80px" }}>
        <h2 className="text-center mb-4">NewsWave - Top Headlines</h2>
        {apiError && (
          <div className="alert alert-warning text-center fw-semibold">
            News API issue: {apiError}
          </div>
        )}
        {loading && <Spinner />}
        <div className="row g-4 align-items-stretch">
          {articles.map((element) => (
            <div className="col-md-4 d-flex" key={element.url}>
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
        {hasMore && (
          <div className="d-flex justify-content-center my-4">
            <button
              className="btn btn-primary"
              disabled={loadingMore}
              onClick={fetchMoreData}
              type="button"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
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
