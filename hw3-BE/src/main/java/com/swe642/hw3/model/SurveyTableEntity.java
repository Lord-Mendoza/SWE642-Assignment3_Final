/*
Lord Mendoza & Veeda Sherzadah
SWE 642

This model represents the entity of the backend for the survey_table table & all its columns/column-types.
 */

package com.swe642.hw3.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "survey_table")
public class SurveyTableEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "street_address", nullable = false)
  private String streetAddress;

  @Column(name = "city", nullable = false)
  private String city;

  @Column(name = "zip", nullable = false)
  private int zip;

  @Column(name = "state", nullable = false)
  private String state;

  @Column(name = "phone", nullable = false)
  private String telephoneNo;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "date", nullable = false)
  private String dateOfSurvey;
  
  @Column(name = "liked_most_about_university")
  private String likedMostAboutUniversity;
  
  @Column(name = "interest_in_univ")
  private String flexInterest;
  
  @Column(name = "recommend_likelihood")
  private String recommendLikelihood;
  
  @Column(name = "more_feedback")
  private String moreFeedback;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getStreetAddress() {
    return streetAddress;
  }

  public void setStreetAddress(String streetAddress) {
    this.streetAddress = streetAddress;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public int getZip() {
    return zip;
  }

  public void setZip(int zip) {
    this.zip = zip;
  }


  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getTelephoneNo() {
    return telephoneNo;
  }

  public void setTelephoneNo(String telephoneNo) {
    this.telephoneNo = telephoneNo;
  }

  public String getDateOfSurvey() {
    return dateOfSurvey;
  }

  public void setDateOfSurvey(String dateOfSurvey) {
    this.dateOfSurvey = dateOfSurvey;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getLikedMostAboutUniversity() {
    return likedMostAboutUniversity;
  }

  public void setLikedMostAboutUniversity(String likedMostAboutUniversity) {
    this.likedMostAboutUniversity = likedMostAboutUniversity;
  }

  public String getFlexInterest() {
	return flexInterest;
}

public void setFlexInterest(String flexInterest) {
	this.flexInterest = flexInterest;
}

public String getRecommendLikelihood() {
    return recommendLikelihood;
  }

  public void setRecommendLikelihood(String recommendLikelihood) {
    this.recommendLikelihood = recommendLikelihood;
  }

  public String getMoreFeedback() {
    return moreFeedback;
  }

  public void setMoreFeedback(String moreFeedback) {
    this.moreFeedback = moreFeedback;
  }

@Override
public String toString() {
	return "SurveyTableEntity [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", streetAddress="
			+ streetAddress + ", city=" + city + ", zip=" + zip + ", state=" + state + ", telephoneNo=" + telephoneNo
			+ ", email=" + email + ", dateOfSurvey=" + dateOfSurvey + ", likedMostAboutUniversity="
			+ likedMostAboutUniversity + ", howInterestInUniversity=" + flexInterest
			+ ", recommendLikelihood=" + recommendLikelihood + ", moreFeedback=" + moreFeedback + "]";
}


}
