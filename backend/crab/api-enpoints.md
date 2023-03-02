### Routes

```python
==== endpoint ======== method ========== status ====== params ======

/admin/courtentry       POST              done         courtId, location, judgeSign, password
/admin/jailentry        POST              done         jailId, location, dSign, password 
/login/court            POST              done         courtId, password 
/login/jail             POST              done         jailId, password
/court/criminalentry    POST              done         name, dob, gender, nationality, crimeDesc, nid, pStartTime, pEndTime, courtId, jailId
/court/criminals        GET               done
/jail/criminals         GET               done
/court/updatecriminal   POST              done         name, dob, gender, nationality, crimeDesc, nid, pStartTime, pEndTime, courtId, jailId
/court/deletecriminal   DELETE            done         nid
/criminal               GET               done         nid
/logout                 POST              done
/count                  POST              done         court, jail, passport, police (number)
/count                  GET               done 
/transaction            POST                           tx id, date, time, type, name                    
```