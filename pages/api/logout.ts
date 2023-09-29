import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method !== "POST") {
        return res.status(404).json({ message: "Method is not supported" });
    }

    const cookies = new Cookies(req, res);
    cookies.set("accessToken");

    res.status(200).json({ message: "logout successfully "});
}
