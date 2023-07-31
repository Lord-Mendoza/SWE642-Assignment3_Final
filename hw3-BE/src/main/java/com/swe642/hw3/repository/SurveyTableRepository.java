/*
Lord Mendoza & Veeda Sherzadah
SWE 642

This repository holds the connection between the service layer and the JPA repository.
 */

package com.swe642.hw3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swe642.hw3.model.SurveyTableEntity;

public interface SurveyTableRepository extends JpaRepository<SurveyTableEntity, Long> {

}
