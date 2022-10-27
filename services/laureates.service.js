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
            element.laureates.forEach((l) => {
                if (l.id == id) {
                    laureate = l;
                }
            });
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
                        (laureate) => laureate.id === element.laureates[i].id)) {
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

export const countLaureates = (callback) => {
    try {
        const laureates = readAllLaureates();
        return callback(null, laureates.length);
    }
    catch(e) {
        console.log(e);
        return callback([])
    }
}

export const filterLaureates =(req, callback) => {
    try {
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        var laureates = [];
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (!laureates.find((l) => l.id === laureate.id || l.category === laureate.category)) {
                        laureates.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname,
                            category: element.category,
                        });
                    }
                });
            }
        });

        if (req.query.firstname !== undefined) {
            for(var i = 0; i < laureates.length; ++i) {
                if (laureates[i].firstname.toLowerCase() !== req.query.firstname.toLowerCase()) {
                    laureates.splice(i, 1);
                    --i;
                }
            }
        }
        if (req.query.surname !== undefined) {
            if (laureates[i].surname !== undefined &&  laureates[i].surname.toLowerCase() !== req.query.surname.toLowerCase()) {
                laureates.splice(i, 1);
                --i;
            }
        }
        if (req.query.category !== undefined) {
            if (laureates[i].category.toLowerCase() !== req.query.category.toLowerCase()) {
                laureates.splice(i, 1);
                --i;
            }
        }
        return callback(null, laureates);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

export const deleteLaureate = (req, callback) => {
    try {
        const id = req.body.id.toString();
        const year = req.body.year;
        const category = req.body.category;
        let found = false;
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                for(var i = 0; i < element.laureates.length; ++i) {
                    if (element.laureates[i].id === id && element.year === year && element.category === category) {
                        element.laureates.splice(i, 1);
                        found = true;
                        break;
                    }
                }
            }
        });
        if (!found) {
            return callback([]);
        }
        fs.writeFileSync("prize.json", JSON.stringify(dataJSON));
        return callback(null, dataJSON);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

export const updateLaureate = (req, callback) => {
    try {
        const id = req.body.id.toString();
        const year = req.body.year;
        const category = req.body.category.toLowerCase();
        const motivation = req.body.motivation;
        let found = false;
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (laureate.id === id && element.year === year && element.category === category) {
                        laureate.motivation = motivation;
                        found = true;
                    }
                });
            }
        });
        if (!found) {
            return callback([]);
        }
        fs.writeFileSync("prize.json", JSON.stringify(dataJSON));
        return callback(null, dataJSON);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

export const addLaureate = (req, callback) => {
    try {
        const firstname = req.body.firstname;
        const surname = req.body.surname;
        const year = req.body.year;
        const category = req.body.category.toLowerCase();
        const motivation = req.body.motivation;
        let canAdd = false;
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);

        let found = false;
        let maxId = 0;
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (!found && parseInt(laureate.id) >= maxId) {
                        maxId = parseInt(laureate.id);
                    }
                    if (laureate.firstname === firstname && laureate.surname === surname) {
                        found = true;
                        maxId = parseInt(laureate.id) - 1;
                    }
                });
            }
        }
        );
        dataJSON.forEach((element) => {
            if (element.year === year && element.category === category) {
                if (element.laureates !== undefined) {
                    element.laureates.push({
                        id: (maxId + 1).toString(),
                        firstname: firstname,
                        surname: surname,
                        motivation: motivation
                    });
                }
                else {
                    element.laureates = [{
                        id: (maxId + 1).toString(),
                        firstname: firstname,
                        surname: surname,
                        motivation: motivation
                    }];
                }
                canAdd = true;
            }
        });
        if (!canAdd) {
            return callback([]);
        }
        fs.writeFileSync("prize.json", JSON.stringify(dataJSON));
        return callback(null, dataJSON);

    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}
