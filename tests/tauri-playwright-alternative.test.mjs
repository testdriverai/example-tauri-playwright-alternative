/**
 * Installs Yaak (an open-source Tauri API client) on Linux, sends an HTTP request,
 * checks the response, then switches the app to dark mode from its Settings dialog.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const YAAK_DEB =
  "https://github.com/mountain-loop/yaak/releases/download/v2026.9.0/yaak_2026.9.0_amd64.deb";

describe("Yaak (Tauri)", () => {
  it("sends a request, then switches the app to dark mode", async (context) => {
    const testdriver = TestDriver(context);

    // Download and install the .deb. We start the app ourselves below.
    await testdriver.provision.installer({ url: YAAK_DEB, launch: false });

    // Pull in Tauri's Linux runtime dependencies (WebKitGTK, libsoup) and start Yaak.
    await testdriver.exec(
      "sh",
      "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -f -y -qq",
      240000,
    );
    await testdriver.exec("sh", "nohup yaak-app-client >/tmp/yaak.log 2>&1 &", 10000);

    // Start with an empty workspace. The first find waits for the window to appear.
    await testdriver.find('"Start fresh" card on the Yaak welcome screen', { timeout: 60000 }).click();

    // Create a new HTTP request, enter a URL and send it.
    await testdriver.find('"New Request" button in the middle of the empty workspace').click();
    await testdriver.find('"HTTP" option in the New Request dropdown menu').click();
    await testdriver.find('URL input with the placeholder "https://example.com" next to the GET method selector').click();
    await testdriver.type("https://httpbin.org/json");
    await testdriver.find("Send button (paper airplane icon) at the right end of the URL bar").click();

    // Wait for the response, then check what the app rendered.
    await testdriver.find("green 200 OK status label at the top of the response panel", { timeout: 30000 });
    const responseShown = await testdriver.assert(
      'the response panel shows a green 200 OK status and a JSON body containing "Sample Slide Show"',
    );
    expect(responseShown).toBeTruthy();

    // Open Settings from the gear in Yaak's custom title bar.
    await testdriver.find("settings gear icon in the top-right title bar, just left of the window minimize button").click();
    await testdriver.find('"Settings" item at the top of the main menu dropdown').click();

    // Switch the appearance from Automatic to Dark.
    await testdriver.find('"Theme" tab in the left sidebar of the Settings dialog, just below "General"').click();
    await testdriver.find('"Automatic" dropdown on the right of the Appearance row in the Theme settings').click();
    await testdriver.find('"Dark" option at the bottom of the Appearance dropdown list').click();

    const darkMode = await testdriver.assert(
      'the Appearance dropdown in the Theme settings shows "Dark" and the window, title bar and settings dialog all use a dark background',
    );
    expect(darkMode).toBeTruthy();
  });
});
