# CDK TypeScript project

This is a project for meeting the goals of the fluent technical interview task #1.

## Problem Statement
> Use Cloudformation and Python to create a scheduled lambda function that creates a cloudwatch log every 5 minutes.

## Design
We need to create a lambda function that logs to stdout/stderr. This output will be captured by a Cloudwatch Logstream along with each invocations request details.

We need to create an AWS Events Rule that runs on a rate schedule, every 5 minutes.

We need to target the lambda function with our rate rule.

# Solution
We will utilize AWS CDK to create our cloudformation template and stack, and to manage the deployment of the stack and resources.

For the purposes of this exercise, we will also generate a CloudFormation template as output from our CDK app, and included it the examples directory of this project.

# Deploying the stack with CDK

## Install dependencies
```shell
# Install the CDK toolkit globally: depending on your environment, you may need to install with sudo
npm install -g aws-cdk
sudo npm install -g aws-cdk
```

## Bootstrap required CDK resources
```shell
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

## Deploy the stack
```shell
cdk deploy
```

## Alternatively Create a CloudFormation template to validate or install manually
```shell
cdk synth
```


