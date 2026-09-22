#!/usr/bin/env node

import { readFileSync } from 'fs';
import { google } from 'googleapis';

const CREDENTIALS_PATH = '/Users/juanma/Documents/Bedrock IA/mcp-servers/credentials/oauth_client.json';
const TOKEN_PATH = '/Users/juanma/Documents/Bedrock IA/mcp-servers/credentials/token.json';
const SPREADSHEET_ID = '1fayib3MNIrJkA_38kxz_gmF1kEh5F0TaC_5gw5cfyzg';

async function getSheetMetadata() {
  try {
    const rawCredentials = readFileSync(CREDENTIALS_PATH, 'utf-8');
    const { installed } = JSON.parse(rawCredentials);

    const rawToken = readFileSync(TOKEN_PATH, 'utf-8');
    const token = JSON.parse(rawToken);

    const oAuth2Client = new google.auth.OAuth2(
      installed.client_id,
      installed.client_secret
    );
    oAuth2Client.setCredentials(token);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

    const res = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });

    console.log('Sheet Metadata:');
    console.log('==============');
    console.log(`Title: ${res.data.properties.title}`);
    console.log('\nAvailable Sheets:');
    res.data.sheets.forEach((sheet, index) => {
      console.log(`${index + 1}. "${sheet.properties.title}" (sheetId: ${sheet.properties.sheetId})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

getSheetMetadata();
