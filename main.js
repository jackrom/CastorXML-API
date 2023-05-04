require('newrelic');
const express = require("express");
const consign = require("consign");
const { once, EventEmitter } = require('events');

const app = express();

async function run() {
    const ee = new EventEmitter();

    process.nextTick(() => {
        ee.emit('conexiones', 42);
    });

    const [value] = await once(ee, 'conexiones');
    console.log(value);

    const err = new Error('kaboom');
    process.nextTick(() => {
        ee.emit('error', err);
    });

    try {
        await once(ee, 'myevent');
    } catch (err) {
        console.log('error happened', err);
    }
}

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

