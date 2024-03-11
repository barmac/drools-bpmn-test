#!/usr/bin/env node

import BPMNModdle from "bpmn-moddle";
import {readFile, writeFile} from "node:fs/promises";
import { validateXML } from "xsd-schema-validator";

main();

async function main() {
  const moddle = new BPMNModdle();
  const file = await readFile("./input.bpmn", "utf-8");

  const validBefore = await validateXML(file, './xsd/BPMN20.xsd');

  console.log(validBefore);

  const { rootElement: parsed } = await moddle.fromXML(file);

  const { xml: serialized } = await moddle.toXML(parsed, { format: true });
  await writeFile("./output.bpmn", serialized);

  const validAfter = await validateXML(serialized, './xsd/BPMN20.xsd');

  console.log(validAfter);
}
