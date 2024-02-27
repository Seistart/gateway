export const ConfigSample = {
    SEISTART_URL: '',
  
    // API Urls
    PROJECTS_API: '/api/projects',
  
    MOCKING_ENABLED: false,
  
    // Generic
    INSTRUCTIONS_ENABLED: false,
  };
  
  export const CONFIG_KEYS = Object.keys(ConfigSample) as ConfigKey[];
  export const STRING_KEYS = CONFIG_KEYS.filter(
    (key) => typeof ConfigSample[key] === 'string'
  );
  export const NUMBER_KEYS = CONFIG_KEYS.filter(
    (key) => typeof ConfigSample[key] === 'number'
  );
  export const BOOLEAN_KEYS = CONFIG_KEYS.filter(
    (key) => typeof ConfigSample[key] === 'boolean'
  );
  
  export type ConfigKey = keyof typeof ConfigSample;
  type ConfigTypeMap = {
    [K in ConfigKey]: (typeof ConfigSample)[K];
  };
  type Config = Partial<ConfigTypeMap>;
  
  type ConfigKeysBy<T> = {
    [K in ConfigKey]: ConfigTypeMap[K] extends T ? K : never;
  }[ConfigKey];
  
  type NumberKey = ConfigKeysBy<number>;
  type StringKey = ConfigKeysBy<string>;
  type BooleanKey = ConfigKeysBy<boolean>;
  
  export const isNumberKey = (key: ConfigKey): key is NumberKey =>
    NUMBER_KEYS.includes(key);
  export const isBooleanKey = (key: ConfigKey): key is BooleanKey =>
    BOOLEAN_KEYS.includes(key);
  export const isStringKey = (key: ConfigKey): key is StringKey =>
    STRING_KEYS.includes(key);
  
  type RawConfig = {
    [key: string]: string;
  };
  
  export const isKnownKey = (value: string): value is ConfigKey =>
    typeof value === 'string' &&
    (CONFIG_KEYS as readonly string[]).includes(value);
  
  export const formatRawConfigValueToBoolean = (
    value: string | boolean
  ): boolean | undefined => {
    if (typeof value === 'boolean') {
      return value;
    }
    if (value === 'false') {
      return false;
    } else if (value === 'true') {
      return true;
    }
    return undefined;
  };
  
  export const formatRawConfigValueToNumber = (
    value: string | number
  ): number | undefined => {
    if (typeof value === 'number') {
      return value;
    }
  
    const number = parseInt(value, 10);
  
    if (isNaN(number)) {
      return undefined;
    }
  
    return number;
  };
  
  export const getLocalStorageValue = (key: ConfigKey): string | null =>
    window.localStorage.getItem(`CONFIG_${key}`);
  
  export const setLocalStorageValue = (key: ConfigKey, value: string) =>
    window.localStorage.setItem(`CONFIG_${key}`, value);
  
  export const formatRawConfig = (rawConfig: RawConfig = {}): Config => {
    const rawKeys = Object.keys(rawConfig);
    const allKeys = Array.from(new Set([...CONFIG_KEYS, ...rawKeys]));

    return allKeys.reduce<Config>((acc, key) => {
        const innerKey = key as ConfigKey;
        const value = rawConfig[innerKey];

        if (!isKnownKey(innerKey)) {
            console.warn(
                `Removed unknown configuration key "${innerKey}" and value "${value}" from the configuration.`
            );
            return acc;
        }

        if (isBooleanKey(innerKey)) {
            const booleanValue = formatRawConfigValueToBoolean(
                getLocalStorageValue(innerKey) ?? value
            );
            if (booleanValue !== undefined) {
                acc[innerKey] = booleanValue;
            }
        } else if (isNumberKey(innerKey)) {
            const numberValue = formatRawConfigValueToNumber(
                getLocalStorageValue(innerKey) ?? value
            );
            if (numberValue !== undefined) {
                acc[innerKey] = numberValue;
            }
        } else {
            const stringValue = getLocalStorageValue(innerKey) ?? value;
            if (stringValue !== undefined) {
                acc[innerKey] = stringValue;
            }
        }

        return acc;
    }, {});
};

  
  let config: Config | null = null;
  
  export const getConfig = (): Config => {
    if (config) {
      return config;
    }
  
    return (config = formatRawConfig(
      (window as unknown as { [key: string]: unknown })['env'] as RawConfig
    ));
  };
  
  export const hasConfigValue = <K extends ConfigKey>(key: K) =>
    getConfig()[key] !== undefined;
  
  export const configOverriddenByLocalstorage = () => {
    // Which rawKeys are being overridden by localStorage
    const rawConfig = (window as unknown as { [key: string]: unknown })[
      'env'
    ] as RawConfig;
    return CONFIG_KEYS.some(
      (key: ConfigKey) =>
        !(
          getLocalStorageValue(key) === null ||
          rawConfig[key] === getLocalStorageValue(key)
        )
    );
  };
  
  export const resetConfig = () => {
    CONFIG_KEYS.forEach((key) => localStorage.removeItem(`CONFIG_${key}`));
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  
  export const getConfigValue = <K extends ConfigKey, F extends Config[K]>(
    key: K,
    fallback?: F
  ) => {
    const value = getConfig()[key];
    if (value === undefined) {
      if (fallback === undefined) {
        throw new Error(
          `Config is missing value for key "${key}" and no fallback was provided.`
        );
      }
  
      return fallback;
    }
  
    return value;
  };