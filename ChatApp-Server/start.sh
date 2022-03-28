#!/bin/bash
if [ $CREATE_SSL != "false" ]
then
	echo creating SSL
	node server/create-ssl.js
fi
echo starting
node server/index.js

