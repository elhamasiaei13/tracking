
import React, { Component } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convertTitle: ''
        }
    }


    render() {

        const { body, cardTitle, cardSubtitle, cardClass, cardBodyClass, noHr } = this.props
        const { intl } = this.props
        const title = intl.formatMessage({ id: [cardTitle] });
        // const convertTitle = intl.formatMessage({ id: [cardTitle] ,value:{ what: 'react-intl' }})
        // const convertTitle = (<FormattedMessage {...messages.placeholderIntlText}>
        //     {(msg) => (cardTitle)}
        //   </FormattedMessage>)
        return (
            <div className={"card " + cardClass}>
                <div className={"card-body " + cardBodyClass}>
                    {cardTitle != 'false' ? <><h4 className="card-title text-info m-b-0"
                        style={{ "margin": "0px 0px 10px 0px" }}>
                        {cardTitle} </h4>
                        {noHr ? '' :
                            <hr className="hrCard" />}
                    </> : <></>}
                    {cardSubtitle ? <h6 className="card-subtitle"> {cardSubtitle} </h6> : ''}
                    {body}
                    {this.props.children}
                </div>
               
            </div>
        )
    }
}
Card.defaultProps = {
    cardClass: "card border-top border-dark",
    cardTitle: "false",
    cardBodyClass: '',
    cardSubtitle: false
}
export default injectIntl(Card) 
