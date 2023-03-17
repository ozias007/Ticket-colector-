# WPRG281 Project: Bug tracker application

This project is a web-based bug-tracking application. It was built to be submited as a group assignment.

## Group members

* Ozias Mulenda
* Leonard Bezuidenhout
* Simphiwe Nkgau
* Tiaan van Rooyen
#
## Key features
* Add / edit / remove software projects
* Add / edit / remove project team members
* Add / edit / remove bugs related to a software project
* Tracking of the status of issues.
#
## Technologies used
The majority of the project was built using plane HTML, CSS and Javascript.
Bootstrap was used to speed up the development of certain aspects of the system, such as the modals used to display forms to the user. Since the project does not utilize JQuery anywhere, Bootstrap 5 was used for these features as it is the latest version of the framework.
#
## User Interface

### login screen
![Login screen](design-mockups/Login.png)

### Projects menu
![Project screen](design-mockups/ProjectsScreen.png)

### People screen
![People screen](design-mockups/PeopleScreen.png)

### Bugs screen
![Bugs screen](design-mockups/BugsScreen.png)
#
## Data storage and Objects
### Storage
The application stores data locally using the Web Storage API. It creates a new entry with the key 'appData'. That entry stores an array of project objects.
### Project object
A project object consists of the following properties:
* Project name - String containing the project's name.
* Project description - String containing a project description
* Team members - Array of type Person
* Bugs - Array of type Bug
### Person object
A person object consists of:
* Firstname - String containing the person's firstname
* Lastname - String containing the person's lastname
* Role - String containing the person's role in the project
### Bug object
A bug object consists of:
* summary - String containing a short summary of the bug
* details - String containing more details about the bug
* owner - String contianing the name of the person responable for fixing the bug.
* priority - Can be 'high', 'medium' or 'low'
* status - Can be 'open', 'overdue' or 'resolved'
#
## Potential future updates
Due to the time and scope constraints of this project, only a very limited number of features were added. In time, more features could be implemented, such as:
* More autonomous tracking of bugs
* Ability to add multiple users and sign them in.
* Responsive design for a better moblie experience of the application.
* The use of an online database such as firebase or mongoDB, to provide the user with the bug tracking service across different devices.
#