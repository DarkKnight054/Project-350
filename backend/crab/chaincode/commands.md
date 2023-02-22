**_ Start test network: _**

Open terminal and change directory to 'backend/test-network'. Then:

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
