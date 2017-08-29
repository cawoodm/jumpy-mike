@ECHO OFF
SETLOCAL

DEL app.js

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

:: Prepare release
TYPE app.appcache > release\app.appcache
COPY /Y app.js release\
DEL /Y /Q app.js
COPY /Y sprites.png release\
ECHO "Ready to test in release\ folder"
PAUSE

:: Copy to local cawoodm github site
COPY /Y .\release\*.* ..\..\..\cawoodm.github.io\jumpy-mike
ECHO "Ready to test in cawoodm.github.io\jumpy-mike\ folder"
PAUSE

:: Publish to github
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