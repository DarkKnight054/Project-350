/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require('../../test-application/javascript/CAUtil.js');
const {
  buildCCPOrg1,
  buildWallet,
} = require('../../test-application/javascript/AppUtil.js');

const channelName = 'criminalrecord';
const chaincodeName = 'cRecord';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      'ca.org1.example.com'
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient, wallet, mspOrg1);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      'org1.department1'
    );

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();

    try {
      await gateway.connect(ccp, {
        wallet,
        identity: org1UserId,
        discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      // Build a network instance based on the channel where the smart contract is deployed
      const network = await gateway.getNetwork(channelName);

      // Get the contract from the network.
      const contract = network.getContract(chaincodeName);

      //*============== From here to start code ===================

      const app = express();
      app.use(cookieParser());
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
      };
      app.use(cors(corsOptions));

      //*============== Create Court Entity ===========
      app.post('/admin/courtentry', async (req, res) => {
        const { courtId, location, judgeSign, password } = req.body;
        const uid = `court_${courtId}`;
        const txId = getRandomString(12);
        try {
          let result = await contract.evaluateTransaction(
            'CreateCourt',
            uid,
            txId,
            courtId,
            location,
            judgeSign,
            password
          );
          await contract.submitTransaction(
            'CreateCourt',
            uid,
            txId,
            courtId,
            location,
            judgeSign,
            password
          );
          console.log(`Court entry Successful\n Result: ${result}\n`);
          setCount('court');
          createTxn(txId, 'Court registered', location);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
      });

      //*============== Create Jail Entity ===========
      app.post('/admin/jailentry', async (req, res) => {
        const { org, jailId, location, dSign, password } = req.body;
        const txId = getRandomString(12);
        const uid = `${org}_${jailId}`;
        let type = '';
        if (org === 'jail') type = `Jail registered`;
        else if (org === 'police') type = `Police station registered`;
        else if (org === 'passport') type = `Immigration office registered`;
        try {
          let result = await contract.evaluateTransaction(
            'CreateJail',
            uid,
            txId,
            jailId,
            location,
            dSign,
            org,
            password
          );
          await contract.submitTransaction(
            'CreateJail',
            uid,
            txId,
            jailId,
            location,
            dSign,
            org,
            password
          );
          console.log(`Jail entry Successful\n Result: ${result}\n`);
          setCount(org);
          createTxn(txId, type, dSign);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
      });

      //*============== Court login =====================
      app.post('/login/court', async (req, res) => {
        const { email, password } = req.body;
        console.log(`courtid: ${email}, password: ${password}`);

        try {
          let result = await contract.evaluateTransaction(
            'FindCourtEntity',
            email,
            password
          );

          const userInfo = JSON.parse(result.toString());
          console.log(
            `========== user infor: ${JSON.stringify(userInfo)} ============`
          );
          res.cookie('user', userInfo, {
            maxAge: 3600_000,
            httpOnly: false,
          });
          // console.log(`cookie data : ${res.cookie.user}`);
          console.log(userInfo.CourtId);
          res.send(result.toString());
        } catch (error) {
          res.status(400).json({
            error: error.toString(),
          });
        }
      });

      //*================== Jail login =====================
      app.post('/login/jail', async (req, res) => {
        const { email, password, org } = req.body;
        console.log(`courtid: ${email}, password: ${password}`);

        try {
          let result = await contract.evaluateTransaction(
            'FindJailEntity',
            email,
            org,
            password
          );
          const userInfo = JSON.parse(result.toString());
          res.cookie('user', userInfo, {
            maxAge: 3600_000,
            httpOnly: false,
          });
          console.log(result.toString());
          res.send(result.toString());
        } catch (error) {
          console.log(error.toString());
          res.status(400).json({
            error: error.toString(),
          });
        }
      });

      //*============= Create Criminal ============
      app.post('/court/criminalentry', async (req, res) => {
        const txId = getRandomString(12);
        const {
          name,
          date,
          email,
          nid,
          jailName,
          jailID,
          punishmentStartDate,
          punishmentEndDate,
          courtID,
          gender,
          crime,
        } = req.body;

        const uid = `criminal_${nid}`;

        try {
          let result = await contract.evaluateTransaction(
            'CreateCriminal',
            uid,
            txId,
            name,
            date,
            email,
            nid,
            jailName,
            jailID,
            punishmentStartDate,
            punishmentEndDate,
            courtID,
            gender,
            crime
          );
          await contract.submitTransaction(
            'CreateCriminal',
            uid,
            txId,
            name,
            date,
            email,
            nid,
            jailName,
            jailID,
            punishmentStartDate,
            punishmentEndDate,
            courtID,
            gender,
            crime
          );
          console.log(`Criminal entry Successful\n Result: ${result}\n`);
          setCount('criminal');
          createTxn(txId, 'Criminal entry', name);
          res.send(result.toString());
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.status(400).send(error.toString());
        }
      });

      //*================== Get criminals by court ==================
      app.get('/court/criminals:cookieValue', async (req, res) => {
        const email = req.params.cookieValue;
        console.log('======= passed mail ', email);

        try {
          // const findUser = req.cookies.user.toString();
          // console.log(`court id is: ${findUser.CourtId}`);
          const result = await contract.evaluateTransaction(
            'GetCriminalByCourt',
            email
          );

          res.send(result.toString());
          console.log(result.toString());
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*================== Get criminals by jail ==================
      app.get('/jail/criminals', async (req, res) => {
        if (req.cookies.user == null) {
          res.status(400).send('You are not logged in');
          return;
        }

        try {
          const user = req.cookies.user;
          console.log(`jail id is: ${user.JailId}`);
          const result = await contract.evaluateTransaction(
            'GetCriminalByJail',
            user.JailId
          );

          res.send(result.toString());
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*================== Get All Criminals list ==================
      app.get('/criminal/list', async (req, res) => {
        try {
          const result = await contract.evaluateTransaction('GetAllCriminals');

          res.send(result);
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*=================== Update criminal by court ==================
      app.post('/court/updatecriminal', async (req, res) => {
        const {
          name,
          date,
          email,
          nid,
          jailName,
          jailID,
          punishmentStartDate,
          punishmentEndDate,
          courtID,
          gender,
          crime,
        } = req.body;

        const uid = `criminal_${nid}`;
        const txId = getRandomString(12);
        try {
          let result = await contract.evaluateTransaction(
            'UpdateCriminal',
            uid,
            txId,
            name,
            date,
            email,
            nid,
            jailName,
            jailID,
            punishmentStartDate,
            punishmentEndDate,
            courtID,
            gender,
            crime
          );
          await contract.submitTransaction(
            'UpdateCriminal',
            uid,
            txId,
            name,
            date,
            email,
            nid,
            jailName,
            jailID,
            punishmentStartDate,
            punishmentEndDate,
            courtID,
            gender,
            crime
          );
          createTxn(txId, 'Criminal Updated', name);
          res.send(result.toString());
          console.log(`Criminal entry Successful\n Result: ${result}\n`);
        } catch (error) {
          console.log(
            `*** Successfully caught the error: \n    ${error.toString()}\n`
          );
          res.status(400).send(error.toString());
        }
      });

      //*==================== delete criminal by court ==================
      app.delete('/court/deletecriminal', async (req, res) => {
        if (req.cookies.user == null) {
          res.status(400).send('You are not logged in');
          return;
        }

        const { nid } = req.body;
        const key = `criminal_${nid}`;

        try {
          const user = req.cookies.user;
          console.log(`court id is: ${req.cookies.user.CourtId}`);
          const courtId = user.CourtId;
          const result = await contract.evaluateTransaction(
            'FindCriminal',
            key
          );
          const criminalData = JSON.parse(result.toString());

          if (criminalData.CourtId != courtId) {
            throw new Error('You are not authorized to delete this file');
          } else {
            const result = await contract.evaluateTransaction(
              'DeleteCriminal',
              nid
            );
            await contract.submitTransaction('DeleteCriminal', nid);
            res.send(result.toString());
          }
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*==================== Find Criminal ====================
      app.get('/criminal/:nid', async (req, res) => {
        // const { nid } = req.body;
        const nid = req.params.nid;
        const key = `criminal_${nid}`;
        console.log('key is:', key);
        try {
          const result = await contract.evaluateTransaction(
            'FindCriminal',
            key
          );
          res.send(result.toString());
        } catch (error) {
          res.status(400).send('criminal data not found');
        }
      });

      //*================== Set Count ====================
      app.post('/count', async (req, res) => {
        const { court, jail, passport, police, criminal } = req.body;
        const key = `count`;
        try {
          const result = await contract.evaluateTransaction(
            'SetCount',
            key,
            court,
            jail,
            passport,
            police,
            criminal
          );
          await contract.submitTransaction(
            'SetCount',
            key,
            court,
            jail,
            passport,
            police,
            criminal
          );
          res.send(result);
        } catch (error) {
          res.status(400).send('Count data not found');
        }
      });

      //*================== Get Count ==================
      app.get('/count', async (req, res) => {
        try {
          const result = await contract.evaluateTransaction('GetCount');

          res.send(result);
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*================== Get Orgranizations ==================
      app.get('/organizations', async (req, res) => {
        try {
          const result = await contract.evaluateTransaction('GetOrg');

          res.send(result);
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*=================== logout =======================
      app.get('/logout', async (req, res) => {
        try {
          res.cookie('user', '', { maxAge: -1, httpOnly: true });
          res.json({ status: 'you have successfully logged out' });
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      //*================== Set Count =====================
      const setCount = async (org) => {
        try {
          let result = await contract.evaluateTransaction('GetCount');
          result = JSON.parse(result);
          let [
            {
              Record: { Court, Criminal, DocType, Jail, Key, Passport, Police },
            },
          ] = result;
          console.log(Court);
          if (org === 'court') {
            const val = Number(Court) + 1;
            Court = val.toString();
          } else if (org === 'jail') {
            let val = Number(Jail) + 1;
            Jail = val.toString();
          } else if (org === 'passport') {
            let val = Number(Passport) + 1;
            Passport = val.toString();
          } else if (org === 'police') {
            let val = Number(Police) + 1;
            Police = val.toString();
          } else if (org === 'criminal') {
            let val = Number(Criminal) + 1;
            Criminal = val.toString();
          }
          const key = `count`;
          try {
            const result = await contract.evaluateTransaction(
              'SetCount',
              key,
              Court,
              Jail,
              Passport,
              Police,
              Criminal
            );
            await contract.submitTransaction(
              'SetCount',
              key,
              Court,
              Jail,
              Passport,
              Police,
              Criminal
            );
            console.log(result.toString());
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      };

      //*================ Create Transaction ================
      const createTxn = async (txId, type, name) => {
        const today = new Date();
        const date = today.toLocaleDateString();
        const key = `${type}_${txId}`;
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const seconds = today.getSeconds().toString().padStart(2, '0');
        const time = `${hours}:${minutes}:${seconds}`;
        try {
          const result = await contract.evaluateTransaction(
            'CreateTxn',
            key,
            txId,
            date,
            time,
            type,
            name
          );
          await contract.submitTransaction(
            'CreateTxn',
            key,
            txId,
            date,
            time,
            type,
            name
          );
          console.log('Txn: ', result.toString());
        } catch (error) {
          console.log(error);
        }
      };

      //*=================== Get Transaction ===================
      app.get('/transaction', async (req, res) => {
        try {
          const result = await contract.evaluateTransaction('GetTxn');

          res.send(result);
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      function getRandomString(length) {
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return result;
      }

      app.listen(3001, () => {
        console.log('app is running on port 3001');
      });
    } finally {
      // Disconnect from the gateway when the application is closing
      // This will close all connections to the network
      //gateway.disconnect();
    }
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }
}

main();
