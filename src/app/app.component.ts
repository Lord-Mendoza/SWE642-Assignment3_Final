/*
Lord Mendoza - G00841164
SWE 642 - HW2
*/

import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
// @ts-ignore
import * as xmlToJSON from "xmlToJSON";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWE642-Assignment3';

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
  }

  isEmptyString(val: any) {
    return typeof val === "string" && val === "";
  }

  validateSurveyData() {
    let requiredFields = [
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

    let hasMissingRequiredField = false;
    for (let i = 0; i < requiredFields.length; i++) {
      let currentRequiredField = requiredFields[i];

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

  submitSurveyForm() {
    alert("Submitted!");
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
}