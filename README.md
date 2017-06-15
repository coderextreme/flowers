# flowers
Flowers will make them sleepy

Install node.js and git bash on windows.

```bash
git clone https://github.com/coderextreme/flowers
cd flowers
node app.js
```
Go to http://localhost:3000 in the browser.  If there's an error when you run node.app.js, you may need to reboot, or change the port from 3000 to another port # in app.js, then go to http://localhost:"another port #" where "another port #" is replaced by the port #


If you're running something else besides windows, you may need to remove node_modules and do an

```bash
npm install
```

But I think it's fine now.

If you end up using a separate webserver besides node.js, for example, Python 2.7's SimpleHTTPServer ala:

```bash
C:\Python27\python -m SimpleHTTPServer 3000
```

You will need to go to the URL:

http://localhost:3000/src/main/html/flowers.xhtml

You can choose a different port here as well.

For Python 3, the command is:

```bash
python -m http.server 3000 --bind 127.0.0.1
```
