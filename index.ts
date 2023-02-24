import startupValidation from "./util/startupValidation";
startupValidation();

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { getHosts, getToken, updateHost } from "./api";
import getTargetHosts from "./util/getTargetHosts";
import validateSecret from "./util/validateSecret";

const app: Express = express();
app.use(bodyParser.json());

const port = parseInt(process.env.PORT ?? "3000");
const host = process.env.HOST ?? "localhost";

app.post(
  "/toggle",
  async (req: Request<{}, {}, ToggleRequest>, res: Response) => {
    if (!validateSecret(req)) {
      res.status(401).send();
      return;
    }

    const token = await getToken();
    if (!token) {
      res.status(401).send("Bad SA");
      return;
    }

    const hosts = await getHosts(token);
    if (!hosts) {
      res.status(412).send("Unable to fetch nginx proxy manager hosts");
      return;
    }

    const targetHosts = getTargetHosts(hosts);
    if (!targetHosts) {
      res.status(404).send("Target hosts are not found");
      return;
    }

    const { green, blue } = targetHosts;

    const newGreen = await updateHost(green.id, blue.forward_host, token);
    const newBlue = await updateHost(blue.id, green.forward_host, token);

    res.send({ green: newGreen, blue: newBlue });
  }
);

app.get("/blue", async (req: Request<{}, {}, ToggleRequest>, res: Response) => {
  if (!validateSecret(req)) {
    res.status(401).send();
    return;
  }

  const token = await getToken();
  if (!token) {
    res.status(401).send("Bad SA");
    return;
  }

  const hosts = await getHosts(token);
  if (!hosts) {
    res.status(412).send("Unable to fetch nginx proxy manager hosts");
    return;
  }

  const targetHosts = getTargetHosts(hosts);
  if (!targetHosts) {
    res.status(404).send("Target hosts are not found");
    return;
  }

  res.send({ blue: targetHosts.blue });
});

app.listen(3000, host, () => {
  console.log(`⚡️[BillyGin]: Server is running at http://${host}:${port}`);
});

type ToggleRequest = {
  secret: string;
};
