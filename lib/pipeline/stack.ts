import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StageConfig } from "../environment";
import { CodePipelineSource, CodePipeline, ShellStep } from "aws-cdk-lib/pipelines";
import { BuildEnvironment, BuildEnvironmentVariable, BuildEnvironmentVariableType, ComputeType, LinuxArmBuildImage } from "aws-cdk-lib/aws-codebuild";

export type PipelineStackProps = StackProps & 
Readonly <{
    stages: StageConfig,
    repositoryConeectionArn: string,
    repositoryIdentifier: string,
    repositoryBranch: string;
    projectName: string;
}>

export class Pipelinestack extends Stack {
   private readonly pipelineSource: CodePipelineSource;
    codePipeline: any;

    constructor(scope: Construct, id: string, props: PipelineStackProps){
        super(scope, id, props);

        this.pipelineSource = CodePipelineSource.connection( props.repositoryIdentifier, props.repositoryBranch, {
            connectionArn: props.repositoryConeectionArn,
            triggerOnPush: true,
        });

        this.codePipeline = this.setupPipeline;

    }

    get setupPipeline(): CodePipeline{
        return new CodePipeline(this, "AwsPipeline", {
            pipelineName: 'aws-pipeline-template',
            enableKeyRotation: false,
            crossAccountKeys: false,
            selfMutation: true,
            publishAssetsInParallel: true,
            codeBuildDefaults: {
                buildEnvironment: this.buildEnvironment,
            },
            synth: this.synth, // required build enviroment before this step to run npm commands

        });
    }

    get buildEnvironment(): BuildEnvironment{
        const enviromentVariables : Record<string, BuildEnvironmentVariable> ={
            AWS_ACCOUNT: {
                value: this.account,
                type: BuildEnvironmentVariableType.PLAINTEXT,
            },
            AWS_REGION: {
                value: this.account,
                type: BuildEnvironmentVariableType.PLAINTEXT
            },
            PIPELINE_GIT_BRANCH:{
                // value: this.repositoryBranch,
                value: 'main',
                type: BuildEnvironmentVariableType.PLAINTEXT
            },
            PROJECT_NAME: {
                value: 'aws-pipeline',
                type: BuildEnvironmentVariableType.PLAINTEXT,
            }
        }
        return {
            buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
            computeType: ComputeType.SMALL,
            environmentVariables: enviromentVariables,
            
        }
    }

    get synth(): ShellStep{
        return new ShellStep('Synth', {
            input: this.pipelineSource,
            primaryOutputDirectory: 'infra/cdk.out',
            installCommands: [
                'cd infra',
                'npm install',
            ],
            commands: ['echo hello', 'npx cdk synth --no-notices']
        })
    }
}