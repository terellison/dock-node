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

module.exports = {
    getUsersHomeFolder,
    getFilesInFolder,
    instpectAndDescribeFiles
}