'use strict';
const async = require('async');
const osenv = require('osenv');
const fs = require('fs');
const path = require('path');

function getUsersHomeFolder() {
    return osenv.home();
}

function getFilesInFolder(folderPath,cb) {
    fs.readdir(folderPath, cb);
}

function instpectAndDescribeFile(filePath,cb) {
    let result = {
        file: path.basename(filePath),
        path: filePath, type: ''
    };
    fs.stat(filePath, (err,stat) => {
        if(err) {
            cb(err);
        } else {
            if (stat.isFile()) {
                result.type = 'file';
            }
            if (stat.isDirectory()) {
                result.type = 'directory';
            }
            cb(err,result);
        }
    });
}

function instpectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, aysncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        instpectAndDescribeFile(resolvedFilePath,aysncCb);
    }, cb);
}

function displayFiles(err,files) {
    if(err) {
        alert('Sorry, we couldn\'t display your files.');
    }
    files.forEach((file) => {console.log(file);});
}

function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(folderPath, (err,files) => {
        if(err) {
            return alert('Sorry, we couldn\'nt load your home folder');
        }
        instpectAndDescribeFiles(folderPath, files, displayFiles);
    });
}

main();