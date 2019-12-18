forever stop 'root'
forever --id 'root' start -c "node --max-old-space-size=1024" -e forever-err.log bin/www.js
sleep 1
forever logs