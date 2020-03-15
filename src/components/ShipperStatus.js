import React, { Component } from 'react'
import TimeLine from './persentational/TimeLine'
import TimeLineLabel from './persentational/TimeLineLabel'
import Card from './persentational/Card'
import Row from './persentational/Row'
import Col from './persentational/Col';
import ViewData from './persentational/ViewData';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import testData from '../test.json';
import { withRouter } from 'react-router-dom'
import ShowImage from './ShowImage';

// let waybillNumberlet = undefined
// let showTab = "currentStatus"

class ShipperStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPieces: 1,
            history: [],
            data: null,
            showTab: "currentStatus",
            waybillNumber: undefined
        }
    }

    componentWillMount() {
        console.log("componentWillMount", this);
        let x = this.props.location.pathname
        console.log(x);
        if (this.props.location.pathname) {
            let str = this.props.location.pathname
            let res = str.split("/");
            let len = res.length
            let test = len - 1
            if ((res[test].length > 0)) {
                this.setState({ waybillNumber: res[test] })
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const PROTOCOL = process.env.REACT_APP_REMOTE_SERVICE_PROTOCOL;
        const HOST = process.env.REACT_APP_REMOTE_SERVICE_HOST_NAME;
        const PORT = process.env.REACT_APP_REMOTE_SERVICE_HOST_PORT;
        const HOST_URL = `${PROTOCOL}://${HOST}:${PORT}/v1`;
        const { waybillNumber } = this.state
        axios.get(HOST_URL + '/shipments/' + waybillNumber, {
            params: {},
            auth: { username: "teamapp", password: "tp#4298" }
        })
            .then((response) => {
                // let validData=response.data.data!==null? response.data.data :null
                this.setState({ data: response.data.data })
                console.log("response.data", response.data);

            })
            .catch((error) => {
                console.log("error", error);
                this.setState({ data: null })

                // ErrorCatchHandeling(error)
            })
        console.log("state", this.state);
    }

    showPartNumber(arg) {
        const array = []
        const length = arg.length
        var i = 0
        arg.map((item, index) => {
            i++
            if (i == length) {
                array.push(
                    <span key={index + item} className={"myapp-p-r-5"}>
                        {item}
                    </span>
                )
            } else {
                array.push(
                    <span key={index + item} className={"myapp-p-r-5"}>
                        {item} ,
                    </span>
                )
            }
        })
        return array
    }

    showHistory() {
        const array = []
        const { data } = this.state
        const history = data && data.trackingInfo ? this.state.data.trackingInfo ? this.state.data.trackingInfo.history ? this.state.data.trackingInfo.history : [] : [] : []
        const totalPieces = data && data.trackingInfo ? this.state.data.trackingInfo ? this.state.data.trackingInfo.totalPieces ? this.state.data.trackingInfo.totalPieces : 1 : null : null
        let lastItem = { localDate: '' }
        let i = 41000
        history.map((item, index) => {
            if (item.localDate !== lastItem.localDate) {
                array.push(
                    <TimeLineLabel key={"trackingHistoriId" + item.localDateTime + index} value={item.localDate} />
                )
            }

            array.push(
                <TimeLine key={"trackingHistor" + index}
                    title={<>
                        {item.count} {"  "} از {"  "} {totalPieces} {"  "}
                        بسته{" : "}
                        <FormattedMessage
                            id={item.state}
                            defaultMessage={item.state}
                        />
                    </>}
                    clock={item.localDateTime}
                    address={item.location}
                    iconName={
                        item.state == "ISSUED" ? "fa-file bg-green" :
                            item.state == "DRAFT" ? "fa-file" :
                                item.state == "MANIFESTED" ? "fa-book bg-maroon" :
                                    item.state == "IN_TRANSIT" ? "fa-plane bg-yellow" :
                                        item.state == "CONFIRMED_PICKUP_REQ" ? "fa-envelope bg-orange" :
                                            item.state == "VOIDED" ? "fa-ban bg-red" :
                                                item.state == "IN_WAREHOUSE" ? "fa-building bg-teal" :
                                                    item.state == "DELIVERED" ? "fa-home bg-olive" :
                                                        item.state == "NOT_DELIVERED" ? "fa-thumbs-down bg-teal" :
                                                            item.state == "RETURNED" ? "fa-thumbs-down bg-navy" :
                                                                item.state == "MASTERED" ? "fa-book bg-blue" :
                                                                    item.state == "OFFLOADED" ? "fa-book bg-red" :
                                                                        item.state == "OUT_FOR_DELIVERY" ?
                                                                            "fa-truck bg-purple"
                                                                            : ''
                    }
                />
            )
            lastItem = item
        })
        return array
        // return( <TimeLineLabel value={item.localDate} />)
    }

    showStatus() {
        const array = []
        const { data } = this.state
        const total = data && data.trackingInfo ? data.trackingInfo.totalPieces : 0
        const item = data && data.trackingInfo ? data.trackingInfo.current : null
        let i = 81000
        if (item != null) {
            return (<>
                <li className="form-group row control-label col-form-label">
                    <i className="m-r-10 mdi mdi-checkbox-blank-circle m-r-12 text-cyan font-7"></i>
                    <span>
                        <FormattedMessage
                            id={"waybillNumber"}
                            defaultMessage={"waybillNumber"}
                        />: {data.waybillNumber}
                    </span>

                </li>
                <li className="form-group row control-label col-form-label">
                    <i className="m-r-10 mdi mdi-checkbox-blank-circle m-r-12 text-cyan font-7"></i>
                    <span
                    >
                        <FormattedMessage
                            id={"reference"}
                            defaultMessage={"reference"}
                        /> : {data.reference}
                    </span>
                </li>
                <li className="form-group row">
                    <i className="m-r-10 mdi mdi-checkbox-blank-circle m-r-12 text-cyan font-7"></i>
                    <span>
                        <FormattedMessage
                            id={"currentStatus"}
                            defaultMessage={"currentStatus"}
                        />
                    </span>
                </li>
                <li key={"currentprent" + i} className="form-group row">
                    <ViewData
                        key={item + i}
                        value={<>
                            <i className="m-r-10 mdi mdi-checkbox-blank-circle m-r-12 text-cyan font-7"></i>
                            {item.count} از {total} بسته
                               {" "}
                            <span className={"label label-rounded " +
                                item.state == "ISSUED" ? "label label-rounded  bg-green" :
                                item.state == "DRAFT" ? "label label-rounded fa-file" :
                                    item.state == "MANIFESTED" ? "label label-rounded  bg-maroon" :
                                        item.state == "IN_TRANSIT" ? "label label-rounded  bg-yellow" :
                                            item.state == "CONFIRMED_PICKUP_REQ" ? "label label-rounded  bg-orange" :
                                                item.state == "VOIDED" ? "label label-rounded  bg-red" :
                                                    item.state == "IN_WAREHOUSE" ? "label label-rounded  bg-teal" :
                                                        item.state == "DELIVERED" ? "label label-rounded bg-olive" :
                                                            item.state == "NOT_DELIVERED" ? "label label-rounded  bg-teal" :
                                                                item.state == "RETURNED" ? "label label-rounded  bg-navy" :
                                                                    item.state == "MASTERED" ? "label label-rounded  bg-blue" :
                                                                        item.state == "OFFLOADED" ? " bg-red" :
                                                                            item.state == "label label-rounded  OUT_FOR_DELIVERY" ?
                                                                                "label label-rounded   bg-purple"
                                                                                : ''}
                            >
                                <FormattedMessage
                                    id={item.state}
                                    defaultMessage={item.state}
                                />
                            </span>
                            {" "}
                            {item.location}
                        </>}
                        valueClassName="padding-right col-md-12"
                        icon={true}
                    />
                </li>



                <li key={"currentpartsNumbers" + i} className=" m-r-myapp-25 font-color ">
                    <i className="m-r-10 mdi mdi-checkbox-blank-circle-outline m-r-12 text-cyan font-7"></i>
                    <span>{this.showPartNumber(item.partNumbers)}
                    </span>
                </li>
                {(!item.comment) ?
                    <div className="m-b-app"></div>
                    :
                    <ul>

                        <li key={"comment" + i} className="m-b-app m-r-myapp-25 font-color ">
                            <i className="m-r-10 mdi mdi-checkbox-blank-circle-outline m-r-12 text-cyan font-7"></i>
                            {item.comment}
                        </li>
                    </ul>
                }
            </>)
        }
    }

    onChange(e) {
        // waybillNumber = e.target.value
        this.setState({ waybillNumber: e.target.value }, this.getData)
    }
    submit = (e) => {
        e.preventDefault()
        this.getData()
    }


    render() {
        const { data, showTab, waybillNumber } = this.state
        return (
            <>


                <div class="container px-lg-5 ">

                    <Row>
                        <Col className="container" sm={12} >
                            <Card
                                cardTitle={
                                    <FormattedMessage
                                        id={"trackShipment"}
                                        defaultMessage={"trackShipment"}
                                    />
                                }
                                cardClass=" "
                                cardBodyClass="myap-p-t-0"
                            >
                                <form className="form-group row" onSubmit={this.submit}>
                                    <label
                                        htmlFor="fname"
                                        className="col-sm-3 col-md-3 text-right control-label"
                                    >
                                        <FormattedMessage
                                            id={"waybillNumber"}
                                            defaultMessage={"waybillNumber"}
                                        />

                                    </label>
                                    <div className="col-sm-12  col-md-7 ">
                                        <input
                                            type={"text"}
                                            className="form-control"
                                            id={"textid"}
                                            placeholder={"placeholder"}
                                            onChange={(e) => this.onChange(e)}
                                            value={waybillNumber}
                                            required
                                        />

                                    </div>

                                    <div className="col-sm-12  col-md-2 ">
                                        <button
                                            type="submit"
                                            className="btn btn-info"
                                        >

                                            <i className="ti-search">
                                            </i>
                                        </button>
                                    </div>

                                </form>
                            </Card>
                        </Col>
                    </Row>

                    {data != null &&
                        <Row>

                            <Col className="container"  >
                                <Card cardTitle={<FormattedMessage
                                    id={"shipperStatus"}
                                    defaultMessage={"shipperStatus"}
                                />} cardClass=" " cardBodyClass="myap-p-t-0" >
                                    <ul class="nav nav-tabs directionRTL" role="tablist">
                                        <li class="nav-item" onClick={() => this.setState({ showTab: "currentStatus" })}>
                                            <span className={showTab === "currentStatus" ? "nav-link active" : "nav-link "}
                                                role="tab"
                                                aria-selected={showTab === "currentStatus" ? "true" : "false"}>
                                                {/* <span class="hidden-sm-up">
                                                    <i class="ti-home"></i></span> */}
                                                <span class="hidden-xs-down">
                                                    <FormattedMessage
                                                        id={"currentStatus"}
                                                        defaultMessage={"currentStatus"}
                                                    />
                                                </span></span>
                                        </li>
                                        <li class="nav-item" onClick={() => this.setState({ showTab: "signature" })} >
                                            <span
                                                className={showTab === "signature" ? "nav-link active" : "nav-link "}
                                                role="tab"
                                                aria-selected={showTab === "signature" ? "true" : "false"}>
                                                {/* <span class="hidden-sm-up">
                                                    <i class="ti-user">  </i> 
                                                    </span> */}
                                                <span class="hidden-xs-down">
                                                    <FormattedMessage
                                                        id={"signature"}
                                                        defaultMessage={"signature"}
                                                    />
                                                </span></span>
                                        </li>
                                    </ul>

                                    <div class="tab-content tabcontent-border">
                                        <div class="tab-pane active" id="home" role="tabpanel">
                                            <div class="p-20">
                                                {showTab === "currentStatus" ? <>

                                                    <ul key="uls1" className="list-style-none">
                                                        {this.showStatus()}
                                                    </ul>
                                                    <ul key="uls2" className="timeline card text-black bg-light">
                                                        {this.showHistory()}
                                                    </ul> </>
                                                    :
                                                    <ShowImage
                                                        data={data && data.attachments ? data.attachments : []}
                                                        waybillNumber={waybillNumber} />
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>}
            </div>
            </>
        )
    }
}

ShipperStatus.defaultProps = {
    data: {
        totalAmount: 'totalAmount',
        paymentMethod: 'paymentMethod',
        chargeParty: 'chargeParty',
        paymentReferenceInfo: 'paymentReferenceInfo'
    }
}

export default withRouter(ShipperStatus)
