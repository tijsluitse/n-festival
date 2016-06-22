# N-Festival application

![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-html.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-css.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)

## The project
Final Master Exercise - Minor Everything Web

### Client 
van Lennep Design & Hogeschool van Amsterdam

### Contributors
- Lisa Klein (Backend Developer)
- Linda van Dijk (Frontend Designer)
- Tijs Luitse (Frontend Developer)

### Live url
Url: [https://nfest.lisaklein.nl](https://nfest.lisaklein.nl)

### Problem
This autumn, the first edition of N-Festival: a community festival on innovation, music and good food takes place in Amsterdam. N-Festival is an annual exchange between New York and Amsterdam. The best of both cities will be shared and shown: music, culinary concepts, fashion, media, robotics and more.For this project, you will create a festival application. During the festival you can find scattered throughout Amsterdam-Noord different locations with bands, speakers and food. Visitors will see the app to get information and create their own personal festival schedule. - Moodle Minor Everything Web

### Must haves
- [x] As a user I want to be able to read and understand what is the N-Festival and what it stands for
- [x] As a user I want to know where and when the festival takes place
- [x] As a user I want to see which company's are partners of the N-Festival and be able to get to there website
- [x] As a user I want to see the whole progam of events, so I know what to do on the festival
- [x] As a user I want to see an overview of all festival locations, so I know where everything takes place
- [x] As a user I want to see more information about a single event, so I can chose if it's interesting 
- [x] As a user I want to see what's working now, so I can see where I want to go to the festival itself
- [x] As a user I want to see what comes next so I can find where I want to go
- [x] As a user I want to filter by type of event, because I want a clearer overview of the program
- [x] As a user I want to filter by location, so I know what is happening around me 
- [x] As a user I would easily want go to social network channels from the N-Festival and I want to easily post their own channels on the N-Festival

### Synopsis
This application is for visitors of the N-Festival or people who are interested in the program of the festival. Before the festival starts, user can check the whole program, discover events, get information about the festival and add events to a personal route page. During the festival the program changes dynamic, based on time and location. 

### Load balancing
For this project we chose to work together in a team instead of making all 3 an idividual application. Therefore was dividing all tasks in a right way very important. Not only so we could work structured but also to keep track of everyones progress. [Trello](http://wwww.trello.com/) is a collaboration tool that organizes your projects into boards. Our board is constantly updated with things that are new or things that are done. 

![N-Festival Trello Board](http://www.tijsluitse.com/trello_board.png)

## The setup
The application does not need a realtime Javascript framework or complex login systems. Therefore it's a native web application, build with the following development tools. 

### Techniques
- ```Express```, the web framework for ```Node.js```, to keep the pages and data running so users can always see the program.
- ```HTML5``` with ```Handlebars.js```, to set up the pages and render the data
- ```CSS and SVG animations```
- ```Vanilla Javascript``` for all application functions
- ```Gulp``` to minify our files
- ```GIT and DigitalOcean``` for deployment
- ```Wordpress``` for getting JSON data 
- ```Geolocation HTML5 API```, for constantly getting the user's location
- ```Google Maps V3``` for showing locations of the events and user

### File structure
The startpoint of the application is app.js. If you run ```nodemon app.js``` the app will listen to ```localhost:3000```. All routes are declared in the ```routes/index.js``` file. 

```
/bin				// The entrypoint of the server
/node_modules		// All Node modules
/public				// Public client-side folder
	/dist			// The output file for the JS and CSS Gulp tasks
		/css		// The stylesheet used in the application (compressed)
		/js			// All Javascript modules used in the application (compressed)
		/lib		// All Javascript libraries used in the application (compressed)
	/font			// All fonts used in the application
	/img  			// All images used in the application
	/src  			// All source files for Gulp
		/css		// The stylesheet used in the application (uncompressed)
		/js 		// All Javascript modules used in the application (uncompressed)
		/lib 		// All Javascript libraries used in the application (uncompressed)
/routes 			// All the routes of the application
/views 				// All the views of the application, used in the routes/index.js file
app.js 				// The route file of the application
gulpfile.js 		// The Gulpfile with CSS and JS tasks
```

### The data
The data we use in the application is received from an external Wordpress data API. We and the client can add events, locations, curators and posts from a hosted Wordpress website. The data is structured into a JSON file which we load into the server side of the application. Then send to the templates in seperate files. All the data is loaded every few seconds, so new data automatically appears on the website when added to the Wordpress section. 

All the data requests and data manipulation can be found in ```routes/index.js```. For an example of how the events JSON file looks, you could checkout: [Events JSON file](http://n-festival.werk.vanjim.nl/wp-json/wp/v2/events).

## Implementations from Minor courses

### Web App From Scratch
- Object oriented programming, we structured files in different modules and used programmed following the OOP way
- IIFE, Immediately- Invoked Function Expressions
- Javascript interactions, smooth transitions: about page to the menu scroll
- We got data from an wordpress API, combined data we needed, filtered data on time and showed the data in the app
- Templating
- CSS To The Rescue

### Semantic CSS
- The use of :target selectors
- CSS fallbacks for viewheight, viewwidth etc.
- PE (Progressive Enhanchements), app is still available and working without css, we online hide things with javascript
- CSS Flexbox
- CSS prefixes for all browsers

### Browser Technologies
- Semantic HTML
- CSS fallbacks for viewheight, viewwidth etc.
- Progressive Enhanchement, feature detects for geolocation and  localstorage and helpers for addEventListeners
- Everything is accessible through the tab key
- Core functionalities are still available for people without javascript, css and other disabilities because of the node server
- Enhanchement for people with fancy browsers: animations, google maps, geolocation

### Performance Matters
- Semantic HTML & CSS
- Minified js en css files for better loadtimes (done with Gulp)
- Optimized http requests: Javascript files are only loaded on the pages that use them

## My share in this project

### First week
- First meeting with the client at the van Lennep office
- Made sketches of my thought of how the app would look like 
- Designed the sketches in Illustrator
- Set up a simple Google Maps map reference
- Created a JSON file with the first "fake data"
- Set up a simple geolocation for receiving the user location 

### Second week
- Thought about cool features for the "discover" function
- Created the event filter system for filtering on day and theme
- Created a function that calculates the distance to a certain event
- Made the distance calculation realtime
- Created a function that receives event and user coordinates (lat, lng) from an address 
- Made the map visible with location markers and a custom/dynamic info window
- Made the user position marker realtime, so the markers moves when the user moves
- Made wireframes to get a good understanding of all the pages and the flow off the app

### Third week
- Created a function to keep track of the user at all time, so the distance to events is visible on every page (program, locations and detail pages)
- Created fallbacks and permission choices for user location
- Save user coordinates to Local Storage
- Created a function that checks new coordinates of the user when user changes position and overwrite Local Storage
- Made travel directions available from locations and events
- Changed the bike distance in meters to bike distance in time
- Created a function to sort the events data from A to Z
- Made a custom map style with seperate markers for user and event locations

### Fourth week
- Created the "My Route" functions to add events to your own page (in Local Storage)
- Created a counter that updates from the Local Storage array, with a fallback when the array is empty or does not exist
- Now you can add events to my route array and I created a function that checks if item is already in array, when that is true, the item is removed from the array
- Updated the location markers on the map. On the ```/locations``` page, the map shows all available locations. And on the ```/myRoute``` page, the map shows only the locations from the events which the user saved
- Map is centred in Amsterdam Noord instead of your own position
- Created the recommendations functionality at the event detail page, everytime it creates three random events 
- Bugs fixing regarding the map, user location and distance calculation
- Show the map, bike distance and "my route" section only when Javascript is available, else hide
- When there is no Javascript available, now the user can mail the event info to itself by clicking on the "add to my route"

### Fifth week
- Bug fixing regarding the map, user location and distance calculation
- Created fallback for the "my route" page, when the Local Storage is emptied or deleted now a hidden message shows
- Created the about section in the navigation menu (when the user opens the app for the first time, the app slowly scrolls over the about section)
- Created the menu animations (first time animation and scroll down + when clicked on the "N" logo, scroll up and when the user hits the "N" again, shows the animation again)
- Automatically scroll to "current events" in the program page
- Added global comments to every script
- Added new "fake" data content in Wordpress for the presentation
- Checked all HTML for bugs or commented code
- Designed the "Who did what" poster

## Wrapping up

### Collaboration

As said we have worked on this application in a team of three people. Working together with Lisa and Linda was a pleasant experience. Both are hard workers with a positive vibe and motivation to get things done. If you want to contribute to a web development project with three people I will advise to get to know GIT as soon as possible. I think that our positive workflow is the results of a good planning and a very organized git repository. 

### The result

When looking at the application and working with it, I personally think we did a really good job. The application is as good as ready for public use and to realize that in 5 weeks.. I'm proud. The client has always givin good feedback and they were impressed every meeting we had. I think that's a great compliment. If we had had more participation in the whole (N-Festival) project, it had probably been different in design, but that's not an issue at al. 

If you would like to check out the application, just go to [N-Festivall Webapp](https://nfest.lisaklein.nl) and enjoy!

See you at the N-Festival!