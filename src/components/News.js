import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
  };

  static propTypes = {
    country: PropTypes.string,
  };

  capitalizer(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      articles: [],
      page: 1,
      totalArticles: 0,
    };
    document.title = `DD News - ${this.capitalizer(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(30);
    let rawData = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}
      &pageSize=${this.props.pageSize}`
    );
    this.props.setProgress(50);
    let parsedData = await rawData.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      requiredPages: Math.ceil(this.state.totalArticles / this.props.pageSize),
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    });

    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let rawData = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}
      &pageSize=${this.props.pageSize}`
    );
    let parsedData = await rawData.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      requiredPages: Math.ceil(this.state.totalArticles / this.props.pageSize),
    });
  };

  // prevButton = async () => {
  //   this.setState({
  //     loading: true,
  //     page: this.state.page - 1,
  //   });

  //   this.updateNews(this.state.page - 1);
  // };

  // nextButton = async () => {
  //   this.setState({
  //     loading: true,
  //     page: this.state.page + 1,
  //   });

  //   if (this.state.page <= this.state.requiredPages) {
  //     this.updateNews(this.state.page + 1);
  //   }
  // };
  render() {
    return (
      <>
        <div className="my-5">
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalArticles}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row overflow-hidden">
                {this.state.articles.map((element) => {
                  return (
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
                      key={element.url}
                    >
                      <NewsItem
                        title={element.title ? element.title.slice(0, 46) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 85)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://via.placeholder.com/150"
                        }
                        url={element.url}
                        date={element.publishedAt}
                        author={element.author}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-between py-5">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.prevButton}
            className="btn btn-dark"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={this.state.page >= this.state.requiredPages}
            onClick={this.nextButton}
            className="btn btn-dark next"
          >
            Next
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
