@ECHO OFF

DEL app.js

ECHO //FILE: tinymusic.js >> app.js
TYPE tinymusic.js >> app.js
ECHO //FILE: functions.js >> app.js
TYPE functions.js >> app.js
ECHO //FILE: init.js >> app.js
TYPE init.js >> app.js
ECHO //FILE: sprites.js >> app.js
TYPE sprites.js >> app.js
ECHO //FILE: entity.js >> app.js
TYPE entity.js >> app.js
TYPE draw.js >> app.js
ECHO //FILE: draw.js >> app.js
ECHO //FILE: events.js >> app.js
TYPE events.js >> app.js
ECHO //FILE: restart.js >> app.js
TYPE restart.js >> app.js
ECHO //FILE: game.js >> app.js
TYPE game.js >> app.js

COPY /Y app.js release\