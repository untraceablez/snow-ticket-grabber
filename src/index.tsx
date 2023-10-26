import { Raycast, Slack } from "@raycast/api";

const raycast = new Raycast();
const slack = new Slack();

async function pasteTicketUrlIntoSlack(ticketNumber: string) {
  // Get the current tab URL.
  const tab: { url: () => string } = await raycast.activeBrowserTab();
  const tabUrl = tab.url();

  // Find the ticket URL in the current tab.
  const ticketUrlRegex = /https:\/\/example.com\/tickets\/(\d+)/;
  const ticketUrlMatch = ticketUrlRegex.exec(tabUrl);
  if (!ticketUrlMatch) {
    throw new Error("Could not find a ticket URL in the current tab.");
  }

  // Get the Slack channel ID.
  const slackChannelId: string = await raycast.prompt("Enter the Slack channel ID:");

  // Post the ticket URL to Slack.
  const message: string = `${ticketNumber}: ${ticketUrlMatch[0]}`;
  await slack.postMessage(slackChannelId, message);

  // Display a success message to the user.
  raycast.notify("Ticket URL pasted to Slack successfully.");
}

async function run() {
  const ticketNumber: string = await raycast.prompt("Enter the ticket number:");
  await pasteTicketUrlIntoSlack(ticketNumber);
}

run();
