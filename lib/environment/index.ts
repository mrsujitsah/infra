import { StageProps } from "aws-cdk-lib";
import { StageAlias } from "./stages";

export type ApplicationProps = StageProps & 
    Readonly<{
        stageName: StageAlias
    }>;

export type StageConfig = Readonly<{
    stageProps: ApplicationProps
}>;