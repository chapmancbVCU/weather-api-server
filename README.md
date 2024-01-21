# Weather API Server
A server whose purpose is to hide the API key used by the web applications that uses Open Weather Map as a source.

## Overview
It is always important to protect your API secrets.  Especially, if you spent money acquiring rights to use that API secret.  Currently, this weather api server supports the default free type of request and the one call request.  If you feel the need to add support for additional requests types please let us know.

## Setup Instructions
1. Clone the repository
2. Run the command "npm install"
3. Run the command "npm start"

## Example
This is a screenshot of a function we created in our weather application for the free fetch request.  
![example!](images/free-api-request-example.png)