# PROJECT DETAILS

**Project Name: REPL**

Team members and contributions: jlardner, lyangmac, ssdhulip, lcapozza

Estimated time: 30 hours

Project Description:
Our project is meant to be a fun tool to visualize teammate connections in the WNBA while also creating more awareness for the WNBA and women’s sports in general. Broadly, the project allows a user to input two WNBA players and find the teammates connections (Essentially, if player A and player C are inputted, the output may say Player A played with Player B on this team in this year, and Player B played with player C on this team in this year). It is a fun application of the “degrees of separation” concept, and inspired by the application of this concept to NBA players. We wanted to create this website as though multiple instances of it exist for the NBA, nothing exists for the NBA itself. We feel this project will be a good way to provide more visibility to women’s sports by letting users learn about players, as well as providing links to buy tickets to watch the teams play.

Link to repo: https://github.com/cs0320-f23/term-project-jlardner-Lcapozza-ssdhulip-lyangmac

# DESIGN CHOICES

Relationships between classes/interfaces:

Our project is primarily portioned into backend, front end, and data. Our backend consists of a top level serve object which creates the necessary endpoints so that the given information is needed. The three main endpoints are for:
-Ticketing, which takes in a team name and provides the link to ticketing information in a JSON
-Dataset, which returns a JSON with all players that have played in the WNBA
-Connections, which returns a JSON with the connections between two players.
The connections are made using a graph, which is constructed from the defined data. This graph is then searched using a BFS implementation and returns the given information.
The data portion is meant to mimic information that might be received in some sort of API call. We could not find a service that would give us this information, so we entered it manually. Thankfully, the WNBA is rather small which made this a possible task.
The Front end is made using a hierarchy of components that are used to display the information. The App is the highest level component which defines portions of the page within it. See comments for more details.

Some key design choices include:

- Using a graph object (essentially a wrapped hashmap) to store the information needed to find connections
- Using a BFS algorithm to find the shortest connections between each player. There were some other options we read about, but BFS was the simplest, most efficient and understandable
- The use of edge objects rather than node objects, as the edges were deemed to be the most important part of the graph for this applications, representing the connections between each player
- Using the back end to grab all the players that played in the WNBA. We debated whether this should be put in the front end, but it felt more realistic to put it in the backend where most of the data was stored. It also is closer to mimicking what we would do with an actual WNBA API.

# ERRORS/BUGS

- No known bugs at this time

# TESTS

We ran a variety of unit tests on mocked data, and integration tests using playwright. See the files in the front end and back end respectively for comments pertaining to each individual test.

# ACCESSIBILITY

Several accessibility measures were taken to ensure a good user experience. There are several keyboard shortcuts described in the how-to that are used to navigate the page. Everything in the page is navigable using these shortcuts, as well as the tab key. Extra care was taken to ensure the site would still be functional at a higher zoom level as well. Finally, we ensured that all data on the screen was able to be read using a traditional screen reader.

# HOW TO…

How to run tests:
Use the terminal to navigate to the front end and run “npx playwright test”
For back end testing, locate the testing file and use the green play button to start the tests.

How to build and run program:
Navigate to the back end folder and locate Main.java. Run this program to start the back end server. Use the terminal to navigate to the maps folder within the src folder. Run “npm run dev” in the terminal to run the front end.
The user can input two players' names and find the connections between them, displayed directly below where the information was entered. A dropdown should appear that holds a list of players that played in the WNBA which automatically filters as the user types. The user can click on this dropdown to automatically enter the name. A history is present to the left where the user can also click on it to automatically enter the information.

Keyboard shortcuts:
Command + i focuses on the first input box (press tab to move to the next box)
Command + u presses the about button which displays information in a popup
Command + Enter pressed the submit button
Arrow up and Arrow down scroll the page
Pressing tab should highlight necessary elements.
