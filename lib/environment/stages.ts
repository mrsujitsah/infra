import { StageConfig } from ".";
import { awsRegion } from "../constants";

export const StageAlias = {
    app: 'app',
}as const;

export type StageAlias = keyof typeof StageAlias;

export const stages: Record<StageAlias, StageConfig> = {
    app: {
        stageProps: {
            stageName: StageAlias.app,
            env: {
                region: awsRegion,
                account: process.env.CDK_DEFAULT_ACCOUNT,
            }
        }
    }
};