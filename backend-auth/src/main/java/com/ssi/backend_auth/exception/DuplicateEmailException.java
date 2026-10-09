package com.ssi.backend_auth.exception;

public class DuplicateEmailException extends RuntimeException{

    public DuplicateEmailException(String message){
        super(message);
    }

}