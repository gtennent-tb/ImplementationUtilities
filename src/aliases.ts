export interface Alias {
  name: string;
  function: string;
}

export const aliases: Alias[] = [
  { name: 'feed', function: 'cardFeed' },
  { name: 'ejs', function: 'generateBoilerplateEjs' },
  { name: 'sso', function: 'sso' },
];
