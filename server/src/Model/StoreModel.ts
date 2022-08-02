import knex from "../database/connection";

import { Store } from "../interfaces/StoreInterface";

class StoreModel {
    async index() {
        const store = await knex("store");

        return store;
    }

    async create(store: Store) {
        try {
            const insertedId = await knex("store").insert(store);

            const storeId = insertedId[0];

            store.id = storeId;

            return store;
        } catch (error) {
            return { error };
        }
    }

    async update(store: Store) {
        try {
            await knex("store").update(store);

            return store;
        } catch (error) {
            return { error };
        }
    }
}

export default StoreModel;