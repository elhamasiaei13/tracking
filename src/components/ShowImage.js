import React, { Component } from 'react'
import emptyImage from '../assests/emptyImage.jpg'
import axios from 'axios';
import Preloader from './persentational/Preloader';


export default class ShowImage extends Component {
    state = {
        srcImages: [],
        show: false,
        imgSrc: { emptyImage },
        width: window.innerHeight,
        height: 60,
        preloader: true
    }

    onImgLoad = ({ target: img }) => {
        if (window.innerHeight < img.height) {
            let finalHeight = window.innerHeight - 20
            this.setState({
                height: finalHeight,
            });
        } else {
            this.setState({
                height: img.height,
            });
        }
        if (window.innerWidth < img.width) {
            let finalWidth = window.innerWidth - 20
            this.setState({
                width: finalWidth,
            });

        } else {
            this.setState({
                width: img.width,
            });
        }
    };

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        const { waybillNumber, data } = this.props
        let array = []
        data.map(item => {
            array.push(this.getSrc(waybillNumber, item.type))
        })
        this.setState({ preloader: false })
    }

    getSrc(waybillNumber, type, description) {
        let emptyImageSrc = ''
        const { imgSrc, preloader } = this.state
        const { userName, password } = this.props
        const PROTOCOL = process.env.REACT_APP_REMOTE_SERVICE_PROTOCOL;
        const HOST = process.env.REACT_APP_REMOTE_SERVICE_HOST_NAME;
        const PORT = process.env.REACT_APP_REMOTE_SERVICE_HOST_PORT;
        const HOST_URL = `${PROTOCOL}://${HOST}:${PORT}/v1`
        const URL = HOST_URL +"/shipments/" + waybillNumber + "/attachments/" + type;
        axios.get(URL,
            {
            auth: { username:"teamapp", password: "tp#4298" },
            responseType: 'arraybuffer'
        } )
            .then(response => {
                const base64Str = Buffer.from(response.data, 'binary').toString('base64')
                emptyImageSrc = { src: `data:image/jpeg;base64,${base64Str}`, type: type }
                this.state.imgSrc = emptyImageSrc
                let joined = this.state.srcImages.concat(emptyImageSrc)
                this.state.srcImages = joined
                this.setState({})
            }).catch(error => {
                if (error.message !== "Network Error") {
                    if (error.response) {
                        if (error.response.status == 401) {
                        }
                    } else {
                    }
                }
            })
    }

    getAllPictures() {
        const { waybillNumber } = this.props
        let array = []
        this.state.srcImages.map((item, index) => {
            array.push(
                <div className="col-lg-6 col-md-6" key={index}>
                    <div className="card">
                        <div className="el-card-item">
                            <div className="el-card-avatar el-overlay-1">
                                <img src={item.src} />
                                <div className="el-overlay">
                                    <ul className="list-style-none el-info">
                                        <li className="el-item">
                                            <span
                                                onClick={() => {
                                                    const URL = "/shipments/" + waybillNumber + "/attachments/" + item.type;
                                                    this.state.imgSrc = this.state.srcImages[index].src
                                                    this.state.show = true
                                                    this.setState({})
                                                }
                                                }
                                                className="btn default btn-outline image-popup-vertical-fit el-link"
                                            >
                                                <i className="icon-magnifier"></i></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="el-card-content">
                                <h4 className="m-b-0">{item.type}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        )
        return (array)
    }

    render() {
        const { show, imgSrc, width, height, srcImages, preloader } = this.state
        const { data } = this.props
        return (
            <div className="row el-element-overlay">
                {data.length == 0 &&
                    <div className="col-lg-12 col-xl-12 col-md-12" >
                        <div className="card">
                            <div className="el-card-item">
                                <img width="100%"
                                src={emptyImage} onLoad={this.onImgLoad}
                                />
                            </div>
                        </div>
                    </div>
                }

                {preloader ?
                 <Preloader /> 
                    :
                    this.getAllPictures()}
                {show ? <>
                    <div className="my-mfp-img  my-mfp-bg">
                        <button onClick={() => this.setState({ show: false })}
                            style={{ "transform": "translate(" + (width / 2 + 13) + "px ,-" + (height / 2 + 12) + "px)" }}
                             className="mfp-close my-mfp-close">
                            <i className="fa fa-times" aria-hidden="true"></i></button>

                        {window.innerHeight < height & window.innerWidth > width ?
                            <img
                                onLoad={this.onImgLoad}
                                className="mfp-img mfp-wrap mfp-bg"
                                src={imgSrc}
                                width={width}
                                height={window.innerHeight < height & window.innerHeight > height ? (height - 200) + "px" : "auto"}
                            /> :
                            window.innerWidth < width & window.innerHeight > height ? <img
                                onLoad={this.onImgLoad}
                                className="mfp-img mfp-wrap mfp-bg"
                                src={imgSrc}
                                width={width}
                                width={window.innerWidth < width ? (width - 200) + "px" : "auto"}
                            /> :
                                 <img
                                    onLoad={this.onImgLoad}
                                     className=" mfp-img mfp-wrap mfp-bg"
                                     src={imgSrc}
                                     width={width}
                                 />
                        }
                    </div>
                </>
                    : ''
                }
            </div>)
    }
}
