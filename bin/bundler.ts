#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BundlerStack } from '../lib/bundler-stack';

const app = new cdk.App();

new BundlerStack(app, 'BundlerStack-Test');
new BundlerStack(app, 'BundlerStack-Stage');
new BundlerStack(app, 'BundlerStack-Production');
