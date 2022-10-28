.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker-compose.prod.yaml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker-compose.prod.yaml up -d

.PHONY: pull
pull:
  git pull
