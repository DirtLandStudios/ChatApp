#!/bin/bash
if [$1 == "--server"] then
tsc ChatApp-server/src/index.ts --outDir ./ChatApp-server
else
tsc src/main.ts --outDir ./JS
fi
