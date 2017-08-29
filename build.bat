@ECHO OFF
SETLOCAL

DEL app.js

:: Update HTML5 offline manifest so game will update
::ECHO #%time% > release\app.appcache
::TYPE app.appcache >> release\app.appcache
TYPE app.appcache > release\app.appcache

git add .
git commit -m "Build %date% %time%"

:: Compile JS into one file
TYPE tinymusic.js >> app.js
TYPE functions.js >> app.js
TYPE init.js >> app.js
TYPE sprites.js >> app.js
TYPE entity.js >> app.js
TYPE draw.js >> app.js
TYPE music.js >> app.js
TYPE events.js >> app.js
TYPE restart.js >> app.js
TYPE game.js >> app.js

COPY /Y app.js release\
COPY /Y sprites.png release\
ECHO "Ready to test in release\ folder"
PAUSE

COPY /Y .\release\*.* "C:\Users\marc\Google Drive\Work\cawoodm.github.io\jumpy-mike"
ECHO "Ready to test in cawoodm.github.io\jumpy-mike\ folder"
PAUSE
CD ..\..\..\cawoodm.github.io\jumpy-mike
git add .
git commit -m "Release %date% %time%"
git push origin master
ECHO "Ready to test at http://cawoodm.github.io/jumpy-mike/"
START http://cawoodm.github.io/jumpy-mike/
PAUSE
::CD ..\..\JavaScript\games\trex
::echo -- %dp0%

ENDLOCAL