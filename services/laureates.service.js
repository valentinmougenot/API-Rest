import fs from "fs";
import {Laureate, AbstractLaureate} from "../models/laureates.model.js";

const dataBuffer = fs.readFileSync("prize.json");

export default class FSLaureate extends AbstractLaureate {
    async list(callback) {
        const laureates = await this.readAllLaureates();
        if (laureates.length == 0) {
            return callback([]);
        }
        return callback(null, laureates);
    }

    async readLaureate(id, callback) {
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

    async readAllLaureates() {
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
}