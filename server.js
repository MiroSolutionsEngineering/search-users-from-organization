// ===================================================
//  The sample code provided below is subject to 
//  the Miro Developer Terms of Use
//  : https://miro.com/legal/developer-terms-of-use/
// ===================================================

// =======================
// get instance we need
// =======================
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
const axios = require('axios');
//ENV
require('dotenv').config();
const token = process.env.TOKEN;
const org_id = process.env.ORG_ID;
const scimtoken = process.env.SCIMTOKEN;
//URLs
const url = `https://api.miro.com/v2/orgs/${org_id}/members`;
const scimurl = `https://miro.com/api/v1/scim/Users`;

// =======================
// Functions
// =======================
// Get All Members
const getAllMembers = async () => {
  try{
    return await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch(err){
    console.log(err)
  }
}

// Get All SCIM Users--------
const getSCIMUsers = async () => {
  try{
    return await axios.get(scimurl, {
      headers: {
        'Authorization': `Bearer ${scimtoken}`
      }
    });
  } catch(err){
    console.log(err)
  }
}


// formate date to 'YYYY-MM-DD's--------
const formatDate = async(dt) => {
  try{
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  } catch(err){
    console.log(err)
  }
}

// GetMemberList--------
const listAllMembers = async(inputDays) => {
  const allmembers = await getAllMembers();
  const items = allmembers.data;
  const scimusers = await getSCIMUsers(); 
  const userDetails = scimusers.data.Resources;
  var members =[];

  if (items) {
    //filter with target inactive date
    if(inputDays){
      const  dt = new Date();
      const targetDate = await formatDate(new Date(dt.setDate(dt.getDate()-inputDays)));
        // console.log(targetDate);
      var members = items.data.filter(item => item.lastActivityAt <= targetDate)
        .map(item => ({
          id: item.id,
          email: item.email,
          lastActivityAt:item.lastActivityAt,
          active:item.active,
          license:item.license,
          role:item.role
          })
        );
    } else {
      var members = items.data
        .map(item => ({
          id: item.id,
          email: item.email,
          lastActivityAt:item.lastActivityAt,
          active:item.active,
          license:item.license,
          role:item.role
        })
      );
    }

    const users = members.map((member) => {
      const userDetail = userDetails.find((details) => details.id === member.id)
        if (typeof userDetail === 'undefined'){
          return {
            ...member,
            displayName: "--Undefined--",
          }
        }else{
          return {
            ...member,
            displayName: userDetail.displayName,
          }
        }
    })
    return users;
  } else{
    console.log('no-data');
  }
}


//Update Users--------
const updateSCIMUsers = async(userid,evt) => {
  try{
    let state = "";
    if(evt === "deactivate"){
      state = false;
    }else{
      state = true;
    }
    console.log(state);
    const scimurluid = scimurl + '/' + userid;
    const body = {
      "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:PatchOp"
      ],
      "Operations": [
        {
          "op": "Replace",
          "path": "active",
          "value": state
        }
      ]
    };

    let res = await axios.patch(scimurluid, body, {
      headers: {
        'Authorization': `Bearer ${scimtoken}`
      }
    });
    return res.data;
  } catch(err){
    let ErrorResult = {name: err.name, message: err.message};
    return ErrorResult;
    console.log(err.name + ': ' + err.message);
  }
}




// =======================
// configuration
// =======================
// server setting
var port = process.env.PORT || 8080;

// =======================
// routes
// =======================
app.get('/', function(req, res) {
  res.send('Helloeee! The API is at http://localhost:' + port + '/api');
});


// =======================
// Internal APIs
// =======================
// API ROUTES ================
var apiRoutes = express.Router();
// GET(http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to API routing'});
});

//Get All Users --------
apiRoutes.get('/v1/list', async function(req, res) {
  let inputDays ="";
  inputDays = req.query.ds
  try{
      const allMembers = await listAllMembers(inputDays);
      res.status(200).json(allMembers);
  } catch(err) {
      console.log(err);
  }
});

//Update Users --------
apiRoutes.get('/v1/update', async function(req, res) {
  let uid ="";
  uid = req.query.ds;
  evt = req.query.evt;

  try{
      const result = await updateSCIMUsers(uid,evt);
      res.json(result);
  } catch(err) {
      console.log(err);
  }
});

// apply the routes to our application(prefix /api)
app.use('/api', apiRoutes);


// =======================
// start the server
// =======================
app.listen(port);
console.log('started http://localhost:' + port + '/');

