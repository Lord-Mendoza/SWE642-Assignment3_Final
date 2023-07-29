package com.swe642.hw3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.swe642.hw3.repository.*")
@ComponentScan(basePackages = { "com.swe642.hw3.*" })
@EntityScan("com.swe642.hw3.entities.*")   
public class Hw3Application {

	public static void main(String[] args) {
		SpringApplication.run(Hw3Application.class, args);
	}

}
