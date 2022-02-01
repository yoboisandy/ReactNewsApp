import React, { Component } from "react";
import NewsCatalog from "./NewsCatalog";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default class NewsContainer extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 3,
    country: "us",
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalPage: 0,
      totalResults: 0,
    };
  }

  async getNews() {
    this.props.setProgress(70);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=160256bbedf34d29950357f82f3c2351&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(90);
    let parsedData = await data.json();
    this.props.setProgress(95);
    this.setState({ articles: parsedData.articles });
    this.setState({
      totalPage: Math.ceil(parsedData.totalResults / this.props.pageSize),
      totalResults: parsedData.totalResults,
    });
    this.setState({ loading: false });
    this.props.setProgress(100);
    console.log(this.state.articles);
  }

  // onNext = () => {
  // this.setState({ page: this.state.page + 1 });
  // this.getNews();
  // };
  // onPrev = () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.getNews();
  // };

  fetchMoreData = async () => {
    console.log("ferch more data");
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=160256bbedf34d29950357f82f3c2351&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    console.log(this.state.articles.length + " " + this.state.totalResults);
  };

  componentDidMount() {
    this.setState({ page: this.state.page + 1 });
    this.getNews();
    document.title = `News Monkey - ${this.props.category}`;
  }

  render() {
    return (
      <div className="">
        <div className="pt-6 pb-12 px-4">
          <h2 className="text-center font-serif mb-6 uppercase text-4xl xl:text-5xl">
            Top {this.props.category} Headlines
          </h2>
          {this.state.loading ? (
            <Spinner padding="py-40" widthHeight="w-40 h-40" />
          ) : (
            ""
          )}
          <div className="space-y-8">
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.page !== this.state.totalPage}
              loader={<Spinner padding="py-10" widthHeight="w-16 h-16" />}
            >
              {this.state.articles.map((element) => {
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
  }
}
