import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
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
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
        req.headers.authorization = `Bearer ${accessToken}`;
    }

    // don't send cookies to API server
    req.headers.cookie = "";

    // api/hello
    // https://js-post-api.herokuapp.com/api/hello

    proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: false // trả kết quả lấy từ API server cho client luôn, không xử lý ở proxy server
    });
}
