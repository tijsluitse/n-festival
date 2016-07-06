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

## Install and run the application

To run the application locally you will need to clone the repository. When all files are downloaded, go to the project directory and run the following commands in the terminal. 

```
npm install
```

This command will download and install all npm dependencies. And after that run the application on your local server. 

```
nodemon app.js
```

## Features 

I have worked on the following features during this project:

- The Google Maps API
- Geolocation
- Bike distance
- Travel directions
- "My route" section
- The about section

### The Google Maps API

First of all, showing a map with all location markers is an enhanchement of an ordanairy list with items. So I created a PE solution for this. 

```
var jsActivate = function (map) {
    var locationMap = document.getElementById('locationMap');
    locationMap.classList.remove('hide');
}
```

To create a unique map style I changed the way the Google Maps looks like. Inside the function mapStyle you can add all different kind of options to adjust the map just like you want.

```
var mapStyle = function (map) {
	var styles = [{
		...
	}]
}
var styledMapType = new google.maps.StyledMapType(styles, {
    name: 'Styled'
});
map.mapTypes.set('Styled', styledMapType);
```

Because there are to pages with the map, one with all event locations and one with only the saved to my route event locations, I check the pathname and from there decide what map is loaded.

```
if (window.location.pathname == '/myroute') {
    nfest.map.venueMarkersMyRoute(map);
} else {   
    nfest.map.venueMarkersAllLocations(map);
}
```

To show all event venue markers the venueMarkersAllLocations function is fired. 

```
var venueMarkersAllLocations = function (map) {
    nfest.helpers.getVenueLocations(function (mapLocations, data) {
        var locationMarkers = mapLocations,
            infowindow = new google.maps.InfoWindow();

        locationMarkers.forEach(function (location) {

            var image = {
                url: '/img/location.png',
                size: new google.maps.Size(30, 49),
                scaledSize: new google.maps.Size(30, 49),
                origin: new google.maps.Point(0, 0)
            };

            var marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lng)
                },
                map: map,
                icon: image,
                optimized: true,
                title: "First Infowindow!"
            });
            
            var locationLink = location.link,
                link = '<a href="/location/' + locationLink + '" class="popupButton">',
                routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute">';

            var contentString =
                '<div id="content">' +
                '<h1>' + location.title + '</h1>' +
                '<p>' + location.address + '</p>' +
                '<div class="popupButtons ">' +
                routeLink + 'Route' + '</a>' + link + 'Evenementen' + '</a>' +
                '</div>' +
                '</div>';

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            });

            marker.setMap(map);

        });
    });
}
```

First the venue data is retrieved with a self created helper. All locations are set in variable locationMarkers. After that a forEach loop creates all the location markers. A custom image is set for the location marker. Then the marker is giving it's coordinates from the data object. It's pinned to the map, for the icon it uses the image, and the image is optimized. If you are using a GIF, this is important to set to false. 

The variable link is the link to the single detail page of the location. The routeLink variable is link with travel directions. Both links are used in the contentString. The contentstring is used in the info window, the window what you see when click on the marker. After that the click is set and the marker is pushed to the map. Because it's a forEach loop all the location markers are pushed. 

![Map](http://www.tijsluitse.com/nfest-images/map.jpg)

### Geolocation

To receive and use the users geolocation I have created a function which saves these coordinates to a variable called ```userCoordinates```. The if-statement is for checking if the HTML5 navigator.geolocation is available. If not, the user sees an error message above the map and all bike distances are being removed. If the statement returns true, the storageCheck helper checks if the browser supports Local Storage. When LS is supported the coordinates are being saved, else the coordinates are only saved in a variable. 

```
if (navigator.geolocation) {
    nfest.helpers.storageCheck(function (hasStorage) {
        if (hasStorage) {
            if (localStorage.getItem('userCoordinates') === null) {
                navigator.geolocation.getCurrentPosition(success, error);
                function success(position) {
                    var userLatitude = position.coords.latitude,
                        userLongitude = position.coords.longitude,
                        userCoordinates = [userLatitude, userLongitude];
                    localStorage.setItem('userCoordinates', userCoordinates);
                };
                function error() {
                    showGeoPopUp();
                    removeBikeDist();
                };
            }
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
            function success(position) {
                var userLatitude = position.coords.latitude,
                    userLongitude = position.coords.longitude,
                    userCoordinates = [userLatitude, userLongitude];
            };
            function error() {
                showGeoPopUp();
                removeBikeDist();
            };
        }
    });
} else {
    showGeoPopUp();
    removeBikeDist();
}
```

### Bike distance

To get more information about the distance from the user to the event location. I have implemented a distance calculation function that shows realtime bike distance's for every location.

So first of all the data is received by a self created helper. The data is being parsed into JSON and the calculateDist function is being called for the first time. After this it repeats itself every ten seconds. 

```
nfest.helpers.getData('https://nfest.lisaklein.nl/data', function (response) {
    var data = JSON.parse(response);
    calculateDist(data);
    setInterval(function () {
        calculateDist(data);
    }, 10000);
});
```

In the calculateDist function is checked if the users geolocation is saved in the Local Storage. 

```
if (localStorage.getItem('userCoordinates') === null) {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
        var userLat = position.coords.latitude,
            userLng = position.coords.longitude,
            userCoordinates = [userLat, userLng];
        localStorage.setItem('userCoordinates', userCoordinates);
        calculate(userLat, userLng);
    };
} else {
    var userCoordinates = localStorage.getItem('userCoordinates'),
        userC = userCoordinates.split(','),
        userLat = parseFloat(userC[0]),
        userLng = parseFloat(userC[1]);
    calculate(userLat, userLng);
}
```

If the LS is empty the navigator checks the users position and saves this to LS. After that the calculation is being made. When there actually is something saved in LS, user coordinates are being retrieved and the calculation function is called.

```
var eventList = document.querySelectorAll('.eventObj'),
    allDistances = [];

function calculate(userLat, userLng) {
    Array.prototype.forEach.call(eventList, function (event) {
        var location = event.dataset.location;
        for (var i = 0; i < data.length; i++) {
            var id = data[i].slug,
                uLat = userLat,
                uLng = userLng,
                lat = data[i].acf.location.lat,
                lng = data[i].acf.location.lng;
            if (location === id) {
                distance(id, uLat, uLng, lat, lng, event);
            }
        }
    });

    function distance(id, lat1, lon1, lat2, lon2, event) {
        var unit = 'K',
            radlat1 = Math.PI * lat1 / 180,
            radlat2 = Math.PI * lat2 / 180,
            theta = lon1 - lon2,
            radtheta = Math.PI * theta / 180,
            dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta),
            dist = Math.acos(dist),
            dist = dist * 180 / Math.PI,
            dist = dist * 60 * 1.1515,
			 dist = dist * 1.609344;
			   
        var result = dist.toFixed(2),
            bikeTime = 6 * result,
            string = '.bikeDist',
            bikeTime = bikeTime.toFixed(0);

        allDistances.push({
            distance: result
        });

        event.querySelector(string).innerHTML = bikeTime + ' min';

    }
}
```

The variable ```eventList``` is filled with all data objects found on the HTML of the current page. For each single ```event``` in that NodeList it saves the location which is the name of the location. After that it checks the length of the data object, which is filled with all events. It gets the slug event title, user coordinates and the events coordinates and runs the distance function. With ```toFixed(2)``` it sets the value keeping 2 decimals. The calculation code is from this [source](https://www.geodatasource.com/developers/javascript). After the calculation is done, the bike time is created and pushed into the ```.bikeDist``` element. 

When there is something wrong or the users geolocation is not set, all bike distances are removed by adding a class called 'hide' which sets it to ```display: none;```. 

```
var removeBikeDist = function () {
    if (window.location.pathname == '/program' || '/day1' || '/day2' || '/location' || '/myroute' || '/detail' || 'discover') {
        var bikeDist = document.querySelectorAll('.eventDistance');
        Array.prototype.forEach.call(bikeDist, function (item) {
            item.classList.add('hide');
        });
    }
}
```

With the if-statement I want to check whether the user is on a page where the bike distance is being calculated. So if that returns true, all bike distances are being selected and with a forEach loop every item gets the class 'hide'. It needs to be an ```Array.prototype.forEach.call``` because the ```querySelectorAll``` returns an NodeList instead of an array.

![Distance](http://www.tijsluitse.com/nfest-images/distance.jpg)

### Travel directions

It is nice to look at the map and see all locations but we use Google Maps also for navigation. So I've written a very simple piece of code which creates a link that immediatly shows the route details to the event location you want.

```
var routeLink = '<a href="https://maps.google.com?saddr=Current+Location&daddr=' + location.lat + ',' + location.lng + '" class="popupButton buttonRoute" target="blank">';

var contentString =
    '<div id="content">' +
    '<h1>' + location.title + '</h1>' +
    '<p>' + location.address + '</p>' +
    '<div class="popupButtons ">' +
    routeLink + 'Route' + '</a>' + link + 'Evenementen' + '</a>' +
    '</div>' +
    '</div>';
```

The routeLink variable is created and added to the content string of the location marker. 

![Directions](http://www.tijsluitse.com/nfest-images/travel.jpg)

### "My route" section 

We needed to create a function that saves events to a "my route" page, see it like your personal favorite events. It all starts with the click on the right spot of an event.   

```
for (var i = add.length - 1; i >= 0; i--) {
	add[i].onclick = function (evt) {
		evt.currentTarget.classList.toggle('addedToRoute');
	   	if (nfest.helpers.hasClass(this, 'addedToRoute')) {
	   		counter.classList.remove('hide');
	       addToMyRoute(this);                    
	   	} else {                    
	       removeFromMyRoute(this);
	   	}
	}
}
```

This for loop adds the click event listener to all "add" buttons. When the user clicks or tabs the button the class "addedToRoute" is set. Then the if else statement is running the addToMyRoute function or the removeFromMyRoute function. That depends on the fact if item is already in the my route section.

When the item needs to be added to the route events. It first parses the old items from the LS and sets the new items id. Than checks the function checkAvailability if the item is already inside the array retrieved from the LS. When so it does nothing, when it's not in the array it will be pushed to it.  

```
var oldItems = JSON.parse(localStorage.getItem('myRouteEvents')) || [],
    newItem = clickedObject.id;

function checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal;
    });
} 
``` 

On the my route page, the data of all events is being pushed to the html and all get a class that hides the items. Than the LS is checked on which items are added and from these items the hide class will be removed. The counter simple shows the length of the myRouteElements. When there are no items in the LS array and the user visits the My Route page, they will see a message that they can add events to their own personal page. 

![My Route](http://www.tijsluitse.com/nfest-images/myroute.jpg)

### The about section

The client wanted to have a "about us" section above the navigation menu. And when users open the app for the first time the view slides over this section, so you know it's up there. 

```
if (window.location.pathname == '/') {  
    if (localStorage.getItem('introPage')) {
        window.location = '/#menu';
    }
    if (!localStorage.getItem('introPage')) {
        nfest.scrollToNext.introEnd();
    }
}
```

With these lines of code every time the user comes on the "home" page of the website (the part where there is no hash behind the url), the function checks if the user is there for the first time or not. When the user is there for the first time the LS item "introPage" is set and the scroll over function is fired. When the LS item is already set, the hash is changed to the href of the menu without scrolling.

![About](http://www.tijsluitse.com/nfest-images/about.jpg)

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