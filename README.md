## Overview

This is a front-end designed to work with the `fly-buys-gambler-rails` back-end. A member can sign-in with an email or a (valid) Fly Buys card, and can then 'gamble' their points. This gambling is a virtual 'dice-roll' (a pseudorandom number is generated, between 1 and 6) - where an even number yields a win, and an odd number a loss. A win results in a doubling of a member's points, while a loss results in their points being set to zero. The front-end uses just a few of the `fly-buys-gambler-rails` API endpoints to achieve this functionality. These are:

- `/api/v1/member/find`
- `/api/v1/member/login`
- `/api/v1/member/logout`
- `/api/v1/card/update_balance`

The `/member/find` API returns all the necessary member metadata to be displayed in the front-end (name, email, initial Fly Buys card balance), while subsequent calls to `/card/update_balance` update the member's Fly Buys card balance as they win (or lose) the gambles.

I had also been planning on adding a simple stripe integration so Members could 'top-up' their accounts, but ran out of time for this so I added a 'magic button' to be used when points are expended.
