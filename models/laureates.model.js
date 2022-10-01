const _laureate_id = Symbol('id');
const _laureate_first_name = Symbol('firstname');
const _laureate_surname = Symbol('surname');
const _laureate_motivation = Symbol('motivation');
const _laureate_share = Symbol('share');

export class Laureate {
    constructor(id, firstname, surname, motivation, share) {
        this[_laureate_id] = id;
        this[_laureate_first_name] = firstname;
        this[_laureate_surname] = surname;
        this[_laureate_motivation] = motivation;
        this[_laureate_share] = share;
    }

    // GETTERS
    get id() {
        return this[_laureate_id]
    }

    get firstName() {
        return this[_laureate_first_name]
    }

    get surName() {
        return this[_laureate_surname]
    }

    get motivation() {
        return this[_laureate_motivation];
    }

    get share() {
        return this[_laureate_share];
    }

    // SETTERS
    set firstName(newFirstName) {
        this[_laureate_first_name] = newFirstName;
    }

    set surName(newSurname) {
        this[_laureate_surname] = newSurname;
    }

    set motivation(newMotivation) {
        this[_laureate_motivation] = newMotivation;
    }

    set share(newShare) {
        this[_laureate_share] = newShare;
    }

    get JSON() {
        return JSON.stringify({
            id: this.id,
            firstname: this.firstname,
            surname: this.surname,
            motivation: this.motivation,
            share: this.share
        });
    }

    static fromJSON(json) {
        const data = JSON.parse(JSON.stringify(json));
        if (typeof data !== 'object'
            || !data.hasOwnProperty("id")
            || (typeof data.id !== 'string' && typeof data.id !== 'number')
            || !data.hasOwnProperty("firstname")
            || typeof data.firstname !== 'string'
            || !data.hasOwnProperty("surname")
            || typeof data.surname !== 'string'
            || !data.hasOwnProperty("motivation")
            || typeof data.motivation !== 'string'
            || !data.hasOwnProperty("share")
            || typeof data.share !== 'string') {
            throw new Error(`Not a User: ${json}`);
        }

        const laureate = new Laureate(data.id, data.firstname, data.surname, data.motivation, data.share);
        return laureate;
    }
}

export class AbstractLaureate {
    async list(callback) {}
}