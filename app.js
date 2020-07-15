'use strict';
const fileSystem = require('./fileSystem');
const userInterface = require('./userInterface');

function main() {
    userInterface.bindDocument(window);
    let folderPath = fileSystem.getUsersHomeFolder();
    fileSystem.getFilesInFolder(folderPath, (err,files) => {
        if(err) {
            return alert('Sorry, we couldn\'nt load your home folder');
        }
        fileSystem.instpectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
    });
}

main();