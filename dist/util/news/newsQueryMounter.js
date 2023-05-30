"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountNewsQuery = void 0;
const mountNewsQuery = (payload) => {
    let query = ``;
    const entries = Object.entries(payload);
    query += `${payload.type}?`;
    entries.forEach((entry, idx) => {
        if ((entry === null || entry === void 0 ? void 0 : entry[1]) instanceof Array && entry[1]) {
            let temp = "sources=";
            for (let i = 0; i < entry[1].length; i++) {
                temp += `${i === 0 ? "" : ","}${entry[1][i]}`;
            }
            query += temp;
        }
        else if (typeof (entry === null || entry === void 0 ? void 0 : entry[1]) === "string" && (entry === null || entry === void 0 ? void 0 : entry[0]) !== "type") {
            query += `${idx === 1 ? "" : "&"}${entry[0]}=${entry[1]}`;
        }
        return;
    });
    return (`${process.env.NEWS_API_BASE_URL}` +
        query +
        `&apiKey=${process.env.NEWS_API_KEY}`);
};
exports.mountNewsQuery = mountNewsQuery;
