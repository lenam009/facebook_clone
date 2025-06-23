// server.js

//This use for server, use useeffect for client

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req: NextRequest, res: NextResponse) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server);

    io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        console.log('Client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        // Handle custom events here
        socket.on('message', (data) => {
            io.emit('message', data); // Broadcast message to all clients
        });
    });

    server.listen(3000, (err: any) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
