package com.swe642.hw3.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.swe642.hw3.model.SurveyTableEntity;
import com.swe642.hw3.service.SurveyTableService;

@Controller
@RequestMapping("/api/surveys")
@CrossOrigin
public class SurveyTableController {

	private SurveyTableService surveyTableService;

	public SurveyTableController(SurveyTableService surveyTableService) {
		this.surveyTableService = surveyTableService;
	}

	@GetMapping
	public ResponseEntity<List<SurveyTableEntity>> getAllSurveyEntries() {
		List<SurveyTableEntity> resp = surveyTableService.getAllSurveys();
		return new ResponseEntity<List<SurveyTableEntity>>(resp, HttpStatus.OK);
	}

	@PostMapping("/submit-survey")
	public ResponseEntity<SurveyTableEntity> saveSurveyEntry(@RequestBody SurveyTableEntity survey) {
		SurveyTableEntity resp = surveyTableService.saveSurveyEntry(survey);
		return new ResponseEntity<SurveyTableEntity>(resp, HttpStatus.OK);
	}

}
