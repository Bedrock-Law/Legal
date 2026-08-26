#!/usr/bin/env node
// Autorización OAuth de uso único: abre el navegador, el usuario acepta el
// scope de Drive completo, y guarda el token (con refresh_token) en
// credentials/token.json para que drive-mcp lo reutilice sin volver a pedir login.

import { OAuth2Client } from "google-auth-library";
import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { exec } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "credentials", "token.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}`;

async function main() {
  const raw = await readFile(CREDENTIALS_PATH, "utf-8");
  const { installed } = JSON.parse(raw);
  if (!installed) {
    throw new Error(
      "credentials/oauth_client.json no tiene la forma esperada (falta la clave 'installed'). Verifica que sea un OAuth Client tipo Desktop."
    );
  }

  const oAuth2Client = new OAuth2Client(installed.client_id, installed.client_secret, REDIRECT_URI);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  console.log("\nAbriendo el navegador para autorizar acceso a Google Drive...");
  console.log("Si no se abre solo, copia esta URL en el navegador:\n");
  console.log(authUrl, "\n");
  exec(`open "${authUrl}"`);

  const code = await waitForCode();
  const { tokens } = await oAuth2Client.getToken(code);

  if (!tokens.refresh_token) {
    console.warn(
      "\nAviso: Google no devolvió refresh_token. Si ya habías autorizado esta app antes, revoca el acceso en https://myaccount.google.com/permissions y vuelve a correr este script."
    );
  }

  await writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`\nListo. Token guardado en ${TOKEN_PATH}`);
  console.log("Este archivo da acceso completo (lectura y escritura) a tu Google Drive. No lo subas a git.");
}

function waitForCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.end("Autorización rechazada. Puedes cerrar esta pestaña.");
        server.close();
        reject(new Error(`Google devolvió un error: ${error}`));
        return;
      }

      if (code) {
        res.end("Autorización recibida. Puedes cerrar esta pestaña y volver a la terminal.");
        server.close();
        resolve(code);
      }
    });

    server.listen(PORT);
  });
}

main().catch((err) => {
  console.error("\nError durante la autorización:", err.message);
  process.exit(1);
});
