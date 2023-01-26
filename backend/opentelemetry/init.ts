
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"


import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrismaInstrumentation } from '@prisma/instrumentation'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new opentelemetry.NodeSDK({
  serviceName: "Blog",
  autoDetectResources: true,
  traceExporter: new JaegerExporter({
    host: process.env.JAEGER_HOST ? process.env.JAEGER_HOST : 'jaeger',
    port: process.env.JAEGER_PORT ? JSON.parse(process.env.JAEGER_PORT) : 6832,
  }),
  instrumentations: [
    getNodeAutoInstrumentations(), 
    new PrismaInstrumentation()
  ]
});

sdk.start()
