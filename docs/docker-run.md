# run docker

```bash

docker build -t micro-authen -f apps/micro-authen/Dockerfile .

OR

docker build -t micro-authen -f apps/micro-authen/Dockerfile . --no-cache --build-arg TURBO_TEAM="XXXX" --build-arg TURBO_TOKEN="XXXX"


docker run --rm -it --entrypoint sh micro-authen

```
