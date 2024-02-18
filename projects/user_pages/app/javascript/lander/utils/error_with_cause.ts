// NOTE: imported from https://github.com/voxpelli/pony-cause/blob/v2.1.10

export class CFErrorWithCause extends Error {
  constructor(message: string, { cause = null } = {}) {
    super(message)

    this.name = CFErrorWithCause.name
    if (cause) {
      // NOTE: hack for skipping TS error on ES6
      this['cause'] = cause
    }
    this.message = message
  }
}

const getErrorCause = (err: Error | { cause?: unknown | (() => Error) }): Error => {
  if (!err || typeof err !== 'object' || !('cause' in err)) {
    return
  }

  if (typeof err.cause === 'function') {
    const causeResult = err.cause()

    return causeResult instanceof Error ? causeResult : undefined
  } else {
    return err.cause instanceof Error ? err.cause : undefined
  }
}

const _stackWithCauses = (err: Error, seen: Set<Error>): string => {
  if (!(err instanceof Error)) return ''

  const stack = err.stack || ''

  // Ensure we don't go circular or crazily deep
  if (seen.has(err)) {
    return stack + '\ncauses have become circular...'
  }

  const cause = getErrorCause(err)

  // TODO: Follow up in https://github.com/nodejs/node/issues/38725#issuecomment-920309092 on how to log stuff

  if (cause) {
    seen.add(err)
    return stack + '\ncaused by: ' + _stackWithCauses(cause, seen)
  } else {
    return stack
  }
}

// eslint-disable-next-line
export const CFstackWithCauses = (err: Error): string => _stackWithCauses(err, new Set())

globalThis.CFErrorWithCause = CFErrorWithCause
globalThis.CFstackWithCauses = CFstackWithCauses
