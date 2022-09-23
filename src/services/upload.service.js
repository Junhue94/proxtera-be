const readXlsxFile = require("read-excel-file/node");

const db = require("./db.service");

async function create(excelFile) {
    const filePath = `${__dirname}/../assets/uploads/${excelFile.filename}`;
    const data = await readXlsxFile(filePath) || [];
    let schema = [];
    const invalidData = [];

    const collection = await db.collection();
    const bulkCreate = collection.initializeOrderedBulkOp();


    for (let row = 0; row < data.length; row += 1) {
        const rowData = {};
        if (row === 0) {
            // Set header
            schema = data[row];
        } else {
            // Process data rows
            let isValidDoc = true;
            for (let col = 0; col < data[row].length; col += 1) {
                const value = data[row][col];
                rowData[schema[col]] = value;
                if (!value) {
                    isValidDoc = false;
                }
            }
            if (isValidDoc) {
                bulkCreate.insert(rowData);
            } else {
                invalidData.push(rowData);
            }
        }
    }

    await bulkCreate.execute();
    return invalidData;
}

module.exports = {
    create,
};
