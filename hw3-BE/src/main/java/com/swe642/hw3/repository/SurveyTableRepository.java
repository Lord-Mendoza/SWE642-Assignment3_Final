package com.swe642.hw3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swe642.hw3.model.SurveyTableEntity;

public interface SurveyTableRepository extends JpaRepository<SurveyTableEntity, Long> {

}
