CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    program_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT DEFAULT 5, -- Duration in minutes
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    completed_at TIMESTAMP DEFAULT NULL, -- NULL means not completed
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);


CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    program_id INT NOT NULL,
    activity_id INT NOT NULL,
    day_number INT NOT NULL, -- E.g., Day 1, Day 2, ...
    is_mandatory BOOLEAN DEFAULT TRUE, -- If this activity is required for the day
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

//======================================================================================================

CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    program_id INT NOT NULL,
    day_number INT NOT NULL,          -- The day number in the program (e.g., 1, 2, 3, …)
    activity_id INT NOT NULL,         -- The ID of the activity assigned on that day
    activity_order INT DEFAULT 1,     -- Optional: if multiple activities exist for a day, order them
    is_mandatory BOOLEAN DEFAULT TRUE, -- Indicates if this activity is mandatory for the day
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

//==================================================================================================

CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    program_id INT NOT NULL,
    day_number INT NOT NULL,          -- The day number in the program (e.g., Day 14, Day 15, etc.)
    activity_id INT NOT NULL,         -- The ID of the activity assigned on that day
    activity_order INT DEFAULT 1,     -- Order in which the activity appears if there are multiple activities on the same day
    is_mandatory BOOLEAN DEFAULT TRUE, -- Whether this activity is mandatory on that day
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

//=======================================================================================================

CREATE TABLE user_task_completion (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    program_id INT NOT NULL,
    day_number INT NOT NULL,
    activity_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_activity FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);
