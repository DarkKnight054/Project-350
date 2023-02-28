# Criminal Record Management

## Table of content

- [Introduction](https://github.com/DarkKnight054/Project-350#introduction)
- [Project Structure](https://github.com/DarkKnight054/Project-350#project-structure)
- Project Overview
- How to run frontend
- [How to run backend](https://github.com/DarkKnight054/Project-350#how-to-run-backend)

---

## Introduction

Criminal record management using **Hyperledger Fabric** is an application of blockchain technology that aims to **securely** and **efficiently** manage the criminal records of individuals. The current paper-based system used by law enforcement agencies and courts to maintain criminal records is often slow, cumbersome, and prone to errors, making it difficult to maintain accurate records.

Using Hyperledger Fabric, a **decentralized** and **secure system** can be created that ensures the integrity of the criminal records while maintaining **privacy** and **confidentiality**. The use of smart contracts enables the **automation** of the criminal record management process, reducing the need for manual intervention and **increasing the accuracy** of the records.

--- 

## Project Structure
```js
Project-350
    |--- Frontend
    |--- Backend
              |--- Config
              |         |--- configtx.yaml (configure network)
              |         |--- core.yaml (configure the peer node)
              |         |--- orderer.yaml (configure orderer node)
              |
              |--- Crab
              |         |
              |         |--- Api
              |         |      |
              |         |      |--- Wallet (holds credentials, such as private keys and certificates)
              |         |      |--- app.js (express server as api)
              |         |      |--- api-test.rest (to test api)
              |         |
              |         |-- Chaincode
              |                       |--- Lib
              |                               |--- criminalRecord.js (smart contract)
              |
              |--- Test-Network
                               |
                               |--- network.sh (script to create and deploy channel and chaincode)
```

---

## How to run backend

Open terminal and change directory to ```backend/test-network```

**1. Stop the network:**

```
./network.sh down
```

**2. Start test network:**

```
./network.sh createChannel -ca -c criminalrecord -s couchdb
```

**3. Deploy Chaincode:**

```
./network.sh deployCC -ccn cRecord -ccp ../crab/chaincode/ -ccl javascript
```

**4. Run express server**
Open terminal on "backend/crab/api" and then:

```
npm install
node app.js

```

**CouchDB:**
`http://localhost:5984/_utils/`
username: admin <br>
pass: adminpw <br>

**To start the stopped containers:**
``` docker start $(docker ps -aq) ```


**Test api** <br>

Install "REST Client" extention on vscode and test the api using ```backend/crab/api/api-test.rest``` file.
