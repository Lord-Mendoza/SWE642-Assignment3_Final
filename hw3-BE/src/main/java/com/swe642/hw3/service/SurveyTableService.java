/*
Lord Mendoza & Veeda Sherzadah
SWE 642

This interface holds the methods for the service layer for handling the API requests from controller.
 */

package com.swe642.hw3.service;

import java.util.List;

import com.swe642.hw3.model.SurveyTableEntity;

public interface SurveyTableService {

	SurveyTableEntity saveSurveyEntry(SurveyTableEntity survey);

	List<SurveyTableEntity> getAllSurveys();


}
