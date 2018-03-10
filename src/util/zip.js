/* eslint-disable */

const obj = window
zip.workerScriptsPath = "/static/zipjs/";

class simpleZip {

    async init() {
        let _this = this
        return new Promise((resolve, reject) => {
            var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;
            var tmpFilename = "tmp.zip";
            requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
                function create() {
                    filesystem.root.getFile(tmpFilename, {
                        create : true
                    }, function(zipFile) {
                        console.log('类型')
                        console.log(zipFile)
                        let zipFileEntry = zipFile;
                        let writer = new zip.FileWriter(zipFileEntry);
                        console.log(writer)
                        zip.createWriter(writer, function(zipWriter) {
                            console.log('内部')
                            console.log(zipWriter)
                            resolve()

                            _this.zipWriter = zipWriter
                        }, onerror);
//                            writer.add('test1.jpg',
//                                new zip.HttpReader('http://tool2.yunser.com/asset/img/test1.jpg'), function() {
//
//                                }, function(progress) {
//
//                                });
                    });
                }

                filesystem.root.getFile(tmpFilename, null, function(entry) {
                    entry.remove(create, create);
                }, create);
            });
        })
    }

    addUrl(imgUrl, fileName) {
        return new Promise((resolve, reject) => {
            this.zipWriter.add(fileName, new zip.HttpReader(imgUrl), function() {
                resolve()
            })
        })
    }

    addDataUrl(dataUrl, fileName) {
        return new Promise((resolve, reject) => {
            this.zipWriter.add(fileName, new zip.Data64URIReader(dataUrl), function() {
                resolve()
            })
        })
    }

    download(fileName) {
        this.zipWriter.close(function(blob) {
            let creationMethod = 'Blob'
            var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
            var clickEvent;
            clickEvent = document.createEvent("MouseEvent");
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            var downloadButton = document.createElement('a');
            downloadButton.href = blobURL;
            downloadButton.download = fileName
            downloadButton.dispatchEvent(clickEvent);
        });
    }
}

export default new simpleZip()
