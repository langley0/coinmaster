import Account from "../models/Account";
import { LocalStorage } from "node-localstorage";

const storage = new LocalStorage("./storage/account");

async function getAccount(username: string): Promise<Account|null> {
    const item = storage.getItem(username);
    if (item !== null) {
        // json 파싱을 하고 다시 넣는다
        return Account.parse(item);
    }

    return null;
}

async function createAccount(username: string): Promise<Account> {
    const account = new Account();
    storage.setItem(username, JSON.stringify(account));
    return account;
}

export default {
    get: getAccount,
    create: createAccount,
}