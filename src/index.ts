import { Axios } from "axios";
import Modification from "./Modification";
import config from "./config";

const axios = new Axios({ baseURL: "https://flintmc.net/", headers: { "Cookie": `PHPSESSID=${config.cookie}` } });

async function getModificationUrl(id: number): Promise<string | null> {
    try {
        const result = await axios.get(`modification/${id}.modification/manage`);
        const redirected = result.request._redirectable._redirectCount > 0;
        if(!redirected) return null;
        const redirectUrl = result.request._redirectable._currentUrl as string;
        return redirectUrl.replace("/manage", "");
    } catch(err) {
        return null;
    }
}

function getNamespaceByUrl(url: string): string | null {
    return url.split('modification/')[1]?.split('.')[1] || null;
}

async function getModificationInfo(url: string): Promise<Modification | null> {
    const namespace = getNamespaceByUrl(url);

    try {
        const result = await axios.get(`api/client-store/get-modification/${namespace}`, { headers: { "Accept-Encoding": "gzip" } });

        return JSON.parse(result.data) as Modification;
    } catch(err) {
        return null;
    }
}

(async function() {
    let failedModifications = 0;
    const modifications = [];
    for(let i = 1; failedModifications <= config.maxFails; i++) {
        const url = await getModificationUrl(i);
        if(!url) {
            console.log(`${i}. No addon found`);
            failedModifications++;
            continue;
        }
        failedModifications = 0;
        const info = await getModificationInfo(url);
        const output = `${i}. ${getNamespaceByUrl(url) || 'Unknown namespace'} - ${info?.name || 'No release channel found'}`
        modifications.push(output);
        console.log(output);
    }
    const file = Bun.file(config.outputPath);
    Bun.write(file, modifications.join("\n"));
    console.log(`Output was saved to ${file.name}`);
})();