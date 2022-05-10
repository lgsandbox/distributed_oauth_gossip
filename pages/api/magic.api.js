import { Magic } from '@magic-sdk/admin';



// Initiating Magic instance for server-side methods
// verifies auth with SSR ?and can act as middleware?
// might want to deprecate and try moving to relay servers?
// not sure if its better for safety to leave this or change to relay server
// blame that on gundb being new. need to contact gundb devs and ask...

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req, res) {
  try {
    const didToken = req.headers.authorization;
    await magic.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
