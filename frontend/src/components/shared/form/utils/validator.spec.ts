import { Validator as V } from './validator';

describe('Validator', () => {
  it('should create Validator object properly', () => {
    expect(new V('example-value')).toBeTruthy();
  });

  describe('one()', () => {
    it('should return first error', () => {
      const error: string = V.one(new V('invalid.emailformat').email());
      expect(error.length).toBeGreaterThan(0);
    });
  });

  describe('email()', () => {
    it('should return error if value format is invalid', () => {
      const error: string = V.one(new V('invalid.emailformat').email());
      expect(error.length).toBeGreaterThan(0);
    });

    it('should return empty string if format is valid', () => {
      const error: string = V.one(new V('valid.email@wp.pl').email());
      expect(error).toBe('');
    });
  });

  describe('username()', () => {
    it('should return error if value format is invalid', () => {
      expect(V.one(new V('toshort').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('toobigusernamevalueeeeeeee').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('invalid-format').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('invalid/format').username()).length).toBeGreaterThan(0);
    });

    it('should return empty string if format is valid', () => {
      const error: string = V.one(new V('validemail@wp.pl').email());
      expect(error).toBe('');
    });
  });

  describe('password()', () => {
    it('should return error if value format is invalid', () => {
      expect(V.one(new V('toshort').password()).length).toBeGreaterThan(0);
      expect(V.one(new V('toobigpasswordvalueeeeeeee').password()).length).toBeGreaterThan(0);
    });

    it('should return empty string if format is valid', () => {
      expect(V.one(new V('correct/passw').password()).length).toBe(0);
    });
  });

  describe('comparePasswords(repeatedPassword)', () => {
    it('should return error if passwords are different', () => {
      expect(V.one(new V('password').comparePasswords('differentpassword'))).toBeTruthy();
    });

    it('should return empty string if password are the same', () => {
      expect(V.one(new V('password').comparePasswords('password'))).toEqual('');
    });
  });
});
