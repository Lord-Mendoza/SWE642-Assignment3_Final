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
