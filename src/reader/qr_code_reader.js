import QrCode from 'qrcode-reader';

var qr = new QrCode();

var properties = {
    FORMAT: {
        value: "qr_code",
        writeable: false
    }
};

// delete the function you would like to override
delete qr.grayscale;

// add new functional with the same name as deleted function
qr.grayscale = function (imageData) {
    return imageData;
};

QrCodeReader.prototype = Object.create(QrCodeReader.prototype, properties);
QrCodeReader.prototype.constructor = QrCodeReader;

function QrCodeReader(config, supplements) {
    this._row = [];
    this.config = config || {};
    this.supplements = supplements;
    return this;
}

QrCodeReader.prototype.decodePattern = function (pattern, inputImageWrapper) {
    qr.decode({
        width: inputImageWrapper.size.x,
        height: inputImageWrapper.size.y,
        data: inputImageWrapper.data
    });
    let error = qr.error;
    if (error) {
        console.error(error);
        return null;
    }

    let result = qr.result;
    if (result === null) {
        return null;
    }
    return {
        code: result.result
    };
};

export default QrCodeReader;
