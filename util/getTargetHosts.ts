import NgPrM from "../api/dto";

type TargetHosts = {
  green: NgPrM.Host;
  blue: NgPrM.Host;
};

const greenDomain = process.env.GREEN_DOMAIN!;
const blueDomain = process.env.BLUE_DOMAIN!;

export default (hosts: NgPrM.Host[]): TargetHosts | undefined => {
  const green = hosts.find((host) => host.domain_names.includes(greenDomain));
  const blue = hosts.find((host) => host.domain_names.includes(blueDomain));

  if (!green || !blue) {
    return undefined;
  }

  return { green, blue };
};
