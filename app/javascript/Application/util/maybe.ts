/*
  A Maybe represents an optional value. A Maybe is either Something (if it
  contains a value) or Nothing (if it contains null or undefined). By using
  Maybes, we can define functions that explicitly declare that they may not
  return a value, and we can use those values without littering null checks
  across our codebase.

  Check out the test suites for individual methods below for some handy usages.
*/
function isNothing<T>(value: T | null): value is null {
  return value === null
}
function isSomething<T>(value: T | null): value is T {
  return !isNothing(value)
}

export class Maybe<T> {
  _value: T | null

  constructor(value: T | null = null) {
    // DO NOT USE _value! USE valueOrElse INSTEAD!
    this._value = value
  }

  /*
      isSomething and isNothing are primarily internal functions, although you can
      use them if you need to directly query for whether a Maybe contains a value
      or not.

      In most cases, you should prefer `maybe.valueOrElse` instead.
    */
  isNothing(): boolean {
    return isNothing(this._value)
  }

  isSomething(): boolean {
    return isSomething(this._value)
  }

  /*
      `map` transforms the underlying value of a Maybe. If the Maybe is Nothing,
      map does nothing. This allows us to map over Maybe values without having to
      perform null checks along the way.

      Ex:
        function getLastName(participant) {
          return Maybe.of(participant.last_name)
        }
        function getLastInitial(participant) {
          return getLastName(participant)
            .map((name) => name[0])
            .map((initial) => initial.toUpperCase())
        }
        getLastInitial({last_name: 'doe'}) // Maybe('D')
        getLastInitial({first_name: 'john'}) // Maybe(null)
        getLastInitial({last_name: ''}) // Maybe(null)
    */
  map<U>(f: (arg: T) => U): Maybe<U> {
    return isNothing(this._value) ? Maybe.of<U>(null) : Maybe.of(f(this._value))
  }

  /*
      `valueOrElse` is the primary way to get the value out of a Maybe. When
      retrieving the value from a Maybe, you must provide a fallback value. This
      fallback will be used if the Maybe is Nothing.

      Ex:
        function getLastName(participant) {
          return Maybe.of(participant.last_name).valueOrElse('Doe')
        }
        getLastName({first_name: 'John', last_name: 'Smith'}) // Smith
        getLastName({first_name: 'John'}) // Doe

        You can convert to an unwrapped value, too:
        Maybe.of('Hello').valueOrElse(null) // 'Hello'
        Maybe.of(null).valueOrElse(null) // null
    */
  valueOrElse(fallback: T | null | undefined) {
    return isNothing(this._value) ? fallback : this._value
  }

  /*
      `join` allows you to combine nested Maybes. This is primarily used
      internally by chain, but it is here in case you need it.

      Ex:
      Maybe.of(Maybe.of('Hello')).join() => Maybe.of('Hello')
      Maybe.of(Maybe.of(null)).join() => Maybe.of(null)
      Maybe.of(null).join() => Maybe.of(null)
    */
  join(): T {
    return isNothing(this._value) ? <T><unknown>Maybe.of(null) : this._value
  }

  /*
      `chain` combines `map` and `join`. This is useful when you have a Maybe and
      you map it with a function that returns another Maybe.

      Ex:
      function getZIPError(zip) {
        return zip.length < 5 ? Maybe.of('ZIP Codes are 5 digits long') : Maybe.of(null)
      }
      function getZIP(address) {
        return Maybe.of(address.zip)
      }

      getZIP(address).map(getZIPError) // Maybe(Maybe(String)) Bad! :-(
      getZIP(address).chain(getZIPError) // Maybe(String) Good!

      getZIP(address)
        .chain(getZIPError)
        .map((message) => `<em>${message}</em>`)
        .valueOrElse('All Good!')
    */
  chain<U>(f: (arg: T) => Maybe<U>): Maybe<U> {
    return this.map(f).join()
  }

  /*
      `filter` takes a predicate (function that returns a Boolean) and applies it
      to the underlying value, if there is one. If the value passes the test, it
      is kept. Otherwise, we end up with Nothing.

      You can think of this like an array filter, except our array is of length 1 (or 0)

      Ex:
      function getZIP(address) { return Maybe.of(address.zip) }
      function isCaliforniaZIP(zip) { ... } // Return true if ZIP is in California

      function welcomeMessage(address) {
        return getZIP(address)
          .filter(isCaliforniaZIP)
          .map((zip) => `Welcome to ${zip}!`)
          .valueOrElse('You do not even live here!')
      }

      Compare this to the same code without filter:
      function welcomeMessage(address) {
        const zip = getZIP(address)
        if (zip.map(isCaliforniaZIP).valueOrElse(false)) {
          return `Welcome to ${zip}`
        } else {
          return 'You do not even live here!'
        }
      }
    */
  filter(predicate: (arg: T) => boolean): Maybe<T> {
    return isSomething(this._value) && predicate(this._value) ? this : Maybe.of<T>(null)
  }

  // `Maybe.of` is really just sugar to avoid using `new` everywhere.
  static of<T>(value: T | null): Maybe<T> {
    return new Maybe(value)
  }
}
