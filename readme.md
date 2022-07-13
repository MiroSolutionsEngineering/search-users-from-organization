## Support
  **Important**: Please be kindly advised that the sample codes provided are provided as examples only and are subject to the [Miro Developer Terms of Use](https://miro.com/legal/developer-terms-of-use/.). 
And it cannot be supported by Miro and also is not maintained.
Any code deployed is at your own discretion and full responsibility and is to be thoroughly tested on your side before releasing to production.


# Search Users from Organization
This is a sample web application for Miro administrators using RestAPI and SCIM API using Node.js and express framework.
It shows all user list in your organizaition and you can filter and deactivate/activate users by inactive date. 

## Getting started
1. Follow [this document](https://developers.miro.com/docs/getting-started-with-oauth) and acquire an access token that can be used to make calls to the [Miro REST API](https://developers.miro.com/reference/api-reference).

Required permission : [organizations:read](https://developers.miro.com/reference/scopes
)


2. [Enable SCIM option in Miro](https://help.miro.com/hc/en-us/articles/360036827513-SCIM#:~:text=To%20enable%20SCIM%20for%20your,Token%20for%20configuring%20your%20IdP) and get API Token.

3. Clone [the repo](https://github.com/MiroSolutionsEngineering/search-users-from-organization.git) and install the dependencies.
```
git clone https://github.com/MiroSolutionsEngineering/search-users-from-organization.git
cd search-users-from-organization
npm install
```
4. Rewrite ORG_ID, TOKEN, and SCIMTOKEN in the .env file to your environment.
```
ORG_ID=XXXXXXXXXX
TOKEN='XXXXXXXXXX'
SCIMTOKEN='XXXXXXXXXX'
```

5. Start Node server locally and access to https://localhiost:8080
```
npm start
```
## Folder Structure
```
.
├── package.json <-- The dependencies for the app
└── .env <-- File where you store your sensitive credentials (OrgID,Token)
└── server.js <-- call Miro API to retrieve and update users
└── node_modules <-- Node modules that are installed based on dependencies
└── public
      └── index.html <-- user list html file
      └── modal.html <-- modal html file
      └── popup.js <-- file for modal UI functions
      └── script.js <-- file for user list UI functions
      └── style.css <-- style sheet
```

## Reference
- [Get organization members](https://developers.miro.com/reference/enterprise-get-organization-members)
- [Users](https://developers.miro.com/docs/users)
- [Errors](https://developers.miro.com/docs/errors)


