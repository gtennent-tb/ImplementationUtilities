/* stores report in git repo storage */
import path from 'path';
import fs from 'fs';
import { customFileCodeFilename, customFileStorageRepoPath } from '../../configurations.js';
import { execSync } from 'child_process';


export const storeReport = (orgId, name) => {
    const destPath = path.join(customFileStorageRepoPath, orgId, name, name || '') + '.js';
    console.log('Writing file to storage repo...');
    fs.copyFileSync(`${process.cwd()}/${customFileCodeFilename}`, destPath);
    console.log(`File Successfully written to ${customFileStorageRepoPath}`);
    console.log(`pushing to git...`);
    execSync(`cd ${customFileStorageRepoPath} && git add . && git commit -m "[Automated Git Action] Storing Report for orgId: ${orgId}"`);
    execSync(`cd ${customFileStorageRepoPath} && git push origin main`);
    console.log('pushed to git https://github.com/travelbank/CustomerCustomization/tree/main')
}