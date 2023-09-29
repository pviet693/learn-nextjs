import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

type Data = {
    message: string;
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "POST") {
        return res.status(404).json({ message: "Method is not supported" });
    }
    // don't send cookies to API server
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
        let body: string = "";
        proxyRes.on("data", function (chunk) {
            body += chunk;
        });

        proxyRes.on("end", function () {
            try {
                const { accessToken, expiredAt } = JSON.parse(body);

                // convert token to cookies
                const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" });
                cookies.set("accessToken", accessToken, {
                    httpOnly: true, // document.cookie sẽ không chứa accessToken, không lấy được token
                    sameSite: "lax", // | strict | none
                    // strict: cookie chỉ gửi nếu request trong cùng 1 site
                    // lax: cookie gửi nếu request cùng 1 site và từ site khác link vào site hiện tại
                    // none: site nào cũng ok :))
                    expires: new Date(expiredAt)
                });
                
                (res as NextApiResponse).status(200).json({ message: "login successfully" });
            } catch (error) {
                (res as NextApiResponse).status(500).json({ message: "something went wrong" });
            }
        });
    };

    proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: true
    });

    proxy.once("proxyRes", handleLoginResponse);
}
