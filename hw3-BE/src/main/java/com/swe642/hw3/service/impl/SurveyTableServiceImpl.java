/*
Lord Mendoza & Veeda Sherzadah
SWE 642

This class is the implementation of the interface of the service layer, where the individual queries
are performed for retrieving list of saved surveys to db, and saving a row of survey data to table in the
db.
 */

package com.swe642.hw3.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.swe642.hw3.model.SurveyTableEntity;
import com.swe642.hw3.repository.SurveyTableRepository;
import com.swe642.hw3.service.SurveyTableService;

@Service
public class SurveyTableServiceImpl implements SurveyTableService {

	public SurveyTableRepository surveyTableRepo;

	public SurveyTableServiceImpl(SurveyTableRepository surveyTableRepo) {
		super();
		this.surveyTableRepo = surveyTableRepo;
	}

	@Override
	public SurveyTableEntity saveSurveyEntry(SurveyTableEntity survey) {
		survey.setId(null);
		return surveyTableRepo.save(survey);
	}

	@Override
	public List<SurveyTableEntity> getAllSurveys() {
		return surveyTableRepo.findAll();
	}

}
