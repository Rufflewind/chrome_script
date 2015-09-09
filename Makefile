build:
	mkdir -p dist
	rm -f dist/dist.zip
	zip dist/dist.zip LICENSE
	cd src && curl -fsOS "https://code.jquery.com/jquery-2.1.4.min.js"
	sha512sum -c externals.sha512sum
	cd src && zip -r ../dist/dist.zip *

clean:
	rm -f dist/dist.zip
	rmdir 2>/dev/null dist || true
