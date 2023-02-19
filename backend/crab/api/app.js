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

      //*============== Create Court Entity ===========
      app.post('/admin/courtentry', async (req, res) => {
        const { courtId, location, judgeSign, password } = req.body;
        const uid = `court_${courtId}`;

        try {
          let result = await contract.evaluateTransaction(
            'CreateCourt',
            uid,
            courtId,
            location,
            judgeSign,
            password
          );
          await contract.submitTransaction(
            'CreateCourt',
            uid,
            courtId,
            location,
            judgeSign,
            password
          );
          console.log(`Court entry Successful\n Result: ${result}\n`);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
      });

      //*============== Create Jail Entity ===========
      app.post('/admin/jailentry', async (req, res) => {
        const { jailId, location, dSign, password } = req.body;
        const uid = `jail_${jailId}`;

        try {
          let result = await contract.evaluateTransaction(
            'CreateJail',
            uid,
            jailId,
            location,
            dSign,
            password
          );
          await contract.submitTransaction(
            'CreateJail',
            uid,
            jailId,
            location,
            dSign,
            password
          );
          console.log(`Jail entry Successful\n Result: ${result}\n`);
          res.send(result);
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
      });

      //*============== Court login =====================
      app.post('/login/court', async (req, res) => {
        const { courtId, password } = req.body;
        console.log(`courtid: ${courtId}, password: ${password}`);

        try {
          let result = await contract.evaluateTransaction(
            'FindCourtEntity',
            courtId,
            password
          );

          const userInfo = JSON.parse(result.toString());
          res.cookie('user', userInfo, {
            maxAge: 3600_000,
            httpOnly: true,
          });
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
        const { jailId, password } = req.body;
        console.log(`courtid: ${jailId}, password: ${password}`);

        try {
          let result = await contract.evaluateTransaction(
            'FindJailEntity',
            jailId,
            password
          );
          const userInfo = JSON.parse(result.toString());
          res.cookie('user', userInfo, {
            maxAge: 3600_000,
            httpOnly: true,
          });
          res.send(result.toString());
        } catch (error) {
          res.status(400).json({
            error: error.toString(),
          });
        }
      });

      //*============= Create Criminal ============
      app.post('/court/criminalentry', async (req, res) => {
        const {
          name,
          dob,
          gender,
          nationality,
          crimeDesc,
          nid,
          pStartTime,
          pEndTime,
          courtId,
          jailId,
        } = req.body;

        const uid = `criminal_${nid}`;

        try {
          let result = await contract.evaluateTransaction(
            'CreateCriminal',
            uid,
            name,
            dob,
            gender,
            nationality,
            crimeDesc,
            nid,
            pStartTime,
            pEndTime,
            courtId,
            jailId
          );
          await contract.submitTransaction(
            'CreateCriminal',
            uid,
            name,
            dob,
            gender,
            nationality,
            crimeDesc,
            nid,
            pStartTime,
            pEndTime,
            courtId,
            jailId
          );
          console.log(`Criminal entry Successful\n Result: ${result}\n`);
          res.send(result.toString());
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.status(400).send(error.toString());
        }
      });

      //*================== Get criminals by court ==================
      app.get('/court/criminals', async (req, res) => {
        if (req.cookies.user == null) {
          res.status(400).send('You are not logged in');
          return;
        }
        const findUser = req.cookies.user;
        console.log(`court id is: ${findUser.CourtId}`);

        try {
          // const findUser = req.cookies.user.toString();
          // console.log(`court id is: ${findUser.CourtId}`);
          const result = await contract.evaluateTransaction(
            'GetCriminalByCourt',
            findUser.CourtId
          );

          res.send(result.toString());
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

      //*=================== Update criminal by court ==================
      app.post('/court/updatecriminal', async (req, res) => {
        const {
          name,
          dob,
          gender,
          nationality,
          crimeDesc,
          nid,
          pStartTime,
          pEndTime,
          courtId,
          jailId,
        } = req.body;

        const key = `criminal_${nid}`;

        try {
          let result = await contract.evaluateTransaction(
            'UpdateCriminal',
            key,
            name,
            dob,
            gender,
            nationality,
            crimeDesc,
            nid,
            pStartTime,
            pEndTime,
            courtId,
            jailId
          );
          await contract.submitTransaction(
            'UpdateCriminal',
            key,
            name,
            dob,
            gender,
            nationality,
            crimeDesc,
            nid,
            pStartTime,
            pEndTime,
            courtId,
            jailId
          );
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
      app.get('/criminal', async (req, res) => {
        const { nid } = req.body;
        const key = `criminal_${nid}`;
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

      //*=================== logout =====================
      app.get('/logout', async (req, res) => {
        try {
          res.cookie('user', '', { maxAge: -1, httpOnly: true });
          res.json({ status: 'you have successfully logged out' });
        } catch (error) {
          res.status(400).send(error.toString());
        }
      });

      app.listen(3000, () => {
        console.log('app is running on port 3000');
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
