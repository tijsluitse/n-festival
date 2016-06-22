# N-Festival application

![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-html.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-css.svg) 
![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)

## Project
Final "master" exercise - Minor Everything Web

## Client 
van Lennep Design

## Contributors
Lisa Klein, Linda van Dijk & Tijs Luitse

## Live url
[https://nfest.lisaklein.nl](https://nfest.lisaklein.nl)

## Synopsis
This application is for visitors of the N-Festival or people who are interested in the program of the festival. Before the festival starts, user can check the whole program, discover events, get information about the festival and add events to a personal route page. During the festival the program changes dynamic, based on time and location. 

## The setup
The application does not need a realtime Javascript framework or complex login systems. Therefore it's a native web application, build with the following development tools. 

### Development tools
Javascript:
- Vanilla Javascript
- Handlebars.js

Backend:
- Node.js
- Express.js
- Data from Wordpress JSON API

Taskmanager:
- Gulp

Animations: 
- SVG Animation
- CSS3 Animations

API's:
- Geolocation
- Google Maps V3

Deployment: 
- GIT
- Github
- Digital Ocean

### File structure
The startpoint of the application is app.js. If you run ```nodemon app.js``` the app will listen to localhost:3000. All routes are declared in the ```routes/index.js``` file. 

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




