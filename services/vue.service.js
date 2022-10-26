import fs from "fs";
const dataBuffer = fs.readFileSync("prize.json");

// list firstname surname and year of all laureates for a given category
export const getLaureatesByCategory = (req, callback) => {
    try {
        let category = getCategories()[0];
        if (req.query.category !== undefined) {
            category = req.query.category;
        }
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        let result = [];
        dataJSON.forEach((element) => {
            if (element.category === category) {
                if (element.laureates !== undefined) {
                    element.laureates.forEach((laureate) => {
                        result.push({
                            firstname: laureate.firstname,
                            surname: laureate.surname,
                            year: element.year
                        });
                    });
                }
            }
        });
        return callback(null, {result: result, categories: getCategories(), category: category});
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

// list every category
const getCategories = () => {
    try {
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        let result = [];
        dataJSON.forEach((element) => {
            if (!result.find((category) => category === element.category)) {
                result.push(element.category);
            }
        });
        return result;
    }
    catch(e) {
        console.log(e);
        return [];
    }
}

export const getCateg = (callback) => {
    try {
        let dataJSON = dataBuffer.toString();
        dataJSON = JSON.parse(dataJSON);
        let result = [];
        dataJSON.forEach((element) => {
            if (!result.find((category) => category === element.category)) {
                result.push(element.category);
            }
        });
        return callback(null, result);
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
        const year = req.body.year.toString();
        const category = req.body.category;
        const motivation = req.body.motivation;
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
            }
        });
        fs.writeFileSync("prize.json", JSON.stringify(dataJSON));
        return callback(null, {category: category});

    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}