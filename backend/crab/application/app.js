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
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: true }));

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
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
        }
      });

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
          res.send('successful');
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
        }
      });

      //*============== Create Jail Entity ================
      app.post('/admin/jailentry', async (req, res) => {
        const { jailId, location, dSign, password } = req.body;
        const uid = `court_${jailId}`;

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
          res.send('successful');
        } catch (error) {
          console.log(`*** Successfully caught the error: \n    ${error}\n`);
          res.send('failed');
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
