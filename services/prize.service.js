import fs from "fs";

const dataJSON = JSON.parse(fs.readFileSync("prize.json").toString());

export const countPrize = (callback) => {
    try {
        let count = 0;
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                ++count;
            }
        });
        return callback(null, count);
    }
    catch(e) {
        return callback([]);
    }
}

export const getMultipleNobel = (callback) => {
    try {
        let duplicateNobels = [];
        let nobels = [];
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    var inNobels = false;
                    var inDuplicateNobels = false;
                    for(var i = 0; i < nobels.length; i++) {
                        if (nobels[i].id === laureate.id) {
                            inNobels = true;
                        }
                    }
                    if (inNobels) {
                        for(var i = 0; i < duplicateNobels.length; i++) {
                            if (duplicateNobels[i].id === laureate.id) {
                                inDuplicateNobels = true;
                            }
                        }
                    }
                    else {
                        nobels.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname
                        });
                    }
                    if (inNobels && !inDuplicateNobels) {
                        duplicateNobels.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname,
                            count: 2
                        });
                    }
                    else if (inNobels && inDuplicateNobels) {
                        for(var i = 0; i < duplicateNobels.length; i++) {
                            if (duplicateNobels[i].id === laureate.id) {
                                duplicateNobels[i].count++;
                            }
                        }
                    }
                });
            }
        });
        return callback(null, duplicateNobels);
    }
    catch(e) {
        return callback([]);
    }
}

export const getCategories = (callback) => {
    try {
        let categories = [];
        dataJSON.forEach((element) => {
            if (element.category !== undefined) {
                if (!categories.find((category) => category === element.category)) {
                    categories.push(element.category);
                }
            }
        });
        return callback(null, categories);
    }
    catch(e) {
        return callback([]);
    }
}

export const getBestCategory = (callback) => {
    try {
        let categories = [];
        dataJSON.forEach((element) => {
            if (element.category !== undefined) {
                if (categories.find((category) => category.name === element.category)) {
                    categories.forEach((category) => {
                        if (category.name === element.category && element.laureates !== undefined) {
                            category.count += element.laureates.length;
                        }
                    });
                }
                else {
                    if (element.laureates !== undefined) {
                        categories.push({
                            name: element.category,
                            count: element.laureates.length
                        });
                    }
                    else {
                        categories.push({
                            name: element.category,
                            count: 0
                        });
                    }
                }
            }
        });
        let bestCategory = categories[0];
        categories.forEach((category) => {
            if (category.count > bestCategory.count) {
                bestCategory = category;
            }
        });
        return callback(null, bestCategory);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}


export const getNobelsYears = (callback) => {
    try {
        let years = [];
        dataJSON.forEach((element) => {
            if (element.year !== undefined) {
                if (years.find((year) => year.year === element.year)) {
                    years.forEach((year) => {
                        if (year.year === element.year && element.laureates !== undefined) {
                            year.count += element.laureates.length;
                        }
                    });
                }
                else {
                    if (element.laureates !== undefined) {
                        years.push({
                            year: element.year,
                            count: element.laureates.length
                        });
                    }
                    else {
                        years.push({
                            year: element.year,
                            count: 0
                        });
                    }
                }
            }
        });
        return callback(null, years);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

export const getPrizesId = (id, callback) => {
    try {
        let prizes = null
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined) {
                element.laureates.forEach((laureate) => {
                    if (laureate.id === id) {
                        if (prizes === null) {
                            prizes = {
                                firstname: laureate.firstname,
                                surname: laureate.surname,
                                prizes: []
                            };
                        }
                        prizes.prizes.push({
                            year: element.year,
                            category: element.category,
                            motivation: laureate.motivation,
                        });
                    }
                });
            }
        }
        );
        return callback(null, prizes);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

export const getNoNobelYears = (callback) => {
    try {
        let nobelsYears = [];
        let noNobelsYears = [];
        dataJSON.forEach((element) => {
            if (element.laureates !== undefined && !nobelsYears.find((year) => year === element.year)) {
                nobelsYears.push(element.year);
            }
        });
        dataJSON.forEach((element) => {
            if (!nobelsYears.find((year) => year === element.year) && !noNobelsYears.find((year) => year === element.year)) {
                noNobelsYears.push(element.year);
            }
        });
        return callback(null, noNobelsYears);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}


export const getNobelsByYearSorted = (sort, callback) => {
    try {
        const years = getNobelsYears2();
        if (sort === '-laureates') {
            years.sort((a, b) => {
                if (a.count > b.count) {
                    return -1;
                }
                if (a.count < b.count) {
                    return 1;
                }
                return 0;
            });
        }
        else {
            years.sort((a, b) => {
                if (a.count < b.count) {
                    return -1;
                }
                if (a.count > b.count) {
                    return 1;
                }
                return 0;
            });
        }
        let nobelsByYearSorted = [];
        years.forEach((year) => {
            if (year.count > 0) {
                dataJSON.forEach((element) => {
                    if (element.year === year.year) {
                        if (!nobelsByYearSorted.find((nobel) => nobel.year === year.year)) {
                            nobelsByYearSorted.push({
                                year: year.year,
                                laureates: []
                            });
                        }
                        if (element.laureates !== undefined) {
                            element.laureates.forEach((laureate) => {
                                nobelsByYearSorted.slice(-1)[0].laureates.push(laureate);
                            });
                        }
                    }
                });
            }
        });
        return callback(null, nobelsByYearSorted);
    }
    catch(e) {
        console.log(e);
        return callback([]);
    }
}

const getNobelsYears2 = () => {
    try {
        let years = [];
        dataJSON.forEach((element) => {
            if (element.year !== undefined) {
                if (years.find((year) => year.year === element.year)) {
                    years.forEach((year) => {
                        if (year.year === element.year && element.laureates !== undefined) {
                            year.count += element.laureates.length;
                        }
                    });
                }
                else {
                    if (element.laureates !== undefined) {
                        years.push({
                            year: element.year,
                            count: element.laureates.length
                        });
                    }
                    else {
                        years.push({
                            year: element.year,
                            count: 0
                        });
                    }
                }
            }
        });
        return years;
    }
    catch(e) {
        console.log(e);
        return null
    }
}
