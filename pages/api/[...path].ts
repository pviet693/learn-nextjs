import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

export const config = {
    api: {
        bodyParser: false
    }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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
