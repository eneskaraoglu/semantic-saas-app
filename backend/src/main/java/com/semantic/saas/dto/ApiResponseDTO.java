package com.semantic.saas.dto;

public class ApiResponseDTO {
    private Boolean success;
    private String message;
    private Object data;
    
    public ApiResponseDTO() {
    }
    
    public ApiResponseDTO(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public ApiResponseDTO(Boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    
    // Static factory methods
    public static ApiResponseDTO success(String message) {
        return new ApiResponseDTO(true, message);
    }
    
    public static ApiResponseDTO success(String message, Object data) {
        return new ApiResponseDTO(true, message, data);
    }
    
    public static ApiResponseDTO error(String message) {
        return new ApiResponseDTO(false, message);
    }
    
    // Getters and Setters
    public Boolean getSuccess() {
        return success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Object getData() {
        return data;
    }
    
    public void setData(Object data) {
        this.data = data;
    }
}
