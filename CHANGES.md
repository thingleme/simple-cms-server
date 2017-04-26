# 1.2.2

- **bug fix**: wrong tag filter name used in queries (`tags_array` --> `tags`)
- **doc enhancement**: the `config.yaml` example shows how to include a video

# 1.2.1

- **bug fix**: the old node Docker image caused errors at startup. Upgraded to node:7.8-alpine

# 1.2.0

- **Compatibility Break**: the `access_token` env variable must be prefixed by the 'dom_' string now, eg. dom_ae001211
- **bug fix**: incoming requests for unknown domains don't break server anymore
