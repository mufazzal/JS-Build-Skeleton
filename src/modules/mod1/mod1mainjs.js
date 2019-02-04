// import ts from './mod1ts';
// import ts from './mod1jsx';
import kl from 'jquery';
import './mod1less.less';
import './mod1css.css';
import pngImg from './mod1ImpImg.png';
import {vv} from './es6js';
import {es6Fun} from './es6js';
import Es6Class from './es6js';
import rc from './reactfile';
import js from './mod1internaljs';
import text from './textfile.txt';
import csv from './csvfile.csv';
//import {ff, nn} from './mod1jsx.jsx'

$(document).ready(function(){
    $('#mod1ImdId1')[0].src = pngImg;
    $('#envReg')[0].innerHTML = `${env} ---- ${region} --- ${api}`;
});

/* eslint-disable */
//debugger;
/* eslint-enable */

es6Fun('4uu');
console.log(text, csv,  vv, Es6Class);

fetch('/posts').then(r=>r).then(r => console.log(r.text()));
fetch('/posts/1').then(r=>r).then(r => console.log(r.text()));
fetch('/posts/1').then(r=>r).then(r => console.log(r.text()));
fetch('http://localhost:3000/posts/1').then(r=>r).then(r => console.log(r.text()));
fetch('https://reqres.in/api/users?page=2').then(r=>r).then(r => console.log('reqres>> ', r.text()));
