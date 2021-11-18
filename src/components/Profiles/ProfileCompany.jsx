import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Switch from "@material-ui/core/Switch";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { optioncountry } from "../../static/country.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Breadcrumbs, Link } from "@material-ui/core";
import { getconfigurationbypropertycode } from "../../services/user.service";
import { nextComponent } from "../../middleware/action";
import DateFnsUtils from "@date-io/date-fns";
import {
  getCompanyProfileCommunication,
  getCompanyProfileRelation,
  getCompanyProfile,
  getCompanyProfileById,
  postCompanyProfile,
  updateCompanyProfile,
  deleteCompanyProfileById,
} from "../../services/companyprofile.service";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateRangePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  selectPage: {
    minWidth: 90,
    textAlign: "center",
    flexGrow: 1,
  },
  searchLayout: {
    flexGrow: 1,

    marginLeft: 20,
    marginRight: 20,
  },
  root: (themeState) => ({
    "& label.MuiInputLabel-root": {
      color: themeState.color,
    },
    "& label.Mui-focused": {
      color: blue[themeState.colorlevel],
    },
    "& .MuiInput-underline:after": {
      borderColor: themeState.color,
      color: themeState.color,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: themeState.color,
        borderColor: "grey.500",
        color: themeState.color,
      },
      "&:hover fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
    },
    "&.MuiPaper-root": {
      backgroundColor: themeState.paper,
    },
    "&.MuiMenu-paper": {
      backgroundColor: themeState.paper,
    },
  }),
  defaultTheme: (themeState) => ({
    backgroundColor: themeState.paper,
    color: themeState.color,
  }),
}));

const optiondata = [
  {
    value: "1",
    label: "Option1",
  },
  {
    value: "2",
    label: "Option2",
  },
  {
    value: "3",
    label: "Option3",
  },
];
const optiondata2 = [
  {
    value: "10",
    label: "Option10",
  },
  {
    value: "20",
    label: "Option20",
  },
  {
    value: "30",
    label: "Option30",
  },
  {
    value: "40",
    label: "Option40",
  },
];

const optioncurrency = [
  {
    value: "1",
    label: "Baht ฿",
  },
  {
    value: "2",
    label: "Dollar $",
  },
];

const optioncreditrating = [
  {
    value: "1",
    label: "5",
  },
  {
    value: "2",
    label: "4",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "2",
  },
  {
    value: "5",
    label: "1",
  },
];

const optionrelation = [
  {
    value: "employer",
    label: "employer",
  },
  {
    value: "parentcompany",
    label: "Parent Company",
  },
  {
    value: "childcompany",
    label: "Child Company",
  },
  {
    value: "ManagerProfile",
    label: "Manager",
  },
];

const optioncommunication = [
  {
    value: "Telephone",
    label: "Telephone Number",
  },
  // {
  //   value: "Mobile",
  //   label: "Mobile Number",
  // },
  {
    value: "Email",
    label: "Email Address",
  },
  {
    value: "Twitter",
    label: "Twitter",
  },
  {
    value: "Instagram",
    label: "Instagram",
  },
  {
    value: "Facebook",
    label: "Facebook",
  },
  {
    value: "TripAdvisor",
    label: "Trip Advisor",
  },
  {
    value: "www",
    label: "www",
  },
  {
    value: "BookingDotCom",
    label: "Booking Website",
  },
];

export const ProfileCompany = (props) => {
  const { store } = useContext(ReactReduxContext);
  const [action, setAction] = React.useState(props.action);

  // React.useEffect(async( ) => {
  //  console.log("props.action:",props.action);
  //              await handleAddDatatoDatabase();
  // },[props.action])
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "A400",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
        // matStyle: this.classes.darkmode
      });
    }
  }, [themeBackground]);

  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const maincolor = useSelector((state) => state.reducer.color);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setMainColor(maincolor);
    } else {
      setMainColor("#2D62ED");
    }
  }, [maincolor]);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };
  // const [isRequired, setIsRequired] = React.useState(false);
  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  const pageProperty = useSelector((state) => state.reducer.property);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);
  React.useEffect(async () => {
    setSmallwidth(window.innerWidth < 1000);

    let getconfigdata = await getconfigurationbypropertycode(
      sessionStorage.getItem("auth"),
      pageProperty
    );
    console.log("getconfigdata:", getconfigdata);
    let configdata = getconfigdata.content[getconfigdata.content.length - 1];
    let optionTitle = await getlist(configdata, "PCINDTT");
    // let optionDocumentType = await getlist(configdata,"");
    console.log("optionTitle:", optionTitle);
    let optiongender = await getlist(configdata, "PCINDGD");
    console.log("optiongender:", optiongender);
    let relation = await getlist(configdata, "PCINDRL");
    console.log("relation:", relation);
    let communication = await getlist(configdata, "PCINDCM");
    console.log("communication:", communication);
    // let optionDocumentType = await getlist(configdata,"");

    console.log("propseditData:", props.editdata);
  }, []);

  async function getlist(config, field) {
    for (var i = 0; i < config.length; i++) {
      var obj = config[i];
      if (obj.code === field) {
        let list = [];
        obj.children.forEach((element) =>
          list.push({
            value: element.name_en,
            label: element.name_en,
          })
        );
        return list;
      } else if (obj.children) {
        let _getlist = await getlist(obj.children, field);
        if (_getlist) return _getlist;
      }
    }
  }

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };

  const [nameOne, setnameOne] = useState(
    props.editdata != null ? props.editdata[0].name : ""
  );
  const [nameTwo, setnameTwo] = React.useState(
    props.editdata != null ? props.editdata[0].name2 : ""
  );
  const [CompanyTypeCode, setCompanyTypeCode] = React.useState(
    props.editdata != null ? props.editdata[0].companytypecode : "Government"
  );
  const [Abbreviation, setAbbreviation] = React.useState(
    props.editdata != null ? props.editdata[0].abbreviation : ""
  );
  const [GuaranteeMethodCode, setGuaranteeMethodCode] = React.useState(
    props.editdata != null ? props.editdata[0].guaranteemethodcode : ""
  );
  const [Property, setProperty] = React.useState(
    props.editdata != null ? props.editdata[0].property : "SPJ1"
  );
  const [Currency, setCurrency] = React.useState(
    props.editdata != null ? props.editdata[0].currencycode : "THB"
  );
  const [CreditRating, setCreditRating] = React.useState(
    props.editdata != null
      ? props.editdata[0].creditrating
      : optioncreditrating[0].value
  );
  const [iata, setiata] = React.useState(
    props.editdata != null ? props.editdata[0].iata : ""
  );
  const [Status, setStatus] = React.useState(
    props.editdata != null ? props.editdata[0].statuscode : true
  );
  const [StreetAddress, setStreetAddress] = React.useState(
    props.editdata != null ? props.editdata[0].address : ""
  );
  const [Chooseacountry, setChooseacountry] = React.useState(
    props.editdata != null ? props.editdata[0].countrycode : ""
  );
  const [City, setCity] = React.useState(
    props.editdata != null ? props.editdata[0].city : ""
  );
  const [State, setState] = React.useState(
    props.editdata != null ? props.editdata[0].stateprovince : ""
  );
  const [Postal, setPostal] = React.useState(
    props.editdata != null ? props.editdata[0].postalcode : 0
  );
  const [BStreetAddress, setBStreetAddress] = React.useState(
    props.editdata != null ? props.editdata[0].billingaddress : ""
  );
  const [BChooseacountry, setBChooseacountry] = React.useState(
    props.editdata != null ? props.editdata[0].billingcountrycode : ""
  );
  const [BCity, setBCity] = React.useState(
    props.editdata != null ? props.editdata[0].billingcity : ""
  );
  const [BState, setBState] = React.useState(
    props.editdata != null ? props.editdata[0].billingstateprovince : ""
  );
  const [BPostal, setBPostal] = React.useState(
    props.editdata != null ? props.editdata[0].billingpostalcode : 0
  );
  const [TaxID, setTaxID] = React.useState(
    props.editdata != null ? props.editdata[0].taxid : ""
  );
  const [TaxID2, setTaxID2] = React.useState(
    props.editdata != null ? props.editdata[0].taxid2 : ""
  );

  const [CreditCardNumber, setCreditCardNumber] = React.useState(
    props.editdata != null ? props.editdata[0].creditcardid : 0
  );
  const [OutstandingAmount, setOutstandingAmount] = React.useState(
    props.editdata != null ? props.editdata[0].outstandingamout : 0
  );
  const [FloatingDepositionAmount, setFloatingDepositionAmount] =
    React.useState(
      props.editdata != null ? props.editdata[0].floatingdepositamount : 0
    );
  const [ARNumber, setARNumber] = React.useState(
    props.editdata != null ? props.editdata[0].ar_number : 0
  );
  const [SalesUserName, setSalesUserName] = React.useState(
    props.editdata != null ? props.editdata[0].salesusername : ""
  );
  const [Industry, setIndustry] = React.useState(
    props.editdata != null ? props.editdata[0].industrycode : "Insurrance"
  );
  const [MarketSegment, setMarketSegment] = React.useState(
    props.editdata != null ? props.editdata[0].marketsegmentcode : "Code1"
  );
  const [SourceOfBusiness, setSourceOfBusiness] = React.useState(
    props.editdata != null ? props.editdata[0].sourceofbusinesscode : "Code1"
  );
  const [TrackCode, setTrackCode] = React.useState(
    props.editdata != null ? props.editdata[0].trackcode : "Code1"
  );
  const [ReasonForStay, setReasonForStay] = React.useState(
    props.editdata != null ? props.editdata[0].reasonforstaycode : "Code1"
  );
  const [Geographic, setGeographic] = React.useState(
    props.editdata != null ? props.editdata[0].geographiccode : "SEA"
  );
  const [ratecontractcode, setratecontractcode] = React.useState(
    props.editdata != null ? props.editdata[0].ratecontractcode : ""
  );
  const [negotiatedratesonly, setnegotiatedratesonly] = React.useState(
    props.editdata != null ? props.editdata[0].negotiatedratesonly : false);

  const [communicationDatas, setCommunicationDatas] = React.useState({});

  const [Communication, setCommunication] = React.useState("");
  const [Relationship, setRelationship] = React.useState("");
  const [relationDatas, setRelationDatas] = React.useState({});
  const [isRequired, setIsRequired] = React.useState(false);

 
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    async function getconfig() {
      updateList();
    }
    getconfig();
  }, []);
  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // };
  // const onEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   setList(reorder(list, result.source.index, result.destination.index));
  //   console.log(result);
  // };
  // const getItemStyle = (isDragging, draggableStyle) => ({
  //   // styles we need to apply on draggables
  //   ...draggableStyle,

  //   ...(isDragging && {
  //     background: "lightblue",
  //   }),
  // });

  
  async function updateList(){
    let commu = JSON.parse(JSON.stringify(communicationDatas));
    let rela = JSON.parse(JSON.stringify(relationDatas));
    let getCommunicationsDatas = {};
      let getcomunication = [];
      let getrelation = [];
      console.log("demostate");
      if (props.editdata != null && Object.keys(commu).length === 0 && Object.keys(rela).length === 0) {

        console.log("props.editdata", props.editdata)
        let getCommunications = await getCompanyProfileCommunication(
          sessionStorage.getItem("auth"),
          props.editdata[0].id
        );
        let getRelations = await getCompanyProfileRelation(
          sessionStorage.getItem("auth"),
          props.editdata[0].id
        );
        console.log("getCommunications.contents", getCommunications.contents)
        let count = 1;
        getCommunications.contents[0].forEach((element) => {
          const commuid1 = count;
        const commuid2 = count +1;
          if (element.communication == "email") {
            getCommunicationsDatas.email = element.value
          } else if (element.communication == "mobile") {
            getCommunicationsDatas.mobile = element.value
          } else {
            setCommunicationDatas(prev => ({
              ...prev,
              [count]: element.communication,
              [count + 1]: element.value
            }))
            getcomunication.push({
              id: commuid1,
              label: "Choose a communication",
              xl: 3,
              md: 3,
              xs: 6,
              select: {
                status: "option",
                data: optioncommunication.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                    selected={option.value == element.communication}
                  // defaultValue={element.communication}
                  >
                    {option.label}
                  </option>
                )),
              },
              handle: (e) => setCommunicationDatas(prev => ({
                ...prev,
                [commuid1]: e.target.value
              })),
            
            });
            getcomunication.push({
              id: commuid2,
              label: "communication",
              xl: 9,
              md: 9,
              xs: 6,
              select: {
                status: "fillnolabel",
                data: "",
                defaultvalue: element.value
              },
              handle: (e) => setCommunicationDatas(prev => ({
                ...prev,
                [commuid2]: e.target.value
              })),
            });
            count = count + 2;
          }
        }
        );
        let relationid = 1;
        console.log(getRelations.contents[0])

        getRelations.contents[0].forEach((element) => {
          setRelationDatas(prev => ({
            ...prev,
            [relationid + 1]: element.relation,
            [relationid]: element.value,
            [relationid + 2]: element.note
          }))
          getrelation.push({
            id: relationid + 1,
            label: "Name Type",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionrelation.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.value == element.relation}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) => setRelationDatas(prev => ({
              ...prev,
              [relationid + 1]: e.target.value
            }))
          });
          getrelation.push({
            id: relationid ,
            label: "Name",
            xl: 4,
            md: 4,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: element.value
            },
            handle: (e) => setRelationDatas(prev => ({
              ...prev,
              [relationid]: e.target.value
            })),
        
          });
          getrelation.push({
            id: relationid + 2,
            label: "Note",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue: element.note
            },
            handle: (e) => setRelationDatas(prev => ({
              ...prev,
              [relationid + 2]: e.target.value
            }))
          });
          relationid = relationid + 3;
        }
        );
        console.log("getrelation", getrelation)

      }else{
        let count = 3
      console.log("commu",commu)
      console.log("rela",rela)
      for (var key in commu) {
        if (key % 2 == 0) {
          getcomunication.push({
            id: count,
            label: "Choose a communication",
            xl: 3,
            md: 3,
            xs: 6,
            select: {
              status: "option",
              data: optioncommunication.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.label == commu[key - 1]}
                // defaultValue={element.communication}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) =>
              setCommunicationDatas((prev) => ({
                ...prev,
                [count]: e.target.value,
              })),
          });
          getcomunication.push({
            id: count + 1,
            label: "communication",
            xl: 9,
            md: 9,
            xs: 6,
            select: {
              status: "fillnolabel",
              data: "",
              defaultvalue: commu[key],
            },
            handle: (e) =>
               setCommunicationDatas((prev) => ({
                  ...prev,
                  [count + 1]: e.target.value,
                })),
          });
          count = count + 2;
        }
      }

      let relationid = 1;
      for (var key in rela) {
        if (key % 3 == 0) {
          getrelation.push({
            id: relationid,
            label: "Name Type",
            xl: 2,
            md: 2,
            xs: 6,
            select: {
              status: "option",
              data: optionrelation.map((option) => (
                <option
                  style={headerTableStyle}
                  key={option.value}
                  value={option.value}
                  selected={option.label == rela[key - 1]}
                >
                  {option.label}
                </option>
              )),
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relationid]: e.target.value,
              })),
          });
          getrelation.push({
            id: relationid + 1,
            label: "Name",
            xl: 4,
            md: 4,
            xs: 6,
            select: {
              status: "fill",
              data: "",
              defaultvalue: rela[key - 2],
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relationid + 1]: e.target.value,
              })),
          });
          getrelation.push({
            id: relationid + 2,
            label: "Note",
            xl: 6,
            md: 6,
            xs: 12,
            select: {
              status: "fill",
              data: "",
              defaultvalue: rela[key],
            },
            handle: (e) =>
              setRelationDatas((prev) => ({
                ...prev,
                [relationid + 2]: e.target.value,
              })),
          });
          relationid = relationid + 3;
        }
      }

      }

      setList([
        {
          id: "1",
          title: "Company Account",
          expend: true,
          content: [
            {
              id: 1,
              label: "Company Name1",
              xl: 5,
              md: 5,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata[0].name : "",
              },
              handle: (e) => setnameOne(e.target.value),
              dataType: "string",
              dataCheck: nameOne,
            },
            {
              id: 2,
              label: "Company Name2",
              xl: 5,
              md: 5,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata[0].name2 : "",
              },
              handle: (e) => setnameTwo(e.target.value),
              dataType: "string",
              dataCheck: true,
            },
            {
              id: 3,
              label: "Company Type",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "Government" }, { label: "Association" }].map(
                  (option) => (
                    <option
                      style={headerTableStyle}
                      key={option.label}
                      value={option.label}
                    >
                      {option.label}
                    </option>
                  )
                ),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].companytypecode
                    : "Government",
              },
              handle: (e) => setCompanyTypeCode(e.target.value)
            },
            {
              id: 4,
              label: "Abbreviation",
              xl: 3,
              md: 3,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].abbreviation : "",
              },
              handle: (e) => setAbbreviation(e.target.value),
              dataType: "string",
              dataCheck: Abbreviation,
            },
            {
              id: 5,
              label: "Hotel Origin",
              xl: 4,
              md: 4,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "SPJ1" }, { label: "SPJ2" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata[0].property : "SPJ1",
              },
              handle: (e) => setProperty(e.target.value),
            },
            {
              id: 6,
              label: "Guarantee Method",
              xl: 4,
              md: 4,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].guaranteemethodcode
                    : "",
              },
              handle: (e) => setGuaranteeMethodCode(e.target.value),
              dataType: "string",
              dataCheck: GuaranteeMethodCode,
            },
            {
              id: 7,
              label: "Currency",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "THB" }, { label: "USD" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata[0].currencycode : "THB",
              },
              handle: (e) => setCurrency(e.target.value),
            },
            {
              id: 8,
              label: "Credit Rating",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "option",
                data: optioncreditrating.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].creditrating
                    : optioncreditrating[0].value,
              },
              handle: (e) => setCreditRating(e.target.value),
            },
            {
              id: 9,
              label: "IATA",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata[0].iata : "",
              },
              handle: (e) => setiata(e.target.value),
              dataType: "string",
              dataCheck: iata,
            },
            {
              id: 10,
              label: "Status",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "status",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].statuscode : " ",
              },
              handle: (e) => setStatus(e.target.checked),

            },
          ],
        },
        {
          id: "2",
          title: "Address",
          expend: true,
          content: [
            {
              id: 1,
              label: "Address",
              xl: 12,
              md: 12,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].address : "",
              },
              handle: (e) => setStreetAddress(e.target.value),
              dataType: "string",
              dataCheck: StreetAddress,
            },
            {
              id: 5,
              label: "Country",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].countrycode
                    : "",
              },
              dataCheck: Chooseacountry,
              handle: (e) => setChooseacountry(e.target.value),
            },
            {
              id: 6,
              label: "City",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata[0].city : "",
              },
              handle: (e) => setCity(e.target.value),
              dataType: "string",
              dataCheck: City,
            },
            {
              id: 7,
              label: "State",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].stateprovince : "",
              },
              handle: (e) => setState(e.target.value),
              dataType: "string",
              dataCheck: State,
            },
            {
              id: 8,
              label: "Postal",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].postalcode : 0,
              },
              handle: (e) => setPostal(e.target.value),
              dataType: "number",
              dataCheck: Postal,
            },
          ],
        },
        {
          id: "3",
          title: "Billing Address",
          expend: true,
          content: [
            {
              id: 1,
              label: "Address",
              xl: 12,
              md: 12,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].billingaddress : "",
              },
              handle: (e) => setBStreetAddress(e.target.value),
              dataType: "string",
              dataCheck: BStreetAddress,
            },
            {
              id: 5,
              label: "Billing Country",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].billingcountrycode
                    : "",
              },
              handle: (e) => setBChooseacountry(e.target.value),
              dataCheck: BChooseacountry
            },
            {
              id: 6,
              label: "City",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].billingcity : "",
              },
              handle: (e) => setBCity(e.target.value),
              dataType: "string",
              dataCheck: BCity,
            },
            {
              id: 7,
              label: "State",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].billingstateprovince
                    : "",
              },
              handle: (e) => setBState(e.target.value),
              dataType: "string",
              dataCheck: BState,
            },
            {
              id: 8,
              label: "Postal",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].billingpostalcode : 0,
              },
              handle: (e) => setBPostal(e.target.value),
              dataType: "number",
              dataCheck: BPostal,
            },
            {
              id: 9,
              label: "TaxID",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata[0].taxid : "",
              },
              handle: (e) => setTaxID(e.target.value),
              dataType: "string",
              dataCheck: TaxID,
            },
            {
              id: 10,
              label: "TaxID2",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].taxid2 : "",
              },
              handle: (e) => setTaxID2(e.target.value),
              dataType: "string",
              dataCheck: true,
            },
          ],
        },
        {
          id: "4",
          title: "Communication",
          expend: true,
          content: [
            ...getcomunication,
            {
              id: 99,
              label: "Phone Number",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "AddComunication",
                data: "+ More Communication",
              },
            },
          ],
        },
        {
          id: "5",
          title: "Relationship (Internal)",
          expend: true,
          content: [
            ...getrelation,
            {
              id: 99,
              label: "Relation",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "AddRelation",
                data: "+ More Relation",
              },
              // handle: (e) => handleAddComunication(e),
            },
          ],
        },
        {
          id: "6",
          title: "A/R Number",
          expend: true,
          content: [
            // {
            //   id: 1,
            //   label: "IATA",
            //   xl: 3,
            //   md: 3,
            //   xs: 12,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 2,
              label: "Credit Card Number",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].creditcardid : "",
              },
              handle: (e) => setCreditCardNumber(e.target.value),
              dataType: "number",
              dataCheck: true,
            },
            {
              id: 3,
              label: "Outstanding Amount",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].outstandingamout : "",
              },
              handle: (e) => setOutstandingAmount(e.target.value),
              dataType: "number",
              dataCheck: true,
            },
            {
              id: 4,
              label: "Floating Deposition Amount",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].floatingdepositamount
                    : "",
              },
              handle: (e) => setFloatingDepositionAmount(e.target.value),
              dataType: "number",
              dataCheck: true,
            },
            {
              id: 5,
              label: "AR Number",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].ar_number : "",
              },
              handle: (e) => setARNumber(e.target.value),
              dataType: "number",
              dataCheck: true,
            },
          ],
        },
        // {
        //   id: "6",
        //   title: "More Information",
        //   expend: true,
        //   content: [
        //     {
        //       id: 1,
        //       label: "Tax ID",
        //       xl: 3,
        //       md: 6,
        //       xs: 12,
        //       select: {
        //         status: "fill",
        //         data: "",
        //       },
        //       handle: (e) => handleData(e),
        //     },
        //     {
        //       id: 2,
        //       label: "Billing Instruction",
        //       xl: 3,
        //       md: 6,
        //       xs: 12,
        //       select: {
        //         status: "option",
        //         data: optiondata.map((option) => (
        //           <option
        //             style={headerTableStyle}
        //             key={option.value}
        //             value={option.value}
        //           >
        //             {option.label}
        //           </option>
        //         )),
        //       },
        //       handle: (e) => handleData(e),
        //     },
        //   ],
        // },

        {
          id: "7",
          title: "Rate/Contract Information",
          expend: false,
          content: [
            {
              id: 1,
              label: "Negotiated Rates Only",
              xl: 6,
              md: 6,
              xs: 12,
              select: {
                status: "check",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].negotiatedratesonly
                    : "",
              },
              handle: (e) => setnegotiatedratesonly(e.target.checked),
            },
            {
              id: 2,
              label: "Rate Contract",
              xl: 2,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].ratecontractcode : "",
              },
              handle: (e) => setratecontractcode(e.target.value),
              dataType: "string",
              dataCheck: true,
            },
          ],
        },
        {
          id: "8",
          title: "Sales Information",
          expend: false,
          content: [
            {
              id: 1,
              label: "Sales User Name",
              xl: 6,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata[0].salesusername : "",
              },
              handle: (e) => setSalesUserName(e.target.value),
              dataType: "string",
              dataCheck: true,
            },
            {
              id: 2,
              label: "Industry",
              xl: 2,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [
                  { label: "Insurrance" },
                  { label: "Government" },
                  { label: "Educcation" },
                ].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].industrycode
                    : "Insurrance",
              },
              handle: (e) => setIndustry(e.target.value),
            },
            // {
            //   id: 3,
            //   label: "IATA",
            //   xl: 3,
            //   md: 6,
            //   xs: 12,
            //   select: {
            //     status: "fill",
            //     data: ""
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 4,
              label: "Market Segment",
              xl: 4,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].marketsegmentcode
                    : "Code1",
              },
              handle: (e) => setMarketSegment(e.target.value),
            },
            {
              id: 5,
              label: "Source Of Business",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata[0].sourceofbusinesscode
                    : "Code1",
              },
              handle: (e) => setSourceOfBusiness(e.target.value),
            },
            {
              id: 6,
              label: "Track Code",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata[0].trackcode : "Code1",
              },
              handle: (e) => setTrackCode(e.target.value),
            },
            {
              id: 7,
              label: "Reason For Stay",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [{ label: "Code1" }, { label: "Code2" }].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata[0].reasonforstaycode : "Code1",
              },
              handle: (e) => setReasonForStay(e.target.value),
            },
            {
              id: 8,
              label: "Geographic",
              xl: 3,
              md: 6,
              xs: 12,
              select: {
                status: "option",
                data: [
                  { label: "SEA" },
                  { label: "EUROPE" },
                  { label: "CHINA" },
                  { label: "AFRICA" },
                ].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.label}
                    value={option.label}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata[0].geographiccode : "SEA",
              },
              handle: (e) => setGeographic(e.target.value),
            },
            // ,
            // {
            //   id: "1",
            //   title: "Commission",
            //   expend: true,
            //   content: [
            //     {
            //       id: 1,
            //       label: "Commission Flag",
            //       xl: 3,
            //       md: 3,
            //       xs: 12,
            //       select: {
            //         status: "option",
            //         data: [{ label: "Pay" }, { label: "Not Pay" }].map((option) => (
            //           <option
            //             style={headerTableStyle}
            //             key={option.label}
            //             value={option.label}
            //           >
            //             {option.label}
            //           </option>
            //         )),
            //       }
            //     },
            //     {
            //       id: 2,
            //       label: "Commission Type",
            //       xl: 3,
            //       md: 3,
            //       xs: 12,
            //       select: {
            //         status: "option",
            //         data: [{ label: "Percent" }, { label: "Amount" }].map((option) => (
            //           <option
            //             style={headerTableStyle}
            //             key={option.label}
            //             value={option.label}
            //           >
            //             {option.label}
            //           </option>
            //         )),
            //       },
            //     },
            //   ]
            // }
          ],
        },
      ]);
    // }
    // getconfig();
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setList(reorder(list, result.source.index, result.destination.index));
    console.log(result);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "lightblue",
    }),
  });



  const handleAddDatatoDatabase = async (e) => {
   
    // props.setAction("none");
    // const checkvali = await checkvalidate();
    // if(checkvali){
    //   setIsRequired(true);
    // } else {
    //   setIsRequired(false);
      let index = list.findIndex((x) => x.title == "Communication");
      let communications = list[index];
      console.log("communications:",communications);
      // let index = list.findIndex((x) => x.title == "Communication");
      let relations = list[index];
      console.log("relations:",relations);
      let req = {
        recordtype: "C",
        nameOne: nameOne,
        nameTwo: nameTwo,
        CompanyTypeCode: CompanyTypeCode,
        Abbreviation: Abbreviation,
        GuaranteeMethodCode: GuaranteeMethodCode,
        Property: Property,
        Currency: Currency,
        CreditRating: CreditRating,
        iata: iata,
        Status: Status,
        StreetAddress: StreetAddress,
        Chooseacountry: Chooseacountry,
        City: City,
        State: State,
        Postal: Postal,
        BStreetAddress: BStreetAddress,
        BChooseacountry: BChooseacountry,
        BCity: BCity,
        BState: BState,
        BPostal: BPostal,
        TaxID: TaxID,
        TaxID2: TaxID2,
        Communication: Communication,
        Relationship: Relationship,
        CreditCardNumber: CreditCardNumber,
        OutstandingAmount: OutstandingAmount,
        FloatingDepositionAmount: FloatingDepositionAmount,
        ARNumber: ARNumber,
        SalesUserName: SalesUserName,
        Industry: Industry,
        MarketSegment: MarketSegment,
        SourceOfBusiness: SourceOfBusiness,
        TrackCode: TrackCode,
        ReasonForStay: ReasonForStay,
        Geographic: Geographic,
        negotiatedratesonly: negotiatedratesonly,
        ratecontractcode: ratecontractcode,
        communications: communicationDatas,
        relations: relationDatas,
      };

      console.log("datafrom post", req);
      const resp = await postCompanyProfile(
        sessionStorage.getItem("auth"),
        req
      );

      if (resp.status == "2000") {
        props.setAction("success");
      } else {
        props.setAction("dupic");
        setErrorParameter(resp.msg);
        setErrorMessage(true);
      }

      // console.log("datafrom post", data);
    // }
  };


  const handleAddDataEdittoDatabase = async (e) => {
   
    props.setAction("none");


      let req = {
        recordtype: "C",
        nameOne: nameOne,
        nameTwo: nameTwo,
        CompanyTypeCode: CompanyTypeCode,
        Abbreviation: Abbreviation,
        GuaranteeMethodCode: GuaranteeMethodCode,
        Property: Property,
        Currency: Currency,
        CreditRating: CreditRating,
        iata: iata,
        Status: Status,
        StreetAddress: StreetAddress,
        Chooseacountry: Chooseacountry,
        City: City,
        State: State,
        Postal: Postal,
        BStreetAddress: BStreetAddress,
        BChooseacountry: BChooseacountry,
        BCity: BCity,
        BState: BState,
        BPostal: BPostal,
        TaxID: TaxID,
        TaxID2: TaxID2,
        Communication: Communication,
        Relationship: Relationship,
        CreditCardNumber: CreditCardNumber,
        OutstandingAmount: OutstandingAmount,
        FloatingDepositionAmount: FloatingDepositionAmount,
        ARNumber: ARNumber,
        SalesUserName: SalesUserName,
        Industry: Industry,
        MarketSegment: MarketSegment,
        SourceOfBusiness: SourceOfBusiness,
        TrackCode: TrackCode,
        ReasonForStay: ReasonForStay,
        Geographic: Geographic,
        negotiatedratesonly: negotiatedratesonly,
        ratecontractcode: ratecontractcode,
        communications: communicationDatas,
        relations: relationDatas,
      };
      console.log("datafrom update", req);
   
      const resp = await updateCompanyProfile(
        sessionStorage.getItem("auth"),
        props.editdata[0].id,
        req
      );

      if (resp.status == "2000") {
        props.setAction("success");
      } else {
        props.setAction("dupic");
        setErrorParameter(resp.msg);
        setErrorMessage(true);
      }

  
  };

  //data from button for  trigger (add or delete)
  React.useEffect(async () => {
 
    if (props.action == "add") {
      let _IsRequired = nameOne === null ||
      Abbreviation === null ||
      GuaranteeMethodCode === null ||
      iata === null ||
      StreetAddress === null ||
      City === null ||
      State === null ||
      Postal === null ||
      BStreetAddress === null ||
      BCity === null ||
      BState === null ||
      BPostal === null ||
      TaxID === null ||
      Industry === null ||
      MarketSegment === null ||
      SourceOfBusiness === null ||
      TrackCode === null ||
      ReasonForStay === null ||
      Geographic  === null ||
      nameOne.trim() === "" ||
      Abbreviation.trim() === "" ||
      GuaranteeMethodCode.trim() === "" ||
      iata.trim() === "" ||
      StreetAddress.trim() === "" ||
      City.trim() === "" ||
      State.trim() === "" ||
      Postal === 0 ||
      BStreetAddress.trim() === "" ||
      BCity.trim() === "" ||
      BState.trim() === "" ||
      BPostal === 0 ||
      TaxID.trim() === "" ||
      Industry.trim() === "" ||
      MarketSegment.trim() === "" ||
      SourceOfBusiness.trim() === "" ||
      TrackCode.trim() === "" ||
      ReasonForStay.trim() === "" ||
      Geographic.trim() === "";
      console.log("action add", props.action);
      console.log('_IsRequired',_IsRequired)
      if(_IsRequired == false){
        setIsRequired(false);
      await handleAddDatatoDatabase();
      }else{
        setIsRequired(true);
        console.log("isRequired",isRequired)
        props.setAction("none");
        updateList()
      }
    } else if (props.action == "edit") {
      console.log(nameOne,
        Abbreviation,
        GuaranteeMethodCode,
        iata,
        StreetAddress,
        City,
        State,
        Postal,
        BStreetAddress,
        BCity,
        BState,
        BPostal,
        TaxID,
        CreditCardNumber,
        OutstandingAmount,
        OutstandingAmount,
        FloatingDepositionAmount,
        ARNumber,
        Industry,
        MarketSegment,
        SourceOfBusiness,
        TrackCode,
        ReasonForStay,
        Geographic)
        console.log(nameOne === null ,
          Abbreviation === null ,
          GuaranteeMethodCode === null ,
          iata === null ,
          StreetAddress === null ,
          City === null ,
          State === null ,
          Postal === null ,
          BStreetAddress === null ,
          BCity === null ,
          BState === null ,
          BPostal === null ,
          TaxID === null ,
          Industry === null ,
          MarketSegment === null ,
          SourceOfBusiness === null ,
          TrackCode === null ,
          ReasonForStay === null ,
          Geographic  === null ,
          nameOne.trim() === "" ,
          Abbreviation.trim() === "" ,
          GuaranteeMethodCode.trim() === "" ,
          iata.trim() === "" ,
          StreetAddress.trim() === "" ,
          City.trim() === "" ,
          State.trim() === "" ,
          Postal === 0 ,
          BStreetAddress.trim() === "" ,
          BCity.trim() === "" ,
          BState.trim() === "" ,
          BPostal === 0 ,
          TaxID.trim() === "" ,
          Industry.trim() === "" ,
          MarketSegment.trim() === "" ,
          SourceOfBusiness.trim() === "" ,
          TrackCode.trim() === "" ,
          ReasonForStay.trim() === "" ,
          Geographic.trim() === "")

      let _IsRequired = nameOne === null ||
      Abbreviation === null ||
      GuaranteeMethodCode === null ||
      iata === null ||
      StreetAddress === null ||
      City === null ||
      State === null ||
      Postal === null ||
      BStreetAddress === null ||
      BCity === null ||
      BState === null ||
      BPostal === null ||
      TaxID === null ||
      Industry === null ||
      MarketSegment === null ||
      SourceOfBusiness === null ||
      TrackCode === null ||
      ReasonForStay === null ||
      Geographic  === null ||
      nameOne.trim() === "" ||
      Abbreviation.trim() === "" ||
      GuaranteeMethodCode.trim() === "" ||
      iata.trim() === "" ||
      StreetAddress.trim() === "" ||
      City.trim() === "" ||
      State.trim() === "" ||
      Postal === 0 ||
      BStreetAddress.trim() === "" ||
      BCity.trim() === "" ||
      BState.trim() === "" ||
      BPostal === 0 ||
      TaxID.trim() === "" ||
      Industry.trim() === "" ||
      MarketSegment.trim() === "" ||
      SourceOfBusiness.trim() === "" ||
      TrackCode.trim() === "" ||
      ReasonForStay.trim() === "" ||
      Geographic.trim() === "";
      console.log("action add", props.action);
      console.log('_IsRequired',_IsRequired)
      if(_IsRequired == false){
      await handleAddDataEdittoDatabase();

      console.log("action edit", props.action);
    }else{
      setIsRequired(true);
      console.log("isRequired",isRequired)
      props.setAction("none");
      updateList()
    }

    }
  }, [props.action]);

  const handleData = (e) => { };

  const handleExpend = (id, expend) => {
    let index = list.findIndex((x) => x.id === id);

    console.log(Object.assign({}, list[index], { expend: !expend }));
    if (index === -1) return;
    else {
      let new_data = list[index];
      new_data.expend = !expend;
      setList([
        ...list.slice(0, index),
        new_data,
        ...list.slice(index + 1),
      ]);
    }
  };

  const handleAddComunication = async (id) => {

    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let comunication = list[index];
      delete comunication.content[comunication.content.length - 1];
      let newid = await comunication.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      setCommunicationDatas((prev) => ({
        ...prev,
        [newid + 1]: optioncommunication[0].label,
      }));
      console.log("communicationDatas:", communicationDatas);
      comunication.content.push({
        id: newid + 1,
        label: "Choose a communication",
        xl: 3,
        md: 3,
        xs: 6,
        select: {
          status: "option",
          data: optioncommunication.map((option) => (
            <option
              style={headerTableStyle}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )),
        },
        handle: (e) =>
          setCommunicationDatas((prev) => ({
            ...prev,
            [newid + 1]: e.target.value,
          })),
      });
      comunication.content.push({
        id: newid + 2,
        label: "communication",
        xl: 9,
        md: 9,
        xs: 6,
        select: {
          status: "fillnolabel",
          data: "",
        },
        handle: (e) =>
          setCommunicationDatas((prev) => ({
            ...prev,
            [newid + 2]: e.target.value,
          })),
      });
      comunication.content.push({
        id: 99,
        label: "AddComunication",
        xl: 2,
        md: 2,
        xs: 6,
        select: {
          status: "AddComunication",
          data: "+ More Communication",
        },
      });
      setList([
        ...list.slice(0, index),
        comunication,
        ...list.slice(index + 1),
      ]);
      console.log("communicationDatas:", communicationDatas);
    }
    console.log("demoData[index]:", list[index]);
  };

  const handleAddRelation = async (id) => {
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let relation = list[index];
      delete relation.content[relation.content.length - 1];
      let newid = await relation.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      setRelationDatas((prev) => ({
        ...prev,
        [newid + 1]: "",
        [newid + 2]: optionrelation[0].label,
        [newid + 3]: "",
      }));

      relation.content.push({
        id: newid + 2,
        label: "Name Type",
        xl: 2,
        md: 2,
        xs: 6,
        select: {
          status: "option",
          data: optionrelation.map((option) => (
            <option
              style={headerTableStyle}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )),
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 2]: e.target.value,
          })),
      });

      relation.content.push({
        id: newid + 1,
        label: "Name",
        xl: 4,
        md: 4,
        xs: 6,
        select: {
          status: "fill",
          data: "",
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 1]: e.target.value,
          })),
      });
      relation.content.push({
        id: newid + 3,
        label: "Notes",
        xl: 6,
        md: 6,
        xs: 12,
        select: {
          status: "fill",
          data: "",
        },
        handle: (e) =>
          setRelationDatas((prev) => ({
            ...prev,
            [newid + 3]: e.target.value,
          })),
      });
      relation.content.push({
        id: 99,
        label: "AddRelation",
        xl: 2,
        md: 2,
        xs: 6,
        select: {
          status: "AddRelation",
          data: "+ More Relation",
        },
      });
      setList([
        ...list.slice(0, index),
        relation,
        ...list.slice(index + 1),
      ]);

      console.log("relationDatas:", relationDatas);
    }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 5,
        color: themeState.color,
        backgroundColor: themeState.background,
      }}
    >
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="01">
          {(provided, snapshot) => (
            <Paper
              elevation={3}
              style={{
                padding: 20,

                color: themeState.color,
                backgroundColor: themeState.paper,
              }}
            >
              {/* <Container maxWidth="xl">
                <Grid container alignItems="center">
                  <Grid item style={{ flexGrow: 1 }}>
                    {" "}
                  </Grid>
                  <Grid item style={{ paddingRight: 20 }}>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox color="primary" />}
                      label="Negotiated Rates Only"
                      labelPlacement="start"
                    />
                  </Grid>
                </Grid>
              </Container> */}

              {errorMessage ? (
                <div
                  style={{
                    background: "#ff0033",
                    textAlign: "center",
                    color: "white",
                    height: "30px",
                    marginTop: 5,
                    paddingTop: 5,
                  }}
                >
                  {errorParameter}
                </div>
              ) : null}

              <Container
                maxWidth="xl"
                disableGutters
                style={{ marginTop: 10, backgroundColor: themeState.paper }}
                ref={provided.innerRef}
              >
                {list.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Accordion
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={classes.defaultTheme}
                        expanded={item.expend}
                      >
                        <AccordionSummary
                          style={{ color: mainColor, fontSize: 18 }}
                          onClick={() => handleExpend(item.id, item.expend)}
                        >
                          <div style={{ color: "blue" }}>
                            {item.title}&nbsp;
                          </div>{" "}
                          {item.expend ? (
                            <ArrowDropDownIcon style={{ color: "blue" }} />
                          ) : (
                            <ArrowDropUpIcon style={{ color: "blue" }} />
                          )}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {item.content.map((detail, index) => (
                              <Grid
                                item
                                key={detail.id}
                                index={index}
                                xl={detail.xl}
                                md={detail.md}
                                xs={detail.xs}
                              >
                                {detail.select.status === "check" ? (
                                  // <FormControlLabel
                                  //   // value="start"
                                  //   control={<Checkbox color="primary" />}
                                  //   label={detail.label}
                                  //   labelPlacement="end"
                                  // />
                                  <span>
                                    {detail.select.defaultvalue === true ? (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            defaultChecked={true}
                                            color="primary"
                                          />
                                        }
                                        label={detail.label}
                                        labelPlacement="end"
                                        onChange={detail.handle}
                                      />
                                    ) : (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            defaultChecked={false}
                                            color="primary"
                                          />
                                        }
                                        label={detail.label}
                                        labelPlacement="end"
                                        onChange={detail.handle}
                                      />
                                    )}
                                  </span>
                                ) : detail.select.status == "checkbox" ? (
                                  <FormControlLabel
                                    value="start"
                                    control={<Checkbox color="primary" />}
                                    label={detail.select.data}
                                    labelPlacement="start"
                                  />
                                ) : detail.select.status === "status" ? (
                                  <div style={{ paddingTop: 10 }}>
                                    <a>Status</a>
                                    {/* <Switch
                                      defaultChecked={Status}
                                      value={Status}
                                      color="primary"
                                      onChange={(e) => changeSwitch(e)}
                                    /> */}

                                    {detail.select.defaultvalue === true ? (
                                      <Switch
                                        defaultChecked={true}
                                        color="primary"
                                        onChange={detail.handle}
                                      />
                                    ) : (
                                      <Switch
                                        defaultChecked={false}
                                        color="primary"
                                        onChange={detail.handle}
                                      />
                                    )}
                                  </div>
                                ) : detail.select.status ===
                                  "AddComunication" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() =>
                                      handleAddComunication(item.id)
                                    }
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "fillnolabel" ? (
                                  <TextField
                                    className={classes.root}
                                    // label={detail.label}
                                    variant="outlined"
                                    defaultValue={detail.select.defaultvalue}
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#AAAAAA" },
                                    }}
                                    fullWidth
                                    onChange={detail.handle}
                                  />
                                ) : detail.select.status === "AddRelation" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddRelation(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "fix" ? (
                                  <TextField
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{ backgroundColor: "#EEEEEE" }}
                                    // disabled={true}
                                    value={detail.select.data}
                                    defaultValue={detail.select.defaultvalue}
                                    onFocus={false}
                                  />
                                ) : detail.select.status === "fill" ? (
                                  // <TextField
                                  //   className={classes.root}
                                  //   label={detail.label}
                                  //   variant="outlined"
                                  //   InputProps={{
                                  //     style: headerTableStyle,
                                  //   }}
                                  //   InputLabelProps={{
                                  //     style: { color: "#AAAAAA" },
                                  //   }}
                                  //   fullWidth
                                  //   defaultValue={detail.select.defaultvalue}
                                  //   onChange={detail.handle}
                                  // />
                               
                                
                                  [
                                    isRequired ? (
                                    
                                      <TextField
                                        error={
                                          detail.dataCheck == null ||
                                          detail.dataCheck === "" ||
                                          detail.dataCheck === " "
                                            ? true
                                            : false
                                        }
                                        // error={detail.dataCheck}
                                        helperText={
                                          detail.dataCheck == null ||
                                          detail.dataCheck === ""
                                            ? `${detail.label} is Required`
                                            : false
                                        }
                                        // required={true}
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        InputProps={{
                                          style: headerTableStyle,
                                        }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        onChange={detail.handle}
                                        // onBlur={handleValidation(detail.dataCheck)}
                                      />
                                    ) : (
                                      <TextField
                                        // error={
                                        //   detail.dataCheck == null ||
                                        //   detail.dataCheck === "" ||
                                        //   detail.dataCheck === " "
                                        //     ? true
                                        //     : false
                                        // }
                                        // // error={detail.dataCheck}
                                        // helperText={
                                        //   detail.dataCheck == null ||
                                        //   detail.dataCheck === ""
                                        //     ? `${detail.label} is Required`
                                        //     : false
                                        // }
                                        // required={true}
                                        type={detail.dataType}
                                        className={classes.root}
                                        label={detail.label}
                                        variant="outlined"
                                        InputProps={{
                                          style: headerTableStyle,
                                        }}
                                        noWrap
                                        InputLabelProps={{
                                          style: { color: "#AAAAAA" },
                                        }}
                                        fullWidth
                                        defaultValue={
                                          detail.select.defaultvalue
                                        }
                                        onChange={detail.handle}
                                        // onBlur={handleValidation(detail.dataCheck)}
                                      />
                                    ),
                                  ]
                                ) : detail.select.status === "option" ? (
                                  <TextField
                                    className={classes.root}
                                    label={detail.label}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    defaultValue={detail.select.defaultvalue}
                                    SelectProps={{
                                      native: true,
                                    }}
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    onChange={detail.handle}
                                  >
                                    {detail.select.data}
                                  </TextField>
                                ) : detail.select.status === "datetime" ? (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.root}
                                      label={detail.label}
                                      inputVariant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      defaultValue={detail.select.defaultvalue}
                                      // format="dd/MM/yyyy"
                                      // value={selectedDateStartEdit}
                                      // onChange={handleDateStartEdit}
                                      onChange={detail.handle}
                                      fullWidth
                                    />
                                  </MuiPickersUtilsProvider>
                                ) : (
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                    style={{
                                      paddingBottom: 10,
                                      paddingTop: 10,
                                      color: "blue",
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Container>
            </Paper>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompany);
