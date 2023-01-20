
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"


import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrismaInstrumentation } from '@prisma/instrumentation'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new opentelemetry.NodeSDK({
  serviceName: "Blog",
  autoDetectResources: true,
  traceExporter: new JaegerExporter(),
  instrumentations: [
    getNodeAutoInstrumentations(), 
    new PrismaInstrumentation()
  ]
});

sdk.start()
