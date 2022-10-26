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
        var laureates = JSON.parse(dataBuffer.toString());
        if (req.query.firstname !== undefined) {
            laureates = filterFirstname(laureates, req.query.firstname);
        }
        if (req.query.surname !== undefined) {
            laureates = filterSurname(laureates, req.query.surname);
        }
        if (req.query.category !== undefined) {
            laureates = filterCategory(laureates, req.query.category);
        }
        return callback(null, laureates);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

const filterFirstname = (laureates, firstname) => {
    firstname = firstname.toLowerCase();
    let returnLaureates = [];
    laureates.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((laureate) => {
                if (laureate.firstname.toLowerCase() === firstname) {
                    if (!returnLaureates.find((l) => l.id === laureate.id)) {
                        returnLaureates.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname
                        });
                    }
                }
            }
            )
        }
    });
    return returnLaureates;
}

const filterSurname = (laureates, surname) => {
    let returnLaureates = [];
    laureates.forEach((element) => {
        if (element.laureates !== undefined) {
            element.laureates.forEach((laureate) => {
                if (laureate.surname !== undefined && laureate.surname.toLowerCase() === surname) {
                    if (!returnLaureates.find((l) => l.id === laureate.id)) {
                        returnLaureates.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname
                        });
                    }
                }
            }
            )
        }
    });
    return returnLaureates;
}

const filterCategory = (laureates, category) => {
    let returnLaureates = [];
    laureates.forEach((element) => {
        if (element.category.toLowerCase() === category) {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (!returnLaureates.find((l) => l.id === laureate.id)) {
                        returnLaureates.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname
                        });
                    }
                }
                )
            }
        }
    });
    return returnLaureates;
}

export const deleteLaureate = (id, callback) => {
    try {
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                for(var i = 0; i < element.laureates.length; ++i) {
                    if (element.laureates[i].id === id) {
                        element.laureates.splice(i, 1);
                        break;
                    }
                }
            }
        });
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
        const id = req.params.id;
        const motivation = req.body.motivation;
        console.log(motivation);
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (laureate.id === id) {
                        laureate.motivation = motivation;
                    }
                });
            }
        });
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
                        surname: surname
                    });
                }
                else {
                    element.laureates = [{
                        id: (maxId + 1).toString(),
                        firstname: firstname,
                        surname: surname
                    }];
                }
            }
        });
        fs.writeFileSync("prize.json", JSON.stringify(dataJSON));
        return callback(null, dataJSON);

    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}
