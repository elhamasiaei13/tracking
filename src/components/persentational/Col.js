// import React, { Component } from 'react'

// export default class Col extends Component {
//     render() {
//         const { className,md } = this.props;
//         return (
//             <div className={this.props.className+" col-md-"+this.props.md}>
//                 {this.props.children}
//             </div>
//         )
//     }
// }
import React from 'react'

const Col = ({ className = "",
    md = false, xs = false, sm=false, lg=false, xl=false, ...props }) => {

    if (md !== false) {
        className = className.concat(" col-md-" + md)
    }
    if (lg !== false) {
        className = className.concat(" col-lg-" + lg)
    }
    if (xs !== false) {
        className = className.concat(" col-xs-" + xs)
    }
    if (xl !== false) {
        className = className.concat(" col-xl-" + xl)
    }



    return (
        <div className={className}  >
            {props.children}
        </div>
    )
}
export default Col;
