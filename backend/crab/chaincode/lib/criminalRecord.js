/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class CriminalRecord extends Contract {
  //*============= Create Court Entity =============
  async CreateCourt(ctx, key, courtId, location, judgeSign, password) {
    // ctx is transaction context
    const court = {
      Key: key,
      CourtId: courtId,
      Location: location,
      JudgeSign: judgeSign,
      Password: password,
      Type: 'court',
    };
    //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      // The stub encapsulates the APIs between the chaincode implementation and the Fabric peer.
      key,
      Buffer.from(stringify(sortKeysRecursive(court)))
    );
    return JSON.stringify(court);
  }

  //*============= Create Jail Entity =============
  async CreateJail(ctx, key, jailId, location, dSign, password) {
    // ctx is transaction context
    const jail = {
      Key: key,
      JailId: jailId,
      Location: location,
      DigitalSign: dSign,
      Password: password,
      Type: 'jail',
    };
    //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      // The stub encapsulates the APIs between the chaincode implementation and the Fabric peer.
      key,
      Buffer.from(stringify(sortKeysRecursive(jail)))
    );
    return JSON.stringify(jail);
  }

  //*================ Find Court Entity ================
  async FindCourtEntity(ctx, courtId, password) {
    const key = `court_${courtId}`;

    const userJSON = await ctx.stub.getState(key); // get the asset from chaincode state
    if (!userJSON || userJSON.length === 0) {
      throw new Error(`The court for court id ${courtId} does not exist`);
    }

    const user = JSON.parse(userJSON.toString());
    if (user.Password !== password) {
      throw new Error('Court id and password do not matched!');
    }

    return userJSON.toString();
  }

  //*================ Find Jail Entity ================
  async FindJailEntity(ctx, jailId, password) {
    const key = `jail_${jailId}`;

    const userJSON = await ctx.stub.getState(key); // get the asset from chaincode state
    if (!userJSON || userJSON.length === 0) {
      throw new Error(`The jail for jail id ${jailId} does not exist`);
    }

    const user = JSON.parse(userJSON.toString());
    if (user.Password !== password) {
      throw new Error('Court id and password do not matched!');
    }

    return userJSON.toString();
  }

  //*============ Create Criminal ============
  async CreateCriminal(
    ctx,
    key,
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
  ) {
    // ctx is transaction context
    const criminal = {
      Key: key,
      Name: name,
      Dob: date,
      CourtMail: email,
      Nid: nid,
      JailName: jailName,
      JailId: jailID,
      Psd: punishmentStartDate,
      Ped: punishmentEndDate,
      CourtId: courtID,
      Gender: gender,
      Crime: crime,
      Type: 'criminal',
      DocType: 'file',
    };
    //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      // The stub encapsulates the APIs between the chaincode implementation and the Fabric peer.
      key,
      Buffer.from(stringify(sortKeysRecursive(criminal)))
    );
    return JSON.stringify(criminal);
  }

  //*============= Find Criminal ===============
  async FindCriminal(ctx, key) {
    const fileJSON = await ctx.stub.getState(key); // get the asset from chaincode state
    if (!fileJSON || fileJSON.length === 0) {
      throw new Error('The criminal does not exist');
    }
    return fileJSON.toString();
  }

  //*============= Get Criminals list by Court =============
  async GetCriminalByCourt(ctx, courtId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.DocType = 'file';
    queryString.selector.CourtId = courtId;
    let resultsIterator = await ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    );
    let results = await this.GetAllResults(resultsIterator, false);
    return JSON.stringify(results);
  }

  //*================ Get Criminals list by Jail ==============
  async GetCriminalByJail(ctx, jailId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.DocType = 'file';
    queryString.selector.JailId = jailId;
    let resultsIterator = await ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    );
    let results = await this.GetAllResults(resultsIterator, false);
    return JSON.stringify(results);
  }

  //*================ Get All Criminals list ==============
  async GetAllCriminals(ctx) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.DocType = 'file';
    // queryString.selector.JailId = jailId;
    let resultsIterator = await ctx.stub.getQueryResult(
      JSON.stringify(queryString)
    );
    let results = await this.GetAllResults(resultsIterator, false);
    return JSON.stringify(results);
  }

  //*================ Update Criminal Data ================
  async UpdateCriminal(
    ctx,
    key,
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
  ) {
    const exists = await ctx.stub.getState(key);
    if (!exists || exists.length === 0) {
      throw new Error(`The criminal for nid ${nid} does not exist`);
    }

    // overwriting original asset with new asset
    const updatedAsset = {
      Key: key,
      Name: name,
      Dob: date,
      CourtMail: email,
      Nid: nid,
      JailName: jailName,
      JailId: jailID,
      Psd: punishmentStartDate,
      Ped: punishmentEndDate,
      CourtId: courtID,
      Gender: gender,
      Crime: crime,
      Type: 'criminal',
      DocType: 'file',
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    const result = await ctx.stub.putState(
      key,
      Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
    );

    return JSON.stringify(result);
  }

  //*================ Delete Criminal ================
  async DeleteCriminal(ctx, nid) {
    const key = `criminal_${nid}`;
    const exists = await ctx.stub.getState(key);
    if (!exists || exists.length === 0) {
      throw new Error(`The criminal for nid ${nid} does not exist`);
    }
    const result = await ctx.stub.deleteState(key);
    return JSON.stringify(result);
  }

  async GetAllResults(iterator, isHistory) {
    let allResults = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));
        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.txId;
          jsonRes.Timestamp = res.value.timestamp;
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString('utf8');
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString('utf8');
          }
        }
        allResults.push(jsonRes);
      }
      res = await iterator.next();
    }
    iterator.close();
    return allResults;
  }
}

module.exports = CriminalRecord;
