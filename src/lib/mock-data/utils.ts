import { DefaultBodyType, http, PathParams, RequestHandlerOptions, ResponseResolver } from 'msw';


  const concat = (base: string, uri: string | RegExp): string | RegExp => {
    if (uri instanceof RegExp) {
      return new RegExp(base + '/' + uri.source, uri.flags);
    }
  
    return new URL(uri, base + '/').toString();
  };
  
  type HttpRequestResolverExtras<PathParams> = {
    params: PathParams;
    cookies: Record<string, string>;
  };

  export const createHTTP = (base: string) => ({
    all(
      uri: string,
      resolver: Parameters<typeof http.all>[1],
      options?: RequestHandlerOptions
    ) {
      return http.all(concat(base, uri), resolver, options);
    },
    head(
      uri: string,
      resolver: Parameters<typeof http.head>[1],
      options?: RequestHandlerOptions
    ) {
      return http.head(concat(base, uri), resolver, options);
    },
    get<
      B extends DefaultBodyType = DefaultBodyType,
      R extends DefaultBodyType = DefaultBodyType,
      P extends PathParams = PathParams,
      Resolver extends ResponseResolver<
        HttpRequestResolverExtras<P>,
        B,
        R
      > = ResponseResolver<HttpRequestResolverExtras<P>, B, R>,
    >(uri: string, resolver: Resolver, options?: RequestHandlerOptions) {
      return http.get<P, B, R>(concat(base, uri), resolver, options);
    },
    post<
      B extends DefaultBodyType = DefaultBodyType,
      R extends DefaultBodyType = DefaultBodyType,
      P extends PathParams = PathParams,
      Resolver extends ResponseResolver<
        HttpRequestResolverExtras<P>,
        B,
        R
      > = ResponseResolver<HttpRequestResolverExtras<P>, B, R>,
    >(uri: string, resolver: Resolver, options?: RequestHandlerOptions) {
      return http.post<P, B, R>(concat(base, uri), resolver, options);
    },
    put(
      uri: string,
      resolver: Parameters<typeof http.put>[1],
      options?: RequestHandlerOptions
    ) {
      return http.put(concat(base, uri), resolver, options);
    },
    delete(
      uri: string,
      resolver: Parameters<typeof http.delete>[1],
      options?: RequestHandlerOptions
    ) {
      return http.delete(concat(base, uri), resolver, options);
    },
    patch(
      uri: string,
      resolver: Parameters<typeof http.patch>[1],
      options?: RequestHandlerOptions
    ) {
      return http.patch(concat(base, uri), resolver, options);
    },
    options(
      uri: string,
      resolver: Parameters<typeof http.options>[1],
      options?: RequestHandlerOptions
    ) {
      return http.options(concat(base, uri), resolver, options);
    },
  });