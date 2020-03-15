import React, { Component } from 'react'

class TimeLine extends Component {

    render() {
        const { title, clock, address, iconName, color, key = "key" } = this.props
       
        return (
            <>
                <li key={key + "TimeLine"}>

                    <i className={"timeline-icon" + " fa " + iconName + " " + color} ></i>
                    <div key={key + 1} className="row timeline-item-content" >

                        <div className="col-md-7 offset-md-0">
                            <strong className="timeline-item-title">{title}</strong></div>

                        <div className="col-md-5 timeline-item-time dirLtR tex-al-l">
                            <i className="m-r-10 mdi mdi-clock "></i>{clock}</div>

                    </div>
                    <hr className="hr-m-p hrCard" />

                    <div key={key + 2} className="row timeline-item-content">

                        <div className="col-md-12 ">
                            <div className="timeline-item-desc">{address}</div>

                        </div>
                    </div>
                </li>
                {/* <li>
                    <div className="">
                        <i className="timeline-icon mdi mdi-home"></i>
                        <div className=" timeline-item-content" >
                            <strong className="timeline-item-title">{title}</strong>
                            <div className="timeline-item-time">{clock}</div>
                            <div className="timeline-item-desc">{address}</div>
                        </div>
                    </div>
                </li> */}
            </>
        )
    }
}
TimeLine.defaultProps = {
    title: "۹ از ۹ بسته دریافت شد",
    clock: "1398-02-05 18:52",
    address: "نمایندگی تهران-دفتر مرکزی",
    // iconName: "mdi mdi-home",
    // color: "lable-green"
}
export default TimeLine;