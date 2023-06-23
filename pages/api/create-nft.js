import { create as ipfsHttpClient } from "ipfs-http-client";

const IPFS_API_KEY = process.env.IPFS_API_KEY;
const IPFS_API_KEY_SECRET = process.env.IPFS_API_KEY_SECRET;
const IPFS_DEDICATED_GATEWAY_SUBDOMAIN =
  process.env.IPFS_DEDICATED_GATEWAY_SUBDOMAIN;

const auth = `Basic ${Buffer.from(
  `${IPFS_API_KEY}:${IPFS_API_KEY_SECRET}`
).toString("base64")}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { name, description, image } = req.body;
    const data = JSON.stringify({
      name,
      description,
      image,
    });
    const added = await client.add(data);
    const url = `${IPFS_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${added.path}`;
    res.status(200).json({ url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
