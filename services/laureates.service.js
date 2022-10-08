import fs from "fs";
const dataBuffer = fs.readFileSync("prize.json");

export const listLaureates = (req, callback) => {
    const laureates = readAllLaureates();

    let page = 1;
    let limit = 10;
    if (req.query.page !== undefined) {
        page = req.query.page;
    }
    if (req.query.limit !== undefined) {
        limit = req.query.limit;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (laureates.length == 0) {
        return callback([]);
    }
    return callback(null, laureates.slice(startIndex, endIndex));
}

export const readLaureate = (id, callback) => {
    let laureate = null;
    let dataJSON = dataBuffer.toString();
    dataJSON = JSON.parse(dataJSON);
    dataJSON.forEach((element) => {
        if (element.laureates != null) {
            for(var i = 0; i < element.laureates.length; ++i) {
                if (element.laureates[i].id === id) {
                    laureate = {
                        firstname: element.laureates[i].firstname,
                        surname: element.laureates[i].surname
                    }
                    break;
                }
            }
        }
    });

    if (laureate === null) {
        return callback([]);
    }

    return callback(null, laureate);
}

const readAllLaureates = () => {
    try {
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        const laureates = [];
        dataJSON.forEach((element) => {
            if (element.laureates != null) {
                for(var i = 0; i < element.laureates.length; ++i) {
                    if (!laureates.find(
                        (laureate) => laureate.firstname === element.laureates.firstname && 
                        laureate.lastname === element.laureates.lastname)) {
                        laureates.push({
                            id: element.laureates[i].id,
                            firstname: element.laureates[i].firstname,
                            surname: element.laureates[i].surname
                        });
                    }
                }
            }
        });
        return laureates;
    }
    catch(e) {
        console.log(e);
        return [];
    }
}