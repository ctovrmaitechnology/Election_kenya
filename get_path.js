const fs = require('fs');
const content = fs.readFileSync('public/kenya_map.svg', 'utf8');

// The file has paths that look like:
// <path ... id="KE-09" />
// We can find the index of "KE-09" and search backwards for "<path"
const idIndex = content.indexOf('KE-09');
if (idIndex !== -1) {
    const pathStart = content.lastIndexOf('<path', idIndex);
    const pathEnd = content.indexOf('/>', idIndex);
    if (pathStart !== -1 && pathEnd !== -1) {
        console.log(content.substring(pathStart, pathEnd + 2));
    }
} else {
    const titleIndex = content.indexOf('Isiolo');
    if (titleIndex !== -1) {
        const pathStart = content.lastIndexOf('<path', titleIndex);
        const pathEnd = content.indexOf('/>', titleIndex);
        if (pathStart !== -1 && pathEnd !== -1) {
            console.log(content.substring(pathStart, pathEnd + 2));
        }
    } else {
        console.log("Not found.");
    }
}
