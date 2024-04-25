import { Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ApplicationProps } from "../environment";

export type AppStackProps = ApplicationProps & 
    Readonly <{
        projectName: string,
    }>

export class Application extends Stage {
    constructor(scope: Construct, id: string, props: AppStackProps){
        super(scope, id);
    }
}