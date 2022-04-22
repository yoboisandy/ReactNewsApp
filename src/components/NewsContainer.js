import React, { useState, useEffect } from "react";
import NewsCatalog from "./NewsCatalog";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const NewsContainer = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const getNews = async () => {
    props.assignProgress(70);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=160256bbedf34d29950357f82f3c2351&pageSize=${props.pageSize}&page=${page}`;
    setloading(true);
    let data = await fetch(url);
    props.assignProgress(90);
    let parsedData = await data.json();
    props.assignProgress(95);
    setArticles(parsedData.articles);
    setTotalPage(Math.ceil(parsedData.totalResults / props.pageSize));
    setTotalResults(parsedData.totalResults);
    setloading(false);
    props.assignProgress(100);
    console.log(articles);
  };

  const fetchMoreData = async () => {
    console.log("ferch more data");

    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=160256bbedf34d29950357f82f3c2351&pageSize=${props.pageSize}&page=${
      page + 1
    }`;
    setPage(page + 1);
    setloading(false);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    console.log(articles.length + " " + totalResults);
  };

  useEffect(() => {
    document.title = `News Monkey - ${props.category}`;
    getNews();
  }, []);

  return (
    <div className="">
      <div className="pt-6 pb-6 px-4">
        <h2 className="text-center font-bold font-serif mb-6 uppercase text-md xl:text-2xl">
          Top {props.category} Headlines
        </h2>
        {loading ? <Spinner padding="py-40" widthHeight="w-40 h-40" /> : ""}
        <div className="space-y-8">
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={page !== totalPage}
            loader={<Spinner padding="py-10" widthHeight="w-16 h-16" />}
          >
            {articles.map((element) => {
              return (
                <NewsCatalog
                  key={element.url ?? ""}
                  title={element.title ?? ""}
                  description={element.description ?? ""}
                  date={element.publishedAt ?? ""}
                  source={element.source.name ?? ""}
                  image={
                    element.urlToImage ??
                    "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/687822/regular_800x320_cover-react-context-api-4929b3703a1a7082d99b53eb1bbfc31f.png"
                  }
                  url={element.url ?? ""}
                />
              );
            })}
          </InfiniteScroll>
        </div>
        {/* {this.state.totalPage > 1 ? (
            <div className="pt-6 flex justify-center">
              <nav aria-label="Page navigation">
                <ul class="inline-flex">
                  <li>
                    <button
                      onClick={this.onPrev}
                      class={`h-10 px-5 text-purple-600 transition-colors duration-150 bg-white border border-r-0 border-purple-600 rounded-l-lg focus:shadow-outline hover:bg-purple-600  hover:text-white ${
                        this.state.page === 1
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      disabled={this.state.page === 1 ? true : false}
                    >
                      &larr; Prev
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={this.onNext}
                      disabled={
                        this.state.page === this.state.totalPage ? true : false
                      }
                      className={`h-10  px-5 text-purple-600 transition-colors duration-150 bg-white border border-purple-600 rounded-r-lg focus:shadow-outline hover:bg-purple-600 hover:text-white ${
                        this.state.page === this.state.totalPage
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      Next &rarr;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            ""
          )} */}
      </div>
    </div>
  );
};

NewsContainer.defaultProps = {
  category: "general",
  pageSize: 3,
  country: "us",
};

export default NewsContainer;
