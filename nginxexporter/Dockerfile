FROM golang:1.15 as builder
ARG VERSION
ARG GIT_COMMIT
WORKDIR /go/src/github.com/nginxinc/nginx-prometheus-exporter

COPY *.go ./
COPY vendor ./vendor
COPY go.mod go.sum ./
COPY collector ./collector
COPY client ./client

RUN apt-get update && apt-get install -y --no-install-recommends \
		gcc-arm-linux-gnueabihf \
		libc6-dev-armhf-cross \
	&& rm -rf /var/lib/apt/lists/*

ENV GO111MODULE=on CGO_ENABLED=0 GOOS=linux CC=arm-linux-gnueabihf-gcc
RUN go build -mod=vendor -a -installsuffix cgo -ldflags "-X main.version=${VERSION} -X main.gitCommit=${GIT_COMMIT}" -o exporter .

FROM gcr.io/distroless/static:latest-arm64
COPY --from=builder /go/src/github.com/nginxinc/nginx-prometheus-exporter/exporter /usr/bin/

USER 1001:1001

ENTRYPOINT [ "/usr/bin/exporter" ]
