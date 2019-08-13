workflow "Generate screenshot diff" {
  resolves = "nextdiff"
  on = "deployment_status"
}

workflow "Send coverage to codecov" {
  resolves = "Codecov"
  on = "push"
}

action "Codecov" {
  uses = "Atrox/codecov-action@v0.1.3"
  secrets = ["CODECOV_TOKEN"]
}

action "nextdiff" {
  uses = "zeit/nextdiff@0.1.2"
  secrets = ["GITHUB_TOKEN", "ZEIT_TOKEN"]
}
