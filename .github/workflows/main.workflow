workflow "diff" {
  resolves = "nextdiff"
  on = "deployment_status"
}

action "nextdiff" {
  uses = "zeit/nextdiff@master"
  secrets = ["GITHUB_TOKEN", "ZEIT_TOKEN"]
}
