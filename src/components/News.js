import React, { Component } from 'react'
import Newsfeed from './Newsfeed'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country: 'us',
    pageSize: 9,
    category: 'general'
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

    constructor(){
        super();
        console.log("i'm a constructor from Newsfeed");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
    }

    async updatepage(){
      this.props.setProgress(30);
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa79feb238654e7888953c6c2382ec8e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data= await fetch(url);
      this.props.setProgress(60);
      let parsedData= await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
      })
      this.props.setProgress(100);
    }

    async componentDidMount(){
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa79feb238654e7888953c6c2382ec8e&page=1&pageSize=${this.props.pageSize}`;
      // let data= await fetch(url);
      // let parsedData= await data.json();
      // console.log(parsedData);
      // this.setState({articles:parsedData.articles})
      this.updatepage();
    }

  //   handlePrevClick = async()=>{
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa79feb238654e7888953c6c2382ec8e&page=${this.state.page -1}`;
  //   //   let data= await fetch(url);
  //   //   let parsedData= await data.json();
  //   //   console.log(parsedData);

  //   //  this.setState({
  //   //   page: this.state.page +1,
  //   //   articles: parsedData.articles
  //   // })
  //   this.setState({page: this.state.page -1});
  //   this.updatepage();
  // }
  //   handleNextClick =async ()=>{
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa79feb238654e7888953c6c2382ec8e&page=${this.state.page +1}`;
  //   //   let data= await fetch(url);
  //   //   let parsedData= await data.json();
  //   //   console.log(parsedData);

  //   //  this.setState({
  //   //   page: this.state.page +1,
  //   //   articles: parsedData.articles
  //   // }) 
  //   this.setState({page: this.state.page +1});
  //   this.updatepage();
  //   }

    fetchMoreData =async ()=>{
      this.setState({page: this.state.page+1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa79feb238654e7888953c6c2382ec8e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data= await fetch(url);
      let parsedData= await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        loading: false,
        totalResults: parsedData.totalResults,
      })
    }

  render() {
    return (
      <>
      <div className="container-fluid bg-dark" >
         <h2 className='text-center' style={{ margin: '35px 0px', marginTop: '55px' }}>Top {this.props.category} News</h2>

         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h6 className='my-3 text-center'>Loading More News...</h6>}
        >

          <div className="container">
         <div className="row">
         {this.state.articles.map((element)=>{
          return <div className="col-md-4 d-flex justify-content-center" key={element.url}>
          <Newsfeed title={element.title?element.title.slice(0,55):""} description={element.description?element.description.slice(0,45):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} datime={element.publishedAt}/>
          </div>
         })} 
        {/* </div>
        <div className="container d-grid gap-2 d-flex justify-content-end">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
      </div>
      </div> */}
       </div> 
       </div>
       </InfiniteScroll>
       </div>
      
      {/* the below buttons were for next page and previous page but now I'm using infinite scroll so I'm not using it */}
       {/* <div className="container d-flex justify-content-end">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </>
      
    )
  }
}

export default News