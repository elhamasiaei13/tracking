import React, { Component } from 'react'

class TimeLineLabel extends Component {
    render() {
        const { value ,key} = this.props
        return (
            <li  key={key+"TimeLineLabel"} className="time-label ng-scope" ng-repeat-start="(key, value) in testData.shipmentTrackStateHistories ">
                <span className="bg-red ng-binding  display-8 label label-danger">
                    {value}				
                    	</span>
            </li>
        )
    }
}

TimeLineLabel.defaultProps = {
    value: "1398-05-08"


}
export default TimeLineLabel;