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

---

## Getting Started

### First-Time Setup

1. Save the `payer_mapping_tool.html` file to your computer
2. Double-click the file to open it in your web browser (Chrome, Edge, or Firefox recommended)
3. No installation or internet connection required after initial load

> **Screenshot suggestion:** Show the HTML file icon on desktop

---

## Weekly Workflow

Each week when you receive a new placement file:

1. Open the Payer Mapping Tool
2. Enter your organization name (use the same name each week)
3. Upload your new placement file
4. Map any NEW payers that appear (previously mapped payers are remembered)
5. Export the UiPath JSON file
6. Send the JSON file to your automation team

> **Screenshot suggestion:** Flowchart or numbered diagram of weekly steps

---

## Step-by-Step Instructions

### Step 1: Enter Your Organization Name

When you open the tool, you'll see a "Client Setup" section at the top.

1. Type your organization name in the text box (e.g., "UTSW", "HealthPartners")
2. **Use the exact same name each week** - this is how the tool remembers your previous mappings
3. If you've used the tool before, you'll see "Loaded X saved mappings" appear

> **Screenshot suggestion:** Client Setup section with name entered and "Loaded 45 saved mappings" status

**Important:** Your mappings are saved in your browser. If you switch to a different computer or browser, you'll need to use the backup file (see [Backing Up Your Work](#backing-up-your-work)).

---

### Step 2: Upload Your Placement File

1. Click "Choose File" under "Placement File"
2. Select your weekly placement file (.xlsx or .csv format)
3. The tool will analyze the file and display all unique payers grouped by state

> **Screenshot suggestion:** File upload section with a file selected, showing the green checkmark

After uploading, you'll see:
- **Mapping Progress** section showing total plans, mapped, and unmapped counts
- **Map Payers** section with plans organized by state

---

### Step 3: Map Your Payers

Each payer in your placement file needs to be mapped to an Availity payer.

For each unmapped payer:

1. Find the payer in the list (use the search box to filter)
2. Click the dropdown next to the payer name
3. Select the appropriate Availity payer from the list

> **Screenshot suggestion:** Dropdown menu expanded showing Availity payer options

#### Special Options

At the top of each dropdown, you'll find these special options:

| Option | When to Use |
|--------|-------------|
| **Not Available** | Payer cannot be processed through any portal |
| **UHC Portal** | Payer should be processed through the UHC portal instead |
| **Superior Portal** | Payer should be processed through the Superior portal instead |

> **Screenshot suggestion:** Dropdown showing the special options at top

#### Visual Indicators

- **Green row** = Successfully mapped to an Availity payer
- **Orange row** = Marked as Not Available, UHC, or Superior
- **White row** = Not yet mapped

> **Screenshot suggestion:** Side-by-side comparison of green, orange, and white rows

---

### Step 4: Use Filters to Track Progress

Above the mapping table, you'll find filter buttons:

- **All** - Shows all payers
- **Unmapped Only** - Shows only payers you haven't mapped yet (helpful for finding what's left)
- **Mapped Only** - Shows only completed mappings

> **Screenshot suggestion:** Filter buttons with "Unmapped Only" selected

Use the **search box** to quickly find specific payers by name.

---

## Understanding the Interface

### Progress Statistics

The Mapping Progress section shows:

| Stat | Meaning |
|------|---------|
| **Total Plans** | Number of unique payer+state combinations in your file |
| **Mapped** | How many you've completed |
| **Unmapped** | How many still need mapping |
| **States** | Number of different states in your file |

The progress bar shows your overall completion percentage.

> **Screenshot suggestion:** Progress statistics section

### State Sections

Payers are grouped by state because the same payer name may need different Availity mappings in different states. Each state section shows:

- State name and abbreviation
- Number of plans in that state
- Table of payers with their volume (account count) and mapping dropdown

> **Screenshot suggestion:** A state section header with the table below it

---

## Exporting Your Work

### Export for UiPath (Required Weekly)

When you've finished mapping:

1. Click the green **"Export for UiPath (.json)"** button
2. Save the downloaded file
3. Send this file to your automation team

The file will be named `[YourOrgName]_uipath.json`

> **Screenshot suggestion:** Export button and save dialog

### Backing Up Your Work (Recommended)

Your mappings are automatically saved in your browser, but it's good practice to keep a backup file:

1. Click **"Save Mapping Progress"**
2. Save the downloaded JSON file somewhere safe
3. If you ever need to restore (new computer, cleared browser data), upload this file using "Previous Mapping (Optional)"

The backup file will be named `payer_mapping_[YourOrgName].json`

> **Screenshot suggestion:** Save Mapping Progress button

---

## Tips & Troubleshooting

### Auto-Save Feature

Every time you select a mapping, you'll briefly see "Mappings saved" appear in the top-right corner. Your work is automatically saved - no need to manually save unless you want a backup file.

> **Screenshot suggestion:** Auto-save indicator in top right

### Switching Computers

Your mappings are stored in your browser's local storage. If you need to work on a different computer:

1. On your original computer: Click "Save Mapping Progress" to download your mappings
2. On the new computer: Open the tool, enter your org name, then upload the mapping file under "Previous Mapping (Optional)"

### Clearing Saved Data

If you need to start fresh:

1. Enter your organization name
2. Click the red "Clear Saved Data" button
3. Confirm when prompted

**Warning:** This cannot be undone. Make sure to save a backup first if needed.

> **Screenshot suggestion:** Clear Saved Data confirmation dialog

### Common Questions

**Q: Why do I see the same payer name in multiple states?**
A: Each state may have different Availity payer options. A payer like "BCBS" in Texas might map to a different Availity ID than "BCBS" in California.

**Q: What if I can't find the right Availity payer?**
A: Select "Not Available" and notify your automation team. They can investigate and potentially add it to the Availity list.

**Q: Does this tool send my data anywhere?**
A: No. The tool runs entirely in your browser. Your data never leaves your computer unless you manually send the exported files.

**Q: What browsers work with this tool?**
A: Chrome, Edge, and Firefox are recommended. Safari may work but is not fully tested.

---

## Need Help?

Contact your automation team if you:
- Can't find an appropriate Availity payer for a mapping
- Notice payers that should be added to the Availity list
- Experience technical issues with the tool

---

*Last updated: December 2024*
