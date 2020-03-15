import React, { Component } from 'react'

export default class Wrapper extends Component {
    render() {
        const { children, sidebartype } = this.props
        const style = {
        }
        
        return (
            <div id="main-wrapper"
                data-theme="dark"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype={sidebartype}
                data-sidebar-position="fixed"
                data-header-position="fixed"
                data-boxed-layout="full"
                className={sidebartype == "mini-sidebar" ? 'mini-sidebar' : ''}
            >
                {children}
            </div>


        )
    }
}

