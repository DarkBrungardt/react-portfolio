import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
                {title: "Quip", category: "eCommerce", slug: 'quip' },
                {title: "Eventbrite", category: "Scheduling", slug: 'eventbrite' },
                {title: "Ministry Safe", category: "Enterprise", slug: 'ministry-safe' },
                {title: "SwingAway", category: "eCommerce", slug: 'swingaway' }
            ]
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
        this.getPortfolioItems(filter);
        }
    }

    getPortfolioItems(filter = null) {
        axios.get("https://ethanbrungardt.devcamp.space/portfolio/portfolio_items")
      .then (response => {
        if (filter) {
            this.setState({
                data: response.data.portfolio_items.filter(item => {
                    return item.category === filter;
                })
            });

        } else {
        this.setState({
            data: response.data.portfolio_items
        });
    }
        })
      .catch (error => {
        console.log(error);
        });
      }

    PortfolioItems() {
        return this.state.data.map(item => {
            return ( <PortfolioItem key={item.id} item={item} />
        );
    });
}

componentDidMount() {
    this.getPortfolioItems();
}

    render() {
        if (this.state.isLoading){
            return <div>Loading...</div>;
        }


            return (
                <div className="homepage-wrapper">
                    <div className="filter-links">
                <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
                <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>ALL</button>
    
                    </div>
                <div className="portfolio-items-wrapper">
                
                {this.PortfolioItems()}
                </div>
                </div>
        );
    }
}