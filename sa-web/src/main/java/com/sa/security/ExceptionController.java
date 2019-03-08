package com.sa.security;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(value = IOException.class)
	public ResponseEntity<Object> exception(IOException exception) {
		return new ResponseEntity<>("Unable to handle request. Please contact administrator", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}