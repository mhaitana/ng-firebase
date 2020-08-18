initial-setup:
	find . -name '*.example' -print0 | xargs -0 sed -i 's/NG_PROJECT/${project}/g'
	find . -name '*.example' -print0 | xargs -0 sed -i 's/FIREBASE_PROJECT/${firebase}/g'
	mv .firebaserc.example .firebaserc
	mv angular.json.example angular.json
	mv firebase.json.example firebase.json
	mv karma.conf.js.example karma.conf.js