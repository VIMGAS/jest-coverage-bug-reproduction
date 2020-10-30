import BCryptHasher from './BCryptHasher';

describe('BCryptHasher', () => {
  it('should hash a string', async () => {
    const hasher = new BCryptHasher();

    const hashableString = 'This is a hashable string.';

    const hash: string = await hasher.generateHash(hashableString);

    expect(hash).not.toEqual(hashableString);
  });

  it('should be able to compare hashes with origin strings', async () => {
    const hasher = new BCryptHasher();

    const hashableString = 'This is a hashable string.';

    const hash: string = await hasher.generateHash(hashableString);

    const isHashFromHashableString = await hasher.compareHash(
      hashableString,
      hash
    );

    expect(isHashFromHashableString).toBeTruthy();
  });
});
