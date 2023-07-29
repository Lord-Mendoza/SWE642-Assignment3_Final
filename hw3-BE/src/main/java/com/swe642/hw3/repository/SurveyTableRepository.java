package com.swe642.hw3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swe642.hw3.entities.SurveyTableEntity;

@Repository
public interface SurveyTableRepository extends JpaRepository<SurveyTableEntity, Long> {

}
