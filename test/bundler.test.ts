import { expect as expectCDK, matchTemplate, MatchStyle, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Bundler from '../lib/bundler-stack';

test('Stack has lambda layer and functions', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Bundler.BundlerStack(app, 'MyTestStack');

    expectCDK(stack).to(haveResourceLike('AWS::Lambda::Function'));
    expectCDK(stack).to(haveResourceLike('AWS::Lambda::LayerVersion'));
});
