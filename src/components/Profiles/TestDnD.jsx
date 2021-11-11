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
import DateFnsUtils from "@date-io/date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { getconfigurationbypropertycode } from "../../services/user.service";
import {
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

const optionnationality = [
  {
    country: "Thailand",
    label: "Thai",
  },
  {
    country: "China",
    label: "Chinese",
  },
  {
    country: "Peru",
    label: "Peruvian",
  },
  {
    country: "Brazil",
    label: "Brazilian",
  },
  {
    country: "Libya",
    label: "Libyan",
  },
  {
    country: "San Marino",
    label: "Sammarinese",
  },
  {
    country: "Malaysia",
    label: "Malaysian",
  },
  {
    country: "Paraguay",
    label: "Paraguayan",
  },
  {
    country: "Namibia",
    label: "Namibian",
  },
  {
    country: "Slovakia",
    label: "Slovak",
  },
  {
    country: "Honduras",
    label: "Honduran",
  },
  {
    country: "Uganda",
    label: "Ugandan",
  },
  {
    country: "Indonesia",
    label: "Indonesian",
  },
  {
    country: "South Georgia and the South Sandwich Islands",
    label: "South Georgia and the South Sandwich Islander",
  },
  {
    country: "Yemen",
    label: "Yemeni",
  },
  {
    country: "Azerbaijan",
    label: "Azerbaijani",
  },
  {
    country: "Israel",
    label: "Israeli",
  },
  {
    country: "Singapore",
    label: "Singaporean",
  },
  {
    country: "United Arab Emirates",
    label: "Emirati",
  },
  {
    country: "Bolivia (Plurinational State of)",
    label: "Bolivian",
  },
  {
    country: "Ireland",
    label: "Irish",
  },
  {
    country: "Central African Republic",
    label: "Central African",
  },
  {
    country: "French Polynesia",
    label: "French Polynesian",
  },
  {
    country: "Grenada",
    label: "Grenadian",
  },
  {
    country: "Guinea-Bissau",
    label: "Guinea-Bissauan",
  },
  {
    country: "Nepal",
    label: "Nepalese",
  },
  {
    country: "Panama",
    label: "Panamanian",
  },
  {
    country: "Burkina Faso",
    label: "Burkinabe",
  },
  {
    country: "Cambodia",
    label: "Cambodian",
  },
  {
    country: "Uzbekistan",
    label: "Uzbekistani",
  },
  {
    country: "Anguilla",
    label: "Anguillian",
  },
  {
    country: "Korea (Republic of)",
    label: "South Korean",
  },
  {
    country: "Curaçao",
    label: "Curaçaoan",
  },
  {
    country: "Wallis and Futuna",
    label: "Wallis and Futuna Islander",
  },
  {
    country: "Myanmar",
    label: "Burmese",
  },
  {
    country: "Egypt",
    label: "Egyptian",
  },
  {
    country: "Gambia",
    label: "Gambian",
  },
  {
    country: "Saudi Arabia",
    label: "Saudi Arabian",
  },
  {
    country: "Argentina",
    label: "Argentinean",
  },
  {
    country: "Canada",
    label: "Canadian",
  },
  {
    country: "Montenegro",
    label: "Montenegrin",
  },
  {
    country: "United States of America",
    label: "American",
  },
  {
    country: "Cook Islands",
    label: "Cook Islander",
  },
  {
    country: "Macao",
    label: "Macanese",
  },
  {
    country: "Cocos (Keeling) Islands",
    label: "Cocos Islander",
  },
  {
    country: "Saint Lucia",
    label: "Saint Lucian",
  },
  {
    country: "Cyprus",
    label: "Cypriot",
  },
  {
    country: "Iceland",
    label: "Icelander",
  },
  {
    country: "Côte d'Ivoire",
    label: "Ivorian",
  },
  {
    country: "Bangladesh",
    label: "Bangladeshi",
  },
  {
    country: "Bhutan",
    label: "Bhutanese",
  },
  {
    country: "Saint Kitts and Nevis",
    label: "Kittian and Nevisian",
  },
  {
    country: "Finland",
    label: "Finnish",
  },
  {
    country: "Macedonia (the former Yugoslav Republic of)",
    label: "Macedonian",
  },
  {
    country: "Qatar",
    label: "Qatari",
  },
  {
    country: "Sudan",
    label: "Sudanese",
  },
  {
    country: "Isle of Man",
    label: "Manx",
  },
  {
    country: "Latvia",
    label: "Latvian",
  },
  {
    country: "Timor-Leste",
    label: "East Timorese",
  },
  {
    country: "Sao Tome and Principe",
    label: "Sao Tomean",
  },
  {
    country: "Sweden",
    label: "Swedish",
  },
  {
    country: "Martinique",
    label: "Martinican",
  },
  {
    country: "Sierra Leone",
    label: "Sierra Leonean",
  },
  {
    country: "South Africa",
    label: "South African",
  },
  {
    country: "Tanzania, United Republic of",
    label: "Tanzanian",
  },
  {
    country: "Costa Rica",
    label: "Costa Rican",
  },
  {
    country: "Iran (Islamic Republic of)",
    label: "Iranian",
  },
  {
    country: "Dominican Republic",
    label: "Dominican",
  },
  {
    country: "Nigeria",
    label: "Nigerian",
  },
  {
    country: "Palestine, State of",
    label: "Palestinian",
  },
  {
    country: "Bosnia and Herzegovina",
    label: "Bosnian, Herzegovinian",
  },
  {
    country: "Cayman Islands",
    label: "Caymanian",
  },
  {
    country: "Maldives",
    label: "Maldivan",
  },
  {
    country: "Japan",
    label: "Japanese",
  },
  {
    country: "Chad",
    label: "Chadian",
  },
  {
    country: "Guinea",
    label: "Guinean",
  },
  {
    country: "Madagascar",
    label: "Malagasy",
  },
  {
    country: "Italy",
    label: "Italian",
  },
  {
    country: "Jordan",
    label: "Jordanian",
  },
  {
    country: "Liechtenstein",
    label: "Liechtensteiner",
  },
  {
    country: "Mongolia",
    label: "Mongolian",
  },
  {
    country: "Tonga",
    label: "Tongan",
  },
  {
    country: "Ecuador",
    label: "Ecuadorean",
  },
  {
    country: "Guam",
    label: "Guamanian",
  },
  {
    country: "Kuwait",
    label: "Kuwaiti",
  },
  {
    country: "Kyrgyzstan",
    label: "Kirghiz",
  },
  {
    country: "Mauritius",
    label: "Mauritian",
  },
  {
    country: "Åland Islands",
    label: "Ålandish",
  },
  {
    country: "Bahrain",
    label: "Bahraini",
  },
  {
    country: "Mexico",
    label: "Mexican",
  },
  {
    country: "Poland",
    label: "Polish",
  },
  {
    country: "Chile",
    label: "Chilean",
  },
  {
    country: "Djibouti",
    label: "Djibouti",
  },
  {
    country: "Ethiopia",
    label: "Ethiopian",
  },
  {
    country: "Mauritania",
    label: "Mauritanian",
  },
  {
    country: "Korea (Democratic People's Republic of)",
    label: "North Korean",
  },
  {
    country: "Swaziland",
    label: "Swazi",
  },
  {
    country: "Aruba",
    label: "Aruban",
  },
  {
    country: "Austria",
    label: "Austrian",
  },
  {
    country: "Haiti",
    label: "Haitian",
  },
  {
    country: "Portugal",
    label: "Portuguese",
  },
  {
    country: "Vanuatu",
    label: "Ni-Vanuatu",
  },
  {
    country: "Christmas Island",
    label: "Christmas Island",
  },
  {
    country: "Colombia",
    label: "Colombian",
  },
  {
    country: "Cuba",
    label: "Cuban",
  },
  {
    country: "French Guiana",
    label: "French Guianese",
  },
  {
    country: "Afghanistan",
    label: "Afghan",
  },
  {
    country: "Brunei Darussalam",
    label: "Bruneian",
  },
  {
    country: "Jamaica",
    label: "Jamaican",
  },
  {
    country: "Moldova (Republic of)",
    label: "Moldovan",
  },
  {
    country: "France",
    label: "French",
  },
  {
    country: "Kenya",
    label: "Kenyan",
  },
  {
    country: "Oman",
    label: "Omani",
  },
  {
    country: "Albania",
    label: "Albanian",
  },
  {
    country: "Cabo Verde",
    label: "Cape Verdian",
  },
  {
    country: "Turkey",
    label: "Turkish",
  },
  {
    country: "Zimbabwe",
    label: "Zimbabwean",
  },
  {
    country: "Algeria",
    label: "Algerian",
  },
  {
    country: "Niger",
    label: "Nigerien",
  },
  {
    country: "Hungary",
    label: "Hungarian",
  },
  {
    country: "Spain",
    label: "Spanish",
  },
  {
    country: "Germany",
    label: "German",
  },
  {
    country: "Guatemala",
    label: "Guatemalan",
  },
  {
    country: "Mozambique",
    label: "Mozambican",
  },
  {
    country: "Palau",
    label: "Palauan",
  },
  {
    country: "Lesotho",
    label: "Mosotho",
  },
  {
    country: "Marshall Islands",
    label: "Marshallese",
  },
  {
    country: "Suriname",
    label: "Surinamer",
  },
  {
    country: "Guyana",
    label: "Guyanese",
  },
  {
    country: "Sri Lanka",
    label: "Sri Lankan",
  },
  {
    country: "Lebanon",
    label: "Lebanese",
  },
  {
    country: "Mayotte",
    label: "Mahoran",
  },
  {
    country: "Samoa",
    label: "Samoan",
  },
  {
    country: "Solomon Islands",
    label: "Solomon Islander",
  },
  {
    country: "Denmark",
    label: "Danish",
  },
  {
    country: "Kiribati",
    label: "I-Kiribati",
  },
  {
    country: "Switzerland",
    label: "Swiss",
  },
  {
    country: "Lithuania",
    label: "Lithuanian",
  },
  {
    country: "Somalia",
    label: "Somali",
  },
  {
    country: "Norfolk Island",
    label: "Norfolk Islander",
  },
  {
    country: "Taiwan",
    label: "Taiwanese",
  },
  {
    country: "Ghana",
    label: "Ghanaian",
  },
  {
    country: "New Zealand",
    label: "New Zealander",
  },
  {
    country: "Senegal",
    label: "Senegalese",
  },
  {
    country: "Togo",
    label: "Togolese",
  },
  {
    country: "Zambia",
    label: "Zambian",
  },
  {
    country: "Belarus",
    label: "Belarusian",
  },
  {
    country: "Saint Vincent and the Grenadines",
    label: "Saint Vincentian",
  },
  {
    country: "El Salvador",
    label: "Salvadoran",
  },
  {
    country: "Norway",
    label: "Norwegian",
  },
  {
    country: "Malta",
    label: "Maltese",
  },
  {
    country: "Nicaragua",
    label: "Nicaraguan",
  },
  {
    country: "Australia",
    label: "Australian",
  },
  {
    country: "Luxembourg",
    label: "Luxembourger",
  },
  {
    country: "Pakistan",
    label: "Pakistani",
  },
  {
    country: "Saint Helena, Ascension and Tristan da Cunha",
    label: "Saint Helenian",
  },
  {
    country: "Turks and Caicos Islands",
    label: "Turks and Caicos Islander",
  },
  {
    country: "Western Sahara",
    label: "Sahrawi",
  },
  {
    country: "Belgium",
    label: "Belgian",
  },
  {
    country: "Eritrea",
    label: "Eritrean",
  },
  {
    country: "Seychelles",
    label: "Seychellois",
  },
  {
    country: "Antigua and Barbuda",
    label: "Antiguan, Barbudan",
  },
  {
    country: "Liberia",
    label: "Liberian",
  },
  {
    country: "Tuvalu",
    label: "Tuvaluan",
  },
  {
    country: "Bermuda",
    label: "Bermudian",
  },
  {
    country: "Cameroon",
    label: "Cameroonian",
  },
  {
    country: "Saint Pierre and Miquelon",
    label: "Saint-Pierrais",
  },
  {
    country: "Ukraine",
    label: "Ukrainian",
  },
  {
    country: "Georgia",
    label: "Georgian",
  },
  {
    country: "Netherlands",
    label: "Dutch",
  },
  {
    country: "Mali",
    label: "Malian",
  },
  {
    country: "Niue",
    label: "Niuean",
  },
  {
    country: "Puerto Rico",
    label: "Puerto Rican",
  },
  {
    country: "United Kingdom of Great Britain and Northern Ireland",
    label: "British",
  },
  {
    country: "Armenia",
    label: "Armenian",
  },
  {
    country: "Greenland",
    label: "Greenlandic",
  },
  {
    country: "Kazakhstan",
    label: "Kazakhstani",
  },
  {
    country: "Réunion",
    label: "Réunionese",
  },
  {
    country: "Saint Martin (French part)",
    label: "Saint Martin Islander",
  },
  {
    country: "Belize",
    label: "Belizean",
  },
  {
    country: "Greece",
    label: "Greek",
  },
  {
    country: "Trinidad and Tobago",
    label: "Trinidadian",
  },
  {
    country: "Benin",
    label: "Beninese",
  },
  {
    country: "Tajikistan",
    label: "Tadzhik",
  },
  {
    country: "Czech Republic",
    label: "Czech",
  },
  {
    country: "India",
    label: "Indian",
  },
  {
    country: "Lao People's Democratic Republic",
    label: "Laotian",
  },
  {
    country: "Syrian Arab Republic",
    label: "Syrian",
  },
  {
    country: "Turkmenistan",
    label: "Turkmen",
  },
  {
    country: "Botswana",
    label: "Motswana",
  },
  {
    country: "Virgin Islands (British)",
    label: "Virgin Islander (British)",
  },
  {
    country: "American Samoa",
    label: "American Samoan",
  },
  {
    country: "Guadeloupe",
    label: "Guadeloupian",
  },
  {
    country: "New Caledonia",
    label: "New Caledonian",
  },
  {
    country: "Viet Nam",
    label: "Vietnamese",
  },
  {
    country: "Comoros",
    label: "Comoran",
  },
  {
    country: "Micronesia (Federated States of)",
    label: "Micronesian",
  },
  {
    country: "Burundi",
    label: "Burundian",
  },
  {
    country: "Morocco",
    label: "Moroccan",
  },
  {
    country: "Saint Barthélemy",
    label: "Saint Barthélemy Islander",
  },
  {
    country: "Barbados",
    label: "Barbadian",
  },
  {
    country: "Virgin Islands (U.S.)",
    label: "Virgin Islander (U.S.)",
  },
  {
    country: "Iraq",
    label: "Iraqi",
  },
  {
    country: "Papua New Guinea",
    label: "Papua New Guinean",
  },
  {
    country: "Equatorial Guinea",
    label: "Equatorial Guinean",
  },
  {
    country: "Gabon",
    label: "Gabonese",
  },
  {
    country: "Uruguay",
    label: "Uruguayan",
  },
  {
    country: "Monaco",
    label: "Monegasque",
  },
  {
    country: "Tunisia",
    label: "Tunisian",
  },
  {
    country: "Fiji",
    label: "Fijian",
  },
  {
    country: "Rwanda",
    label: "Rwandan",
  },
  {
    country: "Angola",
    label: "Angolan",
  },
  {
    country: "Falkland Islands (Malvinas)",
    label: "Falkland Islander",
  },
  {
    country: "Serbia",
    label: "Serbian",
  },
  {
    country: "Slovenia",
    label: "Slovenian",
  },
  {
    country: "Congo (Democratic Republic of the)",
    label: "Congolese (Democratic Republic)",
  },
  {
    country: "Malawi",
    label: "Malawian",
  },
  {
    country: "Venezuela (Bolivarian Republic of)",
    label: "Venezuelan",
  },
  {
    country: "Bulgaria",
    label: "Bulgarian",
  },
  {
    country: "Hong Kong",
    label: "Hong Kongese",
  },
  {
    country: "Gibraltar",
    label: "Gibraltar",
  },
  {
    country: "South Sudan",
    label: "South Sudanese",
  },
  {
    country: "Nauru",
    label: "Nauruan",
  },
  {
    country: "Pitcairn",
    label: "Pitcairn Islander",
  },
  {
    country: "Russian Federation",
    label: "Russian",
  },
  {
    country: "Andorra",
    label: "Andorran",
  },
  {
    country: "Faroe Islands",
    label: "Faroese",
  },
  {
    country: "Congo",
    label: "Congolese",
  },
  {
    country: "Croatia",
    label: "Croatian",
  },
  {
    country: "Montserrat",
    label: "Montserratian",
  },
  {
    country: "Philippines",
    label: "Filipino",
  },
  {
    country: "Republic of Kosovo",
    label: "Kosovar",
  },
  {
    country: "Romania",
    label: "Romanian",
  },
  {
    country: "Tokelau",
    label: "Tokelauan",
  },
  {
    country: "Bahamas",
    label: "Bahamian",
  },
  {
    country: "Estonia",
    label: "Estonian",
  },
];

const optioncountry = [
  {
    label: "Thailand",
    nationality: "Thai",
  },
  {
    label: "China",
    nationality: "Chinese",
  },
  {
    label: "Peru",
    nationality: "Peruvian",
  },
  {
    label: "Brazil",
    nationality: "Brazilian",
  },
  {
    label: "Libya",
    nationality: "Libyan",
  },
  {
    label: "San Marino",
    nationality: "Sammarinese",
  },
  {
    label: "Malaysia",
    nationality: "Malaysian",
  },
  {
    label: "Paraguay",
    nationality: "Paraguayan",
  },
  {
    label: "Namibia",
    nationality: "Namibian",
  },
  {
    label: "Slovakia",
    nationality: "Slovak",
  },
  {
    label: "Honduras",
    nationality: "Honduran",
  },
  {
    label: "Uganda",
    nationality: "Ugandan",
  },
  {
    label: "Indonesia",
    nationality: "Indonesian",
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    nationality: "South Georgia and the South Sandwich Islander",
  },
  {
    label: "Yemen",
    nationality: "Yemeni",
  },
  {
    label: "Azerbaijan",
    nationality: "Azerbaijani",
  },
  {
    label: "Israel",
    nationality: "Israeli",
  },
  {
    label: "Singapore",
    nationality: "Singaporean",
  },
  {
    label: "United Arab Emirates",
    nationality: "Emirati",
  },
  {
    label: "Bolivia (Plurinational State of)",
    nationality: "Bolivian",
  },
  {
    label: "Ireland",
    nationality: "Irish",
  },
  {
    label: "Central African Republic",
    nationality: "Central African",
  },
  {
    label: "French Polynesia",
    nationality: "French Polynesian",
  },
  {
    label: "Grenada",
    nationality: "Grenadian",
  },
  {
    label: "Guinea-Bissau",
    nationality: "Guinea-Bissauan",
  },
  {
    label: "Nepal",
    nationality: "Nepalese",
  },
  {
    label: "Panama",
    nationality: "Panamanian",
  },
  {
    label: "Burkina Faso",
    nationality: "Burkinabe",
  },
  {
    label: "Cambodia",
    nationality: "Cambodian",
  },
  {
    label: "Uzbekistan",
    nationality: "Uzbekistani",
  },
  {
    label: "Anguilla",
    nationality: "Anguillian",
  },
  {
    label: "Korea (Republic of)",
    nationality: "South Korean",
  },
  {
    label: "Curaçao",
    nationality: "Curaçaoan",
  },
  {
    label: "Wallis and Futuna",
    nationality: "Wallis and Futuna Islander",
  },
  {
    label: "Myanmar",
    nationality: "Burmese",
  },
  {
    label: "Egypt",
    nationality: "Egyptian",
  },
  {
    label: "Gambia",
    nationality: "Gambian",
  },
  {
    label: "Saudi Arabia",
    nationality: "Saudi Arabian",
  },
  {
    label: "Argentina",
    nationality: "Argentinean",
  },
  {
    label: "Canada",
    nationality: "Canadian",
  },
  {
    label: "Montenegro",
    nationality: "Montenegrin",
  },
  {
    label: "United States of America",
    nationality: "American",
  },
  {
    label: "Cook Islands",
    nationality: "Cook Islander",
  },
  {
    label: "Macao",
    nationality: "Macanese",
  },
  {
    label: "Cocos (Keeling) Islands",
    nationality: "Cocos Islander",
  },
  {
    label: "Saint Lucia",
    nationality: "Saint Lucian",
  },
  {
    label: "Cyprus",
    nationality: "Cypriot",
  },
  {
    label: "Iceland",
    nationality: "Icelander",
  },
  {
    label: "Côte d'Ivoire",
    nationality: "Ivorian",
  },
  {
    label: "Bangladesh",
    nationality: "Bangladeshi",
  },
  {
    label: "Bhutan",
    nationality: "Bhutanese",
  },
  {
    label: "Saint Kitts and Nevis",
    nationality: "Kittian and Nevisian",
  },
  {
    label: "Finland",
    nationality: "Finnish",
  },
  {
    label: "Macedonia (the former Yugoslav Republic of)",
    nationality: "Macedonian",
  },
  {
    label: "Qatar",
    nationality: "Qatari",
  },
  {
    label: "Sudan",
    nationality: "Sudanese",
  },
  {
    label: "Isle of Man",
    nationality: "Manx",
  },
  {
    label: "Latvia",
    nationality: "Latvian",
  },
  {
    label: "Timor-Leste",
    nationality: "East Timorese",
  },
  {
    label: "Sao Tome and Principe",
    nationality: "Sao Tomean",
  },
  {
    label: "Sweden",
    nationality: "Swedish",
  },
  {
    label: "Martinique",
    nationality: "Martinican",
  },
  {
    label: "Sierra Leone",
    nationality: "Sierra Leonean",
  },
  {
    label: "South Africa",
    nationality: "South African",
  },
  {
    label: "Tanzania, United Republic of",
    nationality: "Tanzanian",
  },
  {
    label: "Costa Rica",
    nationality: "Costa Rican",
  },
  {
    label: "Iran (Islamic Republic of)",
    nationality: "Iranian",
  },
  {
    label: "Dominican Republic",
    nationality: "Dominican",
  },
  {
    label: "Nigeria",
    nationality: "Nigerian",
  },
  {
    label: "Palestine, State of",
    nationality: "Palestinian",
  },
  {
    label: "Bosnia and Herzegovina",
    nationality: "Bosnian, Herzegovinian",
  },
  {
    label: "Cayman Islands",
    nationality: "Caymanian",
  },
  {
    label: "Maldives",
    nationality: "Maldivan",
  },
  {
    label: "Japan",
    nationality: "Japanese",
  },
  {
    label: "Chad",
    nationality: "Chadian",
  },
  {
    label: "Guinea",
    nationality: "Guinean",
  },
  {
    label: "Madagascar",
    nationality: "Malagasy",
  },
  {
    label: "Italy",
    nationality: "Italian",
  },
  {
    label: "Jordan",
    nationality: "Jordanian",
  },
  {
    label: "Liechtenstein",
    nationality: "Liechtensteiner",
  },
  {
    label: "Mongolia",
    nationality: "Mongolian",
  },
  {
    label: "Tonga",
    nationality: "Tongan",
  },
  {
    label: "Ecuador",
    nationality: "Ecuadorean",
  },
  {
    label: "Guam",
    nationality: "Guamanian",
  },
  {
    label: "Kuwait",
    nationality: "Kuwaiti",
  },
  {
    label: "Kyrgyzstan",
    nationality: "Kirghiz",
  },
  {
    label: "Mauritius",
    nationality: "Mauritian",
  },
  {
    label: "Åland Islands",
    nationality: "Ålandish",
  },
  {
    label: "Bahrain",
    nationality: "Bahraini",
  },
  {
    label: "Mexico",
    nationality: "Mexican",
  },
  {
    label: "Poland",
    nationality: "Polish",
  },
  {
    label: "Chile",
    nationality: "Chilean",
  },
  {
    label: "Djibouti",
    nationality: "Djibouti",
  },
  {
    label: "Ethiopia",
    nationality: "Ethiopian",
  },
  {
    label: "Mauritania",
    nationality: "Mauritanian",
  },
  {
    label: "Korea (Democratic People's Republic of)",
    nationality: "North Korean",
  },
  {
    label: "Swaziland",
    nationality: "Swazi",
  },
  {
    label: "Aruba",
    nationality: "Aruban",
  },
  {
    label: "Austria",
    nationality: "Austrian",
  },
  {
    label: "Haiti",
    nationality: "Haitian",
  },
  {
    label: "Portugal",
    nationality: "Portuguese",
  },
  {
    label: "Vanuatu",
    nationality: "Ni-Vanuatu",
  },
  {
    label: "Christmas Island",
    nationality: "Christmas Island",
  },
  {
    label: "Colombia",
    nationality: "Colombian",
  },
  {
    label: "Cuba",
    nationality: "Cuban",
  },
  {
    label: "French Guiana",
    nationality: "French Guianese",
  },
  {
    label: "Afghanistan",
    nationality: "Afghan",
  },
  {
    label: "Brunei Darussalam",
    nationality: "Bruneian",
  },
  {
    label: "Jamaica",
    nationality: "Jamaican",
  },
  {
    label: "Moldova (Republic of)",
    nationality: "Moldovan",
  },
  {
    label: "France",
    nationality: "French",
  },
  {
    label: "Kenya",
    nationality: "Kenyan",
  },
  {
    label: "Oman",
    nationality: "Omani",
  },
  {
    label: "Albania",
    nationality: "Albanian",
  },
  {
    label: "Cabo Verde",
    nationality: "Cape Verdian",
  },
  {
    label: "Turkey",
    nationality: "Turkish",
  },
  {
    label: "Zimbabwe",
    nationality: "Zimbabwean",
  },
  {
    label: "Algeria",
    nationality: "Algerian",
  },
  {
    label: "Niger",
    nationality: "Nigerien",
  },
  {
    label: "Hungary",
    nationality: "Hungarian",
  },
  {
    label: "Spain",
    nationality: "Spanish",
  },
  {
    label: "Germany",
    nationality: "German",
  },
  {
    label: "Guatemala",
    nationality: "Guatemalan",
  },
  {
    label: "Mozambique",
    nationality: "Mozambican",
  },
  {
    label: "Palau",
    nationality: "Palauan",
  },
  {
    label: "Lesotho",
    nationality: "Mosotho",
  },
  {
    label: "Marshall Islands",
    nationality: "Marshallese",
  },
  {
    label: "Suriname",
    nationality: "Surinamer",
  },
  {
    label: "Guyana",
    nationality: "Guyanese",
  },
  {
    label: "Sri Lanka",
    nationality: "Sri Lankan",
  },
  {
    label: "Lebanon",
    nationality: "Lebanese",
  },
  {
    label: "Mayotte",
    nationality: "Mahoran",
  },
  {
    label: "Samoa",
    nationality: "Samoan",
  },
  {
    label: "Solomon Islands",
    nationality: "Solomon Islander",
  },
  {
    label: "Denmark",
    nationality: "Danish",
  },
  {
    label: "Kiribati",
    nationality: "I-Kiribati",
  },
  {
    label: "Switzerland",
    nationality: "Swiss",
  },
  {
    label: "Lithuania",
    nationality: "Lithuanian",
  },
  {
    label: "Somalia",
    nationality: "Somali",
  },
  {
    label: "Norfolk Island",
    nationality: "Norfolk Islander",
  },
  {
    label: "Taiwan",
    nationality: "Taiwanese",
  },
  {
    label: "Ghana",
    nationality: "Ghanaian",
  },
  {
    label: "New Zealand",
    nationality: "New Zealander",
  },
  {
    label: "Senegal",
    nationality: "Senegalese",
  },
  {
    label: "Togo",
    nationality: "Togolese",
  },
  {
    label: "Zambia",
    nationality: "Zambian",
  },
  {
    label: "Belarus",
    nationality: "Belarusian",
  },
  {
    label: "Saint Vincent and the Grenadines",
    nationality: "Saint Vincentian",
  },
  {
    label: "El Salvador",
    nationality: "Salvadoran",
  },
  {
    label: "Norway",
    nationality: "Norwegian",
  },
  {
    label: "Malta",
    nationality: "Maltese",
  },
  {
    label: "Nicaragua",
    nationality: "Nicaraguan",
  },
  {
    label: "Australia",
    nationality: "Australian",
  },
  {
    label: "Luxembourg",
    nationality: "Luxembourger",
  },
  {
    label: "Pakistan",
    nationality: "Pakistani",
  },
  {
    label: "Saint Helena, Ascension and Tristan da Cunha",
    nationality: "Saint Helenian",
  },
  {
    label: "Turks and Caicos Islands",
    nationality: "Turks and Caicos Islander",
  },
  {
    label: "Western Sahara",
    nationality: "Sahrawi",
  },
  {
    label: "Belgium",
    nationality: "Belgian",
  },
  {
    label: "Eritrea",
    nationality: "Eritrean",
  },
  {
    label: "Seychelles",
    nationality: "Seychellois",
  },
  {
    label: "Antigua and Barbuda",
    nationality: "Antiguan, Barbudan",
  },
  {
    label: "Liberia",
    nationality: "Liberian",
  },
  {
    label: "Tuvalu",
    nationality: "Tuvaluan",
  },
  {
    label: "Bermuda",
    nationality: "Bermudian",
  },
  {
    label: "Cameroon",
    nationality: "Cameroonian",
  },
  {
    label: "Saint Pierre and Miquelon",
    nationality: "Saint-Pierrais",
  },
  {
    label: "Ukraine",
    nationality: "Ukrainian",
  },
  {
    label: "Georgia",
    nationality: "Georgian",
  },
  {
    label: "Netherlands",
    nationality: "Dutch",
  },
  {
    label: "Mali",
    nationality: "Malian",
  },
  {
    label: "Niue",
    nationality: "Niuean",
  },
  {
    label: "Puerto Rico",
    nationality: "Puerto Rican",
  },
  {
    label: "United Kingdom of Great Britain and Northern Ireland",
    nationality: "British",
  },
  {
    label: "Armenia",
    nationality: "Armenian",
  },
  {
    label: "Greenland",
    nationality: "Greenlandic",
  },
  {
    label: "Kazakhstan",
    nationality: "Kazakhstani",
  },
  {
    label: "Réunion",
    nationality: "Réunionese",
  },
  {
    label: "Saint Martin (French part)",
    nationality: "Saint Martin Islander",
  },
  {
    label: "Belize",
    nationality: "Belizean",
  },
  {
    label: "Greece",
    nationality: "Greek",
  },
  {
    label: "Trinidad and Tobago",
    nationality: "Trinidadian",
  },
  {
    label: "Benin",
    nationality: "Beninese",
  },
  {
    label: "Tajikistan",
    nationality: "Tadzhik",
  },
  {
    label: "Czech Republic",
    nationality: "Czech",
  },
  {
    label: "India",
    nationality: "Indian",
  },
  {
    label: "Lao People's Democratic Republic",
    nationality: "Laotian",
  },
  {
    label: "Syrian Arab Republic",
    nationality: "Syrian",
  },
  {
    label: "Turkmenistan",
    nationality: "Turkmen",
  },
  {
    label: "Botswana",
    nationality: "Motswana",
  },
  {
    label: "Virgin Islands (British)",
    nationality: "Virgin Islander (British)",
  },
  {
    label: "American Samoa",
    nationality: "American Samoan",
  },
  {
    label: "Guadeloupe",
    nationality: "Guadeloupian",
  },
  {
    label: "New Caledonia",
    nationality: "New Caledonian",
  },
  {
    label: "Viet Nam",
    nationality: "Vietnamese",
  },
  {
    label: "Comoros",
    nationality: "Comoran",
  },
  {
    label: "Micronesia (Federated States of)",
    nationality: "Micronesian",
  },
  {
    label: "Burundi",
    nationality: "Burundian",
  },
  {
    label: "Morocco",
    nationality: "Moroccan",
  },
  {
    label: "Saint Barthélemy",
    nationality: "Saint Barthélemy Islander",
  },
  {
    label: "Barbados",
    nationality: "Barbadian",
  },
  {
    label: "Virgin Islands (U.S.)",
    nationality: "Virgin Islander (U.S.)",
  },
  {
    label: "Iraq",
    nationality: "Iraqi",
  },
  {
    label: "Papua New Guinea",
    nationality: "Papua New Guinean",
  },
  {
    label: "Equatorial Guinea",
    nationality: "Equatorial Guinean",
  },
  {
    label: "Gabon",
    nationality: "Gabonese",
  },
  {
    label: "Uruguay",
    nationality: "Uruguayan",
  },
  {
    label: "Monaco",
    nationality: "Monegasque",
  },
  {
    label: "Tunisia",
    nationality: "Tunisian",
  },
  {
    label: "Fiji",
    nationality: "Fijian",
  },
  {
    label: "Rwanda",
    nationality: "Rwandan",
  },
  {
    label: "Angola",
    nationality: "Angolan",
  },
  {
    label: "Falkland Islands (Malvinas)",
    nationality: "Falkland Islander",
  },
  {
    label: "Serbia",
    nationality: "Serbian",
  },
  {
    label: "Slovenia",
    nationality: "Slovenian",
  },
  {
    label: "Congo (Democratic Republic of the)",
    nationality: "Congolese (Democratic Republic)",
  },
  {
    label: "Malawi",
    nationality: "Malawian",
  },
  {
    label: "Venezuela (Bolivarian Republic of)",
    nationality: "Venezuelan",
  },
  {
    label: "Bulgaria",
    nationality: "Bulgarian",
  },
  {
    label: "Hong Kong",
    nationality: "Hong Kongese",
  },
  {
    label: "Gibraltar",
    nationality: "Gibraltar",
  },
  {
    label: "South Sudan",
    nationality: "South Sudanese",
  },
  {
    label: "Nauru",
    nationality: "Nauruan",
  },
  {
    label: "Pitcairn",
    nationality: "Pitcairn Islander",
  },
  {
    label: "Russian Federation",
    nationality: "Russian",
  },
  {
    label: "Andorra",
    nationality: "Andorran",
  },
  {
    label: "Faroe Islands",
    nationality: "Faroese",
  },
  {
    label: "Congo",
    nationality: "Congolese",
  },
  {
    label: "Croatia",
    nationality: "Croatian",
  },
  {
    label: "Montserrat",
    nationality: "Montserratian",
  },
  {
    label: "Philippines",
    nationality: "Filipino",
  },
  {
    label: "Republic of Kosovo",
    nationality: "Kosovar",
  },
  {
    label: "Romania",
    nationality: "Romanian",
  },
  {
    label: "Tokelau",
    nationality: "Tokelauan",
  },
  {
    label: "Bahamas",
    nationality: "Bahamian",
  },
  {
    label: "Estonia",
    nationality: "Estonian",
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

export const TestDnD = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });

  // const { action } = props;
  // const action = props.action;
  const [action, setAction] = React.useState(props.action);
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
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);
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

  // const [guestNameInfoID, setGuestNameInfoID] = React.useState(
  //   props.editdata.guestnameinfoid
  // );
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [namePrefix, setNamePrefix] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [idnumber, setIDNumber] = React.useState("");
  const [nationality, setNationality] = React.useState("");

  const pageProperty = useSelector((state) => state.reducer.property);

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
      setList([
        {
          id: "1",
          title: "Personal",
          expend: true,
          content: [
            {
              id: 0,
              label: "Title",
              xl: 1,
              md: 1,
              xs: 4,
              select: {
                status: "option",
                data: optionTitle.map((option) => (
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
                  props.editdata != null ? props.editdata.title : "Mr.",
              },
              handle: (e) => setNamePrefix(e.target.value),
            },

            {
              id: 1,
              label: "First Name",
              xl: 5,
              md: 5,
              xs: 8,
              select: {
                status: "fill",
                // data: props.editdata.firstname,
                data: props.editdata != null ? props.editdata.firstname : "",
              },
              handle: (e) => setFirstname(e.target.value),
            },
            {
              id: 2,
              label: "Last Name",
              xl: 5,
              md: 5,
              xs: 8,
              select: {
                status: "fill",
                data: props.editdata != null ? props.editdata.lastname : "",
              },
              // handle: (e) => setPersonalData({ ...personalData,lastname: e.target.value }),
              handle: (e) => setLastname(e.target.value),
            },
            {
              id: 3,
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
            },
            {
              id: 4,
              label: "Choose a Document Type*",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "option",
                data: optionDocumentType.map((option) => (
                  <option
                    style={headerTableStyle}
                    key={option.value}
                    value={option.value}
                    noWrap
                  >
                    {option.label}
                  </option>
                )),
              },
              handle: (e) => handleData(e),
            },
            {
              id: 5,
              label: "ID Number",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "fill",
                data:
                  props.editdata != null ? props.editdata.idcardandpass : "",
              },
              handle: (e) => setIDNumber(e.target.value),
            },
            {
              id: 6,
              label: "Nationality*",
              xl: 2,
              md: 2,
              xs: 12,
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
                  props.editdata != null ? props.editdata.gender : "",
              },
              handle: (e) => setNationality(e.target.value),
            },
            {
              id: 7,
              label: "Issue Date",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "datetime",
                data: "",
              },
              handle: " ",
            },
            {
              id: 8,
              label: "Expiry Date",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "datetime",
                data: "",
              },
              handle: " ",
            },
            {
              id: 9,
              label: "Date of Birth",
              xl: 2,
              md: 2,
              xs: 12,
              select: {
                status: "datetime",
                data: "",
              },
              handle: " ",
            },
          ],
        },
        {
          id: "2",
          title: "Comunication",
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
              },
              handle: (e) => handleData(e),
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
              },
              handle: (e) => handleData(e),
            },
            {
              id: 99,
              label: "Phone Number",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "AddComunication",
                data: "+ Add",
              },
              // handle: (e) => handleAddComunication(e),
            },
          ],
        },
        {
          id: "3",
          title: "Address",
          expend: true,
          content: [
            {
              id: 1,
              label: "Home Address",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fix",
                data: "Home Address",
              },
            },
            {
              id: 2,
              label: "Address",
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
              id: 4,
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
              id: 5,
              label: "City",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fill",
                data: "",
                // optionCity.map((option) => (
                //   <option
                //     style={headerTableStyle}
                //     key={option.value}
                //     value={option.value}
                //   >
                //     {option.label}
                //   </option>
                //  )),
              },
              handle: (e) => handleData(e),
            },
            {
              id: 6,
              label: "State",
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
              id: 7,
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
              id: 8,
              label: "Resident Address",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "fix",
                data: "Resident Address",
              },
              handle: (e) => handleData(e),
            },
            {
              id: 9,
              label: "Address",
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
              id: 10,
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
              id: 11,
              label: "City",
              xl: 2,
              md: 2,
              xs: 6,
              select: {
                status: "option",
                data: optionCity.map((option) => (
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
              id: 12,
              label: "State",
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
              id: 13,
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
          ],
        },
        {
          id: "4",
          title: "Relation",
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
            },
          ],
        },
      ]);
    }
    getconfig();
  }, []);

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
        handle: (e) => handleData(e),
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
        handle: (e) => handleData(e),
      });
      comunication.content.push({
        id: 99,
        label: "AddComunication",
        xl: 2,
        md: 2,
        xs: 2,
        select: {
          status: "AddComunication",
          data: "+ Add",
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
        handle: (e) => handleData(e),
      });
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
        handle: (e) => handleData(e),
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
        handle: (e) => handleData(e),
      });
      relation.content.push({
        id: 99,
        label: "AddRelation",
        xl: 2,
        md: 2,
        xs: 2,
        select: {
          status: "AddRelation",
          data: "+ Add",
        },
      });
      setList([...list.slice(0, index), relation, ...list.slice(index + 1)]);
    }
  };

  const handleData = async (e) => {
    // console.log("Value from handleData : ", e.target.value);
    console.log("Value from props.editdata : ", props.editdata);
    // console.log(
    //   "handleData : ",
    //   guestNameInfoID,
    //   firstname,
    //   lastname,
    //   namePrefix,
    //   gender,
    //   idnumber,
    //   nationality
    // );
  };

  const handleAddDatatoDatabase = async (e) => {
    console.log(
      "handleData : ",
      // guestNameInfoID,
      namePrefix,
      firstname,
      lastname,
      gender,
      idnumber,
      nationality
    );
    let req = {
      guestnameinfoid: await Math.floor(Math.random() * (1000 - 99 + 1) + 99),
      nameprefix: namePrefix,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      idnumber: idnumber,
      nationality: nationality,
    };
    const data = await postIndividualProfile(
      sessionStorage.getItem("auth"),
      req
    );
    console.log("datafrom post", data);
  };

  const handleEditDatatoDatabase = async (e) => {
    let id = props.editdata.guestnameinfoid;
    console.log(
      "handleData : ",
      id,
      namePrefix,
      firstname,
      lastname,
      gender,
      idnumber,
      nationality
    );

    let req = {
      guestnameinfoid: id,
      nameprefix: namePrefix,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      idnumber: idnumber,
      nationality: nationality,
    };
    const data = await updateIndividualProfile(
      sessionStorage.getItem("auth"),
      id,
      req
    );
    console.log("datafrom post", data);
  };

  //data from button for  trigger (add or delete)
  React.useEffect(async () => {
    if (props.action == "add") {
      console.log("action add", props.action);
      await handleAddDatatoDatabase();
    } else if (props.action == "edit") {
      await handleEditDatatoDatabase();
      console.log("action edit", props.action);
    }
  }, [props.action]);

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
                                {detail.select.status === "AddRelation" ? (
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
                                    + Add
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
                                    + Add
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
                                    defaultValue={detail.select.data}
                                    onFocus={false}
                                  />
                                ) : detail.select.status === "fillnolabel" ? (
                                  <TextField
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
                                    defaultValue={detail.select.data}
                                    onChange={detail.handle}
                                  />
                                ) : detail.select.status === "fill" ? (
                                  <TextField
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
                                    defaultValue={detail.select.data}
                                    onChange={detail.handle}
                                  />
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
                                ) : (
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestDnD);
