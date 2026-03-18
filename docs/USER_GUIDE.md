# Payer Mapping Tool - User Guide

A standalone tool for mapping placement file payers to Availity payers for claim status automation.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Weekly Workflow](#weekly-workflow)
3. [Step-by-Step Instructions](#step-by-step-instructions)
4. [Understanding the Interface](#understanding-the-interface)
5. [Exporting Your Work](#exporting-your-work)
6. [Tips & Troubleshooting](#tips--troubleshooting)
7. [PHI/HIPAA Considerations](#phihipaa-considerations)

---

## Getting Started

### First-Time Setup

1. Save the `index.html` file to your computer
2. Double-click the file to open it in your web browser (Chrome, Edge, or Firefox recommended)
3. No installation or internet connection required after initial load

![Initial State](screenshots/01_initial_state.png)

---

## Weekly Workflow

Each week when you receive a new placement file:

1. Open the Payer Mapping Tool
2. Enter your organization name (use the same name each week)
3. Upload your new placement file
4. Map any NEW payers that appear (previously mapped payers are remembered)
5. Export the UiPath JSON file
6. Send the JSON file to your automation team

---

## Step-by-Step Instructions

### Step 1: Enter Your Organization Name

When you open the tool, you'll see a "Client Setup" section at the top.

1. Type your organization name in the text box (e.g., "UTSW", "HealthPartners")
2. **Use the exact same name each week** - this is how the tool remembers your previous mappings
3. If you've used the tool before, you'll see "Loaded X saved mappings" appear

![Client Name Entry](screenshots/02_client_name_new.png)

**Important:** Your mappings are saved in your browser's local storage. If you switch to a different computer or browser, you'll need to use the backup file (see [Backing Up Your Work](#backing-up-your-work)).

---

### Step 2: Upload Your Files

#### Placement File (Required)

1. Click "Choose File" under "Placement File"
2. Select your weekly placement file (.xlsx or .csv format)
3. The tool will analyze the file and display all unique payers grouped by state

![File Upload](screenshots/03_file_upload.png)

#### Previous Mapping (Optional)

If you have a saved mapping file or a previous UiPath output file, you can upload it to pre-populate your mappings:

1. Click "Choose File" under "Previous Mapping"
2. Select either:
   - A saved mapping progress file (`.json` from "Save Mapping Progress")
   - A UiPath output file (`.json` from "Export for UiPath")
3. The tool auto-detects the format and imports the mappings

![UiPath Import](screenshots/13_uipath_import.png)

This is useful for:
- Restoring work on a new computer
- Seeing how an existing UiPath config would apply to a new placement file
- Reviewing which payers from a new file are already mapped vs. need attention

---

### Step 3: Map Your Payers

After uploading, you'll see the mapping interface with plans organized by state.

![Mapping Interface](screenshots/04_mapping_interface.png)

For each unmapped payer:

1. Find the payer in the list (use the search box to filter)
2. Click the dropdown next to the payer name
3. Select the appropriate Availity payer from the list

![Dropdown Options](screenshots/06_dropdown_options.png)

#### Special Options

At the top of each dropdown, you'll find these special options:

| Option | When to Use |
|--------|-------------|
| **Not Available** | Payer cannot be processed through any portal |
| **UHC Portal** | Payer should be processed through the UHC portal instead of Availity |
| **Superior Portal** | Payer should be processed through the Superior portal instead of Availity |

#### Visual Indicators

- **Green row** = Successfully mapped to an Availity payer
- **Orange row** = Marked as Not Available, UHC, or Superior
- **White row** = Not yet mapped

![Partial Mapping](screenshots/07_partial_mapping.png)

---

### Step 4: Use Filters to Track Progress

Above the mapping table, you'll find filter buttons:

- **All** - Shows all payers
- **Unmapped Only** - Shows only payers you haven't mapped yet (helpful for finding what's left)
- **Mapped Only** - Shows only completed mappings

![Filter Unmapped](screenshots/08_filter_unmapped.png)

Use the **search box** to quickly find specific payers by name.

![Search](screenshots/09_search.png)

---

## Understanding the Interface

### Progress Statistics

The Mapping Progress section shows your completion status:

| Stat | Meaning |
|------|---------|
| **Total Plans** | Number of unique payer+state combinations in your file |
| **Mapped** | How many you've completed |
| **Unmapped** | How many still need mapping |
| **States** | Number of different states in your file |

The progress bar shows your overall completion percentage.

![Progress Stats](screenshots/05_progress_stats.png)

### State Sections

Payers are grouped by state because the same payer name may need different Availity mappings in different states. For example, "BCBS" in Texas might map to a different Availity payer ID than "BCBS" in California.

Each state section shows:
- State name and abbreviation
- Number of plans in that state
- Table of payers with their volume (account count) and mapping dropdown

### Auto-Save

Every time you select a mapping, you'll briefly see "Mappings saved" appear in the top-right corner. Your work is automatically saved to your browser - no need to manually save unless you want a backup file.

![Auto Save](screenshots/11_auto_save.png)

---

## Exporting Your Work

### Export for UiPath (Required Weekly)

When you've finished mapping:

1. Click the green **"Export for UiPath (.json)"** button
2. Save the downloaded file
3. Send this file to your automation team

The file will be named `[YourOrgName]_uipath.json`

![Export Buttons](screenshots/10_export_buttons.png)

### Backing Up Your Work (Recommended)

Your mappings are automatically saved in your browser, but it's good practice to keep a backup file:

1. Click **"Save Mapping Progress"**
2. Save the downloaded JSON file somewhere safe
3. If you ever need to restore (new computer, cleared browser data), upload this file using "Previous Mapping (Optional)"

The backup file will be named `payer_mapping_[YourOrgName].json`

---

## Tips & Troubleshooting

### Switching Computers

Your mappings are stored in your browser's local storage. If you need to work on a different computer:

1. On your original computer: Click "Save Mapping Progress" to download your mappings
2. On the new computer: Open the tool, enter your org name, then upload the mapping file under "Previous Mapping (Optional)"

Alternatively, you can upload a previous UiPath output file to restore mappings.

### Clearing Saved Data

If you need to start fresh:

1. Enter your organization name
2. Click the red "Clear Saved Data" button
3. Confirm when prompted

**Warning:** This cannot be undone. Make sure to save a backup first if needed.

### Common Questions

**Q: Why do I see the same payer name in multiple states?**
A: Each state may have different Availity payer options. A payer like "BCBS" in Texas might map to a different Availity ID than "BCBS" in California. You need to map each state separately.

**Q: What if I can't find the right Availity payer?**
A: Select "Not Available" and notify your automation team. They can investigate and potentially add it to the Availity list.

**Q: Does this tool send my data anywhere?**
A: No. The tool runs entirely in your browser. Your data never leaves your computer unless you manually send the exported files.

**Q: What browsers work with this tool?**
A: Chrome, Edge, and Firefox are recommended. Safari may work but is not fully tested.

**Q: Can I import an old UiPath JSON file?**
A: Yes! Upload it under "Previous Mapping (Optional)" and the tool will convert it to the internal format automatically.

### Version Information

The current version is displayed in the footer of the tool. If you're experiencing issues, check that you have the latest version.

![Footer Version](screenshots/12_footer_version.png)

---

## PHI/HIPAA Considerations

- **No data leaves your machine** - This tool runs entirely in your browser. Your placement files and mapping data are never transmitted to any server.
- **Placement files are processed locally only** - Files containing PHI are read and processed in your browser's memory.
- **Exported JSON contains only payer names** - The output files do not include patient data, only payer/plan mapping information.
- **Browser storage persists until cleared** - Your saved mappings remain in your browser's localStorage until you manually clear them or clear your browser data. If your computer is shared or contains PHI, consider clearing saved data when finished.

---

## Need Help?

Contact your automation team if you:
- Can't find an appropriate Availity payer for a mapping
- Notice payers that should be added to the Availity list
- Experience technical issues with the tool

---

*Last updated: December 2025*
