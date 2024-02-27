import merge from 'lodash/merge';

import { z, ZodArray, ZodSchema } from 'zod';

import { generateMock, GenerateMockOptions } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';
import { mockeryMapper } from './mockery';


export type PartialOverride<T> =
  T extends Array<unknown>
    ? PartialOverride<T[number]>[]
    : T extends object
      ? Partial<T>
      : T;

export type OverrideFunction<T> =
  T extends Array<unknown>
    ? (entry: T[number], index: number, entries: T[]) => T[number]
    : (entry: T) => T;

export type BaseMockOptions<O, OF> = {
  seed?: number;
  length?: O extends Array<unknown> ? number : never; // Length is the amount of entries you want in case of an array schema type
  overrideFn?: OF;
};

export type SingleMockOptions<O, OF> = BaseMockOptions<O, OF> & {
  overrides?: O;
};

export type MultiMockOptions<O, OF> = BaseMockOptions<O, OF> & {
  count?: number; // Count is the amount of mocks you want. In case of an array schema type, you would get multiple arrays with the length specified above
  overrides?: O[];
};

export const defaultMockOptions = {
  seed: 1337,
};

	
const isSingleMockOptions = <T, OF>(
    options: SingleMockOptions<T, OF> | MultiMockOptions<T, OF>
  ): options is SingleMockOptions<T, OF> => !('count' in options);

function getMock<
  S extends ZodSchema,
  T = z.infer<S>,
  O = PartialOverride<T>,
  OF = OverrideFunction<T>,
>(schema: S, options: SingleMockOptions<O, OF> = defaultMockOptions) {
  const {
    seed = defaultMockOptions.seed,
    overrides,
    overrideFn,
    length,
  } = options;
  let result: z.TypeOf<S>;
  /*
   * Using generateMock on a zod array type results in n times the same element.
   * Instead, we take care of mocking the array, so that the array elements are
   * mocked with individual seeds.
   */

  if (schema instanceof ZodArray) {
    const mock = Array(length ?? 1)
      .fill(undefined)
      .map((_, index) => {
        return generateMock(schema.element, {
          seed: seed + index * seed,
          faker,
          mockeryMapper,
        });
      });
    const withOverrides = overrides ? merge(mock, overrides) : mock;

    result = withOverrides.map((entry, index, entries) =>
      typeof overrideFn === 'function'
        ? overrideFn(entry, index, entries)
        : entry
    );
  } else {
    const mock = generateMock(schema, {
      seed,
      faker,
      mockeryMapper,
    });
    const withOverrides = overrides
      ? merge(generateMock(schema, { seed, faker, mockeryMapper }), overrides)
      : mock;

    result =
      typeof overrideFn === 'function'
        ? overrideFn(withOverrides)
        : withOverrides;
  }

  return result;
}

export const getMockFn = <
  S extends ZodSchema,
  T = z.infer<S>,
  O = PartialOverride<T>,
  OF = OverrideFunction<T>,
>(
  schema: S,
  defaultMockOptions?: GenerateMockOptions
) => {
  function inner(options?: SingleMockOptions<O, OF>): T;
  function inner(options?: MultiMockOptions<O, OF>): T[];
  function inner(options?: SingleMockOptions<O, OF> | MultiMockOptions<O, OF>) {
    const combinedOptions = merge({}, defaultMockOptions, options);

    if (isSingleMockOptions(combinedOptions)) {
      return getMock(schema, combinedOptions);
    }

    const { seed: _seed, overrides, overrideFn, length } = combinedOptions;
    const seed = _seed ?? 1;
    const count = Math.max(overrides?.length ?? 0, combinedOptions.count ?? 1);
    return Array(count)
      .fill(undefined)
      .map((_, index) =>
        getMock(schema, {
          seed: seed + index * seed,
          overrides: overrides?.[index],
          overrideFn,
          length,
        })
      );
  }

  return inner;
};