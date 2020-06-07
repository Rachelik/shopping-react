import React from 'react';
import axios from 'axios';

class ProductList extends React.Component {

  constructor(){
    super();

    this.state = {
        products:[]
    };
  }
  async componentDidMount() {
    const url = '/products.json';
    const runWhenDone = (response) => {
       const data = response.data
       this.setState({ products: data })
       console.log(data)
    }
    const whenError = (error) => {
      console.log("error", error)
    }
    await axios.get(url).then(runWhenDone).catch(whenError);
  }

  searchChanged = (event) => {
    this.setState({ search: event.target.value.toLowerCase() })
  }

  render() {

    const products = this.state.products
      .filter(product => product.name.toLowerCase().includes(this.state.search))
      .map((product, index)=>{
        return (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image_url} />
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
        );
    });

    return (
      <div className="container">
        <h3>SEARCH</h3>
        <input type='text' className="search-bar" placeholder='Search' onChange={this.searchChanged} value={this.state.search || ""}/>
        <h4>Search Results</h4>
        <div>
            {products}
        </div>
      </div>
    );
  }
}

export default ProductList;