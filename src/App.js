import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import React, { Component } from "react";
import News from "./components/News";
export default class App extends Component {
  state = {
    progess: 0,
  };

  apiKey = process.env.REACT_APP_NEWS_API;

  setProgress = (progress) => {
    this.setState({ progess: progress });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            height={5}
            color="#f11946"
            progress={this.state.progess}
            onLoaderFinished={() => this.setState({ progess: 0 })}
          />
          <Routes>
            <Route
              path="/dd-news"
              element={
                <News
                  pageSize={10}
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/dd-news/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/dd-news/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/dd-news/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/dd-news/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/dd-news/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              path="/dd-news/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={10}
                  apiKey={this.apiKey}
                  country="in"
                  category="sports"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
