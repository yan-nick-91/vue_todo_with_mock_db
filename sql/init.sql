-- 1. Create enum for priority
CREATE TYPE priority_level AS ENUM ('High', 'Medium', 'Low');

-- 2. Create main table for tasks
CREATE TABLE tasks (
    id VARCHAR(30) PRIMARY KEY,
    task TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    priority priority_level NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_finished BOOLEAN DEFAULT FALSE,
    is_drafted BOOLEAN DEFAULT FALSE
);

-- 3. Create table for bullet list items
CREATE TABLE task_bullet_list (
    id VARCHAR(50) PRIMARY KEY,
    task_id VARCHAR(30) REFERENCES tasks(id) ON DELETE CASCADE,
    bullet_item TEXT NOT NULL,
    item_is_finished BOOLEAN DEFAULT FALSE
);

alter table task_bullet_list
drop constraint task_bullet_list_task_id_fkey,
add constraint task_bullet_list_task_id_fkey
foreign key (task_id) references tasks(id) on delete cascade;

