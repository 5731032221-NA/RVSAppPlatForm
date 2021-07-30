import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../middleware/action";
import en_lang from "../../static/lang/en.json"
import th_lang from "../../static/lang/th.json"
// const [SomeThingInFrontDesk, setSomeThingInFrontDesk] = useState(en_lang.SomeThingInFrontDesk)
// const [lang, setLang] = useState('en')
export class FrontDesk extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      lang: 'en',
      SomeThingInFrontDesk: en_lang.SomeThingInFrontDesk
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.lang != this.props.lang) {
        this.setState({ lang: 'th' })
        if (this.props.lang == 'th') {
          this.setState({
            lang: 'th',
            SomeThingInFrontDesk: (th_lang.SomeThingInFrontDesk)
          });
        } else if (this.props.lang == 'en') {
          this.setState({
            lang: 'en',
            SomeThingInFrontDesk: (en_lang.SomeThingInFrontDesk)
          });
  
        }
  
      }
    } , 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    
    return <div>{this.state.SomeThingInFrontDesk}</div>;
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps")
  return {
    lang: state.reducer.lang,
  };
};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);
