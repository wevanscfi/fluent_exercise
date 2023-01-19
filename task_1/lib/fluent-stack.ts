import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_events as events } from 'aws-cdk-lib';
import { aws_events_targets as targets } from 'aws-cdk-lib';


export class FluentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // defines an AWS Lambda resource
    const fn = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.PYTHON_3_7,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });

    // Create an events rule on a 5 minute cron
    const rule = new events.Rule(this, 'CronTrigger', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(5))
    });

    // Target the HelloHandler lambda function 
    rule.addTarget(new targets.LambdaFunction(fn, {}));
  }
}

