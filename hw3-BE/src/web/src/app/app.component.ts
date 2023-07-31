/*
Lord Mendoza  & Veeda Sherzadah
SWE 642
The following file defines all functionality of the webpage for submitting/resetting the survey, retrieving city/state based on zip, etc.
*/

import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
// @ts-ignore
import * as xmlToJSON from "xmlToJSON";

interface SurveyData {
  firstName: string,
  lastName: string,
  streetAddress: string,
  city: string,
  state: string,
  zip: string,
  telephoneNo: string,
  email: string,
  dateOfSurvey: Date,
  likedMostAboutUniversity: String[],
  flexInterest: string,
  recommendLikelihood: string,
  moreFeedback: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWE642-Assignment3';
  previousSurveyData: SurveyData[] = [];

  requiredFields = [
    "inputFirstName",
    "inputLastName",
    "inputStreetAddress",
    "inputCityAddress",
    "inputStateAddress",
    "inputZipAddress",
    "inputTelephone",
    "inputEmail",
    "inputDate"
  ];

  fields = [
    "inputFirstName",
    "inputLastName",
    "inputStreetAddress",
    "inputCityAddress",
    "inputStateAddress",
    "inputZipAddress",
    "inputTelephone",
    "inputEmail",
    "inputDate",
    "likedMostAboutUniversity",
    "flexInterest",
    "recommendLikelihood",
    "textAreaComment"
  ];

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  viewPage(targetPage: string) {
    ["welcomePage", "survey", "allSurvey"].filter(page => (page !== targetPage))
      .forEach(page => {
        // @ts-ignore
        document.getElementById(page).style.display = 'none';
      })

    // @ts-ignore
    document.getElementById(targetPage).style.display = 'block';

    // @ts-ignore
    document.getElementById("personalInfoAlert").style.display = 'none'

    if (targetPage === "allSurvey")
      this.getPreviousSurveyData();
  }

  isEmptyString(val: any) {
    return typeof val === "string" && val === "";
  }

  validateSurveyData() {
    let hasMissingRequiredField = false;
    for (let i = 0; i < this.requiredFields.length; i++) {
      let currentRequiredField = this.requiredFields[i];

      // @ts-ignore
      let currentRequiredFieldValue = document.getElementById(currentRequiredField).value;

      if (this.isEmptyString(currentRequiredFieldValue)) {
        hasMissingRequiredField = true;
        break;
      }
    }

    if (hasMissingRequiredField) {
      // @ts-ignore
      document.getElementById("personalInfoAlert").style.display = 'block';
      // @ts-ignore
      document.getElementById("personalInfoAlertMessage").innerHTML = "Please fill in all required fields."
    } else {
      let addressIDsArray = [
        "inputStreetAddress",
        "inputCityAddress",
        "inputStateAddress",
        "inputZipAddress"
      ]

      let hasInvalidAddress = false, hasInvalidZip = false, hasInvalidStreetAddress = false, invalidAddressFieldID = '';
      for (let i = 0; i < addressIDsArray.length; i++) {
        let currentAddressFieldID = addressIDsArray[i];
        // @ts-ignore
        let currentAddressFieldValue = document.getElementById(currentAddressFieldID).value;

        if (currentAddressFieldID === "inputZipAddress") {
          if (this.isEmptyString(currentAddressFieldValue) || /[^0-9]/.test(currentAddressFieldValue)) {
            hasInvalidAddress = true;
            hasInvalidZip = true;
          }
        } else if (currentAddressFieldID === "inputStreetAddress") {
          if (this.isEmptyString(currentAddressFieldValue) || /[^a-zA-Z0-9\s]/.test(currentAddressFieldValue)) {
            hasInvalidAddress = true;
            hasInvalidStreetAddress = true;
          }
        } else {
          if (this.isEmptyString(currentAddressFieldValue) || /[^a-zA-Z]/.test(currentAddressFieldValue)) {
            hasInvalidAddress = true;
          }
        }

        if (hasInvalidAddress) {
          invalidAddressFieldID = currentAddressFieldID;
          break;
        }
      }

      //Second round is checking if address fields has non-alphanumeric values, then show alert message.
      if (hasInvalidAddress) {
        // @ts-ignore
        document.getElementById("personalInfoAlert").style.display = 'block';
        // @ts-ignore
        document.getElementById("personalInfoAlertMessage").innerHTML = hasInvalidZip ? 'Zip code should only be numbers.'
          : hasInvalidStreetAddress ? 'Street Address should only contain alphanumeric values.'
            : 'City/State fields should only contain alphabetical values.';

        // @ts-ignore
        document.getElementById(invalidAddressFieldID).value = '';
      } else {
        // @ts-ignore
        let emailValue = document.getElementById("inputEmail").value;

        //Last round checks if email is of a valid format; otherwise, show alert message.
        // Regex from: https://stackoverflow.com/a/8897615
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailValue)) {
          // @ts-ignore
          document.getElementById("personalInfoAlert").style.display = 'block';
          // @ts-ignore
          document.getElementById("personalInfoAlertMessage").innerHTML = 'Email format is invalid, please try again.';

          // @ts-ignore
          document.getElementById("inputEmail").value = '';
        } else {
          // @ts-ignore
          document.getElementById("personalInfoAlert").style.display = 'none';
          this.submitSurveyForm();
        }
      }
    }
  }

  resetSurveyForm() {
    // @ts-ignore
    document.getElementById("personalInfoAlert").style.display = 'none';
    // @ts-ignore
    document.getElementById("surveyForm").reset();
  }

  getCityStateFromZip() {
    // @ts-ignore
    let zipValue = document.getElementById("inputZipAddress").value;

    if (zipValue && zipValue.length === 5 && /^\d+$/.test(zipValue)) {
      let xmlData = '<CityStateLookupRequest USERID="|USER_ID|"><ZipCode ID="0"><Zip5>|ZIP_CODE|</Zip5></ZipCode></CityStateLookupRequest>'
        .replace("|USER_ID|", "0GEORG5470T13")
        .replace("|ZIP_CODE|", String(parseInt(zipValue)));

      let apiUrl = "https://secure.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML=" + xmlData;

      // @ts-ignore
      document.getElementById("inputZipAddress").className = 'form-control';

      axios.get(apiUrl)
        .then(response => {
          let data = xmlToJSON.parseString(response.data);
          let city = data["CityStateLookupResponse"][0]['ZipCode'][0]['City'][0]['_text'];
          let state = data["CityStateLookupResponse"][0]['ZipCode'][0]['State'][0]['_text'];

          // @ts-ignore
          document.getElementById("inputCityAddress").value = city;
          // @ts-ignore
          document.getElementById("inputStateAddress").value = state;

          // @ts-ignore
          document.getElementById("inputZipAddress").disabled = false;
        })
    } else {
      // @ts-ignore
      document.getElementById("inputZipAddress").className = 'form-control is-invalid';

      // @ts-ignore
      document.getElementById("inputCityAddress").value = '';
      // @ts-ignore
      document.getElementById("inputStateAddress").value = '';
    }
  }

  submitSurveyForm() {
    let apiUrl = 'http://localhost:8080/api/surveys/submit-survey';

    let fieldsMapping = {
      "inputFirstName": "firstName",
      "inputLastName": "lastName",
      "inputStreetAddress": "streetAddress",
      "inputCityAddress": "city",
      "inputStateAddress": "state",
      "inputZipAddress": "zip",
      "inputTelephone": "telephoneNo",
      "inputEmail": "email",
      "inputDate": "dateOfSurvey",
      "likedMostAboutUniversity": "likedMostAboutUniversity",
      "flexInterest": "howInterestInUniversity",
      "recommendLikelihood": "recommendLikelihood",
      "textAreaComment": "moreFeedback"
    };

    let postData = {};
    for (let i = 0; i < this.fields.length; i++) {
      let currentField = this.fields[i];

      let currentFieldValue;
      if (currentField === "recommendLikelihood") {
        // @ts-ignore
        currentFieldValue = document.getElementsByName(currentField)[0].value;
      } else if (["likedMostAboutUniversity", "flexInterest"].includes(currentField)) {
        // @ts-ignore
        currentFieldValue = document.getElementsByName(currentField);

        let checkedItems = [];
        for (let j = 0; j < currentFieldValue.length; j++) {
          // @ts-ignore
          if (currentFieldValue[j].checked) { // @ts-ignore
            checkedItems.push(currentFieldValue[j].defaultValue);
          }
        }

        currentFieldValue = checkedItems;
      } else {
        // @ts-ignore
        currentFieldValue = document.getElementById(currentField).value;
      }

      if (
        (!["likedMostAboutUniversity", "flexInterest"].includes(currentField) && !this.isEmptyString(currentFieldValue))
        || (["likedMostAboutUniversity", "flexInterest"].includes(currentField) && currentFieldValue.length > 0)) {
        // @ts-ignore
        postData[fieldsMapping[currentField]] = currentFieldValue;
      }
    }

    axios.post(apiUrl, postData)
      .then(() => {
        alert("Form Submitted!")
      }).catch(() => {
      alert("Form failed to submit, please try again!")
    })
  }

  getPreviousSurveyData() {
    let apiUrl = 'http://localhost:8080/api/surveys/get-all-surveys';

    axios.get(apiUrl)
      .then(response => {

        console.warn(new Date())
        let data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          this.previousSurveyData = data;
        } else {
          this.previousSurveyData = [];
        }
      }).catch(() => {
      this.previousSurveyData = [];
    })
  }
}
