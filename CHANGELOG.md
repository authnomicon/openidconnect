# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

[Unreleased]: https://github.com/authnomicon/openidconnect/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/authnomicon/openidconnect/releases/tag/v0.0.1
