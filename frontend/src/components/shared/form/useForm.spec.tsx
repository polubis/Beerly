import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useForm, FieldsConfig, Fields } from './useForm';
import { Validator as V } from './validator';

type MockFormFields = 'username' | 'email' | 'password';

describe('useForm(config)', () => {
  let config: FieldsConfig<MockFormFields>;
  let eventMock: any;

  beforeEach(() => {
    config = {
      username: { title: 'Username' },
      email: { title: 'Username' },
      password: { title: 'Username' }
    };
    eventMock = {
      persist: () => {},
      target: { value: 'piotr19945' },
      currentTarget: {
        getAttribute: (key: string) => 'username'
      }
    };
  });

  it('should create initial state correctly', () => {
    const { result } = renderHook(() => useForm<MockFormFields>(config));

    const { keys, dirty, errorsOccured, fields } = result.current.state;

    expect(keys).toEqual(['username', 'email', 'password']);
    expect(dirty).toBe(false);
    expect(errorsOccured).toBe(false);
    expect(fields).toEqual({
      username: {
        value: '',
        error: ''
      },
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      }
    } as Fields<MockFormFields>);
  });

  it('should create initial state based on initValue attributes', () => {
    const { result } = renderHook(() =>
      useForm<MockFormFields>({
        ...config,
        username: { ...config.username, initValue: 'piotr1994' }
      })
    );

    expect(result.current.state.fields.username.value).toEqual('piotr1994');
  });

  describe('handleTyping(e)', () => {
    let handleTypingMockConfig: FieldsConfig<MockFormFields>;

    beforeEach(() => {
      handleTypingMockConfig = {
        ...config,
        username: {
          ...config.username,
          initValue: 'piotr1994',
          validate: (v, state) => V.one(new V(v).username())
        }
      };
    });

    it('should set field state based on data-key attribute and passed target value', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleTypingMockConfig));

      act(() => {
        result.current.handleTyping(eventMock);
        // Throws error - known issue on github ignore it right now - later version++
      });

      expect(result.current.state.fields.username.value).toBe('piotr19945');
    });

    it('should call validate() method from field config if form was submitted', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleTypingMockConfig));

      result.current.setState({
        dirty: true,
        errorsOccured: true,
        fields: {
          username: { value: '', error: '' },
          email: { value: '', error: '' },
          password: { value: '', error: '' }
        },
        keys: ['username', 'email', 'password']
      });

      act(() => {
        result.current.handleTyping({ ...eventMock, target: { value: 'pio19' } });
      });

      expect(result.current.state.fields.username.error.length).toBeGreaterThan(0);
    });

    it('should checkErrorsOccured() method and set errorsOccured as true if dirty attribute is set to true', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleTypingMockConfig));

      act(() => {
        result.current.handleSubmit({ preventDefault: () => {} } as any);
        result.current.handleTyping({ ...eventMock, target: { value: 'pio19' } });
      });

      expect(result.current.state.fields.username.error.length).toBeGreaterThan(0);
      expect(result.current.state.errorsOccured).toBeTruthy();
    });

    it('should check connectedWith field error property if dirty attribute is set to true', () => {
      handleTypingMockConfig.username.connectedWith = 'password';
      handleTypingMockConfig.password.value = 'pass19';
      handleTypingMockConfig.password.validate = (v, state) => V.one(new V(v).password());
      const { result } = renderHook(() => useForm<MockFormFields>(handleTypingMockConfig));

      act(() => {
        result.current.handleSubmit({ preventDefault: () => {} } as any);
        result.current.handleTyping({ ...eventMock, target: { value: 'pio19' } });
      });

      expect(result.current.state.fields.username.error.length).toBeGreaterThan(0);
      expect(result.current.state.fields.password.error.length).toBeGreaterThan(0);
    });
  });

  describe('handleSubmit(e)', () => {
    let handleSubmitConfig: FieldsConfig<MockFormFields>;
    beforeEach(() => {
      handleSubmitConfig = {
        ...config,
        username: {
          ...config.username,
          initValue: 'piotr1994',
          validate: (v, state) => V.one(new V(v).username())
        },
      };
      handleSubmitConfig.email.validate = (v, state) => V.one(new V(v).email());
      handleSubmitConfig.password.validate = (v, state) => V.one(new V(v).password());
    });

    it('should set dirty attribute to true after call', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleSubmitConfig));

      act(() => {
        result.current.handleSubmit({ preventDefault: () => {} } as any);
      });

      expect(result.current.state.dirty).toBeTruthy();
    });

    it('should set errorsOccured attribute if errors has been detected', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleSubmitConfig));

      result.current.setState({
        dirty: true,
        errorsOccured: true,
        fields: {
          username: { value: '', error: '' },
          email: { value: '', error: '' },
          password: { value: '', error: '' }
        },
        keys: ['username', 'email', 'password']
      });

      act(() => {
        result.current.handleSubmit({ preventDefault: () => {} } as any);
      });

      expect(result.current.state.errorsOccured).toBeTruthy();
    });

    it('should call validate method if exists for every field ', () => {
      const { result } = renderHook(() => useForm<MockFormFields>(handleSubmitConfig));
      result.current.setState({
        dirty: true,
        errorsOccured: true,
        fields: {
          username: { value: '', error: '' },
          email: { value: '', error: '' },
          password: { value: '', error: '' }
        },
        keys: ['username', 'email', 'password']
      });

      act(() => {
        result.current.handleSubmit({ preventDefault: () => {} } as any);
      });

      expect(result.current.state.fields.email.error).toBeTruthy();
      expect(result.current.state.fields.password.error).toBeTruthy();
      expect(result.current.state.fields.username.error).toBeTruthy();
    });
  });
});
