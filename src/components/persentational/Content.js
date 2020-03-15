import React, { Component } from 'react';
export default class Content extends Component {

    render() {

        return (
            <div className="page-wrapper">
            
              {this.props.children} 

            </div>
        )
    }
}
