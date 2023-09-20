/******/ // The require scope
/******/ var __nccwpck_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ main)
/* harmony export */ });
// @ts-check

/**
 * @param {string} appId
 * @param {string} privateKey
 * @param {string} organization
 * @param {import("@actions/core")} core
 * @param {import("@octokit/auth-app").createAppAuth} createAppAuth
 * @param {import("@octokit/request").request} request
 */
async function main(
  appId,
  privateKey,
  organization,
  core,
  createAppAuth,
  request
) {

  const auth = createAppAuth({
    appId,
    privateKey,
    request,
  });

  const appAuthentication = await auth({
    type: "app",
  });

  // Get the installation ID
  // https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#get-a-repository-installation-for-the-authenticated-app
  const { data: installation } = await request(
    "GET /orgs/{org}/installation",
    {
      organization,
      headers: {
        authorization: `bearer ${appAuthentication.token}`,
      },
    }
  );

  // Create a new installation token
  const authentication = await auth({
    type: "installation",
    installationId: installation.id
  });

  // Register the token with the runner as a secret to ensure it is masked in logs
  core.setSecret(authentication.token);

  core.setOutput("token", authentication.token);

  // Make token accessible to post function (so we can invalidate it)
  core.saveState("token", authentication.token);
}

var __webpack_exports__main = __webpack_exports__.D;
export { __webpack_exports__main as main };
