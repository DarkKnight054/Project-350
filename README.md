# Criminal Record Management

### Project Structure
```
**Project-350**
    |--- **Frontend**
    |--- **Backend**
              |
              |--- **crab**
              |          |
              |          |--- **application**
              |          |                 |
              |          |                 |--- **wallet**
              |          |                 |--- **app.js** (express server)
              |          |                 |--- **api-test.rest** (to test api)
              |          |
              |          |-- **chaincode**
              |                         |--- **lib**
              |                                   |--- **criminalRecord.js** (contract)
              |
              |--- **test-network**
                                |
                                |--- **network.sh** (script to create and deploy channel and chaincode)
```


### How to run backend

Open terminal and change directory to "backend/test-network"

**Stop the network:**

```
./network.sh down
```

**Start test network:**

```
./network.sh createChannel -ca -c criminalrecord -s couchdb
```

**Install Chaincode:**

```
./network.sh deployCC -ccn cRecord -ccp ../crab/chaincode/ -ccl javascript
```

**CouchDB:**
`http://localhost:5984/_utils/`
username: admin <br>
pass: adminpw <br>

**Run express server**
Open terminal on "backend/crab/application" and then:

```
npm install
node app.js
```

**Test api**

Install "REST Client" extention on vscode and test the api using "backend/crab/application/api-test.rest" file.
