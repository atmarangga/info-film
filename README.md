This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is it ?
### A simple movie information web app
It uses:</br>
- react : the framework javascript framework </br>
- redux : for statement management </br>
- saga : handling asynchronous request and side effects on each actions
- reselect: access and manage state
- immutable:  to minimize human errors on state management
- semantic-ui-react : basic styling

## Before Starting

Update : 15th June 2020</br>
Turns out we could bypass this issue using proxy settings within the package.json. 
No need to use plugins now :)

This web app is accessing cross origin endpoints from :</br>
 http://wdassignment.devfl.com/api/ </br>
~~Hence you would not be able to do anything without enabling CORS ( Cross Origin Resource Sharing) from your browser.~~</br>
~~You could use Moesif Orign & CORS Changer if your using using~~</br>
~~Chrome : https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc~~</br>
~~Mozilla : https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/~~</br>
  
~~or you could use other add-ons / methods to your liking.~~</br>
~~As of this moment, I will not tackle this CORS issue any further. While this might be remedied by simply creating a proxy server to get resources from the endpoint, i believe it would be easier to just install the plugins instead.~~

## How To start this ?
1. Make sure you have node.js (preferably the latest) installed on your machine.</br>
2. Clone / download this repository to your local machine.
3. Using terminal / command prompt install needed package using the `npm install` command while inside this root project</br>
4. After that run `npm run start` or you could use `yarn start` instead. It will then (usually) open a browser and directs you to `localhost:3000` and will show you the homepage.
5. It should run by now. Go to the browser and open : `localhost:3000` if your not directed automatically

2020/06/12
