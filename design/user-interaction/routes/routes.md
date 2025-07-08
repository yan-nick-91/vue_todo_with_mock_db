# Routes

![RouteNavigation](Global%20navigation%20page%20todo%20list-Page-2.drawio.png)

## Home/ToDo (Page)

This is the main page (currently the dashboard) where the user will be navigated when visiting the To Do Application. The user can navigate to other other three pages:

- The Completed List page
- The Daft List page
- The Task page (only accessible by using the rendered ID of the task)

The Homepage is the only page that is only page that is able to create a new task by clicking the create task task button. This will open a form where the user will be able to enter input fields in order to add a new task to the to do list.

Under the hood the form task is getting a data value create for the mode property, so that the form component will recognize that it should act like a create a form task. More about later in the document in the section `Feature: Form (Modal)`.
