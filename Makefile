initial-setup:
	find . -name '*.example' -print0 | xargs -0 sed -i 's/NG_PROJECT/${project}/g'
	find . -name '*.html' -print0 | xargs -0 sed -i 's/NG_PROJECT/${project}/g'
	find . -name '*.json' -print0 | xargs -0 sed -i 's/NG_PROJECT/${project}/g'
	find . -name '*.ts' -print0 | xargs -0 sed -i 's/NG_PROJECT/${project}/g'
	find . -name '*.example' -print0 | xargs -0 sed -i 's/FIREBASE_PROJECT_ID/${firebase}/g'
	mv .firebaserc.example .firebaserc
	mv angular.json.example angular.json
	mv firebase.json.example firebase.json
	mv karma.conf.js.example karma.conf.js
	mv src/environments/environment.local.ts.example src/environments/environment.local.ts
	mv src/environments/environment.testing.ts.example src/environments/environment.testing.ts
	mv src/environments/environment.staging.ts.example src/environments/environment.staging.ts
	mv src/environments/environment.prod.ts.example src/environments/environment.prod.ts
	sed -i.bak -e '2,11d' .gitignore
	rm .gitignore.bak
	npm install
	npm install --prefix functions