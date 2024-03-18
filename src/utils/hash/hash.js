import password from 'password-hash-and-salt';

export const hash = (input) => {
  console.log(`new password for '${input}':`);
  password(input).hash(function (error, hash) {
    if (error) throw new Error('Something went wrong!');
    // Store hash (incl. algorithm, iterations, and salt)
    console.log(`${hash}`);
    console.log();
  });
};
