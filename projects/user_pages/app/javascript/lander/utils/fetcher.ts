import { CFErrorWithCause } from './error_with_cause'

const CFFetcherErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
}
globalThis.CFFetcherErrorTypes = CFFetcherErrorTypes
class CFFetcherError extends CFErrorWithCause {
  public type: string

  constructor(type, options = {}) {
    super(type, options)
    this.name = 'CFFetcherError'
    this.type = type
  }
}
globalThis.CFFetcherError = CFFetcherError

type EnhancedFetchOptions = {
  retries: number
  timeoutMS: number
  timeoutAfterRetrial: number
  shouldCaptureServerError: boolean
}

interface FetcherOptions {
  debug?: boolean
}
type FetcherRequestOptions = {
  callbackData?: any
  customEvent?: string
} & EnhancedFetchOptions

const FetcherRequestDefaultOptions: FetcherRequestOptions = {
  retries: 1,
  timeoutMS: -1,
  timeoutAfterRetrial: 1000,
  shouldCaptureServerError: false,
}

type FetcherError = {
  error?: string
}
type FetcherResponse<T> = T | FetcherError

export function isResponseError<T>(response: FetcherResponse<T>): response is FetcherError {
  return typeof (response as FetcherError).error == 'string'
}

export default class Fetcher<T> {
  loading: boolean
  controller: AbortController
  signal: AbortSignal
  options: FetcherOptions
  url: string
  public manuallyAborted: boolean

  constructor(options?: FetcherOptions) {
    this.options = options || {}
  }

  /*
   * This fetch call is an extension of original fetch which only fires
   * api with a loading state before and after the call.
   * Can also debounce greater or less than 500ms if required.
   * The fetch request returns the JSON promise and is abortable
   */
  public async fetch(
    url: string,
    data: RequestInit,
    requestOptions: FetcherRequestOptions
  ): Promise<FetcherResponse<T>> {
    const { callbackData, customEvent, ...enhancedFetchOptions } = {
      ...FetcherRequestDefaultOptions,
      ...requestOptions,
    }

    let response: Response
    this.url = url
    data = data || {}
    this.controller = new AbortController()
    this.signal = this.controller.signal
    data.signal = this.signal

    this.setLoading(true, callbackData, customEvent)
    try {
      response = await this.enhancedFetch(url, data, enhancedFetchOptions)
      this.setLoading(false, callbackData, customEvent)
      if (this.options.debug) {
        console.log('[Fetch Request Completed]', response)
      }
      return response as FetcherResponse<T>
    } catch (error) {
      if (this.options.debug) {
        console.log('[Error During Fetch]', error)
      }
      this.setLoading(false, error, customEvent)
      if (!this.manuallyAborted) {
        throw error
      }
    }
  }

  async enhancedFetch(url: string, fetchOpts: RequestInit, opts: EnhancedFetchOptions): Promise<Response> {
    const { retries, timeoutMS, timeoutAfterRetrial, shouldCaptureServerError } = opts
    let lastErr
    for (let i = 0; i < retries; i++) {
      try {
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, timeoutAfterRetrial))
        }
        if (shouldCaptureServerError) {
          return await this.fetchWithTimeout(url, fetchOpts, timeoutMS).then((response: Response) => {
            if (response.status >= 500) {
              throw new CFFetcherError(CFFetcherErrorTypes.SERVER_ERROR)
            }
            return response
          })
        } else {
          return await this.fetchWithTimeout(url, fetchOpts, timeoutMS)
        }
      } catch (err) {
        if (err instanceof CFFetcherError && err.type == CFFetcherErrorTypes.SERVER_ERROR) {
          throw err
        }
        lastErr = err
      }
    }

    throw new CFFetcherError(CFFetcherErrorTypes.NETWORK_ERROR, lastErr)
  }

  fetchWithTimeout(url: string, opts: RequestInit, timeoutDuration = 1000): Promise<Response> {
    if (timeoutDuration > 0) {
      setTimeout(() => this.controller.abort(), timeoutDuration)
    }
    return fetch(url, opts)
  }

  public abort(): void {
    if (this.options.debug) {
      console.log('[Aborting Request]', this.url)
    }
    this.manuallyAborted = true
    this.controller.abort()
  }

  public setLoading(isLoading: boolean, details: Record<string, unknown>, customName: string): void {
    let loadingEvent: CustomEvent
    const startEvent = (customName && customName + 'Started') || 'CFFetchStarted'
    const endEvent = (customName && customName + 'Finished') || 'CFFetchFinished'

    if (isLoading && !this.loading) {
      if (this.options.debug) {
        console.log('[Loading Started]', startEvent)
      }
      this.loading = true
      loadingEvent = new CustomEvent(startEvent, {
        detail: details,
      })
    } else if (!isLoading && this.loading) {
      if (this.options.debug) {
        console.log('[Loading Finished/Aborted]', endEvent)
      }

      this.loading = false
      loadingEvent = new CustomEvent(endEvent, {
        detail: details,
      })
    }

    if (loadingEvent) {
      document.dispatchEvent(loadingEvent)
    }
  }
}

globalThis.CFFetcher = globalThis.CFFetcher || Fetcher
globalThis.CFFetch = (url: string, data: RequestInit, requestOptions: FetcherRequestOptions) => {
  const fetcher = new Fetcher()
  return fetcher.fetch(url, data, requestOptions)
}
