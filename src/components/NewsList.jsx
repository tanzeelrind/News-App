import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";

const NewsList = () => {
  const [articles, setArticles] = useState(() => {
    // Initialize articles with a safe check for localStorage
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      try {
        return JSON.parse(storedArticles);
      } catch (error) {
        console.error("Error parsing articles from localStorage:", error);
      }
    }
    return [];
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      const fetchArticles = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/everything?q=${query}&apiKey=${process.env.REACT_APP_API_KEY}`
          );

          setArticles(response.data.articles);
          localStorage.setItem(
            "articles",
            JSON.stringify(response.data.articles)
          );
          console.log(
            "Articles stored in local storage:",
            response.data.articles
          );
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
      const timeOutId = setTimeout(fetchArticles, 500);
      return () => clearTimeout(timeOutId);
    } else {
      setArticles([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search News..."
          onChange={handleChange}
          value={query}
        />
      </div>
      <div className="news-list">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))
        ) : (
          <p>Search For the Desired News.</p>
        )}
      </div>
    </>
  );
};

export default NewsList;
