package com.swe642.hw3.web.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.swe642.hw3.entities.SurveyTableEntity;
import com.swe642.hw3.service.SurveyTableService;

@Controller
@RequestMapping("/api/survey-table")
public class SurveyTableResource {
	
	private SurveyTableService surveyTableService;
	
	public SurveyTableResource(SurveyTableService surveyTableService) {
		this.surveyTableService = surveyTableService;
	}
	
	@GetMapping
	public ResponseEntity<List<SurveyTableEntity>> getAllSurveyEntries() {
		ArrayList<SurveyTableEntity> resp = new ArrayList<SurveyTableEntity>();
		return new ResponseEntity<List<SurveyTableEntity>>(resp, HttpStatus.OK);
	}

}
