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
import TestDnD from "./TestDnD";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Breadcrumbs, Link } from "@material-ui/core";

import { nextComponent } from "../../middleware/action";
import DateFnsUtils from "@date-io/date-fns";
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

const optioncountry = [
  {
    "label": "Thailand",
    "nationality": "Thai"
  },
  {
    "label": "China",
    "nationality": "Chinese"
  },
  {
    "label": "Peru",
    "nationality": "Peruvian"
  },
  {
    "label": "Brazil",
    "nationality": "Brazilian"
  },
  {
    "label": "Libya",
    "nationality": "Libyan"
  },
  {
    "label": "San Marino",
    "nationality": "Sammarinese"
  },
  {
    "label": "Malaysia",
    "nationality": "Malaysian"
  },
  {
    "label": "Paraguay",
    "nationality": "Paraguayan"
  },
  {
    "label": "Namibia",
    "nationality": "Namibian"
  },
  {
    "label": "Slovakia",
    "nationality": "Slovak"
  },
  {
    "label": "Honduras",
    "nationality": "Honduran"
  },
  {
    "label": "Uganda",
    "nationality": "Ugandan"
  },
  {
    "label": "Indonesia",
    "nationality": "Indonesian"
  },
  {
    "label": "South Georgia and the South Sandwich Islands",
    "nationality": "South Georgia and the South Sandwich Islander"
  },
  {
    "label": "Yemen",
    "nationality": "Yemeni"
  },
  {
    "label": "Azerbaijan",
    "nationality": "Azerbaijani"
  },
  {
    "label": "Israel",
    "nationality": "Israeli"
  },
  {
    "label": "Singapore",
    "nationality": "Singaporean"
  },
  {
    "label": "United Arab Emirates",
    "nationality": "Emirati"
  },
  {
    "label": "Bolivia (Plurinational State of)",
    "nationality": "Bolivian"
  },
  {
    "label": "Ireland",
    "nationality": "Irish"
  },
  {
    "label": "Central African Republic",
    "nationality": "Central African"
  },
  {
    "label": "French Polynesia",
    "nationality": "French Polynesian"
  },
  {
    "label": "Grenada",
    "nationality": "Grenadian"
  },
  {
    "label": "Guinea-Bissau",
    "nationality": "Guinea-Bissauan"
  },
  {
    "label": "Nepal",
    "nationality": "Nepalese"
  },
  {
    "label": "Panama",
    "nationality": "Panamanian"
  },
  {
    "label": "Burkina Faso",
    "nationality": "Burkinabe"
  },
  {
    "label": "Cambodia",
    "nationality": "Cambodian"
  },
  {
    "label": "Uzbekistan",
    "nationality": "Uzbekistani"
  },
  {
    "label": "Anguilla",
    "nationality": "Anguillian"
  },
  {
    "label": "Korea (Republic of)",
    "nationality": "South Korean"
  },
  {
    "label": "Curaçao",
    "nationality": "Curaçaoan"
  },
  {
    "label": "Wallis and Futuna",
    "nationality": "Wallis and Futuna Islander"
  },
  {
    "label": "Myanmar",
    "nationality": "Burmese"
  },
  {
    "label": "Egypt",
    "nationality": "Egyptian"
  },
  {
    "label": "Gambia",
    "nationality": "Gambian"
  },
  {
    "label": "Saudi Arabia",
    "nationality": "Saudi Arabian"
  },
  {
    "label": "Argentina",
    "nationality": "Argentinean"
  },
  {
    "label": "Canada",
    "nationality": "Canadian"
  },
  {
    "label": "Montenegro",
    "nationality": "Montenegrin"
  },
  {
    "label": "United States of America",
    "nationality": "American"
  },
  {
    "label": "Cook Islands",
    "nationality": "Cook Islander"
  },
  {
    "label": "Macao",
    "nationality": "Macanese"
  },
  {
    "label": "Cocos (Keeling) Islands",
    "nationality": "Cocos Islander"
  },
  {
    "label": "Saint Lucia",
    "nationality": "Saint Lucian"
  },
  {
    "label": "Cyprus",
    "nationality": "Cypriot"
  },
  {
    "label": "Iceland",
    "nationality": "Icelander"
  },
  {
    "label": "Côte d'Ivoire",
    "nationality": "Ivorian"
  },
  {
    "label": "Bangladesh",
    "nationality": "Bangladeshi"
  },
  {
    "label": "Bhutan",
    "nationality": "Bhutanese"
  },
  {
    "label": "Saint Kitts and Nevis",
    "nationality": "Kittian and Nevisian"
  },
  {
    "label": "Finland",
    "nationality": "Finnish"
  },
  {
    "label": "Macedonia (the former Yugoslav Republic of)",
    "nationality": "Macedonian"
  },
  {
    "label": "Qatar",
    "nationality": "Qatari"
  },
  {
    "label": "Sudan",
    "nationality": "Sudanese"
  },
  {
    "label": "Isle of Man",
    "nationality": "Manx"
  },
  {
    "label": "Latvia",
    "nationality": "Latvian"
  },
  {
    "label": "Timor-Leste",
    "nationality": "East Timorese"
  },
  {
    "label": "Sao Tome and Principe",
    "nationality": "Sao Tomean"
  },
  {
    "label": "Sweden",
    "nationality": "Swedish"
  },
  {
    "label": "Martinique",
    "nationality": "Martinican"
  },
  {
    "label": "Sierra Leone",
    "nationality": "Sierra Leonean"
  },
  {
    "label": "South Africa",
    "nationality": "South African"
  },
  {
    "label": "Tanzania, United Republic of",
    "nationality": "Tanzanian"
  },
  {
    "label": "Costa Rica",
    "nationality": "Costa Rican"
  },
  {
    "label": "Iran (Islamic Republic of)",
    "nationality": "Iranian"
  },
  {
    "label": "Dominican Republic",
    "nationality": "Dominican"
  },
  {
    "label": "Nigeria",
    "nationality": "Nigerian"
  },
  {
    "label": "Palestine, State of",
    "nationality": "Palestinian"
  },
  {
    "label": "Bosnia and Herzegovina",
    "nationality": "Bosnian, Herzegovinian"
  },
  {
    "label": "Cayman Islands",
    "nationality": "Caymanian"
  },
  {
    "label": "Maldives",
    "nationality": "Maldivan"
  },
  {
    "label": "Japan",
    "nationality": "Japanese"
  },
  {
    "label": "Chad",
    "nationality": "Chadian"
  },
  {
    "label": "Guinea",
    "nationality": "Guinean"
  },
  {
    "label": "Madagascar",
    "nationality": "Malagasy"
  },
  {
    "label": "Italy",
    "nationality": "Italian"
  },
  {
    "label": "Jordan",
    "nationality": "Jordanian"
  },
  {
    "label": "Liechtenstein",
    "nationality": "Liechtensteiner"
  },
  {
    "label": "Mongolia",
    "nationality": "Mongolian"
  },
  {
    "label": "Tonga",
    "nationality": "Tongan"
  },
  {
    "label": "Ecuador",
    "nationality": "Ecuadorean"
  },
  {
    "label": "Guam",
    "nationality": "Guamanian"
  },
  {
    "label": "Kuwait",
    "nationality": "Kuwaiti"
  },
  {
    "label": "Kyrgyzstan",
    "nationality": "Kirghiz"
  },
  {
    "label": "Mauritius",
    "nationality": "Mauritian"
  },
  {
    "label": "Åland Islands",
    "nationality": "Ålandish"
  },
  {
    "label": "Bahrain",
    "nationality": "Bahraini"
  },
  {
    "label": "Mexico",
    "nationality": "Mexican"
  },
  {
    "label": "Poland",
    "nationality": "Polish"
  },
  {
    "label": "Chile",
    "nationality": "Chilean"
  },
  {
    "label": "Djibouti",
    "nationality": "Djibouti"
  },
  {
    "label": "Ethiopia",
    "nationality": "Ethiopian"
  },
  {
    "label": "Mauritania",
    "nationality": "Mauritanian"
  },
  {
    "label": "Korea (Democratic People's Republic of)",
    "nationality": "North Korean"
  },
  {
    "label": "Swaziland",
    "nationality": "Swazi"
  },
  {
    "label": "Aruba",
    "nationality": "Aruban"
  },
  {
    "label": "Austria",
    "nationality": "Austrian"
  },
  {
    "label": "Haiti",
    "nationality": "Haitian"
  },
  {
    "label": "Portugal",
    "nationality": "Portuguese"
  },
  {
    "label": "Vanuatu",
    "nationality": "Ni-Vanuatu"
  },
  {
    "label": "Christmas Island",
    "nationality": "Christmas Island"
  },
  {
    "label": "Colombia",
    "nationality": "Colombian"
  },
  {
    "label": "Cuba",
    "nationality": "Cuban"
  },
  {
    "label": "French Guiana",
    "nationality": "French Guianese"
  },
  {
    "label": "Afghanistan",
    "nationality": "Afghan"
  },
  {
    "label": "Brunei Darussalam",
    "nationality": "Bruneian"
  },
  {
    "label": "Jamaica",
    "nationality": "Jamaican"
  },
  {
    "label": "Moldova (Republic of)",
    "nationality": "Moldovan"
  },
  {
    "label": "France",
    "nationality": "French"
  },
  {
    "label": "Kenya",
    "nationality": "Kenyan"
  },
  {
    "label": "Oman",
    "nationality": "Omani"
  },
  {
    "label": "Albania",
    "nationality": "Albanian"
  },
  {
    "label": "Cabo Verde",
    "nationality": "Cape Verdian"
  },
  {
    "label": "Turkey",
    "nationality": "Turkish"
  },
  {
    "label": "Zimbabwe",
    "nationality": "Zimbabwean"
  },
  {
    "label": "Algeria",
    "nationality": "Algerian"
  },
  {
    "label": "Niger",
    "nationality": "Nigerien"
  },
  {
    "label": "Hungary",
    "nationality": "Hungarian"
  },
  {
    "label": "Spain",
    "nationality": "Spanish"
  },
  {
    "label": "Germany",
    "nationality": "German"
  },
  {
    "label": "Guatemala",
    "nationality": "Guatemalan"
  },
  {
    "label": "Mozambique",
    "nationality": "Mozambican"
  },
  {
    "label": "Palau",
    "nationality": "Palauan"
  },
  {
    "label": "Lesotho",
    "nationality": "Mosotho"
  },
  {
    "label": "Marshall Islands",
    "nationality": "Marshallese"
  },
  {
    "label": "Suriname",
    "nationality": "Surinamer"
  },
  {
    "label": "Guyana",
    "nationality": "Guyanese"
  },
  {
    "label": "Sri Lanka",
    "nationality": "Sri Lankan"
  },
  {
    "label": "Lebanon",
    "nationality": "Lebanese"
  },
  {
    "label": "Mayotte",
    "nationality": "Mahoran"
  },
  {
    "label": "Samoa",
    "nationality": "Samoan"
  },
  {
    "label": "Solomon Islands",
    "nationality": "Solomon Islander"
  },
  {
    "label": "Denmark",
    "nationality": "Danish"
  },
  {
    "label": "Kiribati",
    "nationality": "I-Kiribati"
  },
  {
    "label": "Switzerland",
    "nationality": "Swiss"
  },
  {
    "label": "Lithuania",
    "nationality": "Lithuanian"
  },
  {
    "label": "Somalia",
    "nationality": "Somali"
  },
  {
    "label": "Norfolk Island",
    "nationality": "Norfolk Islander"
  },
  {
    "label": "Taiwan",
    "nationality": "Taiwanese"
  },
  {
    "label": "Ghana",
    "nationality": "Ghanaian"
  },
  {
    "label": "New Zealand",
    "nationality": "New Zealander"
  },
  {
    "label": "Senegal",
    "nationality": "Senegalese"
  },
  {
    "label": "Togo",
    "nationality": "Togolese"
  },
  {
    "label": "Zambia",
    "nationality": "Zambian"
  },
  {
    "label": "Belarus",
    "nationality": "Belarusian"
  },
  {
    "label": "Saint Vincent and the Grenadines",
    "nationality": "Saint Vincentian"
  },
  {
    "label": "El Salvador",
    "nationality": "Salvadoran"
  },
  {
    "label": "Norway",
    "nationality": "Norwegian"
  },
  {
    "label": "Malta",
    "nationality": "Maltese"
  },
  {
    "label": "Nicaragua",
    "nationality": "Nicaraguan"
  },
  {
    "label": "Australia",
    "nationality": "Australian"
  },
  {
    "label": "Luxembourg",
    "nationality": "Luxembourger"
  },
  {
    "label": "Pakistan",
    "nationality": "Pakistani"
  },
  {
    "label": "Saint Helena, Ascension and Tristan da Cunha",
    "nationality": "Saint Helenian"
  },
  {
    "label": "Turks and Caicos Islands",
    "nationality": "Turks and Caicos Islander"
  },
  {
    "label": "Western Sahara",
    "nationality": "Sahrawi"
  },
  {
    "label": "Belgium",
    "nationality": "Belgian"
  },
  {
    "label": "Eritrea",
    "nationality": "Eritrean"
  },
  {
    "label": "Seychelles",
    "nationality": "Seychellois"
  },
  {
    "label": "Antigua and Barbuda",
    "nationality": "Antiguan, Barbudan"
  },
  {
    "label": "Liberia",
    "nationality": "Liberian"
  },
  {
    "label": "Tuvalu",
    "nationality": "Tuvaluan"
  },
  {
    "label": "Bermuda",
    "nationality": "Bermudian"
  },
  {
    "label": "Cameroon",
    "nationality": "Cameroonian"
  },
  {
    "label": "Saint Pierre and Miquelon",
    "nationality": "Saint-Pierrais"
  },
  {
    "label": "Ukraine",
    "nationality": "Ukrainian"
  },
  {
    "label": "Georgia",
    "nationality": "Georgian"
  },
  {
    "label": "Netherlands",
    "nationality": "Dutch"
  },
  {
    "label": "Mali",
    "nationality": "Malian"
  },
  {
    "label": "Niue",
    "nationality": "Niuean"
  },
  {
    "label": "Puerto Rico",
    "nationality": "Puerto Rican"
  },
  {
    "label": "United Kingdom of Great Britain and Northern Ireland",
    "nationality": "British"
  },
  {
    "label": "Armenia",
    "nationality": "Armenian"
  },
  {
    "label": "Greenland",
    "nationality": "Greenlandic"
  },
  {
    "label": "Kazakhstan",
    "nationality": "Kazakhstani"
  },
  {
    "label": "Réunion",
    "nationality": "Réunionese"
  },
  {
    "label": "Saint Martin (French part)",
    "nationality": "Saint Martin Islander"
  },
  {
    "label": "Belize",
    "nationality": "Belizean"
  },
  {
    "label": "Greece",
    "nationality": "Greek"
  },
  {
    "label": "Trinidad and Tobago",
    "nationality": "Trinidadian"
  },
  {
    "label": "Benin",
    "nationality": "Beninese"
  },
  {
    "label": "Tajikistan",
    "nationality": "Tadzhik"
  },
  {
    "label": "Czech Republic",
    "nationality": "Czech"
  },
  {
    "label": "India",
    "nationality": "Indian"
  },
  {
    "label": "Lao People's Democratic Republic",
    "nationality": "Laotian"
  },
  {
    "label": "Syrian Arab Republic",
    "nationality": "Syrian"
  },
  {
    "label": "Turkmenistan",
    "nationality": "Turkmen"
  },
  {
    "label": "Botswana",
    "nationality": "Motswana"
  },
  {
    "label": "Virgin Islands (British)",
    "nationality": "Virgin Islander (British)"
  },
  {
    "label": "American Samoa",
    "nationality": "American Samoan"
  },
  {
    "label": "Guadeloupe",
    "nationality": "Guadeloupian"
  },
  {
    "label": "New Caledonia",
    "nationality": "New Caledonian"
  },
  {
    "label": "Viet Nam",
    "nationality": "Vietnamese"
  },
  {
    "label": "Comoros",
    "nationality": "Comoran"
  },
  {
    "label": "Micronesia (Federated States of)",
    "nationality": "Micronesian"
  },
  {
    "label": "Burundi",
    "nationality": "Burundian"
  },
  {
    "label": "Morocco",
    "nationality": "Moroccan"
  },
  {
    "label": "Saint Barthélemy",
    "nationality": "Saint Barthélemy Islander"
  },
  {
    "label": "Barbados",
    "nationality": "Barbadian"
  },
  {
    "label": "Virgin Islands (U.S.)",
    "nationality": "Virgin Islander (U.S.)"
  },
  {
    "label": "Iraq",
    "nationality": "Iraqi"
  },
  {
    "label": "Papua New Guinea",
    "nationality": "Papua New Guinean"
  },
  {
    "label": "Equatorial Guinea",
    "nationality": "Equatorial Guinean"
  },
  {
    "label": "Gabon",
    "nationality": "Gabonese"
  },
  {
    "label": "Uruguay",
    "nationality": "Uruguayan"
  },
  {
    "label": "Monaco",
    "nationality": "Monegasque"
  },
  {
    "label": "Tunisia",
    "nationality": "Tunisian"
  },
  {
    "label": "Fiji",
    "nationality": "Fijian"
  },
  {
    "label": "Rwanda",
    "nationality": "Rwandan"
  },
  {
    "label": "Angola",
    "nationality": "Angolan"
  },
  {
    "label": "Falkland Islands (Malvinas)",
    "nationality": "Falkland Islander"
  },
  {
    "label": "Serbia",
    "nationality": "Serbian"
  },
  {
    "label": "Slovenia",
    "nationality": "Slovenian"
  },
  {
    "label": "Congo (Democratic Republic of the)",
    "nationality": "Congolese (Democratic Republic)"
  },
  {
    "label": "Malawi",
    "nationality": "Malawian"
  },
  {
    "label": "Venezuela (Bolivarian Republic of)",
    "nationality": "Venezuelan"
  },
  {
    "label": "Bulgaria",
    "nationality": "Bulgarian"
  },
  {
    "label": "Hong Kong",
    "nationality": "Hong Kongese"
  },
  {
    "label": "Gibraltar",
    "nationality": "Gibraltar"
  },
  {
    "label": "South Sudan",
    "nationality": "South Sudanese"
  },
  {
    "label": "Nauru",
    "nationality": "Nauruan"
  },
  {
    "label": "Pitcairn",
    "nationality": "Pitcairn Islander"
  },
  {
    "label": "Russian Federation",
    "nationality": "Russian"
  },
  {
    "label": "Andorra",
    "nationality": "Andorran"
  },
  {
    "label": "Faroe Islands",
    "nationality": "Faroese"
  },
  {
    "label": "Congo",
    "nationality": "Congolese"
  },
  {
    "label": "Croatia",
    "nationality": "Croatian"
  },
  {
    "label": "Montserrat",
    "nationality": "Montserratian"
  },
  {
    "label": "Philippines",
    "nationality": "Filipino"
  },
  {
    "label": "Republic of Kosovo",
    "nationality": "Kosovar"
  },
  {
    "label": "Romania",
    "nationality": "Romanian"
  },
  {
    "label": "Tokelau",
    "nationality": "Tokelauan"
  },
  {
    "label": "Bahamas",
    "nationality": "Bahamian"
  },
  {
    "label": "Estonia",
    "nationality": "Estonian"
  }
]

const optioncurrency = [
  {
    value: "1",
    label: "Baht ฿",
  },
  {
    value: "2",
    label: "Dollar $",
  }
]

const optioncreditrating = [
  {
    value: "1",
    label: "5",
  },
  {
    value: "2",
    label: "4",
  }, {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "2",
  }, {
    value: "5",
    label: "1",
  }
]

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
  }
];


const optioncommunication = [
  // {
  //   value: "Telephone",
  //   label: "Telephone Number",
  // },
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
  }
];

export const ProfileCompany = (props) => {
  const { store } = useContext(ReactReduxContext);
  const [action, setAction] = React.useState(props.action);


  React.useEffect(()=>{
   console.log("props.action:",props.action);
  },[props.action])
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

  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);
  }, []);

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };

 
  const [name1, setname1] = useState("");
  const [name2, setname2] = React.useState("");
  const [CompanyTypeCode, setCompanyTypeCode] = React.useState("");
  const [Abbreviation, setAbbreviation] = React.useState("");
  const [GuaranteeMethodCode, setGuaranteeMethodCode] = React.useState("");
  const [Property, setProperty] = React.useState("");
  const [Currency, setCurrency] = React.useState("");
  const [CreditRating, setCreditRating] = React.useState("");
  const [IATA, setIATA] = React.useState("");
  const [Status, setStatus] = React.useState("");
  const [StreetAddress, setStreetAddress] = React.useState("");
  const [Chooseacountry, setChooseacountry] = React.useState("");
  const [City, setCity] = React.useState("");
  const [State, setState] = React.useState("");
  const [Postal, setPostal] = React.useState("");
  const [BStreetAddress, setBStreetAddress] = React.useState("");
  const [BChooseacountry, setBChooseacountry] = React.useState("");
  const [BCity, setBCity] = React.useState("");
  const [BState, setBState] = React.useState("");
  const [BPostal, setBPostal] = React.useState("");
  const [TaxID, setTaxID] = React.useState("");
  const [TaxID2, setTaxID2] = React.useState("");
  const [Communication, setCommunication] = React.useState("");
  const [Relationship, setRelationship] = React.useState("");
  const [CreditCardNumber, setCreditCardNumber] = React.useState("");
  const [OutstandingAmount, setOutstandingAmount] = React.useState("");
  const [FloatingDepositionAmount, setFloatingDepositionAmount] = React.useState("");
  const [ARNumber, setARNumber] = React.useState("");
  const [SalesUserName, setSalesUserName] = React.useState("");
  const [Industry, setIndustry] = React.useState("");
  const [MarketSegment, setMarketSegment] = React.useState("");
  const [SourceOfBusiness, setSourceOfBusiness] = React.useState("");
  const [TrackCode, setTrackCode] = React.useState("");
  const [ReasonForStay, setReasonForStay] = React.useState("");
  const [Geographic, setGeographic] = React.useState("");



  React.useEffect(() => {
    console.log("name1:",name1);
 },[name1])

 React.useEffect(() => {
  console.log("name2:",name2);
},[name2])

  const [demoData, setDemoData] = React.useState([
    {
      id: "1",
      title: "Account",
      expend: true,
      content: [
        {
          id: 3,
          label: "Name 1",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: " "
          },
          handle: (e) => setname1(e.target.value),
        },
        {
          id: 4,
          label: "Name 2",
          xl: 5,
          md: 5,
          xs: 12,
          select: {
            status: "fill",
            data: " ",
          },
          handle: (e) => setname2(e.target.value),
        },
        {
          id: 7,
          label: "CompanyTypeCode",
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "option",
            data: [{ label: "Government" }, { label: "Association" }].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: "Abbreviation",
          xl: 4,
          md: 4,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 6,
          label: "Guarantee Method Code",
          xl: 4,
          md: 4,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 7,
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: "Choose a country",
          xl: 3,
          md: 6,
          xs: 12,
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
          id: 6,
          label: "City",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: "Choose a country",
          xl: 3,
          md: 6,
          xs: 12,
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
          id: 6,
          label: "City",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
        },
        {
          id: 8,
          label: "TaxID",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 8,
          label: "TaxID2",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
    {
      id: "4",
      title: "Communication",
      expend: true,
      content: [
        {
          id: 99,
          label: "Phone Number",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddComunication",
            data: "+ Add",
          }
        }
      ],
    },
    {
      id: "5",
      title: "Relationship (Internal)",
      expend: true,
      content: [
        {
          id: 99,
          label: "Relation",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddRelation",
            data: "+ Add",
          },
          // handle: (e) => handleAddComunication(e),
        }
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
            data: ""
          },
          handle: (e) => handleData(e),
        },
        {
          id: 3,
          label: "Outstanding Amount",
          xl: 3,
          md: 3,
          xs: 12,
          select: {
            status: "fill",
            data: ""
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          }
        },
        {
          id: 2,
          label: "Industry",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: [{ label: "Insurrance" }, { label: "Government" }, { label: "Educcation" }].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
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
            status:  "option",
            data:[{ label: "Code1" }, { label: "Code2" }].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: "Source Of Business",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status:  "option",
            data:[{ label: "Code1" }, { label: "Code2" }].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
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
          },
          handle: (e) => handleData(e),
        },
        {
          id: 8,
          label: "Geographic",
          xl: 3,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: [{ label: "SEA" }, { label: "EUROPE" }, { label: "CHINA" }, { label: "AFRICA" }].map((option) => (
              <option
                style={headerTableStyle}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            )),
          }
        }
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
      ]
    },
  ]);
  const [list, setList] = React.useState(demoData);
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

 

  
  const handleData = (e) => {
    try {
      
      console.log("handleDataname1 : ", name1);
    } catch (error) {
      console.log("::::",error);
    }
  
  };
  
  const handleData1 = (e) => {
    console.log("checkfield1:",e.target.value);
   
    // if("name1" == checkfield){
    //   setname1(e.target.value)
    //   console.log("name : ", name1);
    // }
  };

  const handleExpend = (id, expend) => {
    let index = demoData.findIndex((x) => x.id === id);
    console.log(Object.assign({}, demoData[index], { expend: !expend }));
    if (index === -1) return;
    else {
      let new_data = demoData[index];
      new_data.expend = !expend;
      setDemoData([
        ...demoData.slice(0, index),
        new_data,
        ...demoData.slice(index + 1),
      ]);
    }
  };


  const handleAddComunication = async (id) => {

    let index = demoData.findIndex(x => x.id === id);
    if (index === -1) return;
    else {
      let comunication = demoData[index];
      delete comunication.content[comunication.content.length - 1];
      let newid = await comunication.content.reduce((acc, shot) => acc = acc > shot.id ? acc : shot.id, 0);
      comunication.content.push(
        {
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
          handle: (e) => handleData(e),
        })
      comunication.content.push(
        {
          id: newid + 2,
          label: "communication",
          xl: 9,
          md: 9,
          xs: 6,
          select: {
            status: "fillnolabel",
            data: "",
          },
          handle: (e) => handleData(e),
        })
      comunication.content.push(
        {
          id: 99,
          label: "AddComunication",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddComunication",
            data: "+ Add",
          }
        })
      setDemoData([
        ...demoData.slice(0, index),
        comunication,
        ...demoData.slice(index + 1)
      ]);
    }
  };


  const handleAddRelation = async (id) => {

    let index = demoData.findIndex(x => x.id === id);
    if (index === -1) return;
    else {
      let relation = demoData[index];
      delete relation.content[relation.content.length - 1];
      let newid = await relation.content.reduce((acc, shot) => acc = acc > shot.id ? acc : shot.id, 0);
      relation.content.push(
        {
          id: newid + 1,
          label: "Name",
          xl: 4,
          md: 4,
          xs: 6,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        })
      relation.content.push(
        {
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
          handle: (e) => handleData(e),
        })
      relation.content.push(
        {
          id: newid + 3,
          label: "Notes",
          xl: 6,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        })
      relation.content.push(
        {
          id: 99,
          label: "AddRelation",
          xl: 2,
          md: 2,
          xs: 6,
          select: {
            status: "AddRelation",
            data: "+ Add",
          }
        })
      setDemoData([
        ...demoData.slice(0, index),
        relation,
        ...demoData.slice(index + 1)
      ]);
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
              <Container maxWidth="xl">
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
              </Container>
              <Divider
                style={{ marginTop: 10, backgroundColor: themeState.color }}
              />
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
                                {
                                  detail.select.status === "status" ? (
                                    <div style={{ paddingTop: 10 }}>
                                      <a>Status</a>
                                      <Switch
                                        defaultChecked={true}
                                        color="primary"
                                        onChange={(e) => { }}
                                      />
                                    </div>
                                  ) : detail.select.status === "AddComunication" ? (
                                    <Button
                                      className={classes.root}
                                      variant="outlined"
                                      fullWidth
                                      style={{ backgroundColor: "blue", color: "white" }}
                                      value={detail.select.data}
                                      onClick={() => handleAddComunication(item.id)}
                                    >+ Add</Button>
                                  ) : detail.select.status === "fillnolabel" ? (
                                    <TextField
                                      className={classes.root}
                                      // label={detail.label}
                                      variant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      InputLabelProps={{
                                        style: { color: "#AAAAAA" }
                                      }}
                                      fullWidth
                                      onChange={detail.handle}
                                    />
                                  ) : detail.select.status === "AddRelation" ? (
                                    <Button
                                      className={classes.root}
                                      variant="outlined"
                                      fullWidth
                                      style={{ backgroundColor: "blue", color: "white" }}
                                      value={detail.select.data}
                                      onClick={() => handleAddRelation(item.id)}
                                    >+ Add</Button>
                                  ) : detail.select.status === "fix" ? (
                                    <TextField
                                      className={classes.root}
                                      variant="outlined"
                                      fullWidth
                                      style={{ backgroundColor: "#EEEEEE" }}
                                      // disabled={true}
                                      value={detail.select.data}
                                      onFocus={false}
                                    />
                                  ) : detail.select.status === "fill" ? (
                                    <TextField
                                      className={classes.root}
                                      label={detail.label}
                                      variant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      InputLabelProps={{
                                        style: { color: "#AAAAAA" }
                                      }}
                                      fullWidth
                                      onChange={detail.handle}
                                    />
                                  ) : detail.select.status === "option" ? (
                                    <TextField
                                      className={classes.root}
                                      label={detail.label}
                                      variant="outlined"
                                      fullWidth
                                      select
                                      defaultValue={" "}
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