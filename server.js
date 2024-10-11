const http = require('http');
const crypto = require('crypto');
const url = require('url');

const users = [
    { login: 'user1', passwordHash: crypto.createHash('sha256').update('password1').digest('hex') },
    { login: 'user2', passwordHash: crypto.createHash('sha256').update('password2').digest('hex') }
];

const data = {
    addresses: ['123 Main St', '456 Elm St'],
    products: ['Product1', 'Product2']
};

const handleLogin = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const { login, password } = queryObject;
    const user = users.find(u => u.login === login);
    if (user && user.passwordHash === crypto.createHash('sha256').update(password).digest('hex')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid login or password' }));
    }
};

const handleHome = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome');
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === 'POST' && req.url.startsWith('/login')) {
        console.log('login');
        handleLogin(req, res);
    } else if (req.method === 'GET' && req.url === '/home') {
        handleHome(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});