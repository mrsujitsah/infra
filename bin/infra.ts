#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { Pipelinestack } from '../lib/pipeline/stack';
import { StageConfig } from '../lib/environment';
import { stages } from '../lib/environment/stages';
import { awsRegion } from '../lib/constants';

const app = new cdk.App();
// new InfraStack(app, 'InfraStack', {

// });

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: awsRegion
}

new Pipelinestack(app, 'aws-pipeline', {
stages: stages.app,
repositoryBranch: 'master',
repositoryIdentifier: 'mrsujitsah/infra',
repositoryConeectionArn: 'arn:aws:codestar-connections:us-east-1:058264362412:connection/467f1d5e-8ba6-4edd-9323-508d834f52f8',
projectName: 'AWS-PIPELINE',
env: env
});
