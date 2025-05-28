Feature: adding a task

        Background: Opening the Create task modal
            Given I am on the Home page
              And I click on the "Create Task" button
              And I should see a modal appearing with a form

        Scenario: As a user, I want to add a task to the todo list
             When I fill in a task within the task input field with the placeholder "Enter a task"
              And I click on the "Add Task" button
             Then I should see the the "task" added to the todo list

        Scenario: As a user, I want to add a task with an empty input
             When I leave the task input field with the placeholder "Enter a task" empty
              And I click on the "Add Task" button
             Then I should see that the input field has a red background
              And I should see a error message "Input field for task should not be empty"

        Scenario As a user, I want to add a bullet item to the todo list
              And I fill in a bullet item within in the bullet input field with the placeholder "Add item to list..."
              And I click on the "Add Item" button
             Then I should see the bullet the added bullet item added in the bullet items list

        Scenario: As a user, I want to add a bullet item with an empty input
             When I leave the bullet input field with the placeholder "Add item to list..." empty
              And I click on the "Add Item" button
             Then I should see that the input field has a red background
              And I should see a error message "Input field to add a bullet should not be empty"

        Scenario: As a user, I want to remove an added task from the bullet item list
             When

