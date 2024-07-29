import React from "react";
const NewsCard = ({ article }) => {
  return (
    <div
      className="news-card"
      onClick={() => window.open(article.url, "_blank")}
    >
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-card-image"
      />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>
        <strong>Published At:</strong>
        {article.publishedAt}
      </p>
    </div>
  );
};
export default NewsCard;
