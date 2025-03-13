# TO-DO-LIST
# STEPS FOR THE USAGE OF THE APP
In this TODO app we can save a project full of todo's
1 . first we have to click the add project buttton
2 . Then enter the project name and enter
   2.1. If you want you can edit the project name by clicking the edit button
   2.2. If you want to delete the project you can delete the whole project
3 . Then click on the project card you can see that the add todo will apperar in the main content screen beside the aside bar
4 . In top it will show the project name.
5 . Below it you can see the addtodo button .
6 . By clicking it you can see a form which asks you to enter the TODO, startDate, endDate, Check box for todo completion 
    status
7 . after entering the requied fields hit confirm button.
8 . Now you can see a card of the TODO
9 . You can edit the TODO by clicking the edit button can save the changes
10. You can also delete the TODO's
11. Like this you can store multiple Projects with diferent TODO's
12. We can also view all the TODO's in all projects by clicking the all tasks button.

# STORAGE 
So, In this web application i have user localStorage and user the localStorage methods to enter the data and fetch the data from  the localstorage.

# Approach i implemented in this app
So, In This web application follows a modular approach, ensuring code reusability and maintainability. The key implementation aspects include:

# Separation of Concerns:

Different functionalities are handled through separate JavaScript modules, ensuring a clear structure.

Each module is responsible for a specific feature, such as project management, To-Do item handling, and localStorage operations.

# Event-Driven Architecture:

The application responds dynamically to user interactions through event listeners.

Clicking buttons triggers functions that manipulate the DOM and update localStorage accordingly.

# Data Persistence with localStorage:

Data is stored in JSON format, ensuring structured and readable storage.

Methods are implemented to fetch, insert, update, and delete data efficiently.

# Efficient UserInterface Updating:

The application dynamically updates the UI based on changes in localStorage.

DOM manipulation techniques are used to add, modify, and remove elements without full page reloads. 




