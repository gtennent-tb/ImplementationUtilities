export interface Alias {
  name: string;
  function: string;
}

export const aliases: Alias[] = [
  { name: 'feed', function: 'cardFeed' },
  { name: 'ejs', function: 'generateBoilerplateEjs' },
  { name: 'sso', function: 'sso' },
  { name: 'ec', function: 'ec' },
  { name: 'department', function: 'department' },
  { name: 'cf', function: 'cf' },
  { name: 'hash', function: 'hash'},
  {name: 'test', function: 'codeToEjs'},
  {name: 'store', function: 'storeReport'}
];
