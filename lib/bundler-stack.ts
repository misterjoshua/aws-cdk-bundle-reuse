import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class BundlerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pythonDir = path.join(__dirname, 'python');

    const libLayer = new lambda.LayerVersion(this, 'LibLayer', {
      code: lambda.Code.fromAsset(pythonDir, {
        exclude: [ '*', '!requirements.txt' ],
        bundling: {
          image: lambda.Runtime.PYTHON_3_8.bundlingDockerImage,
          command: [ 'bash', '-c', `pip install -r requirements.txt -t /asset-output/python`],
        }
      })
    });

    new lambda.Function(this, 'FunOne', {
      code: lambda.Code.fromAsset(pythonDir, { exclude: [ '.venv' ] }),
      handler: 'lambda_one.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      layers: [ libLayer ],
    });

    new lambda.Function(this, 'FunTwo', {
      code: lambda.Code.fromAsset(pythonDir, { exclude: [ '.venv' ] }),
      handler: 'lambda_two.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      layers: [ libLayer ],
    });
  }
}
