const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const SCREENSHOTS_DIR = path.join(__dirname, '../docs/screenshots');
const HTML_FILE = path.join(__dirname, '../payer_mapping_tool.html');
const PLACEMENT_FILE = path.join(__dirname, '../references/Placement Files/Claim Status Request UTSWD 11.19.25 (CLEAN).xlsx');
const UIPATH_FILE = path.join(__dirname, '../references/UiPath Mapping/UTSW payer_mapping_uipath (original).json');

async function captureScreenshots() {
    // Ensure screenshots directory exists
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
        fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to the HTML file
    await page.goto(`file://${HTML_FILE}`, { waitUntil: 'networkidle0' });

    // Screenshot 1: Initial empty state
    console.log('Capturing: 01_initial_state.png');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_initial_state.png'), fullPage: false });

    // Screenshot 2: Client name entered with "new client" status
    console.log('Capturing: 02_client_name_new.png');
    await page.type('#clientName', 'UTSW');
    await wait(600); // Wait for debounce
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_client_name_new.png'), fullPage: false });

    // Screenshot 3: Upload placement file
    console.log('Capturing: 03_file_upload.png');
    const placementInput = await page.$('#placementFile');
    await placementInput.uploadFile(PLACEMENT_FILE);
    await wait(1500); // Wait for file processing
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_file_upload.png'), fullPage: false });

    // Screenshot 4: Mapping interface with stats
    console.log('Capturing: 04_mapping_interface.png');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_mapping_interface.png'), fullPage: true });

    // Screenshot 5: Progress stats section close-up
    console.log('Capturing: 05_progress_stats.png');
    const statsSection = await page.$('#statsSection');
    await statsSection.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_progress_stats.png') });

    // Screenshot 6: Dropdown expanded - click first select
    console.log('Capturing: 06_dropdown_options.png');
    const firstSelect = await page.$('.payer-select');
    await firstSelect.click();
    await wait(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_dropdown_options.png'), fullPage: false });

    // Close dropdown by pressing Escape
    await page.keyboard.press('Escape');
    await wait(200);

    // Screenshot 7: Make a few mappings to show mixed states
    console.log('Capturing: 07_partial_mapping.png');
    const selects = await page.$$('.payer-select');

    // Map first payer to an Availity option
    if (selects[0]) {
        await selects[0].select('AETNA');
        await wait(200);
    }

    // Map second payer to "not available"
    if (selects[1]) {
        await selects[1].select('not available');
        await wait(200);
    }

    // Map third payer to UHC
    if (selects[2]) {
        await selects[2].select('UHC');
        await wait(200);
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_partial_mapping.png'), fullPage: false });

    // Screenshot 8: Filter buttons - click "Unmapped Only"
    console.log('Capturing: 08_filter_unmapped.png');
    await page.click('.filter-btn[data-filter="unmapped"]');
    await wait(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_filter_unmapped.png'), fullPage: false });

    // Screenshot 9: Search functionality
    console.log('Capturing: 09_search.png');
    await page.click('.filter-btn[data-filter="all"]');
    await wait(200);
    await page.type('#searchBox', 'BCBS');
    await wait(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_search.png'), fullPage: false });

    // Clear search
    await page.evaluate(() => document.getElementById('searchBox').value = '');
    await wait(200);

    // Screenshot 10: Export buttons section
    console.log('Capturing: 10_export_buttons.png');
    const actionsSection = await page.$('#actionsSection');
    await actionsSection.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_export_buttons.png') });

    // Screenshot 11: Auto-save indicator (trigger by making a mapping)
    console.log('Capturing: 11_auto_save.png');
    const unmappedSelect = await page.$('.payer-select:not(.mapped):not(.not-available)');
    if (unmappedSelect) {
        await unmappedSelect.select('HUMANA');
        await wait(100);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_auto_save.png'), fullPage: false });
    }

    // Screenshot 12: Version footer
    console.log('Capturing: 12_footer_version.png');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await wait(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_footer_version.png'), fullPage: false });

    // Now test importing UiPath file
    // Reload page for clean state
    console.log('Capturing: 13_uipath_import.png');
    await page.reload({ waitUntil: 'networkidle0' });
    await page.type('#clientName', 'UTSW_Demo');
    await wait(600);

    // Upload UiPath mapping file
    const mappingInput = await page.$('#mappingFile');
    await mappingInput.uploadFile(UIPATH_FILE);
    await wait(1000);

    // Upload placement file
    const placementInput2 = await page.$('#placementFile');
    await placementInput2.uploadFile(PLACEMENT_FILE);
    await wait(1500);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '13_uipath_import.png'), fullPage: true });

    await browser.close();
    console.log('\nScreenshots saved to:', SCREENSHOTS_DIR);
    console.log('Files created:');
    fs.readdirSync(SCREENSHOTS_DIR).forEach(file => console.log('  -', file));
}

captureScreenshots().catch(console.error);
