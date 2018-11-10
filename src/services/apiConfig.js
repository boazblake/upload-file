import { webApiKey } from "../../secrets.js";

const PROJECT_ID = "carbon-airfoil-123703";

export const loginUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty";

export const baseUrl = `https://firestore.googleapis.com/v1beta1/projects/${PROJECT_ID}/databases/(default)/documents`;

export const _headers = {
  "Content-Type": "application/json",
};
