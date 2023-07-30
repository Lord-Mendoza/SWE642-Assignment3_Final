package com.swe642.hw3.service;

import java.util.List;

import com.swe642.hw3.model.SurveyTableEntity;

public interface SurveyTableService {
	
	SurveyTableEntity saveSurveyEntry(SurveyTableEntity survey);
	
	List<SurveyTableEntity> getAllSurveys();


}
