VERSION = 0.8.0
TAG = $(VERSION)
PREFIX = nginx/nginx-prometheus-exporter

DOCKERFILEPATH = build
DOCKERFILE = Dockerfile

GIT_COMMIT = $(shell git rev-parse --short HEAD)

BUILD_DIR = build_output

GOLANGCI_CONTAINER=golangci/golangci-lint:v1.29-alpine

export DOCKER_BUILDKIT = 1

nginx-prometheus-exporter:
	GO111MODULE=on CGO_ENABLED=0 go build -mod=vendor -installsuffix cgo -ldflags "-X main.version=$(VERSION) -X main.gitCommit=$(GIT_COMMIT)" -o nginx-prometheus-exporter

lint:
	docker run --rm \
	-v $(shell pwd):/go/src/github.com/nginxinc/nginx-prometheus-exporter \
	-w /go/src/github.com/nginxinc/nginx-prometheus-exporter \
	$(GOLANGCI_CONTAINER) golangci-lint run

test:
	GO111MODULE=on go test -mod=vendor ./...

container:
	docker build --build-arg VERSION=$(VERSION) --build-arg GIT_COMMIT=$(GIT_COMMIT) -f $(DOCKERFILEPATH)/$(DOCKERFILE) -t $(PREFIX):$(TAG) .

push: container
	docker push $(PREFIX):$(TAG)

$(BUILD_DIR)/nginx-prometheus-exporter-linux-amd64:
	GO111MODULE=on GOARCH=amd64 CGO_ENABLED=0 GOOS=linux go build -mod=vendor -installsuffix cgo -ldflags "-X main.version=$(VERSION) -X main.gitCommit=$(GIT_COMMIT)" -o $(BUILD_DIR)/nginx-prometheus-exporter-linux-amd64

$(BUILD_DIR)/nginx-prometheus-exporter-linux-i386:
	GO111MODULE=on GOARCH=386 CGO_ENABLED=0 GOOS=linux go build -mod=vendor -installsuffix cgo -ldflags "-X main.version=$(VERSION) -X main.gitCommit=$(GIT_COMMIT)" -o $(BUILD_DIR)/nginx-prometheus-exporter-linux-i386

release: $(BUILD_DIR)/nginx-prometheus-exporter-linux-amd64 $(BUILD_DIR)/nginx-prometheus-exporter-linux-i386
	mv $(BUILD_DIR)/nginx-prometheus-exporter-linux-amd64 $(BUILD_DIR)/nginx-prometheus-exporter && \
	tar czf $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-amd64.tar.gz -C $(BUILD_DIR) nginx-prometheus-exporter && \
	rm $(BUILD_DIR)/nginx-prometheus-exporter

	mv $(BUILD_DIR)/nginx-prometheus-exporter-linux-i386 $(BUILD_DIR)/nginx-prometheus-exporter && \
	tar czf $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-i386.tar.gz -C $(BUILD_DIR) nginx-prometheus-exporter && \
	rm $(BUILD_DIR)/nginx-prometheus-exporter

	shasum -a 256 $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-amd64.tar.gz $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-i386.tar.gz|sed "s|$(BUILD_DIR)/||" > $(BUILD_DIR)/sha256sums.txt

clean:
	-rm $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-amd64.tar.gz
	-rm $(BUILD_DIR)/nginx-prometheus-exporter-$(TAG).linux-i386.tar.gz
	-rm $(BUILD_DIR)/sha256sums.txt
	-rmdir $(BUILD_DIR)
	-rm nginx-prometheus-exporter

