export const AccountAlias = {
    app: 'app'
}as const;

export type AccountAlias = keyof typeof AccountAlias;

export const Accounts : Record<AccountAlias, string> ={
    app: '058264362412',
}