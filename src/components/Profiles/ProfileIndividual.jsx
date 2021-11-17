import React, { useState, useEffect } from "react";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { optioncountry } from "../../static/country.js";
import { optionnationality } from "../../static/nationality";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getconfigurationbypropertycode } from "../../services/user.service";
import {
  getIndividualProfileCommunication,
  getIndividualProfileRelation,
  getIndividualProfile,
  getIndividualProfileById,
  postIndividualProfile,
  updateIndividualProfile,
  deleteIndividualProfileById,
} from "../../services/individualprofile.service";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateRangePicker,
} from "@material-ui/pickers";
import * as actions from "../../middleware/action";

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
}));

var optionTitle = [
  {
    value: "Mr.",
    label: "Mr.",
  },
  {
    value: "Mrs.",
    label: "Mrs.",
  },
  {
    value: "Ms.",
    label: "Ms.",
  },
];

const optionDocumentType = [
  {
    value: "1",
    label: "ID Card",
  },
  {
    value: "2",
    label: "Passport",
  },
];

const optiondata = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option",
    label: "Option2",
  },
  {
    value: "Option",
    label: "Option3",
  },
];
const optiondata2 = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

// const optioncommunication = [
//   {
//     value: "Telephone",
//     label: "Telephone Number",
//   },
//   {
//     value: "Mobile",
//     label: "Mobile Number",
//   },
//   {
//     value: "Email",
//     label: "Email Address",
//   },
//   {
//     value: "Twitter",
//     label: "Twitter",
//   },
//   {
//     value: "Instagram",
//     label: "Instagram",
//   },
//   {
//     value: "Facebook",
//     label: "Facebook",
//   },
// ];

const addressType = [
  { label: "Organisation", value: "Organisation" },
  {
    label: "Home",
    value: "Home",
  },
  {
    label: "Resident",
    value: "Resident",
  },
];
// const optionrelation = [
//   {
//     value: "Family",
//     label: "Family",
//   },
//   {
//     value: "Sprouse",
//     label: "Sprouse",
//   },
//   {
//     value: "Colleague",
//     label: "Colleague",
//   },
//   {
//     value: "ReportTo",
//     label: "Report To",
//   },
// ];

export const ProfileIndividual = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });

  const [optionrelation, setOptionrelation] = React.useState([]);
  const [optioncommunication, setOptioncommunication] = React.useState([]);
  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  const [optionCity, setOptionCity] = React.useState([
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
  ]);
  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#666666",
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
        holderColor: "A9A9AC",
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

  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(async () => {
    setSmallwidth(window.innerWidth < 1000);
    // if(props.editdata != null) {
    // let getCommunications = await getIndividualProfileCommunication(
    //   sessionStorage.getItem("auth"),
    //   props.editdata.nameid
    // );
    // let getCommunicationsDatas = {}
    // console.log("getCommunications.contents",getCommunications.contents)
    // getCommunications.contents[0].forEach((element) =>
    //   {if(element.communication == "email"){
    //     console.log("e",element.value)
    //     getCommunicationsDatas.email = element.value
    //   }else if(element.communication == "mobile"){
    //     console.log("m",element.value)
    //     getCommunicationsDatas.mobile = element.value
    //   }else{
    //     console.log("element.communication",element)
    //   }
    //   }
    // );
    // setCommunicationDatas(prev => ({...prev,getCommunicationsDatas}));
    // console.log("getCommunicationsDatas",getCommunicationsDatas,communicationDatas)

    // }
  }, []);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  // const [demoData, setDemoData] = useState([]);
  const [list, setList] = React.useState([]);
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

  const [nameID,setNameID] = React.useState(
    props.editdata != null ? props.editdata.nameid : "Mr."
  );
  const [nameTitle, setNameTitle] = React.useState(
    props.editdata != null ? props.editdata.nametitle : "Mr."
  );
  const [firstName, setFirstName] = React.useState(
    props.editdata != null ? props.editdata.firstname : ""
  );
  const [lastName, setLastName] = React.useState(
    props.editdata != null ? props.editdata.lastname : ""
  );
  const [namePrefix, setNamePrefix] = React.useState(
    props.editdata != null ? props.editdata.nameprefix : "KHUN1"
  );
  const [nameSuffix, setNameSuffix] = React.useState(
    props.editdata != null ? props.editdata.namesuffix : ""
  );
  const [middleInitial, setMiddleInitial] = React.useState(
    props.editdata != null ? props.editdata.middleinitial : ""
  );
  const [gender, setGender] = React.useState(
    props.editdata != null ? props.editdata.gender : "Male."
  );
  const [religion, setReligion] = React.useState(
    props.editdata != null ? props.editdata.religion : "Thailand"
  );
  const [statusProfile, setStatusProfile] = React.useState(
    props.editdata != null ? props.editdata.statusprofile : "Y"
  );
  const [organization, setOrganization] = React.useState(
    props.editdata != null ? props.editdata.organization : ""
  );
  const [provinceOfResidence, setProvinceOfResidence] = React.useState(
    props.editdata != null ? props.editdata.provinceofresidence : ""
  );
  const [borderCrossingEntryPlace, setBorderCrossingEntryPlace] =
    React.useState(
      props.editdata != null ? props.editdata.bordercrossingentryplace : ""
    );
  const [borderCrossingEntryDate, setborderCrossingEntryDate] = React.useState(
    props.editdata != null
      ? props.editdata.bordercrossingentrydate
      : new Date("2021-09-13T21:11:54")
  );
  const [address, setAddress] = React.useState(
    props.editdata != null ? props.editdata.address : "organization"
  );
  const [address1, setAddress1] = React.useState(
    props.editdata != null ? props.editdata.address1 : ""
  );
  const [address2, setAddress2] = React.useState(
    props.editdata != null ? props.editdata.address2 : ""
  );
  const [conuty, setCountry] = React.useState(
    props.editdata != null ? props.editdata.conuty : "Thailand"
  );
  const [city, setCity] = React.useState(
    props.editdata != null ? props.editdata.city : ""
  );
  const [stateProvince, setStateprovince] = React.useState(
    props.editdata != null ? props.editdata.stateprovince : ""
  );
  const [postal, setPostal] = React.useState(
    props.editdata != null ? props.editdata.postal : ""
  );

  const [noPost, setNoPost] = React.useState(
    props.editdata != null ? props.editdata.nopost : "N"
  );
  const [NRG, setNRG] = React.useState(
    props.editdata != null ? props.editdata.nrg : "N"
  );
  const [guestCategory, setGuestCategory] = React.useState(
    props.editdata != null ? props.editdata.guestcategory : "MIDDLE-AGED-ADULTS"
  );
  const [guestType, setGuestType] = React.useState(
    props.editdata != null ? props.editdata.guesttype : "option1"
  );
  const [VVIP, setVVIP] = React.useState(
    props.editdata != null ? props.editdata.vvip : "V20"
  );
  const [birthRegion, setBirthRegion] = React.useState(
    props.editdata != null ? props.editdata.birthregion : "option1"
  );
  const [birthProvince, setBirthProvince] = React.useState(
    props.editdata != null ? props.editdata.birthprovince : "option1"
  );

  const [IDCheck, setIDCheck] = React.useState(
    props.editdata != null ? props.editdata.idcheck : "N"
  );
  const [IDType, setIDType] = React.useState(
    props.editdata != null ? props.editdata.idtype : "option1"
  );
  const [IDNumber, setIDNumber] = React.useState(
    props.editdata != null ? props.editdata.idnumber : ""
  );
  const [nationality, setNationality] = React.useState(
    props.editdata != null ? props.editdata.nationality : "Thai"
  );
  const [dateOfBirth, setDateOfBirth] = React.useState(
    props.editdata != null
      ? props.editdata.dateofbirth
      : new Date("2021-09-13T21:11:54")
  );
  const [IDIssuedDate, setIDIssuedDate] = React.useState(
    props.editdata != null
      ? props.editdata.idissueddate
      : new Date("2021-09-13T21:11:54")
  );
  const [IDExpirationDate, setIDExpirationDate] = React.useState(
    props.editdata != null
      ? props.editdata.idexpirationdate
      : new Date("2021-09-13T21:11:54")
  );

  const [passportVisaCheck, setPassportVisaCheck] = React.useState(
    props.editdata != null ? props.editdata.passportvisacheck : "N"
  );
  const [visaType, setVisaType] = React.useState(
    props.editdata != null ? props.editdata.visatype : "Tourist"
  );
  const [visaName, setVisaName] = React.useState(
    props.editdata != null ? props.editdata.visaname : ""
  );
  const [visaNumber, setVisaNumber] = React.useState(
    props.editdata != null ? props.editdata.visanumber : ""
  );
  const [visaIssuedDate, setVisaIssuedDate] = React.useState(
    props.editdata != null
      ? props.editdata.visaissueddate
      : new Date("2021-09-13T21:11:54")
  );
  const [visaBeginDate, setVisaBeginDate] = React.useState(
    props.editdata != null
      ? props.editdata.visabegindate
      : new Date("2021-09-13T21:11:54")
  );
  const [visaExpirationDate, setVisaExpirationDate] = React.useState(
    props.editdata != null
      ? props.editdata.visaexpirationdate
      : new Date("2021-09-13T21:11:54")
  );

  const [visaStatus, setVisaStatus] = React.useState(
    props.editdata != null ? props.editdata.visastatus : "Y"
  );
  const [visaNotes, setVisaNotes] = React.useState(
    props.editdata != null ? props.editdata.visanotes : ""
  );
  const [rank, setRank] = React.useState(
    props.editdata != null ? props.editdata.rank : "option1"
  );
  const [grade, setGrade] = React.useState(
    props.editdata != null ? props.editdata.grade : "option1"
  );
  const [guestIdentity, setGuestIdentity] = React.useState(
    props.editdata != null ? props.editdata.guestidentity : ""
  );

  const [isRequired, setIsRequired] = React.useState(false);

  // const [individualData, setIndividualData] = React.useState("");

  const pageProperty = useSelector((state) => state.reducer.property);

  const [communicationDatas, setCommunicationDatas] = React.useState({});
  const [relationDatas, setRelationDatas] = React.useState({});
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

  React.useEffect(() => {
    async function getconfig() {
      let getCommunicationsDatas = {};
      let getcomunication = [];
      let getrelation = [];
      console.log("demostate");
      let getconfigdata = await getconfigurationbypropertycode(
        sessionStorage.getItem("auth"),
        pageProperty
      );
      console.log(getconfigdata);
      let configdata = getconfigdata.content[getconfigdata.content.length - 1];
      let optionTitle = await getlist(configdata, "PCINDTT");
      // let optionDocumentType = await getlist(configdata,"");
      let optiongender = await getlist(configdata, "PCINDGD");
      let relation = await getlist(configdata, "PCINDRL");
      let communication = await getlist(configdata, "PCINDCM");
      // let optionDocumentType = await getlist(configdata,"");
      setOptionrelation(relation);
      setOptioncommunication(communication);
      console.log("optioncommunication", optioncommunication);
      if (props.editdata != null) {
        let getCommunications = await getIndividualProfileCommunication(
          sessionStorage.getItem("auth"),
          props.editdata.nameid
        );
        let getRelations = await getIndividualProfileRelation(
          sessionStorage.getItem("auth"),
          props.editdata.nameid
        );
        console.log("getCommunications.contents", getCommunications.contents)
        let count = 3;
        getCommunications.contents[0].forEach((element) => {
          if (element.communication == "email") {
            getCommunicationsDatas.email = element.value
            setCommunicationDatas((prev) => ({
              ...prev,
              email: element.value,
            }))
          } else if (element.communication == "mobile") {
            getCommunicationsDatas.mobile = element.value
            setCommunicationDatas((prev) => ({
              ...prev,
              mobile: element.value,
            }))
          } else {
            setCommunicationDatas(prev => ({
              ...prev,
              [count]: element.communication,
              [count + 1]: element.value
            }))
            getcomunication.push({
              id: count,
              label: "Choose a communication",
              xl: 3,
              md: 3,
              xs: 6,
              select: {
                status: "option",
                data: communication.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                    selected={option.label == element.communication}
                  // defaultValue={element.communication}
                  >
                    {option.label}
                  </option>
                )),
              },
              handle: (e) => setCommunicationDatas(prev => ({
                ...prev,
                [count]: element.communication
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
                defaultvalue: element.value
              },
              handle: (e) => setCommunicationDatas(prev => ({
                ...prev,
                [count + 1]: element.value
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
              [relationid]: element.relation,
              [relationid+1]: element.value,
              [relationid + 2]: element.note
            }))
            getrelation.push({
              id: relationid ,
              label: "Name Type",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: relation.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                    selected={option.label == element.relation}
                  >
                    {option.label}
                  </option>
                )),
              },
              handle: (e) => setRelationDatas(prev => ({
                ...prev,
                [relationid]: element.relation
              }))
            });
            getrelation.push({
              id: relationid+1,
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
                [relationid+1]: element.value
              }))
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
                [relationid + 2]: element.note
              }))
            });
            relationid = relationid + 3;
          }
          );
          console.log("getrelation",getrelation)

      }

      setList([
        {
          id: "1",
          title: "Personal",
          expend: true,
          content: [
            {
              id: 0,
              label: "Name Title",
              xl: 1,
              md: 1,
              xs: 2,
              select: {
                status: "option",
                data: [
                  { label: "Mr." },
                  { label: "Mrs." },
                  { label: "Miss" },
                ].map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                    noWrap
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.nametitle : "Mr.",
              },
              handle: (e) => setNameTitle(e.target.value),
              dataType: "string",
              dataCheck: nameTitle,
            },

            {
              id: 1,
              label: "First Name",
              xl: 5,
              md: 5,
              xs: 10,
              select: {
                status: "fill",
                // data: props.editdata.firstname,
                defaultvalue:
                  props.editdata != null ? props.editdata.firstname : "",
              },
              handle: (e) => setFirstName(e.target.value),
              dataType: "string",
              dataCheck: firstName,
            },
            {
              id: 2,
              label: "Last Name",
              xl: 5,
              md: 5,
              xs: 10,
              select: {
                status: "fill",
                defaultvalue:
                  props.editdata != null ? props.editdata.lastname : "",
              },
              // handle: (e) => setPersonalData({ ...personalData,lastname: e.target.value }),
              handle: (e) => setLastName(e.target.value),
              dataType: "string",
              dataCheck: lastName,
            },
            {
              id: 3,
              label: "Name Prefix",
              xl: 1,
              md: 1,
              xs: 2,
              select: {
                status: "option",
                data: [
                  { label: "KHUN1" },
                  { label: "KHUN2" },
                  { label: "KHUN3" },
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
                  props.editdata != null ? props.editdata.nameprefix : "KHUN1",
              },
              handle: (e) => setNamePrefix(e.target.value),
              dataType: "string",
              dataCheck: namePrefix,
            },
            {
              id: 4,
              label: "Name Suffix",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "fill",
                // data: props.editdata.firstname,
                defaultvalue:
                  props.editdata != null ? props.editdata.namesuffix : "",
              },
              handle: (e) => setNameSuffix(e.target.value),
              dataType: "string",
              dataCheck: nameSuffix,
            },
            {
              id: 5,
              label: "Middle Initial",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "fill",
                // data: props.editdata.firstname,
                defaultvalue:
                  props.editdata != null ? props.editdata.middleinitial : "",
              },
              handle: (e) => setMiddleInitial(e.target.value),
              dataType: "string",
              dataCheck: middleInitial,
            },
            {
              id: 6,
              label: "Gender",
              xl: 1,
              md: 1,
              xs: 4,
              select: {
                status: "option",
                data: optiongender.map((option) => (
                  <option
                    // defaultValue={props.editdata != null ? props.editdata.sex : ""}
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.gender : "Male",
              },
              handle: (e) => setGender(e.target.value),
              dataType: "string",
              dataCheck: gender,
            },

            // {
            //   id: 7,
            //   label: "Choose a Document Type*",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "option",
            //     data: optionDocumentType.map((option) => (
            //       <option
            //         style={headerTableStyle}
            //         key={option.value}
            //         value={option.value}
            //         noWrap
            //       >
            //         {option.label}
            //       </option>
            //     )),
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 8,
            //   label: "ID Number",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "fill",
            //     data:
            //       props.editdata != null ? props.editdata.idcardandpass : "",
            //   },
            //   handle: (e) => setIDNumber(e.target.value),
            // },
            // {
            //   id: 9,
            //   label: "Nationality*",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "option",
            //     data: optionnationality.map((option) => (
            //       <option
            //         style={headerTableStyle}
            //         key={option.value}
            //         value={option.value}
            //       >
            //         {option.label}
            //       </option>
            //     )),
            //     defaultvalue:
            //       props.editdata != null ? props.editdata.gender : "",
            //   },
            //   handle: (e) => setNationality(e.target.value),
            // },
            // {
            //   id: 10,
            //   label: "Birth country",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "option",
            //     data: optioncountry.map((option) => (
            //       <option
            //         style={headerTableStyle}
            //         key={option.value}
            //         value={option.value}
            //       >
            //         {option.label}
            //       </option>
            //     )),
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 11,
            //   label: "Birth City",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "option",
            //     data: optioncountry.map((option) => (
            //       <option
            //         style={headerTableStyle}
            //         key={option.value}
            //         value={option.value}
            //       >
            //         {option.label}
            //       </option>
            //     )),
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 7,
              label: "Religion",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "option",
                data: optioncountry.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.religion : "Thailand",
              },
              handle: (e) => setReligion(e.target.value),
              dataType: "string",
              dataCheck: religion,
            },

            // {
            //   id: 13,
            //   label: "Date of Birth",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "datetime",
            //     data: "",
            //   },
            //   handle: " ",
            // },

            // {
            //   id: 7,
            //   label: "Issue Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "datetime",
            //     data: "",
            //   },
            //   handle: " ",
            // },
            // {
            //   id: 8,
            //   label: "Expiry Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 12,
            //   select: {
            //     status: "datetime",
            //     data: "",
            //   },
            //   handle: " ",
            // },

            {
              id: 8,
              label: "Status",
              xl: 3,
              md: 3,
              xs: 12,
              select: {
                status: "status",
                defaultvalue:
                  props.editdata != null ? props.editdata.statusprofile : "Y",
                data: "Y",
              },
              handle: (e) => setStatusProfile(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: statusProfile,
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
              label: "Organisation",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.organization : "",
              },

              handle: (e) => setOrganization(e.target.value),
              dataType: "string",
              dataCheck: organization,
            },
            {
              id: 2,
              label: "Province Of Residence",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.provinceofresidence
                    : "",
              },
              handle: (e) => setProvinceOfResidence(e.target.value),
              dataType: "string",
              dataCheck: provinceOfResidence,
            },
            {
              id: 3,
              label: "Border Crossing Entry Place",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.bordercrossingentryplace
                    : "",
              },
              handle: (e) => setBorderCrossingEntryPlace(e.target.value),
              dataType: "string",
              dataCheck: borderCrossingEntryPlace,
            },
            {
              id: 4,
              label: "Border Crossing Entry Date",
              xl: 2,
              md: 2,
              xs: 4,
              select: {
                status: "datetime",
                data: borderCrossingEntryDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.bordercrossingentrydate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setborderCrossingEntryDate(new Date(e)),
              dataType: "date",
              dataCheck: borderCrossingEntryDate,
            },
            {
              id: 0,
              label: "",
              xl: 4,
              md: 4,
              xs: 4,
              select: {
                status: "offset",
                data: "",
              },
              handle: (e) => handleData(e),
            },
            {
              id: 5,
              label: "Address",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "option",
                data: addressType.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.address
                    : "organization",
              },
              handle: (e) => setAddress(e.target.value),
              dataType: "string",
              dataCheck: address,
            },
            {
              id: 6,
              label: "Address 1",
              xl: 5,
              md: 5,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.address1 : "",
              },
              handle: (e) => setAddress1(e.target.value),
              dataType: "string",
              dataCheck: address1,
            },
            {
              id: 7,
              label: "Address 2",
              xl: 5,
              md: 5,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.address2 : "",
              },
              handle: (e) => setAddress2(e.target.value),
              dataType: "string",
              dataCheck: address2,
            },
            {
              id: 8,
              label: "Choose a country",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optioncountry.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.conuty : "Thailand",
              },
              handle: (e) => setCountry(e.target.value),
              dataType: "string",
              dataCheck: conuty,
            },
            {
              id: 9,
              label: "City",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata.city : "",
              },
              handle: (e) => setCity(e.target.value),
              dataType: "string",
              dataCheck: city,
            },
            {
              id: 10,
              label: "State / Province",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.stateprovince : "",
              },
              handle: (e) => setStateprovince(e.target.value),
              dataType: "string",
              dataCheck: stateProvince,
            },
            {
              id: 11,
              label: "Postal",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.postal : "",
              },
              handle: (e) => setPostal(e.target.value),
              dataType: "number",
              dataCheck: postal,
            },
            {
              id: 12,
              label: "",
              xl: 4,
              md: 4,
              xs: 4,
              select: {
                status: "offset",
                data: "",
              },
              // handle: (e) => handleData(e),
            },
            {
              id: 99,
              label: "AddAddress",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "AddAddress",
                data: "+ More Address",
              },
            },
          ],
        },
        {
          id: "3",
          title: "Communication",
          expend: true,
          content: [
            {
              id: 1,
              label: "Email",
              xl: 3,
              md: 3,
              xs: 6,
              select: {
                status: "fix",
                data: "Email Address",
              },
              // dataType: "email",
              // dataCheck: "",
            },
            {
              id: 2,
              label: "Email",
              xl: 9,
              md: 9,
              xs: 6,
              select: {
                status: "fillnolabel",
                data: "Email",
                defaultvalue:
                  props.editdata != null ? getCommunicationsDatas.email : "",
              },
              handle: (e) =>
                setCommunicationDatas((prev) => ({
                  ...prev,
                  email: e.target.value,
                })),
              dataType: "email",
              dataCheck: communicationDatas,
            },
            {
              id: 3,
              label: "Mobile Number",
              xl: 3,
              md: 3,
              xs: 6,
              select: {
                status: "fix",
                data: "Mobile Number",
              },
            },
            {
              id: 4,
              label: "Mobile Number",
              xl: 9,
              md: 9,
              xs: 6,
              select: {
                status: "fillnolabel",
                data: "Mobile Number",
                defaultvalue:
                  props.editdata != null ? getCommunicationsDatas.mobile : "",
              },
              handle: (e) =>
                setCommunicationDatas((prev) => ({
                  ...prev,
                  mobile: e.target.value,
                })),
              dataType: "number",
              dataCheck: communicationDatas,
            },
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
              // handle: (e) => handleAddComunication(e),
            },
          ],
        },
        {
          id: "4",
          title: "Relation",
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
          id: "5",
          title: "Internal Infomation",
          expend: true,
          content: [
            {
              id: 1,
              label: "No Post",
              xl: 1,
              md: 1,
              xs: 6,
              select: {
                status: "check",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.nopost : "N",
              },
              handle: (e) => setNoPost(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: noPost,
            },
            {
              id: 2,
              label: "NRG",
              xl: 1,
              md: 1,
              xs: 6,
              select: {
                status: "check",
                data: "",
                defaultvalue: props.editdata != null ? props.editdata.nrg : "N",
              },
              handle: (e) => setNRG(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: NRG,
            },
            {
              id: 3,
              label: "offset",
              xl: 10,
              md: 10,
              xs: 0,
              select: {
                status: "offset",
                data: "",
              },
              // handle: (e) => handleData(e),
            },
            {
              id: 4,
              label: "Guest Catagory",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: [
                  { label: "CHILD" },
                  { label: "YOUNG-ADULTS" },
                  { label: "MIDDLE-AGED-ADULTS" },
                  { label: "OLD-ADGE-ADULTS" },
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
                    ? props.editdata.guestcategory
                    : "option1",
              },
              handle: (e) => setGuestCategory(e.target.value),
              dataType: "string",
              dataCheck: guestCategory,
            },
            {
              id: 5,
              label: "Guest Type",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.guesttype : "option1",
              },
              handle: (e) => setGuestType(e.target.value),
              dataType: "string",
              dataCheck: guestType,
            },
            {
              id: 6,
              label: "VVIP",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: [
                  { label: "V20" },
                  { label: "V55" },
                  { label: "V99" },
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
                  props.editdata != null ? props.editdata.vvip : "option1",
              },
              handle: (e) => setVVIP(e.target.value),
              dataType: "string",
              dataCheck: VVIP,
            },
            {
              id: 7,
              label: "Birth Region",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.birthregion
                    : "option1",
              },
              handle: (e) => setBirthRegion(e.target.value),
              dataType: "string",
              dataCheck: birthRegion,
            },
            {
              id: 8,
              label: "Birth Province",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.birthprovince
                    : "option1",
              },
              handle: (e) => setBirthProvince(e.target.value),
              dataType: "string",
              dataCheck: birthProvince,
            },
          ],
        },
        {
          id: "6",
          title: "Identification",
          expend: true,
          content: [
            {
              id: 1,
              label: "ID Check",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "check",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.idcheck : "N",
              },

              handle: (e) => setIDCheck(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: IDCheck,
            },
            {
              id: 2,
              label: "offset",
              xl: 10,
              md: 10,
              xs: 6,
              select: {
                status: "offset",
                data: "",
              },
            },
            {
              id: 3,
              label: "ID Type",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.idtype : "option1",
              },

              handle: (e) => setIDType(e.target.value),
              dataType: "string",
              dataCheck: IDType,
            },
            {
              id: 4,
              label: "ID Number",
              xl: 6,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.idnumber : "",
              },
              handle: (e) => setIDNumber(e.target.value),
              dataType: "number",
              dataCheck: IDNumber,
            },
            {
              id: 5,
              label: "Nationality*",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optionnationality.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.nationality : "Thai",
              },
              handle: (e) => setNationality(e.target.value),
              dataType: "string",
              dataCheck: nationality,
            },
            {
              id: 6,
              label: "Date of Birth",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "datetime",
                data: dateOfBirth,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.dateofbirth
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setDateOfBirth(convertTimeToString(e)),
              dataType: "date",
              dataCheck: dateOfBirth,
            },
            {
              id: 7,
              label: "ID Issue Date",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "date",
                data: IDIssuedDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.idissuedDate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setIDIssuedDate(new Date(e)),
              dataType: "date",
              dataCheck: IDIssuedDate,
            },
            {
              id: 8,
              label: "ID Expiration Date",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "date",
                data: IDExpirationDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.idexpirationDate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setIDExpirationDate(new Date(e)),
              dataType: "date",
              dataCheck: IDExpirationDate,
            },
            {
              id: 9,
              label: "offset",
              xl: 8,
              md: 8,
              xs: 0,
              select: {
                status: "offset",
                data: "",
              },
            },
            {
              id: 10,
              label: "Passport Visa Check",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "check",
                data: "",
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.passportvisacheck
                    : "N",
              },
              handle: (e) =>
                setPassportVisaCheck(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: passportVisaCheck,
            },
            {
              id: 11,
              label: "Offset",
              xl: 10,
              md: 10,
              xs: 6,
              select: {
                status: "offset",
                data: "",
              },
            },
            {
              id: 12,
              label: "Visa Type",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: [{ label: "Tourist" }, { label: "Miliary" }].map(
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
                  props.editdata != null ? props.editdata.visatype : "Tourist",
              },
              handle: (e) => setVisaType(e.target.value),
              dataType: "string",
              dataCheck: visaType,
            },
            {
              id: 13,
              label: "Visa Name",
              xl: 6,
              md: 6,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.visaname : "",
              },
              handle: (e) => setVisaName(e.target.value),
              dataType: "string",
              dataCheck: visaName,
            },
            {
              id: 14,
              label: "Visa Number",
              xl: 4,
              md: 4,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.visanumber : "",
              },
              handle: (e) => setVisaNumber(e.target.value),
              dataType: "string",
              dataCheck: visaNumber,
            },
            // {
            //   id: 15,
            //   label: "Issuing Country",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     select: {
            //       status: "option",
            //       data: optiondata.map((option) => (
            //         <option
            //           style={headerTableStyle}
            //           key={option.value}
            //           value={option.value}
            //         >
            //           {option.label}
            //         </option>
            //       )),
            //     },
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 15,
              label: "Visa Issued Date",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "date",
                data: visaIssuedDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.visaissueddate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setVisaIssuedDate(new Date(e)),
              dataType: "date",
              dataCheck: visaIssuedDate,

              // handle: (e) => setVisaIssuedDate(convertTimeToString(e)),
            },
            {
              id: 16,
              label: "Visa Begin Date",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "date",
                data: visaBeginDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.visabegindate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setVisaBeginDate(new Date(e)),
              dataType: "date",
              dataCheck: visaBeginDate,
            },
            {
              id: 17,
              label: "Visa Expiration Date",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "date",
                data: visaExpirationDate,
                defaultvalue:
                  props.editdata != null
                    ? props.editdata.visaexpirationdate
                    : new Date("2021-09-13T21:11:54"),
              },
              handle: (e) => setVisaExpirationDate(new Date(e)),
              dataType: "date",
              dataCheck: visaExpirationDate,
            },
            // {
            //   id: 18,
            //   label: "Visa Name",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 18,
              label: "Visa Status",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "status",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.visastatus : "Y",
              },
              handle: (e) => setVisaStatus(handleBoolean(e.target.checked)),
              dataType: "string",
              dataCheck: visaStatus,
            },
            {
              id: 19,
              label: "Note",
              xl: 12,
              md: 12,
              xs: 12,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.visanotes : "",
              },
              handle: (e) => setVisaNotes(e.target.value),
              dataType: "string",
              dataCheck: visaNotes,
            },
            // ,
            // {
            //   id: 20,
            //   label: "Visa Number",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 21,
            //   label: "Visa Type",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     select: {
            //       status: "option",
            //       data: optiondata.map((option) => (
            //         <option
            //           style={headerTableStyle}
            //           key={option.value}
            //           value={option.value}
            //         >
            //           {option.label}
            //         </option>
            //       )),
            //     },
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 22,
            //   label: "Visa Status",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "status",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 23,
            //   label: "Visa Issue Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "date",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 24,
            //   label: "Visa Begin Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "date",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },

            // {
            //   id: 25,
            //   label: "Visa Expiration Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "date",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            {
              id: 20,
              label: "Rank",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.rank : "option1",
              },
              handle: (e) => setRank(e.target.value),
              dataType: "string",
              dataCheck: rank,
            },
            {
              id: 21,
              label: "Grade",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optiondata.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )),
                defaultvalue:
                  props.editdata != null ? props.editdata.grade : "option1",
              },
              handle: (e) => setGrade(e.target.value),
              dataType: "string",
              dataCheck: grade,
            },
            {
              id: 22,
              label: "Guest Identity",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                defaultvalue:
                  props.editdata != null ? props.editdata.guestidentity : "",
              },
              handle: (e) => setGuestIdentity(e.target.value),
              dataType: "string",
              dataCheck: guestIdentity,
            },
            // {
            //   id: 29,
            //   label: "Passport Type",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 30,
            //   label: "Passport Nationality",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 31,
            //   label: "Passport Number",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 32,
            //   label: "Passport Scan Name",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
            // {
            //   id: 33,
            //   label: "Passport Scan Date",
            //   xl: 2,
            //   md: 2,
            //   xs: 6,
            //   select: {
            //     status: "fill",
            //     data: "",
            //   },
            //   handle: (e) => handleData(e),
            // },
          ],
        },
      ]);
    }
    getconfig();
  }, [props.trigger]);

  const handleExpend = (id, expend) => {
    let index = list.findIndex((x) => x.id === id);
    console.log(Object.assign({}, list[index], { expend: !expend }));
    if (index === -1) return;
    else {
      let new_data = list[index];
      new_data.expend = !expend;
      setList([...list.slice(0, index), new_data, ...list.slice(index + 1)]);
    }
  };

  const handleAddAddress = async (id) => {
    console.log("handleAddAddress", id);
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let address = list[index];
      delete address.content[address.content.length - 1];
      let newid = await address.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      address.content.push(
        {
          id: newid + 1,
          label: "Address",
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "option",
            data: [
              { label: "Organisation" },
              { label: "Home" },
              { label: "Resident" },
            ].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
        },
        {
          id: newid + 2,
          label: "Address 1",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 3,
          label: "Address 2",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 4,
          label: "Choose a country",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: optioncountry.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 5,
          label: "City",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "option",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 6,
          label: "State / Province",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 7,
          label: "Postal",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: newid + 8,
          label: "",
          xl: 4,
          md: 4,
          xs: 4,
          select: {
            status: "offset",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 99,
          label: "AddAddress",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddAddress",
            data: "+ More Address",
          },
        }
      );
      setList([...list.slice(0, index), address, ...list.slice(index + 1)]);
    }
  };

  const handleAddComunication = async (id) => {
    console.log("handleAddComunication", id);
    let index = list.findIndex((x) => x.id === id);
    if (index === -1) return;
    else {
      let comunication = list[index];
      delete comunication.content[comunication.content.length - 1];
      let newid = await comunication.content.reduce(
        (acc, shot) => (acc = acc > shot.id ? acc : shot.id),
        0
      );
      console.log("optioncommunication2", optioncommunication);
      setCommunicationDatas((prev) => ({
        ...prev,
        [newid + 1]: "Telephone Number",
      }));
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
        xs: 2,
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
    }
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
        label: "Note",
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
        xs: 2,
        select: {
          status: "AddRelation",
          data: "+ More Relation",
        },
      });
      setList([...list.slice(0, index), relation, ...list.slice(index + 1)]);
    }
  };

  const convertTimeToString = (e) => {
    let dateNoTiome = e.toISOString();
    let T = dateNoTiome.split("T");
    // console.log(T);
    return T[0];
  };

  const handleBoolean = (e) => {
    if (e == true) {
      return "Y";
    } else return "N";
  };

  // const HanddleIsRequired = () => {
  //   console.log(setList);
  // };

  const handleData = async (e) => {
    // console.log("Value from handleData : ", e);
    // console.log("Value from handleData : ", e.target.value);
    console.log("Value from props.editdata : ", props.editdata);
    // console.log("idividualData==", individualData);
    // console.log(
    //   "setvalue check==",
    //   lastName == null || lastName == undefined || lastName == ""
    //     ? individualData.lastname
    //     : lastName
    // );

    console.table(
      "handleData : ",
      nameTitle,
      firstName,
      lastName,
      namePrefix,
      nameSuffix,
      middleInitial,
      gender,
      religion,
      organization,
      statusProfile,
      provinceOfResidence,
      borderCrossingEntryPlace,
      borderCrossingEntryDate,
      address,
      address1,
      address2,
      conuty,
      city,
      stateProvince,
      postal,
      noPost,
      NRG,
      guestCategory,
      VVIP,
      birthRegion,
      birthProvince,
      guestType,
      IDCheck,
      IDType,
      IDNumber,
      nationality,
      dateOfBirth,
      IDIssuedDate,
      IDExpirationDate,
      passportVisaCheck,
      visaType,
      visaName,
      visaNumber,
      visaIssuedDate,
      visaBeginDate,
      visaExpirationDate,
      visaStatus,
      visaNotes,
      rank,
      grade,
      guestIdentity
    );
  };

  const handleAddDatatoDatabase = async (e) => {
    console.log("handleAddDatatoDatabase")
    // let index = list.findIndex((x) => x.title == "Communication");
    // let communications = list[index];
    // delete communications.content[communications.content.length - 1];
    let indexRelation = list.findIndex((x) => x.title == "Relation");
    let relations = list[indexRelation];
    delete relations.content[relations.content.length - 1];
    let req = {
      nametitle: nameTitle,
      firstname: firstName,
      lastname: lastName,
      nameprefix: namePrefix,
      namesuffix: nameSuffix,
      middleinitial: middleInitial,
      gender: gender,
      religion: religion,
      statusprofile: statusProfile,
      organization: organization,
      provinceofresidence: provinceOfResidence,
      bordercrossingentryplace: borderCrossingEntryPlace,
      bordercrossingentrydate: borderCrossingEntryDate,
      address: address,
      address1: address1,
      address2: address2,
      conuty: conuty,
      city: city,
      stateprovince: stateProvince,
      postal: postal,
      nopost: noPost,
      nrg: NRG,
      guestcategory: guestCategory,
      vvip: VVIP,
      birthregion: birthRegion,
      birthprovince: birthProvince,
      guesttype: guestType,
      idcheck: IDCheck,
      idtype: IDType,
      idnumber: IDNumber,
      nationality: nationality,
      dateofbirth: dateOfBirth,
      idissueddate: IDIssuedDate,
      idexpirationdate: IDExpirationDate,
      passportvisacheck: passportVisaCheck,
      visatype: visaType,
      visaname: visaName,
      visanumber: visaNumber,
      visaissueddate: visaIssuedDate,
      visabegindate: visaBeginDate,
      visaexpirationdate: visaExpirationDate,
      visastatus: visaStatus,
      visanotes: visaNotes,
      rank: rank,
      grade: grade,
      guestidentity: guestIdentity,
      communications: communicationDatas,
      relations: relationDatas,
    };
    const data = await postIndividualProfile(
      sessionStorage.getItem("auth"),
      req
    );
    console.log("datafrom post", data);
  };

  const handleEditDatatoDatabase = async (e) => {
    let id = nameID;

    let req = {
      nametitle: nameTitle,
      firstname: firstName,
      lastname: lastName,
      nameprefix: namePrefix,
      namesuffix: nameSuffix,
      middleinitial: middleInitial,
      gender: gender,
      religion: religion,
      statusprofile: statusProfile,
      organization: organization,
      provinceofresidence: provinceOfResidence,
      bordercrossingentryplace: borderCrossingEntryPlace,
      bordercrossingentrydate: borderCrossingEntryDate,
      address: address,
      address1: address1,
      address2: address2,
      conuty: conuty,
      city: city,
      stateprovince: stateProvince,
      postal: postal,
      nopost: noPost,
      nrg: NRG,
      guestcategory: guestCategory,
      vvip: VVIP,
      birthregion: birthRegion,
      birthprovince: birthProvince,
      guesttype: guestType,
      idcheck: IDCheck,
      idtype: IDType,
      idnumber: IDNumber,
      nationality: nationality,
      dateofbirth: dateOfBirth,
      idissueddate: IDIssuedDate,
      idexpirationdate: IDExpirationDate,
      passportvisacheck: passportVisaCheck,
      visatype: visaType,
      visaname: visaName,
      visanumber: visaNumber,
      visaissueddate: visaIssuedDate,
      visabegindate: visaBeginDate,
      visaexpirationdate: visaExpirationDate,
      visastatus: visaStatus,
      visanotes: visaNotes,
      rank: rank,
      grade: grade,
      guestidentity: guestIdentity,
      communications: communicationDatas,
      relations: relationDatas,
    };
    const data = await updateIndividualProfile(
      sessionStorage.getItem("auth"),
      id,
      req
    );
    console.log("datafrom post", data);
  };

  //data from button for  trigger (add or delete)
  React.useEffect(() => {
    async function handlebutton() {
      if (props.action === "add") {
        //check is required in every field
        let _IsRequired =
          nameTitle === null ||
          nameTitle === "" ||
          firstName === " " ||
          firstName === null ||
          firstName === "" ||
          firstName === " " ||
          lastName === null ||
          lastName === "" ||
          lastName === " " ||
          namePrefix === null ||
          namePrefix === "" ||
          namePrefix === " " ||
          nameSuffix === null ||
          nameSuffix === "" ||
          nameSuffix === " " ||
          middleInitial === null ||
          middleInitial === "" ||
          middleInitial === " " ||
          gender === null ||
          gender === "" ||
          gender === " " ||
          religion === null ||
          religion === "" ||
          religion === " " ||
          organization === null ||
          organization === "" ||
          organization === " " ||
          statusProfile === null ||
          statusProfile === "" ||
          statusProfile === " " ||
          provinceOfResidence === null ||
          provinceOfResidence === "" ||
          provinceOfResidence === " " ||
          borderCrossingEntryPlace === null ||
          borderCrossingEntryPlace === "" ||
          borderCrossingEntryPlace === " " ||
          borderCrossingEntryDate === null ||
          borderCrossingEntryDate === "" ||
          borderCrossingEntryDate === " " ||
          address === null ||
          address === "" ||
          address === " " ||
          address1 === null ||
          address1 === "" ||
          address1 === " " ||
          address2 === null ||
          address2 === "" ||
          address2 === " " ||
          conuty === null ||
          conuty === "" ||
          conuty === " " ||
          city === null ||
          city === "" ||
          city === " " ||
          stateProvince === null ||
          stateProvince === "" ||
          stateProvince === " " ||
          postal === null ||
          postal === "" ||
          postal === " " ||
          noPost === null ||
          noPost === "" ||
          noPost === " " ||
          NRG === null ||
          NRG === "" ||
          NRG === " " ||
          guestCategory === null ||
          guestCategory === "" ||
          guestCategory === " " ||
          VVIP === null ||
          VVIP === "" ||
          VVIP === " " ||
          birthRegion === null ||
          birthRegion === "" ||
          birthRegion === " " ||
          birthProvince === null ||
          birthProvince === "" ||
          birthProvince === " " ||
          guestType === null ||
          guestType === "" ||
          guestType === " " ||
          IDCheck === null ||
          IDCheck === "" ||
          IDCheck === " " ||
          IDType === null ||
          IDType === "" ||
          IDType === " " ||
          IDNumber === null ||
          IDNumber === "" ||
          IDNumber === " " ||
          nationality === null ||
          nationality === "" ||
          nationality === " " ||
          dateOfBirth === null ||
          dateOfBirth === "" ||
          dateOfBirth === " " ||
          IDIssuedDate === null ||
          IDIssuedDate === "" ||
          IDIssuedDate === " " ||
          IDExpirationDate === null ||
          IDExpirationDate === "" ||
          IDExpirationDate === " " ||
          passportVisaCheck === null ||
          passportVisaCheck === "" ||
          passportVisaCheck === " " ||
          visaType === null ||
          visaType === "" ||
          visaType === " " ||
          visaName === null ||
          visaName === "" ||
          visaName === " " ||
          visaNumber === null ||
          visaNumber === "" ||
          visaNumber === " " ||
          visaIssuedDate === null ||
          visaIssuedDate === "" ||
          visaIssuedDate === " " ||
          visaBeginDate === null ||
          visaBeginDate === "" ||
          visaBeginDate === " " ||
          visaExpirationDate === null ||
          visaExpirationDate === "" ||
          visaExpirationDate === " " ||
          visaStatus === null ||
          visaStatus === "" ||
          visaStatus === " " ||
          visaNotes === null ||
          visaNotes === "" ||
          visaNotes === " " ||
          rank === null ||
          rank === "" ||
          rank === " " ||
          grade === null ||
          grade === "" ||
          grade === " " ||
          guestIdentity === null ||
          guestIdentity === "" ||
          guestIdentity === " ";
        console.log("_IsRequired", _IsRequired);
        console.log("action add", props.action);
        await props.handleRedirectToTableIndividual(false);
        if (_IsRequired === false) {
          await setIsRequired(false);
          await handleAddDatatoDatabase();
          await props.handleRedirectToTableIndividual(true);
        } else {
          setIsRequired(true);
        }
      } else if (props.action === "edit") {
        await handleEditDatatoDatabase();
        await props.handleRedirectToTableIndividual(true);
        console.log("action edit", props.action);
      }
    }
    handlebutton();
  }, [props.trigger]);

  // const handleValidation = (dataV) => {
  //   if (dataV == null || dataV == "" || dataV == " ") {
  //     console.log("dataV", dataV);
  //     // return true;
  //   } else {
  //     console.log("dataV not null ", dataV);
  //     // return false;
  //   }
  // };

  // data from button for  trigger (add or delete)
  // React.useEffect(() => {
  //   console.log("props.editdata.nameid", props.editdata.nameid);
  //   async function fetchdDtaforEdit() {
  //     var individualdata = await getIndividualProfileById(
  //       sessionStorage.getItem("auth"),
  //       props.editdata.nameid
  //     );
  //     console.log("individualdata for edit :", individualdata);
  //     setIndividualData(individualdata.content[0]);
  //   }
  //   fetchdDtaforEdit();
  // }, []);

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
              <Container
                maxWidth="xl"
                disableGutters
                style={{ marginTop: 10, backgroundColor: themeState.paper }}
                ref={provided.innerRef}
              >
                {/* <Button
                  variant="contained"
                  color="default"
                  onClick={() => handleData()}
                >
                  TestData
                </Button> */}
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
                        {item.title == "Personal" ? null : (
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
                        )}
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
                                {detail.select.status == "offset" ? (
                                  <div />
                                ) : detail.select.status === "status" ? (
                                  <div style={{ paddingTop: 10 }}>
                                    <a>Status</a>
                                    {detail.select.defaultvalue == "Y" ? (
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
                                ) : detail.select.status === "AddRelation" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    noWrap
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddRelation(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
                                ) : detail.select.status === "AddAddress" ? (
                                  <Button
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "blue",
                                      color: "white",
                                    }}
                                    value={detail.select.data}
                                    onClick={() => handleAddAddress(item.id)}
                                  >
                                    {detail.select.data}
                                  </Button>
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
                                ) : detail.select.status === "fix" ? (
                                  <TextField
                                    className={classes.root}
                                    variant="outlined"
                                    fullWidth
                                    style={{
                                      backgroundColor: "#EFEFEF",
                                      borderColor: "white",
                                    }}
                                    // disabled={true}
                                    value={detail.select.data}
                                    defaultValue={detail.select.defaultvalue}
                                    onFocus={false}
                                  />
                                ) : // <TextField
                                //   className={classes.root}
                                //   variant="outlined"
                                //   label={detail.select.defaultvalue}
                                //   fullWidth
                                //   style={{
                                //     backgroundColor: "#EFEFEF",
                                //     borderColor: "white",
                                //   }}
                                //   // disabled={true}
                                //   value={detail.select.defaultvalue}
                                //   defaultValue={detail.select.defaultvalue}
                                //   onFocus={false}
                                // />
                                detail.select.status === "fillnolabel" ? (
                                  <TextField
                                    // error={handleValidation(detail.dataCheck)}
                                    // error={
                                    //   detail.dataCheck == null ||
                                    //   detail.dataCheck == ""
                                    //     ? true
                                    //     : false
                                    // }
                                    // helperText={
                                    //   detail.dataCheck == null ||
                                    //   detail.dataCheck == ""
                                    //     ? "This ib formation can't null"
                                    //     : false
                                    // }
                                    // required={true}
                                    type={detail.datatype}
                                    className={classes.root}
                                    // label={detail.label}
                                    variant="outlined"
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    noWrap
                                    InputLabelProps={{
                                      style: { color: "#AAAAAA" },
                                    }}
                                    fullWidth
                                    defaultValue={detail.select.defaultvalue}
                                    onChange={detail.handle}
                                  />
                                ) : detail.select.status === "fill" ? (
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
                                    // value={detail.select.defaultvalue}
                                    onChange={detail.handle}
                                    textOverflow="ellipsis"

                                    // InputLabelProps={{style: {overflow: "hidden", textOverflow: "ellipsis", width: '3rem',whiteSpace:"nowrap"}}}
                                  >
                                    {detail.select.data}
                                  </TextField>
                                ) : detail.select.status === "check" ? (
                                  [
                                    detail.select.defaultvalue === "Y" ||
                                    detail.select.defaultvalue === true ? (
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
                                    ),
                                  ]
                                ) : (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.root}
                                      label={detail.label}
                                      inputVariant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      format="dd/MM/yyyy"
                                      value={detail.select.data}
                                      onChange={detail.handle}
                                      fullWidth
                                      defaultValue={detail.select.defaultvalue}
                                    />
                                  </MuiPickersUtilsProvider>
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
    handleRedirectToTableIndividual: (status) => {
      return dispatch(actions.editRedirectToTableIndividual(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndividual);