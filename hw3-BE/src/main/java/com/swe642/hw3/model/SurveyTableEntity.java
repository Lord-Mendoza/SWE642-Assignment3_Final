package com.swe642.hw3.model;

import java.sql.Date;
import java.util.List;

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
  private Date dateOfSurvey;
  @Column(name = "likedMostAboutUniversity")
  private List<String> likedMostAboutUniversity;
  @Column(name = "recommendLikelihood")
  private String recommendLikelihood;
  @Column(name = "moreFeedback")
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

  public Date getDateOfSurvey() {
    return dateOfSurvey;
  }

  public void setDateOfSurvey(Date dateOfSurvey) {
    this.dateOfSurvey = dateOfSurvey;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public List<String> getLikedMostAboutUniversity() {
    return likedMostAboutUniversity;
  }

  public void setLikedMostAboutUniversity(List<String> likedMostAboutUniversity) {
    this.likedMostAboutUniversity = likedMostAboutUniversity;
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
    return "SurveyTableEntity [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName
      + ", streetAddress=" + streetAddress + ", city=" + city + ", zip=" + zip + ", state=" + state
      + ", telephoneNo=" + telephoneNo + ", email=" + email + ", dateOfSurvey=" + dateOfSurvey
      + ", likedMostAboutUniversity=" + likedMostAboutUniversity.toString() + ", recommendLikelihood="
      + recommendLikelihood + ", moreFeedback=" + moreFeedback
      + "]";
  }


}
