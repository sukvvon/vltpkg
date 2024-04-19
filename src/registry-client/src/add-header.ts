const isIterable = <T>(o: any): o is Iterable<T> =>
  !!o && !!o[Symbol.iterator]

// this does some rude things with types, but not much way around it,
// since the opts.headers type is so loosey goosey to begin with.
export const addHeader = <
  H extends
    | string[]
    | [string, string | string[]][]
    | Record<string, string | string[] | undefined>
    | Iterable<[string, string | string[] | undefined]>,
>(
  headers: null | undefined | H,
  key: string,
  value: string,
): H => {
  if (!headers) return { [key]: value } as H
  if (Array.isArray(headers)) {
    if (!headers.length) return [[key, value]] as unknown as H
    if (Array.isArray(headers[0]))
      (headers as [string, string][]).push([key, value])
    else (headers as string[]).push(key, value)
    return headers
  } else if (
    isIterable<[string, string | string[] | undefined]>(headers)
  ) {
    return [...headers, [key, value]] as unknown as H
  } else {
    headers[key] = value
    return headers
  }
}