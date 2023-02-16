# Criminal Record Management

### How to run backend

Open terminal and change directory to "backend/test-network"

**_ Stop the network: _**

```
./network.sh down
```

**_ Start test network: _**

```
./network.sh createChannel -ca -c criminalrecord -s couchdb
```

**_ Install Chaincode: _**

```
./network.sh deployCC -ccn cRecord -ccp ../crab/chaincode/ -ccl javascript
```

**_ CouchDB: _**
`http://localhost:5984/_utils/`
username: admin
pass: adminpw

**_ Run express server _**
Open terminal on "backend/crab/application" and then:

```
npm install
node app.js
```
