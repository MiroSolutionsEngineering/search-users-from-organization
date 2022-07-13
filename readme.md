# Examples for the Looker SDKs
This is a sample web application for Miro administrators using RestAPI and SCIM API using Node.js and express framework.

## Getting started
1.Follow this document and acquire an access token that can be used to make calls to the Miro REST API.
https://developers.miro.com/docs/getting-started-with-oauth
Required permission : organizations:read
https://developers.miro.com/reference/scopes


2.Enable SCIM option in Miro and get API Token.
https://help.miro.com/hc/en-us/articles/360036827513-SCIM#:~:text=To%20enable%20SCIM%20for%20your,Token%20for%20configuring%20your%20IdP.

https://developers.miro.com/docs/getting-started-with-oauth

3.Clone the repo and install the dependencies.
git clone https://github.com/MiroSolutionsEngineering/deactivate-stale-users.git
npm install

4.Rewrite ORG_ID, TOKEN, and SCIMTOKEN in the .env file to your environment.

5.Start Node server locally and access to https://localhiost:8080

## Folder Structure
.
├── package.json <-- The dependencies for the app
└── .env <-- File you will create, where you store your sensitive credentials (Client ID, Secret)
└── server.js <-- call Miro API to retrieve and update users
└── node_modules <-- Node modules that are installed based on dependencies
└── public
      └── index.html <-- user list html file
      └── modal.html <-- modal html file
      └── popup.js <-- file for modal UI functions
      └── script.js <-- file for user list UI functions
      └── style.css <-- style sheet

## Reference


## Support

sample & no maintenance & no support 

