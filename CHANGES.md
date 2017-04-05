# 1.2.1
- **bug fix**: the old node Docker image caused errors at startup. Ppgraded to node:7.8-alpine

# 1.2.0

- **Compatibility Break**: the `access_token` env variable must be prefixed by the 'dom_' string now, eg. dom_ae001211
- **bug fix**: incoming requests for unknown domains don't break server anymore