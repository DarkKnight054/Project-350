# Criminal Record Management System

### How to run backend

Open terminal and change directory to 'backend/test-network' and Then:

**_ Start test network: _**

```
./network.sh createChannel -ca -c criminalrecord -s couchdb
```

**_ Install Chaincode: _**

```
./network.sh deployCC -ccn cRecord -ccp ../crab/chaincode/ -ccl javascript
```

**_ Stopping the network: _**

```
./network.sh down
```

**_ CouchDB: _**
`http://localhost:5984/_utils/`
username: admin
pass: adminpw

**_ Run express server: _**
Change directory to 'backend/crab/application' and then:

```
npm install
node app.js
```

**_ Test api _**
Install "REST Client" extention on vscode (extension id: humao.rest-client).
Then use `backend/crab/application/api-test.rest` file to test the api.
