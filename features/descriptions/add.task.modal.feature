@smoke
Feature: adding a task

  Background: Opening the Create task modal
    Given I am on the Home page
    And I click on the "Create Task" button to open the create form modal
    And I should see a modal appearing with a form

  Scenario: As a user, I want to add a task to the todo list
    When I fill in a task within the task input field with the placeholder "Enter a task..."
    And I click on the "Add Task" button in order to add the task to the list
    Then I should see the "task 1" added to the todo list

  Scenario: As a user, I want to add a task with an empty task input field
    When I leave the task input field with the placeholder "Enter a task..." empty
    And I click on the "Add Task" button in order to add the task to the list
    Then I should see a error message "Input field for task should not be empty"

  Scenario: As a user, I want to add some bullet items to the todo list
    When I fill in a "<item-one>" within in the bullet input field with the placeholder "Add Item to list (Optional)..."
    And I click on the "Add item" button to add "<item-one>" to the bullet list
    And I fill in a "<item-two>" within in the bullet input field with the placeholder "Add Item to list (Optional)..."
    And I click on the "Add item" button to add "<item-two>" to the bullet list
    And I fill in a "<item-three>" within in the bullet input field with the placeholder "Add Item to list (Optional)..."
    And I click on the "Add item" button to add "<item-three>" to the bullet list

    Then I should see "<item-one>" added in the bullet items list
    And I should see "<item-two>" added in the bullet items list
    And I should see "<item-three>" added in the bullet items list

    Examples:
      | item-one | item-two | item-three |
      | item one | item two | item three |

# Scenario: As a user, I want to add a bullet item with an empty input
#      When I leave the bullet input field with the placeholder "Add item to list..." empty
#      And I click on the "Add Item" button
#      Then I should see that the input field has a red background
#      And I should see a error message "Input field to add a bullet should not be empty"

# Scenario: As a user, I want to remove an added task from the bullet item list
#      When

