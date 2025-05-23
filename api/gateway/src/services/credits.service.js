const { readJson, log } = require("@utils");
const config = require("@config");

/**
 * Retrieves metadata about the project from the local package.json file.
 * 
 * This service attempts to read the `gateway/package.json` file and extract
 * basic project information such as name, author, license, and repository link.
 * If a field is missing or the file can't be read, a fallback value of `'unknown'` is used.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} An object containing project metadata.
 * @property {string} project - The project name.
 * @property {string} description - The project description.
 * @property {string} author - The project author.
 * @property {string} contact - The contact information.
 * @property {string} license - The license type.
 * @property {string|Array<string>} technologies - Technologies used in the project.
 * @property {string} code_repository - The URL to the project's source code repository.
 */
const creditsService = async () => {
    log("Starting reading package.json to get project metadata", "verbose");
    
    const response = await readJson('package.json') || {};

    if (!Object.keys(response).length) {
        log("package.json could not be read or is empty", "error");
        } else {
        log("Reading package.json completed successfully", "info");
        
        if (config.debug) {
        log(`Contents of package.json: ${JSON.stringify(response, null, 2)}`, "verbose");
        }
        
        if (!response.name || !response.author) {
        log("Important fields missing from package.json (name or author)", "warn");
        }
        }

    const {
        name = 'unknown',
        description = 'unknown',
        author = 'unknown',
        contact = 'unknown',
        license = 'unknown',
        technologies = 'unknown',
        code_repository = 'unknown'
    } = response;

    return {
        project: name,
        description,
        author,
        contact,
        license,
        technologies,
        code_repository
    };
};

module.exports = creditsService;
