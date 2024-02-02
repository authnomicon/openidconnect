# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.10] - 2024-02-02
### Fixed
- UserInfo endpoint correctly `@require`s `module:passport.Authenticator` and
`module:@authnomicon/core.Directory` interfaces.

## [0.0.9] - 2024-02-02
### Added
- Support for JWK Set.

## [0.0.8] - 2024-02-02
### Added
- Initial implementation of [OpenID Provider Configuration Information](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig).

## [0.0.7] - 2023-11-27

TODO: Review this for accuracy.

## [0.0.6] - 2023-11-01
### Changed

- ID token service preferentially uses `ISSUER` environment variable as value of
`iss` claim.

## [0.0.5] - 2023-10-20

TODO: Review this for accuracy.

### Changed
- Renamed `http://i.authnomicon.org/oauth2/AuthorizationCodeService` interface
to `module:@authnomicon/oauth2.AuthorizationCodeService`.
- Renamed `http://i.authnomicon.org/oauth2/AccessTokenService` interface to
`module:@authnomicon/oauth2.AccessTokenService`.
- Renamed `http://i.authnomicon.org/oauth2/authorization/http/ResponseType`
interface to `module:oauth2orize.RequestProcessor`.
- Renamed `http://i.authnomicon.org/oauth2/authorization/http/RequestParameters`
interface to `module:oauth2orize.RequestParametersProcessor`.
- Renamed `http://i.authnomicon.org/oauth2/authorization/http/ResponseParameters`
to `module:oauth2orize.responseParametersFn`.
- Renamed `http://i.authnomicon.org/oauth2/token/http/ResponseParameters`
to `module:@authnomicon/oauth2.tokenResponseParametersFn;grant_type=code`.

## [0.0.4] - 2021-12-15
### Added
- Added `issuer` property to `msg` argument passed to `IDTokenService#issue()`.
- Added `scope` property to `msg` argument passed to `IDTokenService#issue()`.
- Added `authContext` property to `msg` argument passed to `IDTokenService#issue()`.
- Added `issuer` property to `msg` argument passed to `AccessTokenService#issue()`.
- Added `authContext` property to `msg` argument passed to `AccessTokenService#issue()`.
- Added `issuer` property to `msg` argument passed to `AuthorizationCodeService#issue()`.
- Added `authContext` property to `msg` argument passed to `AuthorizationCodeService#issue()`.

### Changed
- `AccessTokenService#issue()` is called with `msg` argument containing `scope`
property, rather than `grant.scope`.
- `AuthorizationCodeService#issue()` is called with `msg` argument containing
`scope` property, rather than `grant.scope`.
- Changed ID Token token response parameter extension to 4-arity form, in
accordance with latest changes in `@authnomicon/oauth2`.

## [0.0.3] - 2021-12-02
### Added
- Added `email` claim to ID token.
- Added `email` claim to UserInfo response.

## [0.0.2] - 2021-12-02
### Added
- Token response is extended with `id_token` parameter when exchanging an
authorization code issued via authentication response.
- Authenticatation response is extended with `session_state` parameter.
- Default ID token service which issues `preferred_username`, `name`,
`given_name`, `family_name`, `middle_name`, and `sid` claims in the ID token.
- Returning `given_name`, `family_name`, and `middle_name` claims from UserInfo
endpoint.
- Initial implementation of [RP-initiated logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html).
- Initial implementation of [session management](https://openid.net/specs/openid-connect-session-1_0.html).

## [0.0.1] - 2021-10-19

- Initial release.

[Unreleased]: https://github.com/authnomicon/openidconnect/compare/v0.0.10...HEAD
[0.0.10]: https://github.com/authnomicon/openidconnect/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/authnomicon/openidconnect/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/authnomicon/openidconnect/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/authnomicon/openidconnect/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/authnomicon/openidconnect/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/authnomicon/openidconnect/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/authnomicon/openidconnect/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/authnomicon/openidconnect/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/authnomicon/openidconnect/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/authnomicon/openidconnect/releases/tag/v0.0.1
