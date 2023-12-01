# wnba-jlardner-lyangmac
# PROJECT DETAILS


**Project Name: REPL**


Team members and contributions: jlardner, lyangmac
Estimated time: 20 hours
Link to repo: https://github.com/cs0320-f23/maps-jlardner-lyangmac


# DESIGN CHOICES


Relationships between classes/interfaces:


Our project is divided between the front end repository (called src in this case) and the back end repository, each working to create a full end to end project. 
Our front end is made using typescript, where we create our application in the App class. Here, the Input class is put at the top of the screen where the user can input commands, press a button to submit, and see certain information about the responses to these searches. The Mapbox component is placed underneath this, an element that represents a Map with an overlay on redlining information via an overlay. The user can click on points on the screen where they can then click on certain parts of the map to get redlining information. This information is passed back to the app class via a set state passed as a prop. The final component of the front end is another text field where information from clicks on the Mapbox are displayed.
Our back end remains mostly unchanged from previous projects, with a few additions. The back end still represents a server where API calls can be made. We added additional functionality that allows for the server to return a predefined JSON representing redlining data, to return certain parts of the data based on a bounding box, as well as searching this json data for key terms. 
This functionality is all used in combination with the front end to make the overlay visible and highlight certain parts of the map upon a search in our text box. We additionally allow the user to search broadband data using the text box, which is displayed to the user.


Some key design choices include:
- We added the functionality of allowing the user to search broadband data for our specific stakeholder. This allows the user to visualize historical redlining data and additionally search broadband information in the specific counties where the data seems more redlined. This will allow the stakeholder to be able to form some sort of connection between the historical redlining data and the modern redlining.
- We created Feature and FeatureCollection records to be able to parse information from the given JSON file into our backend. This made the process of searching and filtering this very large data set a lot more manageable.
- We further used MyGeometry and MyProperties classes to hold information within these records. By using encapsulation, it makes the search process a lot more simple and readable
- We used a cache to save queries and responses to our backend, particularly for calls to filter the data based on a bounding box. We store the given coordinates that are inputted and the actual feature collection that is returned for those coordinates are used.
- We used mocked data for the purposes of front end tests, specifically for searching key values. 


# ERRORS/BUGS


- No known bugs at this time. The overlay takes a little time to load, but we feel this is expected. 


# TESTS


Our testing suite is contained in 2 folders: backend/test and src/test. src/test contains our Playwright tests involving the frontend, while backend/test contains our Junit tests involving the backend. 


# ACCESSIBILITY
Instead of having to press the submit button, a user can press the enter key to submit a command. Additionally, they can switch through the various outputs around the screen with the tab key, allowing them to navigate the website without using the touchpad. If they are using a screen reader, it will read off commands and outputs. 


# HOW TO...


How to run tests:
Use the terminal to navigate to [insert folder later] and run “npx playwright test”


How to build and run program:
Navigate to the back end folder and locate Main.java. Run this program to start the back end server. Use the terminal to navigate to the wnba folder within the src folder. Run “npm run dev” in the terminal to run the front end.
The user can interact with the map by clicking and zooming to view highlighted redlining data. Clicking on highlighted areas will display information about the area on the bottom of the screen. The user can enter commands in the text box, and by pressing submit or pressing Enter on the keyboard, submit these commands and view the output directly below. The following commands are supported:

broadband [county] [state] => view percentage of broadband access in that county *
search [key word] => highlights certain redlined areas given that key term


*Do not include “County” after county name (i.e., use “broadband Bristol Massachusetts” instead of “broadband Bristol County Massachusetts”
Also, any queries with spaces should be inputted with %20 (i.e. “broadband Providence Rhode%20Island”, “broadband Santa%Clara California”, “search Key%20Term”


# REFLECTION QUESTION
Question:
Whose Labor?
Your finished Maps product is built using many systems: programming languages, development environments, software packages, hardware, etc. Whose labor do you rely on when you run environments, software packages, hardware, etc. Whose labor do you rely on when you run your capstone demo? Enumerate at least 12 different packages, tools, hardware components, etc. that you implicitly or explicitly used during this week's work.


Response:
There are many different tools that we rely on to create project:
1. _IntelliJ and Visual Studio Code Coding Environments_
We use these to help actually craft our code, and within these environments we use the supported components to make our code work.
2. _React, Playwright_
We use these specific packages to ensure that our code will run as well as for testing the functionality of our code
3. _Moshi_
This is a specific package that allows us to read information from JSON files and convert them to a more useful format for us to use within our code.
4. _Google’s Guava Cache_
This is a tool that is used to create a cache object. We rely on this to store information from calls to not only our own server, but also calls to other servers
5. _Spark_
Spark is a tool that we rely on to create the server we need on our local machine. This is essential to our project, and is used to link the front end and back end of our project.
6. _MapBox_
Specifically in this project, we rely on MapBox to be used in the actual creation of the map on our front end. We use this package in tandem with redlining JSON data to create the interactive map that we see in our project.
7. _Java and Typescript Coding Languages_
These languages overall are indeed tools (though in a less explicit manner) that we use to form the logic we need to create our projects.
8. _Macbook Laptop Computers_
Our physical machine contains the hardware, i.e. the processors, ram, storage, etc. needed to compute the logic necessary for our code to be created and to run
9. _Apple Operating System_
The operating systems contained on these computers can be used to manage the files and provide useful intractability that we need to form this project
10. _GitHub_
Github is an extremely useful tool that we rely on to store and share code not just between us as partners, but also the rest of the class.
11. _Gradescope_
Gradescope is a tool that we use in our project, though not explicitly. We use this tool to be able to submit our work and connect our work to the TAs. This helps us understand changes we need to make as we move forward in the class, as well as understand where we made the right decisions.
12. _Brown University Wifi_
Brown University wifi is a tool we use, again less explicitly, to create our projects. It allows us to take advantage of the interconnectedness that services, like GitHub and Gradescope, provide.
13. _Census API_
We rely on the census API to allow for key functionality in our program. We specifically use this data to allow users to understand the link between historical redlining data and modern redlining via access to fast internet.


These are all essential tools we use throughout the creation and demonstration of our final program. We rely on the labor of the engineers that create and maintain these systems to keep our operation running smoothly.
