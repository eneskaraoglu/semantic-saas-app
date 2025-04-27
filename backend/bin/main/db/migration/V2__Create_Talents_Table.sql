CREATE TABLE talents (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    skills TEXT,
    experience TEXT,
    education TEXT,
    date_of_birth DATE,
    location VARCHAR(100),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    resume_url VARCHAR(255),
    current_position VARCHAR(100),
    desired_position VARCHAR(100),
    salary_expectation DECIMAL(12,2),
    availability VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER talents_update_timestamp
BEFORE UPDATE ON talents
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Create index to improve query performance when fetching talents by customer
CREATE INDEX idx_talents_customer_id ON talents (customer_id);

-- Create index to improve email search 
CREATE INDEX idx_talents_email ON talents (email);

-- Insert sample talent data
INSERT INTO talents (
    customer_id, 
    first_name, 
    last_name, 
    email, 
    phone, 
    skills, 
    experience, 
    education,
    location,
    current_position,
    desired_position,
    salary_expectation,
    availability,
    notes
) VALUES 
(1, 'John', 'Smith', 'john.smith@example.com', '+1-555-123-4567', 
 'Java, Spring Boot, React, TypeScript, Docker, Kubernetes', 
 'Senior Software Engineer at Tech Corp (2018-Present)
Backend Developer at Code Solutions (2015-2018)
Junior Developer at StartupXYZ (2013-2015)', 
 'MS Computer Science, Stanford University
BS Computer Engineering, MIT', 
 'San Francisco, CA', 
 'Senior Software Engineer', 
 'Engineering Manager', 
 120000.00, 
 '2 weeks notice', 
 'Great candidate with leadership potential'
),
(1, 'Emily', 'Johnson', 'emily.johnson@example.com', '+1-555-987-6543', 
 'Python, Django, Flask, React, AWS, Data Analysis', 
 'Full Stack Developer at WebTech Inc (2019-Present)
Data Analyst at Analytics Co (2016-2019)', 
 'BS Computer Science, UC Berkeley', 
 'Seattle, WA', 
 'Full Stack Developer', 
 'Senior Developer', 
 110000.00, 
 'Immediate', 
 'Strong problem-solving skills and quick learner'
),
(1, 'Michael', 'Williams', 'michael.williams@example.com', '+1-555-234-5678', 
 'C#, .NET, Azure, SQL Server, Angular, DevOps', 
 '.NET Developer at Enterprise Solutions (2017-Present)
IT Consultant at Tech Advisors (2014-2017)', 
 'BS Information Technology, Georgia Tech', 
 'Austin, TX', 
 '.NET Developer', 
 'Cloud Architect', 
 115000.00, 
 '1 month notice', 
 'Excellent communication skills and team player'
);
