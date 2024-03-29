/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable max-len */

/* globals module, jQuery */

/* This code is basically all copied from https://github.com/mailcheck/mailcheck
 * with just some small changes to met our project needs
 */

/*
 * Mailcheck https://github.com/mailcheck/mailcheck
 * Author
 * Derrick Ko (@derrickko)
 *
 * Released under the MIT License.
 *
 * v 1.1.2
 */

import { defaultDomains, defaultSecondLevelDomains, defaultTopLevelDomains } from './domains'
let define: any

export const Mailcheck = {
  domainThreshold: 2,
  secondLevelThreshold: 2,
  topLevelThreshold: 2,

  run: function (opts) {
    opts.domains = opts.domains || defaultDomains
    opts.secondLevelDomains = opts.secondLevelDomains || defaultSecondLevelDomains
    opts.topLevelDomains = opts.topLevelDomains || defaultTopLevelDomains
    opts.distanceFunction = opts.distanceFunction || Mailcheck.sift4Distance

    const defaultCallback = function (result) {
      return result
    }
    const suggestedCallback = opts.suggested || defaultCallback
    const emptyCallback = opts.empty || defaultCallback

    const result = Mailcheck.suggest(
      Mailcheck.encodeEmail(opts.email),
      opts.domains,
      opts.secondLevelDomains,
      opts.topLevelDomains,
      opts.distanceFunction
    )

    return result ? suggestedCallback(result) : emptyCallback()
  },

  suggest: function (email, domains, secondLevelDomains, topLevelDomains, distanceFunction) {
    email = email.toLowerCase()

    const emailParts = this.splitEmail(email)

    if (secondLevelDomains && topLevelDomains) {
      // If the email is a valid 2nd-level + top-level, do not suggest anything.
      if (
        secondLevelDomains.indexOf(emailParts.secondLevelDomain) !== -1 &&
        topLevelDomains.indexOf(emailParts.topLevelDomain) !== -1
      ) {
        return false
      }
    }

    let closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction, this.domainThreshold)

    if (closestDomain) {
      if (closestDomain == emailParts.domain) {
        // The email address exactly matches one of the supplied domains; do not return a suggestion.
        return false
      } else {
        // The email address closely matches one of the supplied domains; return a suggestion
        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + '@' + closestDomain }
      }
    }

    // The email address does not closely match one of the supplied domains
    const closestSecondLevelDomain = this.findClosestDomain(
      emailParts.secondLevelDomain,
      secondLevelDomains,
      distanceFunction,
      this.secondLevelThreshold
    )
    const closestTopLevelDomain = this.findClosestDomain(
      emailParts.topLevelDomain,
      topLevelDomains,
      distanceFunction,
      this.topLevelThreshold
    )

    if (emailParts.domain) {
      closestDomain = emailParts.domain
      let rtrn = false

      if (closestSecondLevelDomain && closestSecondLevelDomain != emailParts.secondLevelDomain) {
        // The email address may have a mispelled second-level domain; return a suggestion
        closestDomain = closestDomain.replace(emailParts.secondLevelDomain, closestSecondLevelDomain)
        rtrn = true
      }

      if (
        closestTopLevelDomain &&
        closestTopLevelDomain != emailParts.topLevelDomain &&
        emailParts.secondLevelDomain !== ''
      ) {
        // The email address may have a mispelled top-level domain; return a suggestion
        closestDomain = closestDomain.replace(new RegExp(emailParts.topLevelDomain + '$'), closestTopLevelDomain)
        rtrn = true
      }

      if (rtrn) {
        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + '@' + closestDomain }
      }
    }

    /* The email address exactly matches one of the supplied domains, does not closely
     * match any domain and does not appear to simply have a mispelled top-level domain,
     * or is an invalid email address; do not return a suggestion.
     */
    return false
  },

  findClosestDomain: function (domain, domains, distanceFunction, threshold) {
    threshold = threshold || this.topLevelThreshold
    let dist
    let minDist = Infinity
    let closestDomain = null

    if (!domain || !domains) {
      return false
    }
    if (!distanceFunction) {
      distanceFunction = this.sift4Distance
    }

    for (let i = 0; i < domains.length; i++) {
      if (domain === domains[i]) {
        return domain
      }
      dist = distanceFunction(domain, domains[i])
      if (dist < minDist) {
        minDist = dist
        closestDomain = domains[i]
      }
    }

    if (minDist <= threshold && closestDomain !== null) {
      return closestDomain
    } else {
      return false
    }
  },

  sift4Distance: function (s1, s2, maxOffset) {
    // sift4: https://siderite.blogspot.com/2014/11/super-fast-and-accurate-string-distance.html
    if (maxOffset === undefined) {
      maxOffset = 5 //default
    }

    if (!s1 || !s1.length) {
      if (!s2) {
        return 0
      }
      return s2.length
    }

    if (!s2 || !s2.length) {
      return s1.length
    }

    const l1 = s1.length
    const l2 = s2.length

    let c1 = 0 //cursor for string 1
    let c2 = 0 //cursor for string 2
    let lcss = 0 //largest common subsequence
    let local_cs = 0 //local common substring
    let trans = 0 //number of transpositions ('ab' vs 'ba')
    const offset_arr = [] //offset pair array, for computing the transpositions

    while (c1 < l1 && c2 < l2) {
      if (s1.charAt(c1) == s2.charAt(c2)) {
        local_cs++
        let isTrans = false
        //see if current match is a transposition
        let i = 0
        while (i < offset_arr.length) {
          const ofs = offset_arr[i]
          if (c1 <= ofs.c1 || c2 <= ofs.c2) {
            // when two matches cross, the one considered a transposition is the one with the largest difference in offsets
            isTrans = Math.abs(c2 - c1) >= Math.abs(ofs.c2 - ofs.c1)
            if (isTrans) {
              trans++
            } else {
              if (!ofs.trans) {
                ofs.trans = true
                trans++
              }
            }
            break
          } else {
            if (c1 > ofs.c2 && c2 > ofs.c1) {
              offset_arr.splice(i, 1)
            } else {
              i++
            }
          }
        }
        offset_arr.push({
          c1: c1,
          c2: c2,
          trans: isTrans,
        })
      } else {
        lcss += local_cs
        local_cs = 0
        if (c1 != c2) {
          c1 = c2 = Math.min(c1, c2) //using min allows the computation of transpositions
        }
        //if matching characters are found, remove 1 from both cursors (they get incremented at the end of the loop)
        //so that we can have only one code block handling matches
        for (let j = 0; j < maxOffset && (c1 + j < l1 || c2 + j < l2); j++) {
          if (c1 + j < l1 && s1.charAt(c1 + j) == s2.charAt(c2)) {
            c1 += j - 1
            c2--
            break
          }
          if (c2 + j < l2 && s1.charAt(c1) == s2.charAt(c2 + j)) {
            c1--
            c2 += j - 1
            break
          }
        }
      }
      c1++
      c2++
      // this covers the case where the last match is on the last token in list, so that it can compute transpositions correctly
      if (c1 >= l1 || c2 >= l2) {
        lcss += local_cs
        local_cs = 0
        c1 = c2 = Math.min(c1, c2)
      }
    }
    lcss += local_cs
    return Math.round(Math.max(l1, l2) - lcss + trans) //add the cost of transpositions to the final result
  },

  splitEmail: function (email) {
    email = email !== null ? email.replace(/^\s*/, '').replace(/\s*$/, '') : null // trim() not exist in old IE!
    const parts = email.split('@')

    if (parts.length < 2) {
      return false
    }

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '') {
        return false
      }
    }

    const domain = parts.pop()
    const domainParts = domain.split('.')
    let sld = ''
    let tld = ''

    if (domainParts.length === 0) {
      // The address does not have a top-level domain
      return false
    } else if (domainParts.length == 1) {
      // The address has only a top-level domain (valid under RFC)
      tld = domainParts[0]
    } else {
      // The address has a domain and a top-level domain
      sld = domainParts[0]
      for (let j = 1; j < domainParts.length; j++) {
        tld += domainParts[j] + '.'
      }
      tld = tld.substring(0, tld.length - 1)
    }

    return {
      topLevelDomain: tld,
      secondLevelDomain: sld,
      domain: domain,
      address: parts.join('@'),
    }
  },

  // Encode the email address to prevent XSS but leave in valid
  // characters, following this official spec:
  // http://en.wikipedia.org/wiki/Email_address#Syntax
  encodeEmail: function (email) {
    let result = encodeURI(email)
    result = result
      .replace('%20', ' ')
      .replace('%25', '%')
      .replace('%5E', '^')
      .replace('%60', '`')
      .replace('%7B', '{')
      .replace('%7C', '|')
      .replace('%7D', '}')
    return result
  },
}

// Export the mailcheck object if we're in a CommonJS env (e.g. Node).
// Modeled off of Underscore.js.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Mailcheck
}

// Support AMD style definitions
// Based on jQuery (see http://stackoverflow.com/a/17954882/1322410)
if (typeof define === 'function' && define.amd) {
  define('mailcheck', [], function () {
    return Mailcheck
  })
}

if (typeof window !== 'undefined' && window.jQuery) {
  ;(function ($: any) {
    $.fn.mailcheck = function (opts) {
      const self = this
      if (opts.suggested) {
        const oldSuggested = opts.suggested
        opts.suggested = function (result) {
          oldSuggested(self, result)
        }
      }

      if (opts.empty) {
        const oldEmpty = opts.empty
        opts.empty = function () {
          oldEmpty.call(null, self)
        }
      }

      opts.email = this.val()
      Mailcheck.run(opts)
    }
  })(jQuery)
}
