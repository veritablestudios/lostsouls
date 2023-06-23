import multer from "multer"; // Replace with your IPFS client configuration

const upload = multer();

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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      upload.single("image")(req, res, async (error) => {
        if (error) {
          res.status(500).json({ error: "Error uploading file" });
          return;
        }
        const file = req.file;
        if (!file) {
          res.status(400).json({ error: "No file uploaded" });
          return;
        }
        const added = await client.add(file.buffer);
        const url = `${IPFS_DEDICATED_GATEWAY_SUBDOMAIN}/ipfs/${added.path}`;
        res.status(200).json({ url });
      });
    } catch (error) {
      res.status(500).json({ error: "Error uploading file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
