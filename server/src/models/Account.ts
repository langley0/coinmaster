export default class Account {
    static parse(jsonData: string): Account {
        const obj = JSON.parse(jsonData);
        // 값을 자신에게 복사한다
        const account = new Account();
        Object.assign(account, obj);
        return account;
    }
}