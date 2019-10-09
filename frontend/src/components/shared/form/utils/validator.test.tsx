import { Validator as V } from './validator';

describe('Validator', () => {
  test('should create Validator object properly', () => {
    expect(new V('example-value')).toBeTruthy();
  });

  describe('one()', () => {
    test('should return first error', () => {
      const error: string = V.one(new V('invalid.emailformat').email());
      expect(error.length).toBeGreaterThan(0);
    });
  });

  describe('email()', () => {
    test('should return error if value format is invalid', () => {
      const error: string = V.one(new V('invalid.emailformat').email());
      expect(error.length).toBeGreaterThan(0);
    });

    test('should return empty string if format is valid', () => {
      const error: string = V.one(new V('valid.email@wp.pl').email());
      expect(error).toBe('');
    });
  });

  describe('username()', () => {
    test('should return error if value format is invalid', () => {
      expect(V.one(new V('toshort').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('toobigusernamevalueeeeeeee').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('invalid-format').username()).length).toBeGreaterThan(0);
      expect(V.one(new V('invalid/format').username()).length).toBeGreaterThan(0);
    });

    test('should return empty string if format is valid', () => {
      const error: string = V.one(new V('validemail@wp.pl').email());
      expect(error).toBe('');
    });
  });

  describe('password()', () => {
    test('should return error if value format is invalid', () => {
      expect(V.one(new V('toshort').password()).length).toBeGreaterThan(0);
      expect(V.one(new V('toobigpasswordvalueeeeeeee').password()).length).toBeGreaterThan(0);
    });

    test('should return empty string if format is valid', () => {
      expect(V.one(new V('correct/passw').password()).length).toBe(0);
    });
  });

  describe('comparePasswords()', () => {
    test('should return error if passwords are different', () => {
      expect(V.one(new V('password').comparePasswords('differentpassword'))).toBeTruthy();
    });

    test('should return empty string if password are the same', () => {
      expect(V.one(new V('password').comparePasswords('password'))).toEqual('');
    });
  });
});
